// CoolChart.js
import React from 'react';

import RadarChart from './RadarChart'

import Height from './Icons/StatsLogos/height.png';
import KneAngle from './Icons/StatsLogos/knee.png';
import ArmAngle from './Icons/StatsLogos/arm.png';
import BallSpeed from './Icons/StatsLogos/ball_speed.png';
import WristAngle from './Icons/StatsLogos/wrist.png';
import ReleaseAngle from './Icons/StatsLogos/release_angle.png';
import HeadAngle from './Icons/StatsLogos/head_angle.png';
import FollowThrough from './Icons/StatsLogos/follow_through.png';
import FeetPosition from './Icons/StatsLogos/feet_position.png';
import Spin from './Icons/StatsLogos/spin.png';

const styles = {
  swishtisticsContainer: {
    fontFamily: 'Inter, sans-serif', //Add the Inter font here
    backgroundColor: '#DBE6F2',
    border: '2px solid #ffffff',
    borderRadius: '8px',
    boxShadow: '20px -5px 25px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    paddingRight: '10px', // Add padding as needed
    paddingLeft: '10px', // Add padding as needed
    paddingBottom: '10px', // Add padding as needed
    margin: '20px',
    width: '26vw',
    height: '54vh',
    zindex: -1,
  },
  swishtisticsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  swishtisticsTable: {
    width: '100%',
    textAlign: 'left',
    borderCollapse: 'collapse',
  },
  TableText: {
    fontSize: 12,
    color: '#212121',
  },
  seeAllButton: {
    backgroundColor: '#DBE6F2',
    fontSize: 12,
    color: '#007bff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 800,
  },
  logoColumn: {
    width: '40px', // Set the width as needed
    paddingRight: '10px', // Add padding as needed
  },
  logoImage: {
    width: '75%', // Ensure the image takes up the full width of the container
  },
  statRow: {
    paddingBottom: '15px', // Adjust the value to increase or decrease the space between stats
    paddingTop: '15px',
    fontSize: '12px',
    color: '#3C3C3C',
    fontWeight: 525,
  },
};

const logoMap = {
  1: Height,
  2: KneAngle,
  3: ArmAngle,
  4: BallSpeed,
  5: WristAngle,
  6: ReleaseAngle,
  7: HeadAngle,
  8: FollowThrough,
  9: FeetPosition,
  10: Spin,
  // Add entries for other stats...
};

const CoolChart = ({ CoolChart }) => {
  return (
    <div style={styles.swishtisticsContainer}>
      <header style={styles.swishtisticsHeader}>
        <h2 style={{ fontSize: 20, color: '#323232' }}>Player Swish-tistics</h2>
        <button style={styles.seeAllButton}>See All</button>
      </header>
      <div style={{marginLeft: 10}}>
        <RadarChart style={{ display: 'flex', alignItems:'center', justifyContent: 'center' }}></RadarChart>
      </div>
    </div>
  );
}

export default CoolChart;