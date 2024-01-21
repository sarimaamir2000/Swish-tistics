// src/components/MainContent.js
import React from 'react';
import LeftComponents from './LeftComponents'
import RightComponents from './RightComponents'
import './Dashboard.css'; // Import styles

function Body( {performanceData, statistics, period, currentScore, bestScore, shotsMissed}) {

  // Add a style object for the container
  const containerStyle = {
    display: 'flex',
    flexDirection: 'row', // This will align LeftComponents and RightComponents side by side
    alignItems: 'flex-start', // This aligns children to the start of the cross axis
    justifyContent: 'flex-start', // This adds space between the two components
    height: '100%', // You might want to adjust the height as needed
    // padding: '2px' // Add padding as needed
  };

  return (
    <div className="container" style={containerStyle}>
      <LeftComponents statistics={statistics} period={period} currentScore={currentScore} bestScore={bestScore} shotsMissed={shotsMissed} />
      <RightComponents performanceData={performanceData} />
    </div>
  );
}

export default Body;