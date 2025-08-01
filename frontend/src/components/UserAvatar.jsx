import PropTypes from 'prop-types';
import './UserAvatar.css';

const UserAvatar = ({ name = '', size = 40 }) => {
  const getInitials = (name) => {
    if (!name) return '?';
    if (name.toLowerCase() === 'admin') return 'A';

    const nameParts = name.trim().split(' ');
    if (name.includes('@')) {
      return name.split('@')[0][0].toUpperCase();
    }

    if (nameParts.length === 1) {
      return nameParts[0][0].toUpperCase();
    }

    return (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
  };

  const getAvatarColor = (name) => {
    if (!name) return '#4949ef';

    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    const colors = [
      '#4949ef', '#13c2c2', '#722ed1',
      '#1890ff', '#52c41a', '#fa8c16', '#eb2f96'
    ];

    const colorIndex = Math.abs(hash) % colors.length;
    return colors[colorIndex];
  };

  const initials = getInitials(name);
  const backgroundColor = getAvatarColor(name);

  return (
    <div 
      className="user-avatar" 
      style={{ 
        width: `${size}px`, 
        height: `${size}px`,
        backgroundColor,
        fontSize: `${size * 0.4}px`,
        borderRadius: '50%',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {initials}
    </div>
  );
};

UserAvatar.propTypes = {
  name: PropTypes.string,
  size: PropTypes.number
};

export default UserAvatar;
