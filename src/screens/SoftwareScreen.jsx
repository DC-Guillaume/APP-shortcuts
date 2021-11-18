import React, { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";

export default function SoftwareScreen(props) {
  const [softwares, setSoftwares] = useState([]);
  const [selectedSoftware, setSelectedSoftware] = useState([]);
  const [shortcuts, setShortcuts] = useState([]);

  useEffect(() => {
    fetch(process.env.API_URL + "software")
      .then((response) => response.json())
      .then((data) => setSoftwares(data["hydra:member"]))
      .catch((error) => console.log(error));
  }, []);

  const softwareJsx = softwares
    .sort((c1, c2) => c1.name.localeCompare(c2.name))
    .map((c) => <Picker.Item key={c.id} label={c.name} value={c.id} />);

  const shortcutsJsx = shortcuts.map((s) => (
    <TouchableOpacity
      key={s.id}
      style={styles.card}
      onPress={() => props.navigation.navigate("Shortcuts", { shortcut: s })}
    >
      <Text style={styles.titleCard}>{s.title}</Text>
      <Text style={styles.btnSoftware}>{s.software.name}</Text>
      <View style={styles.categoriesContainer}>
        {s.categories.map((c) => (
          <Text key={c.id} style={styles.btnCategory}>
            {c.name}
          </Text>
        ))}
      </View>
    </TouchableOpacity>
  ));

  return (
    <View style={styles.container}>
      <ScrollView>
        <Picker
          selectedValue={selectedSoftware}
          style={{ height: 50, width: 150 }}
          onValueChange={function (c) {
            fetch(process.env.API_URL + "shortcuts?software.id=" + c)
              .then((response) => response.json())
              .then((data) => setShortcuts(data["hydra:member"]))
              .catch((error) => console.log(error));
            setSelectedSoftware(c);
          }}
        >
          {softwareJsx}
        </Picker>
        {shortcutsJsx}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    padding: 5,
    borderWidth: 2,
    borderColor: "#4e4e89",
    backgroundColor: "#fff",
    marginBottom: 10,
  },

  container: {
    display: "flex",
    flex: 1,
    marginStart: 20,
    marginEnd: 20,
  },

  titleCard: {
    fontSize: 20,
    fontWeight: "bold",
  },

  btnSoftware: {
    textAlign: "center",
    borderRadius: 10,
    padding: 10,
    width: 100,
    backgroundColor: "#4e4e89",
    color: "white",
    fontWeight: "bold",
    margin: 5,
    fontSize: 10,
  },

  btnCategory: {
    textAlign: "center",
    borderRadius: 10,
    padding: 10,
    width: 100,
    backgroundColor: "#ffffc9",
    color: "black",
    fontWeight: "bold",
    margin: 5,
    fontSize: 10,
  },

  categoriesContainer: {
    display: "flex",
    flexDirection: "row",
  },
});
