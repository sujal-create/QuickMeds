import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

const GoogleMap = ({ center, zoom = 15, markers = [] }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // ✅ Hardcoded API Key
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;


  // Load Google Maps script
  useEffect(() => {
    if (window.google && window.google.maps) {
      setIsLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      setIsLoaded(true);
    };

    script.onerror = () => {
      console.error('Failed to load Google Maps script');
    };

    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [apiKey]);

  // Initialize map
  useEffect(() => {
    if (!isLoaded || !mapRef.current || map) return;

    const mapInstance = new window.google.maps.Map(mapRef.current, {
      center: center,
      zoom: zoom,
      mapTypeControl: true,
      streetViewControl: true,
      fullscreenControl: true,
      zoomControl: true,
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'on' }]
        },
        {
          featureType: 'transit',
          elementType: 'labels',
          stylers: [{ visibility: 'on' }]
        },
        {
          featureType: 'poi.medical',
          elementType: 'all',
          stylers: [{ visibility: 'on' }]
        },
        {
          featureType: 'poi.business',
          elementType: 'all',
          stylers: [{ visibility: 'simplified' }]
        }
      ]
    });

    setMap(mapInstance);
  }, [isLoaded, center, zoom, map]);

  // Add markers
  useEffect(() => {
    if (!map || !markers.length) return;

    const mapMarkers = markers.map(marker => {
      const mapMarker = new window.google.maps.Marker({
        position: marker.position,
        map: map,
        title: marker.title,
        icon: marker.icon || {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="8" fill="#4285f4" stroke="#ffffff" stroke-width="2"/>
              <circle cx="16" cy="16" r="4" fill="#ffffff"/>
            </svg>
          `),
          scaledSize: new window.google.maps.Size(32, 32),
          anchor: new window.google.maps.Point(16, 16)
        }
      });

      if (marker.infoWindow) {
        const infoWindow = new window.google.maps.InfoWindow({
          content: marker.infoWindow
        });

        mapMarker.addListener('click', () => {
          infoWindow.open(map, mapMarker);
        });
      }

      return mapMarker;
    });

    // Cleanup markers when component unmounts or markers change
    return () => {
      mapMarkers.forEach(marker => marker.setMap(null));
    };
  }, [map, markers]);

  if (!isLoaded) {
    return (
      <div className="map-loading">
        <div className="loading-spinner"></div>
        <p>Loading map...</p>
      </div>
    );
  }

  return (
    <div className="google-map-container">
      <div
        ref={mapRef}
        className="google-map"
        style={{
          width: '100%',
          height: '400px',
          borderRadius: '12px',
          border: '2px solid #e9ecef'
        }}
      />
    </div>
  );
};

GoogleMap.propTypes = {
  center: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired
  }).isRequired,
  zoom: PropTypes.number,
  markers: PropTypes.arrayOf(
    PropTypes.shape({
      position: PropTypes.shape({
        lat: PropTypes.number.isRequired,
        lng: PropTypes.number.isRequired
      }).isRequired,
      title: PropTypes.string,
      infoWindow: PropTypes.string,
      icon: PropTypes.object
    })
  )
};

export default GoogleMap;
