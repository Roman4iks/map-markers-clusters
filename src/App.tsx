import { useLayoutEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import MarkerCluster from "./components/MarkerCluster";
import MapEventsWrapper from "./components/MapEventsWrapper";
import { fetchQuestsFromFirestore } from "./utils/fetchQuestsFromFirestore";

function App() {
  const [markers, setMarkers] = useState<Quest[]>([]);

  useLayoutEffect(() => {
    const fetchMarkers = async () => {
      const fetchedMarkers = await fetchQuestsFromFirestore();
      setMarkers(fetchedMarkers);
    };
    fetchMarkers();
  }, []);

  return (
    <div className="container">
      <MapContainer
        style={{ height: '100vh' }}
        center={[38.9637, 35.2433]}
        zoom={4}
        scrollWheelZoom={true}
      >
        <MapEventsWrapper markers={markers} setMarkers={setMarkers} />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerCluster markers={markers} setMarkers={setMarkers}/>
      </MapContainer>
    </div>
  );
}

export default App;
