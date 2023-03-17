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
const AdminMap = ({ points, correctPoint }) => {
  console.log(points, correctPoint);

  function Events() {
    const map = useMapEvents({
      click: (e) => {},
    });

    const allPoints = points.reduce((acc, point) => {
      if (point.position) {
        acc.push(point.position);
      }
      return acc;
    }, []);

    if (correctPoint) allPoints.push(correctPoint);

    console.log("allPoints", allPoints);
    if (allPoints.length > 0) map.fitBounds(allPoints);
    else map.setView([37.8, -96], 4);
  }

  return (
    <MapContainer className="map">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {points.map(
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
      <Events />
    </MapContainer>
  );
};

export default AdminMap;
