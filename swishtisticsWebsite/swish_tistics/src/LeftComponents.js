// src/components/LeftComponents.js
import React from 'react';
import Scoreboard from './Scoreboard'
import Statistics from './Statistics'
import CoolChart from './CoolChart'

function LeftComponents( {statistics, period, currentScore, bestScore, shotsMissed} ) {
  return (
    <div className="container">
        <Scoreboard period={period} shotsMissed={shotsMissed}></Scoreboard>
        
        <div style={{ display:'flex'}}>
          <Statistics statistics={statistics}></Statistics>
          <CoolChart statistics={statistics}></CoolChart>
        </div>
    </div>
  );
}

export default LeftComponents;
