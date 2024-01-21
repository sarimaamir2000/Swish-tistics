import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Body from './Body';

const Initial = ({ activeTab, setActiveTab, userName, performanceData, statistics, period, currentScore, bestScore, shotsMissed}) => {
    const mainContentStyle = {
      display: 'flex',        // Add this line to display children in a flex row
      flexDirection: 'row',   // Add this line to orient children in a row
      backgroundColor: '#DBE6F2',
      height: '100vh',        // Make main content fill the full viewport height
    };
  
    // This style will be applied to the container of Header and Body
    const contentStyle = {
      flex: 1,               // Take up the remaining space
      display: 'flex',       // Needed if you plan to further layout Header and Body with flex
      flexDirection: 'column' // Stack Header and Body vertically
    };  

    return(
        <div style={mainContentStyle}>
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab}/>
          <div style={contentStyle}>
            <Header userName={userName}/>
            <Body performanceData={performanceData} statistics={statistics} period={period} currentScore={currentScore} bestScore={bestScore} shotsMissed={shotsMissed}/>
          </div>
        </div>
      )
    }


export default Initial;