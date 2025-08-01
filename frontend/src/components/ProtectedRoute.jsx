import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children, requireAuth = false, requireAdmin = false, allowPublic = false }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = () => {
      const userAuth = JSON.parse(localStorage.getItem("userAuth") || "null");
      const adminAuth = JSON.parse(localStorage.getItem("adminAuth") || "null");
      const isInitialized = sessionStorage.getItem('appInitialized');

      // If app is not initialized, only allow public routes
      if (!isInitialized && !allowPublic) {
        setLoading(false);
        return;
      }

      if (userAuth && userAuth.isAuthenticated) {
        setIsAuthenticated(true);
        setIsAdmin(false);
      } else if (adminAuth && adminAuth.isAuthenticated) {
        setIsAuthenticated(true);
        setIsAdmin(true);
      } else {
        setIsAuthenticated(false);
        setIsAdmin(false);
      }

      setLoading(false);
    };

    checkAuth();

    // Listen for auth changes
    const handleAuthChange = () => checkAuth();
    window.addEventListener('authChange', handleAuthChange);
    window.addEventListener('storage', handleAuthChange);

    return () => {
      window.removeEventListener('authChange', handleAuthChange);
      window.removeEventListener('storage', handleAuthChange);
    };
  }, [allowPublic]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // If route requires admin access
  if (requireAdmin) {
    if (!isAuthenticated || !isAdmin) {
      return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }
    return children;
  }

  // If route requires user authentication
  if (requireAuth) {
    if (!isAuthenticated) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // If admin is trying to access user routes, redirect to admin panel
    if (isAdmin) {
      return <Navigate to="/admin/messages" replace />;
    }

    return children;
  }

  // Public routes - accessible to everyone
  if (allowPublic) {
    // Special handling for login/signup pages when user is already authenticated
    if (isAuthenticated && (location.pathname === '/login' || location.pathname === '/signup')) {
      // Only redirect if this is not an initial load
      const isInitialLoad = !sessionStorage.getItem('appInitialized');
      if (!isInitialLoad) {
        if (isAdmin) {
          return <Navigate to="/admin/messages" replace />;
        } else {
          return <Navigate to="/" replace />;
        }
      }
    }
    return children;
  }

  // Default: redirect to home page for unauthenticated users
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  requireAuth: PropTypes.bool,
  requireAdmin: PropTypes.bool,
  allowPublic: PropTypes.bool,
};

export default ProtectedRoute;
