import { useEffect, useRef } from 'react';
import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps';

export function MapPolygon({ paths, options }: { paths: { lat: number, lng: number }[], options?: any }) {
  const map = useMap();
  const polygonRef = useRef<any>(null);
  const coreLib = useMapsLibrary('core');
  const mapsLib = useMapsLibrary('maps');

  useEffect(() => {
    if (!map || !mapsLib) return;
    
    if (window.google && window.google.maps && window.google.maps.Polygon) {
      if (!polygonRef.current) {
        polygonRef.current = new window.google.maps.Polygon({
          paths,
          ...options,
          map,
        });
      } else {
        polygonRef.current.setPaths(paths);
        polygonRef.current.setOptions({ ...options, map });
      }
    }
  }, [map, paths, options, mapsLib, coreLib]);

  useEffect(() => {
    return () => {
      if (polygonRef.current) {
        polygonRef.current.setMap(null);
      }
    };
  }, []);

  return null;
}
