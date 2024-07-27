import React, { useState, useRef } from 'react';

const Magnifier = ({ src }) => {
  const [zoomVisible, setZoomVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!imageRef.current) {
      return;
    }

    const bounds = imageRef.current.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;

    setPosition({ x, y });
  };

  return (
    <div style={{  cursor: 'crosshair' }}>
      <img
        ref={imageRef}
        src={src}
        alt="Zoom Target"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setZoomVisible(true)}
        onMouseLeave={() => setZoomVisible(false)}
        style={{ width: '100%', height: '600px', objectFit: 'cover' }}
      />
      {zoomVisible && (
        <div style={{
          position: 'absolute',
           // Adjust to place the zoom box correctly relative to the image
          top: '0',
          bottom: '10',
          right: '0',
          width: '50%',
          height: '82vh',  // Adjust height to match the aspect ratio if needed
          border: '1px solid black',
          overflow: 'hidden',
          backgroundImage: `url(${src})`,
          backgroundRepeat: 'no-repeat',

          // Ensure the background size is significantly larger to enable zooming
          backgroundSize: `${imageRef.current.width * 5}px ${imageRef.current.height *2.5}px`,
          // Calculate the exact position to avoid the image moving around
          backgroundPosition: `${-position.x * imageRef.current.width * 3 - 300}px ${-position.y * imageRef.current.height * 1 + 0}px `,
          // backgroundAttachment: "fixed",
          zIndex: "1",
          // background: "#fff"
        }} />
      )}
    </div>
  );
};

export default Magnifier;
