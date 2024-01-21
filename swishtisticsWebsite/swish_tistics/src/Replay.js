// Replay.js
import React, {useState} from 'react';
import Phone from './Icons/phone.png';
import video1 from './Icons/videos/Vid1.mp4'  // Adjust these paths to your actual video files
import video2 from './Icons/videos/Vid2.mp4'
import video3 from './Icons/videos/Vid3.mp4'

// Define your styles in a JavaScript object
const styles = {
  replayContainer: {
    borderRadius: '10px',
    border: '2px solid #ffffff',
    borderRadius: '8px',
    boxShadow: '150px -150px 150px rgba(0, 0, 0, 0.05)',
    overflow: 'hidden',
    position: 'relative', // For positioning the "See All" button
    textAlign: 'center', // For centering the header text
    backgroundColor: '#DBE6F2', // Assuming a white background
    marginBottom: '10px',
    marginRight: '10px',
    marginLeft: '10px',
    paddingRight: '20px', // Add padding as needed
    paddingLeft: '20px', // Add padding as needed
    paddingBottom: '10px', // Add padding as needed
    paddingTop: '0px',
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
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 800,
  },
  replayScreen: {
    width: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  videoContainer: {
    position: 'absolute',
    top: '13%', // Adjust these values to position the video over the image
    left: '10%',
    right: '10%',
    bottom: '10%',
  },
  video: {
    width: '100%', // This will make the video responsive to the container size
    height: '105%',
    objectFit: 'fill',
  },
};

const Replay = () => {
  const videoSources = [
    video1,  // Adjust these paths to your actual video files
    video2,
    video3,
  ];

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const handleVideoEnd = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoSources.length);
  };

  return (
    <div style={styles.replayContainer}>
      <header style={styles.replayHeader}>
        <h2 style={{ fontSize: 20, color: '#323232' }}>Replay</h2>
        <button style={styles.seeAllButton}>See All</button>
      </header>
      <div style={styles.replayScreen}>
        <img src={Phone} style={{ width: '18vw', height: '600px' }} />
        <div style={styles.videoContainer}>
        <video
          style={styles.video}
          controls
          autoPlay
          muted
          loop={false} // Do not loop a single video since we're cycling through different videos
          onEnded={handleVideoEnd}
          key={currentVideoIndex} // Using the index as a key will force the video element to re-mount when it changes
        >
          <source src={videoSources[currentVideoIndex]} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
};

export default Replay;
