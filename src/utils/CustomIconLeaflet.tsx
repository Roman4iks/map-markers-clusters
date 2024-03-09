import L from "leaflet";

export const customIcon = new L.Icon({
    iconUrl: require('../location.svg').default,
    iconSize: new L.Point(40, 47),
  });
  
export const createClusterCustomIcon = function (cluster: any) {
    return L.divIcon({
      html: `<span>${cluster.getChildCount()}</span>`,
      className: 'custom-marker-cluster',
      iconSize: L.point(33, 33, true),
    });
  };