import { Marker, Popup } from "react-leaflet";
import { deleteQuestFromFirestore, updateMarkerPositionInFirestore } from "../utils/questFunctions";
import { customIcon } from "../utils/CustomIconLeaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

function MarkerCluster({ markers, setMarkers }: MarkerClusterProps) {
  const removeMarker = async (id: number) => {
    try {
      await deleteQuestFromFirestore(id);
      setMarkers(markers.filter((marker) => marker.id !== id));
    } catch (error) {
      console.error("Error removing marker:", error);
    }
  };

  const onMarkerDragEnd = (id: number, e: L.DragEndEvent) => {
    const { lat, lng } = e.target.getLatLng();
    const updatedMarkers = markers.map((marker) => {
      if (marker.id === id) {
        updateMarkerPositionInFirestore(id, { lat, long: lng });
        return { ...marker, location: { lat, long: lng } };
      }
      return marker;
    });
    setMarkers(updatedMarkers);
  };

  return (
    <MarkerClusterGroup>
 {markers.map((marker: Quest) => (
        <Marker
          key={marker.id}
          position={[marker.location.lat, marker.location.long]}
          icon={customIcon}
          draggable={true}
          eventHandlers={{
            dragend: (e) => onMarkerDragEnd(marker.id, e),
          }}
        >
          <Popup>
            <div>
              Marker ID: {marker.id}
              <br />
              <button onClick={(e) => { e.stopPropagation(); removeMarker(marker.id); }}>Delete</button>
              <br />
              <p>Timestamp: {marker.timestamp.toString()}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MarkerClusterGroup>
  );
}

export default MarkerCluster;
