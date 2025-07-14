import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('jacktrack.db');

export default function HistoryScreen() {
  const [scores, setScores] = useState<{ hole: string; strokes: string }[]>([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql('select * from scores;', [], (_, { rows }) => {
        setScores(rows._array);
      });
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text>Past Scores:</Text>
      <FlatList
        data={scores}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => <Text>Hole {item.hole}: {item.strokes}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
});
