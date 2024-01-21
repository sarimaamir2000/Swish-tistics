// Sidebar.js
import React, { useState } from 'react';
import SwishtisticLogo from './Icons/SidebarLogos/SwishtisticLogo.png';
import Calendar from './Icons/SidebarLogos/calendar.png';
import Squad from './Icons/SidebarLogos/squad.png';
import Coach from './Icons/SidebarLogos/coach.png';
import DashboardIcon from './Icons/SidebarLogos/dashboard.png';
import Logout from './Icons/SidebarLogos/logout.png';
import Message from './Icons/SidebarLogos/message.png';
import Settings from './Icons/SidebarLogos/settings.png';

// Define your styles in a JavaScript object
const styles = {
  sidebarContainer: {
    width: '80px',
    height: '96vh',
    backgroundColor: '#C6DBF1',
    borderRight: '3px solid #FFFFFF',
    color: 'white',
    padding: '20px 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    width: '50px',
    height: '50px',
    marginBottom: '20px',
  },
  iconContainer: {
    paddingTop: '40px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  icon: {
    width: '30px',
    height: '30px',
    marginTop: '15px',
    marginBottom: '20px',
    cursor: 'pointer',
    display: 'block',
    transition: 'background-color 0.3s',
  },
  logoutIcon: {
    width: '25px',
    height: '25px',
    marginBottom: '20px',
    cursor: 'pointer',
    display: 'block',
    marginTop: 'auto', // Push the logout icon to the bottom
  },
  activeIcon: {
    border: '10px solid #DBE6F2',
    
  },
  hoverIcon: {
    borderColor: '#DBE6F2',
    backgroundColor: '#FFFFFF', // Highlight color on hover
  },
};

const Sidebar = ( {activeTab, setActiveTab }) => {
  const [hoveredTab, setHoveredTab] = useState(null);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    // Add logic to navigate to the corresponding page when a tab is clicked
  };

  return (
    <div style={styles.sidebarContainer}>
      <img src={SwishtisticLogo} alt="Swishtistic Logo" style={styles.logo} />
      <div style={styles.iconContainer}>
        <img 
          src={DashboardIcon} 
          alt="Dashboard" 
          style={{ ...styles.icon, ...(activeTab === 'dashboard' && styles.activeIcon), ...(hoveredTab === 'dashboard' && styles.hoverIcon) }} 
          onClick={() => handleTabClick('dashboard')}
          onMouseEnter={() => setHoveredTab('dashboard')}
          onMouseLeave={() => setHoveredTab(null)}
        />
        <img 
          src={Calendar} 
          alt="Calendar" 
          style={{ ...styles.icon, ...(activeTab === 'calendar' && styles.activeIcon), ...(hoveredTab === 'calendar' && styles.hoverIcon) }} 
          onClick={() => handleTabClick('calendar')} 
          onMouseEnter={() => setHoveredTab('calendar')}
          onMouseLeave={() => setHoveredTab(null)}
        />
        <img 
          src={Squad} 
          alt="Squad" 
          style={{ ...styles.icon, ...(activeTab === 'squad' && styles.activeIcon), ...(hoveredTab === 'squad' && styles.hoverIcon) }} 
          onClick={() => handleTabClick('squad')} 
          onMouseEnter={() => setHoveredTab('squad')}
          onMouseLeave={() => setHoveredTab(null)}
          />
        <img 
          src={Coach} 
          alt="Coach" 
          style={{ ...styles.icon, ...(activeTab === 'coach' && styles.activeIcon), ...(hoveredTab === 'coach' && styles.hoverIcon) }}
          onClick={() => handleTabClick('coach')}
          onMouseEnter={() => setHoveredTab('coach')}
          onMouseLeave={() => setHoveredTab(null)}
        />
        <img 
          src={Message} 
          alt="Message" 
          style={{ ...styles.icon, ...(activeTab === 'message' && styles.activeIcon), ...(hoveredTab === 'message' && styles.hoverIcon) }}
          onClick={() => handleTabClick('message')}
          onMouseEnter={() => setHoveredTab('message')}
          onMouseLeave={() => setHoveredTab(null)}
        />
        <img 
          src={Settings} 
          alt="Settings" 
          style={{ ...styles.icon, ...(activeTab === 'settings' && styles.activeIcon), ...(hoveredTab === 'settings' && styles.hoverIcon) }}
          onClick={() => handleTabClick('settings')}
          onMouseEnter={() => setHoveredTab('settings')}
          onMouseLeave={() => setHoveredTab(null)}
        />
      </div>
      <img 
        src={Logout} 
        alt="Logout" 
        style={{ ...styles.logoutIcon, ...(hoveredTab === 'logout' && styles.hoverIcon), ...(activeTab === 'logout' && styles.activeIcon) }}
        onClick={() => setActiveTab('logout')}
        onMouseEnter={() => setHoveredTab('logout')}
        onMouseLeave={() => setHoveredTab(null)}
      />
    </div>
  );
};

export default Sidebar;
