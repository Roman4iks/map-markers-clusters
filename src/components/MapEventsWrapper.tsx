import { useMapEvents } from "react-leaflet";
import { addQuestToFirestore } from "../utils/questFunctions";
import { LeafletMouseEvent } from "leaflet";
import { findNextMarkerId } from "../utils/findNextMarkerId";

function MapEventsWrapper({ setMarkers, markers }: MapEventsWrapperProps) {
  const addMarker = async (e: LeafletMouseEvent) => {
    const { lat, lng } = e.latlng;
    const newMarkerId = findNextMarkerId(markers.map(marker => marker.id));
    const newMarker = { location: { lat, long: lng }, id: newMarkerId, timestamp: new Date() };
    try {
      await addQuestToFirestore(newMarker);
      setMarkers(prevMarkers => [...prevMarkers, newMarker]);
    } catch (error) {
      console.error("Error adding marker:", error);
    }
  };
  
  useMapEvents({
    click: (e) => {
      addMarker(e);
    },
  });

  return null;
}

export default MapEventsWrapper;
