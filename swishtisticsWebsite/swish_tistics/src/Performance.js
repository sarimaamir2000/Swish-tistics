// Performance.js
import React from 'react';
import './Performance.css';

const styles = {
  performanceContainer: {
    backgroundColor: '#DBE6F2',
    borderRadius: '10px',
    border: '2px solid #ffffff',
    boxShadow: '50px -50px 150px rgba(0, 0, 0, 0.05)',
    overflow: 'hidden',
    position: 'relative', // For the ::after pseudo-element
    width: '18vw',
    marginBottom: '10px',
    marginRight: '10px',
    marginLeft: '10px',
    paddingTop: '0px',
    paddingBottom: '20px', // Add padding as needed
    paddingRight: '20px', // Add padding as needed
    paddingLeft: '20px', // Add padding as needed
  },
  performanceTitle: {
    color: '#333',
    fontSize: 12,
    fontWeight: 800,
  },
  barChart: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: '4vh', // Shet a fixed height for the chart
    overflow: 'hidden', // Hide bars that exceed the heigt
    borderLeft: '3px solid black',
    borderBottom: '3px solid black',
  },
  bar: {
    width: '10%', // Adjust based on the number of bars
    backgroundColor: '#007bff',
    margin: '0 2%', // Adjust the margin based on the number of bars
  },
  replayHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  seeAllButton: {
    backgroundColor: '#DBE6F2',
    fontSize: 12,
    color: '#007bff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 800,
  },
  xAxis: {
    content: '""',
    position: 'absolute',
    bottom: 18,
    left: 0,
    right: 0,
    height: '2px',
    backgroundColor: '#000',
  },
};


const Performance = ({ performanceData }) => {
  return (
    <div style={styles.performanceContainer}>
      <header style={styles.replayHeader}>
        <h2 style={{ fontSize: 20, color: '#323232' }}>Performance</h2>
        <button style={styles.seeAllButton}>See All</button>
      </header>
      <div style={styles.barChart}>
        {performanceData.map((value, index) => (
          <div
            key={index}
            style={{ ...styles.bar, height: `${value}%` }} // Combine bar style with dynamic height
          />
        ))}
        {/* Since ::after cannot be used inline, we use an extra element for the x-axis */}
        {/* <div style={styles.xAxis} /> */}
      </div>
    </div>
  );
};

export default Performance;
