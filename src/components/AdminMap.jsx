import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import checkPng from "../assets/icons/check.png";
import markPng from "../assets/icons/mark.png";

// pointsToShow: {position, name: string}[]
const AdminMap = ({ pointsToShow, correctPoint }) => {
  console.log(pointsToShow, correctPoint);

  function Events() {
    const map = useMapEvents({});
  }

  return (
    <MapContainer className="map" center={[37.8, -96]} zoom={4}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {pointsToShow.map(
        (point, index) =>
          point.position && (
            <Marker
              key={index}
              position={point.position}
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
              <Popup>{point.name}</Popup>
            </Marker>
          )
      )}
      {correctPoint && (
        <Marker
          position={correctPoint}
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
          <Popup>Correct Point</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default AdminMap;
