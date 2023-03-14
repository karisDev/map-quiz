import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import checkPng from "../assets/icons/check.png";
import markPng from "../assets/icons/mark.png";

function Map({ correctPosition, position, setPosition }) {
  function Events() {
    const map = useMapEvents({
      click: (e) => {
        setPosition(e.latlng);
      },
    });

    if (correctPosition && position) {
      const bounds = L.latLngBounds([correctPosition, position]);
      map.fitBounds(bounds);
    }
    if (!correctPosition && !position) {
      map.setView([37.8, -96], 4);
    }
  }

  return (
    <>
      <MapContainer className="map" center={[37.8, -96]} zoom={4}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Events />
        {position && (
          <Marker
            position={position}
            icon={
              new L.Icon({
                iconUrl: markPng,
                shadowUrl:
                  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
              })
            }
          >
            <Popup>Your guess</Popup>
          </Marker>
        )}
        {correctPosition && (
          <Marker
            position={correctPosition}
            icon={
              new L.Icon({
                iconUrl: checkPng,
                shadowUrl:
                  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
              })
            }
          >
            <Popup>Correct Location</Popup>
          </Marker>
        )}
        {position && correctPosition && (
          <Polyline
            pathOptions={{ weight: 3, color: "red" }}
            positions={[position, correctPosition]}
          />
        )}
      </MapContainer>
    </>
  );
}

export default Map;
