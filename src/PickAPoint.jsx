import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  Polygon,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

function PickAPoint() {
  function Events() {
    const [position, setPosition] = useState(null);

    const map = useMapEvents({
      click: (e) => {
        setPosition(e.latlng);
      },
    });

    return position == null ? null : (
      <Marker position={position}>
        <Popup>You clicked here!</Popup>
      </Marker>
    );
  }

  function handleMapClick(e) {
    setPosition(e.latlng);
  }

  const onMapInit = (e) => {
    console.log(e.onClick);
    console.log(e.click);
    console.log(e.onclick);
  };

  return (
    <MapContainer
      style={{
        height: "100%",
      }}
      whenReady={onMapInit}
      center={[34.0522, -118.2437]}
      zoom={10}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Events />
      {/* {position && (
        <Marker position={position}>
          <Popup>You clicked here!</Popup>
        </Marker>
      )} */}
    </MapContainer>
  );
}

export default PickAPoint;
