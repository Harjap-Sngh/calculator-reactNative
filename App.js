import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { useState } from "react";

export default function App() {
  const [input, setInput] = useState("");

  let info = [
    "AC",
    "+/-",
    "%",
    "/",
    "7",
    "8",
    "9",
    "X",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "+",
    "0",
    ".",
    "=",
  ];

  return (
    <View style={styles.container}>
      <TextInput style={styles.screen} placeholder="0" />
      <FlatList
        style={styles.content}
        data={info}
        renderItem={({ item }) => <Text style={styles.text}>{item}</Text>}
        numColumns={4}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    paddingTop: 60,
  },
  content: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    width: "100%",
  },
  text: {
    fontSize: 30,
    textAlign: "center",
    padding: 20,
    margin: 5,
    width: 80,
    height: 80,
    backgroundColor: "lightgray",
    borderRadius: 10,
  },
  screen: {
    height: "250",
    width: "100%",
    backgroundColor: "gray",
    padding: 20,
    margin: 20,
  },
});
