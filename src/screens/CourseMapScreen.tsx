import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import BleService from '../services/ble/BleService';

MapboxGL.setAccessToken('<YOUR_MAPBOX_ACCESS_TOKEN>');

export default function CourseMapScreen() {
  const [userLocation, setUserLocation] = useState<[number,number]>([0,0]);
  const [ballLocations, setBallLocations] = useState<[number,number][]>([]);

  useEffect(() => {
    BleService.startScan((coords) => {
      setBallLocations((prev) => [...prev, coords]);
    });
  }, []);

  return (
    <View style={styles.container}>
      <MapboxGL.MapView style={styles.map}>
        <MapboxGL.Camera zoomLevel={14} centerCoordinate={userLocation} />
        {ballLocations.map((coord, idx) => (
          <MapboxGL.PointAnnotation
            key={idx.toString()}
            id={`ball-${idx}`}
            coordinate={coord}
          />
        ))}
      </MapboxGL.MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: '100%', height: '100%' },
});
