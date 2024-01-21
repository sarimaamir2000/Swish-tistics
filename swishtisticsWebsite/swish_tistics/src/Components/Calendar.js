// Calendar.js
import React from 'react';
import CalendarImage from '../Screens/CalendarDesign.jpg';

const CalendarComponent = ({ }) => {
  return (
   <div>
    <img src={CalendarImage} alt="Calendar" style={{ maxWidth: '100%', height: 'auto' }} />
   </div>
  );
};

export default CalendarComponent;
