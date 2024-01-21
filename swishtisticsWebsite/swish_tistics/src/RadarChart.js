import React from 'react';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Radar } from 'react-chartjs-2';
  
  ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
  );

const RadarChart = () => {
  const data = {
    labels: [
      'USG%',
      '2P%',
      '3P%',
      'FT%',
      'eFG%',
      'TS%',
      '3PA',
      'AST%',
      'TRB%',
      'BLK%',
      'TOV%',
      'FG%',
    ],
    datasets: [
      {
        label: 'Player Stats',
        backgroundColor: 'rgba(242, 231, 219, 0.5)', // Translucent fill color
        borderColor: 'rgba(242, 231, 219, 1)', // Border color
        pointBackgroundColor: 'rgba(255, 99, 132, 1)', // Color of the point
        data: [0.8, 0.72, 0.54, 0.46, 0.48, 0.9, 0.72, 0.54, 0.56, 0.58, 0.9, 0.62], // Your data points
      },
      {
        label: 'LeBron James',
        backgroundColor: 'rgba(254, 227, 0, 0.5)', // Translucent fill color
        borderColor: 'rgba(254, 227, 0, 1)', // Border color
        pointBackgroundColor: 'rgba(255, 99, 132, 1)', // Color of the point
        data: [0.9, 0.72, 0.74, 0.87, 0.68, 0.9, 0.62, 0.9, 0.66, 0.88, 0.65, 0.72], // Your data points
      },
      {
        label: 'Stephen Curry',
        backgroundColor: 'rgba(29,66,138, 0.5)', // Translucent fill color
        borderColor: 'rgba(29, 66, 138, 1)', // Border color
        pointBackgroundColor: 'rgba(255, 99, 132, 1)', // Color of the point
        data: [0.9, 0.72, 0.84, 0.76, 0.88, 0.9, 0.72, 0.74, 0.86, 0.88, 0.9, 0.72], // Your data points
      },
    ],
  };

  const options = {
    scale: {
      ticks: { beginAtZero: true },
    },
  };

  return <Radar style={{ display: 'flex', alignItems:'center', justifyContent: 'center'}} data={data} options={options} />;
};

export default RadarChart;
