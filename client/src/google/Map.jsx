import React, { useEffect, useRef } from 'react';

function Map({ placeDetails }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    // Initialize map if it doesn't exist yet
    if (!mapInstanceRef.current && mapRef.current && window.google) {
      const defaultCenter = { lat: 0, lng: 0 };
      mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
        center: defaultCenter,
        zoom: 15
      });
    }

    // Update map when placeDetails changes
    if (mapInstanceRef.current && placeDetails && placeDetails.geometry) {
      const { location } = placeDetails.geometry;
      const position = { 
        lat: location.lat(), 
        lng: location.lng() 
      };

      // Update map center
      mapInstanceRef.current.setCenter(position);
      
      // Remove existing marker if any
      if (markerRef.current) {
        markerRef.current.setMap(null);
      }

      // Add new marker
      markerRef.current = new window.google.maps.Marker({
        position: position,
        map: mapInstanceRef.current,
        title: placeDetails.name
      });
    }
  }, [placeDetails]);

  return (
    <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
  );
}

export default Map;