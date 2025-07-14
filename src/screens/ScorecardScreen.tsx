import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('jacktrack.db');

export default function ScorecardScreen() {
  const [hole, setHole] = useState('1');
  const [strokes, setStrokes] = useState('3');
  const [scores, setScores] = useState<{ hole: string; strokes: string }[]>([]);

  const saveScore = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'create table if not exists scores (id integer primary key not null, hole text, strokes text);'
      );
      tx.executeSql(
        'insert into scores (hole, strokes) values (?, ?);',
        [hole, strokes],
        () => loadScores()
      );
    });
  };

  const loadScores = () => {
    db.transaction((tx) => {
      tx.executeSql('select * from scores;', [], (_, { rows }) => {
        setScores(rows._array);
      });
    });
  };

  return (
    <View style={styles.container}>
      <Text>Hole:</Text>
      <TextInput
        style={styles.input}
        value={hole}
        onChangeText={setHole}
        keyboardType="number-pad"
      />
      <Text>Strokes:</Text>
      <TextInput
        style={styles.input}
        value={strokes}
        onChangeText={setStrokes}
        keyboardType="number-pad"
      />
      <Button title="Save" onPress={saveScore} />
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
  input: { borderWidth: 1, borderColor: '#ccc', marginBottom: 8, padding: 8 },
});
