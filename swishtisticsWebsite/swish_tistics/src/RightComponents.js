// src/components/RightComponents.js
import React from 'react';
import Replay from './Replay'
import Performance from './Performance'
import './Dashboard.css'; // Import styles

function RightComponents({ performanceData }) {
  return (
    <div className="container">
        <Replay></Replay>
        <Performance performanceData={performanceData}></Performance>
    </div>
  );
}

export default RightComponents;
