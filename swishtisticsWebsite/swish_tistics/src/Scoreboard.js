// Scoreboard.js
import React, { useState, useEffect } from 'react';

// Define your styles in a JavaScript object
const styles = {
  scoreboard: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#DBE6F2',
    borderRadius: '10px',
    border: '2px solid #ffffff',
    boxShadow: '300px 125px 150px rgba(0, 0, 0, 0.05)',
    overflow: 'hidden',
    borderRadius: '8px',
    padding: '5px',
    marginBottom: '10px',
    marginRight: '10px',
    marginLeft: '10px',
    width: '70vw',
    height: '14vw'
  },
  scoreSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  scoreTitle: {
    fontSize: '4rem',
    color: '#000000',
    marginBottom: '30px',
  },
  scoreValue: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#007bff',
    border: '2px solid #007bff',
    borderRadius: '5px',
    padding: '10px',
  },
  scoreMain: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between', // Add this to create space between items
  },
  scoreTime: {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: '#333',
    cursor: 'pointer',
    marginBottom: '120px',
    marginRight: '50px'
  },
  period: {
    display: 'flex',
    color: '#000000',
    alignItems: 'center',
    marginTop: '100px',
    
  },
  shotsMissed: {
    display: 'flex',
    color: '#000000',
    alignItems: 'center',
    marginTop: '100px',
    
  },
  periodLabel: {
    fontSize: '1rem',
    color: '#333',
    margin: '0 10px 0 0',
  },
  periodValue: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#007bff',
    border: '2px solid #007bff',
    borderRadius: '5px',
    padding: '5px',
    paddingRight: '9px',
    paddingLeft: '9px',
    marginLeft: '15px',
    marginRight: '15px',
  },
};

const Scoreboard = () => {
  const [timer, setTimer] = useState(null);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let intervalId;

    if (running && timer > 0) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [running, timer]);

  const startStopTimer = () => {
    if (!running) {
      setTimer(180); // Set initial time in seconds (3 minutes)
    }

    setRunning(!running);
  };

  return (
    <div style={styles.scoreboard}>
      <div style={styles.scoreSection}>
        <div style={styles.scoreTitle}>CURRENT</div>
        <div style={styles.scoreValue}>00</div>
      </div>

      <div style={styles.scoreMain}>
        <div style={styles.period}>
          <div style={styles.periodLabel}>Period</div>
          <div style={styles.periodValue}>1</div> {/* Assuming a period value of 1 */}
          <div style={styles.periodLabel}>Shots Missed</div>
          <div style={styles.periodValue}>0</div> {/* Assuming shots missed value of 0 */}
        </div>
        <div style={styles.scoreTime} onClick={startStopTimer}>
          {timer !== null ? `${Math.floor(timer / 60)}:${(timer % 60).toString().padStart(2, '0')}` : '3:00'}
        </div>
      </div>

      <div style={styles.scoreSection}>
        <div style={styles.scoreTitle}>BEST</div>
        <div style={styles.scoreValue}>00</div>
      </div>
    </div>
  );
};

export default Scoreboard;

