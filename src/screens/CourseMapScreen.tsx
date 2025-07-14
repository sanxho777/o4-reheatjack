// src/screens/CourseMapScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import BleService from '../services/ble/BleService';

export default function CourseMapScreen() {
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [ballLocations, setBallLocations] = useState<{ latitude: number; longitude: number }[]>([]);

  useEffect(() => {
    BleService.startScan(([lon, lat]) => {
      setBallLocations((prev) => [...prev, { latitude: lat, longitude: lon }]);
    });
  }, []);

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={region} onRegionChangeComplete={setRegion}>
        {ballLocations.map((coord, idx) => (
          <Marker
            key={idx}
            coordinate={coord}
            title={`Ball ${idx + 1}`}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: '100%', height: '100%' },
});

