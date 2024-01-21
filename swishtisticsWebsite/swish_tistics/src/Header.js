// Header.js
import React from 'react';
import bellIcon from './Icons/HeaderLogos/bell.png'; 
import searchIcon from './Icons/HeaderLogos/search.png'; 
import userAvatar from './Icons/HeaderLogos/profile.png';

// Define your styles in a JavaScript object
const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: '10px',
    paddingRight: '10px',
    paddingLeft: '10px',
    // paddingLeft: '15px',
  },
  headerActions: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '0px'
  },
  dashboardText: {
    fontSize: '22px',
    fontFamily: "'Inter', sans-serif",
    marginTop: 5,
  },
  icon: {
    width: '20px',
    height: '20px',
    marginRight: '10px',
  },
  userProfile: {
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    width: '45px',
    height: '45px',
    marginRight: '5px',
  },
  welcomeMessage: {
    color: '#5C85E5',
    fontSize: '14px',
    marginBottom: '5px',
    margin: '0',
  },
  userName: {
    fontWeight: 500,
    fontSize: '14px',
  },
};

const Header = ({ userName }) => {
  return (
    <div style={styles.header}>
      <div>
        <h3 style={styles.welcomeMessage}>Welcome Back, Muraf</h3>
        <h2 style={styles.dashboardText}>Dashboard</h2>
      </div>
      <div style={styles.headerActions}>
        <img src={searchIcon} alt="Search" style={styles.icon} />
        <img src={bellIcon} alt="Notifications" style={styles.icon} />
        <div style={styles.userProfile}>
          <img src={userAvatar} alt={userName} style={styles.avatar} />
          <span style={styles.userName}>{userName}</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
