import React from "react";
// import GoogleMapReact from 'google-map-react';

// const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function SimpleMap(){
  // const defaultProps = {
  //   center: {
  //     lat: 10.99835602,
  //     lng: 77.01502627
  //   },
  //   zoom: 11
  // };

  return (
    // Important! Always set the container height explicitly
    <div>
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3804.781063788656!2d78.38047157601073!3d17.517961583391624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb8dffcb09c8c9%3A0xf127d5c6062db84b!2sNizampet%20Gram%20Panchayat%20Office!5e0!3m2!1sen!2sin!4v1714576964493!5m2!1sen!2sin" width="100%" height="450" style={{border: 0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>

      {/* <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={-3.745}
          lng={-38.523}
          text="My Marker"
        />
      </GoogleMapReact> */}
    </div>
  );
}