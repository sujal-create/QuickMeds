
import UserAvatar from './UserAvatar';
import './UserAvatarTest.css';

const UserAvatarTest = () => {
  const testCases = [
    { name: 'John Doe', size: 40, label: 'Normal Name' },
    { name: 'Admin', size: 50, label: 'Admin User' },
    { name: 'test@example.com', size: 60, label: 'Email Address' },
    { name: 'SingleName', size: 45, label: 'Single Name' },
    { name: '', size: 40, label: 'Empty Name' },
    { name: null, size: 40, label: 'Null Name' },
    { name: undefined, size: 40, label: 'Undefined Name' },
    { name: '   ', size: 40, label: 'Whitespace Only' },
    { name: 'Very Long Name With Multiple Words', size: 55, label: 'Long Name' },
    { name: 'Dr. Sarah Johnson', size: 48, label: 'Name with Title' },
    { name: 'user123@gmail.com', size: 42, label: 'Gmail Address' },
    { name: 'A', size: 35, label: 'Single Character' }
  ];

  const handleAvatarClick = (name) => {
    alert(`Clicked avatar for: ${name || 'Unknown User'}`);
  };

  return (
    <div className="avatar-test-container">
      <h2>UserAvatar Component Test</h2>
      
      <div className="test-section">
        <h3>Basic Tests</h3>
        <div className="avatar-grid">
          {testCases.map((test, index) => (
            <div key={index} className="test-case">
              <UserAvatar 
                name={test.name} 
                size={test.size}
                onClick={() => handleAvatarClick(test.name)}
              />
              <div className="test-info">
                <p className="test-label">{test.label}</p>
                <p className="test-name">{test.name}</p>
                <p className="test-size">Size: {test.size}px</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="test-section">
        <h3>Size Variations</h3>
        <div className="size-test">
          {[20, 30, 40, 50, 60, 80, 100, 120].map(size => (
            <div key={size} className="size-case">
              <UserAvatar name="Test User" size={size} />
              <p>{size}px</p>
            </div>
          ))}
        </div>
      </div>

      <div className="test-section">
        <h3>Interactive Tests</h3>
        <div className="interactive-test">
          <div className="interactive-case">
            <UserAvatar 
              name="Clickable User" 
              size={60} 
              onClick={() => alert('Avatar clicked!')}
              className="clickable-avatar"
            />
            <p>Clickable Avatar</p>
          </div>
          <div className="interactive-case">
            <UserAvatar 
              name="Non-clickable User" 
              size={60} 
              className="non-clickable-avatar"
            />
            <p>Non-clickable Avatar</p>
          </div>
        </div>
      </div>

      <div className="test-section">
        <h3>Edge Cases</h3>
        <div className="edge-cases">
          <div className="edge-case">
            <UserAvatar name="123" size={40} />
            <p>Numbers Only</p>
          </div>
          <div className="edge-case">
            <UserAvatar name="@#$%" size={40} />
            <p>Special Characters</p>
          </div>
          <div className="edge-case">
            <UserAvatar name="   John   Doe   " size={40} />
            <p>Extra Whitespace</p>
          </div>
          <div className="edge-case">
            <UserAvatar name="user@domain.co.uk" size={40} />
            <p>Complex Email</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAvatarTest;
