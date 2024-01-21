// src/components/MainContent.js
import React, {useEffect, useState} from 'react';
import Sidebar from './Sidebar'; // Import the Sidebar component
import Initial from './Initial'
import Calendar from './Components/Calendar';
import Squad from './Components/Squad';
import Coach from './Components/Coach';
import Message from './Components/Message';
import Settings from './Components/Settings';
  

function Dashboard() {
  const userName = 'Sheik Md. Muraf'
  const period = 2;
  const shotsMissed = 69;
  const currentScore = 23;
  const bestScore = 42;
  
  const [performanceData, setPerformanceData] = useState([60,40,66,25,10,64,40,62]);
  const [statistics, setStatistics] = useState([
    { id: '1', stat: 'Height', totalAverage: '154cm', previousAverage: 'Value2', trend: 'Trend1', position: 'Position1' },
    { id: '2', stat: 'Knee Angle', totalAverage: '50', previousAverage: 'Value4', trend: 'Trend2', position: 'Position2' },
    { id: '3', stat: 'Arm Angle', totalAverage: '42', previousAverage: 'Value2', trend: 'Trend1', position: 'Position1' },
    { id: '4', stat: 'Ball Speed', totalAverage: 'Value3', previousAverage: 'Value4', trend: 'Trend2', position: 'Position2' },
    { id: '5', stat: 'Wrist Angle', totalAverage: 'Value1', previousAverage: 'Value2', trend: 'Trend1', position: 'Position1' },
    { id: '6', stat: 'Release Angle', totalAverage: 'Value3', previousAverage: 'Value4', trend: 'Trend2', position: 'Position2' },
    { id: '7', stat: 'Head Angle', totalAverage: 'Value1', previousAverage: 'Value2', trend: 'Trend1', position: 'Position1' },
    { id: '8', stat: 'Follow Through', totalAverage: 'Value3', previousAverage: 'Value4', trend: 'Trend2', position: 'Position2' },
    { id: '9', stat: 'Feet Position', totalAverage: 'Value1', previousAverage: 'Value2', trend: 'Trend1', position: 'Position1' },
    { id: '10', stat: 'Spin', totalAverage: 'Value3', previousAverage: 'Value4', trend: 'Trend2', position: 'Position2' },
  ]);
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Initial 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          userName={userName} 
          performanceData={performanceData} 
          statistics={statistics} 
          period={period} 
          currentScore={currentScore} 
          bestScore={bestScore} 
          shotsMissed={shotsMissed}
          />;
      case 'calendar':
        return <Calendar />;
      case 'squad':
        return <Squad />;
      case 'coach':
        return <Coach />;
      case 'message':
        return <Message />;
      case 'settings':
        return <Settings />;
      default:
        return <Initial />; // Or any other default component
    }
  };

  // This effect will run on component mount and set up an interval to update statistics
  useEffect(() => {
    const intervalId = setInterval(() => {
      // Simulate reading new statistics data from a file and updating the state
      // Since we don't have file reading capability on the frontend,
      // we'll simulate with random data updates for this example
      setPerformanceData(currentData => 
        currentData.map((value, index) => 
          index === 7 ? Math.max(0, value + Math.floor(Math.random() * 21) - 10) : value
        )
      );
      setStatistics(currentStats => currentStats.map(stat => ({
        ...stat,
        totalAverage: Math.floor(Math.random() * 100) + 'cm', // Randomize for demonstration
        previousAverage: Math.floor(Math.random() * 100) + 'cm', // Randomize for demonstration
        trend: Math.floor(Math.random() * 3) + 'cm', // Randomize for demonstration
        position: Math.floor(Math.random() * 5) + 'st', // Randomize for demonstration
        // Update other fields as necessary
      })));
    }, 1000); // Update every second

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <div>
        {renderActiveTab()}
      </div>  
    </div>
  );
}

export default Dashboard;
