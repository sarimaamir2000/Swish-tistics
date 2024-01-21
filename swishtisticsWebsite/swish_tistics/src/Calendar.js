// src/components/Calendar.js
import React from 'react';
import CalendarPic from './Sidebar_Images/Calendar.jpg';

const Calendar = () => {
  return (
    <div>
      <h1>Calendar Page</h1>
      {/* Display the image using the img element */}
      <img src={CalendarPic} alt="Calendar" style={{ maxWidth: '100%', height: 'auto' }} />
    </div>
  );
}

export default Calendar;