import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState, Platform } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function AddShortcutScreen(props) {
  const [softwares, setSoftwares] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cat, setCat] = useState([]);
  const [soft, setSoft] = useState([]);
  const [windows, setWindows] = useState("");
  const [mac, setMac] = useState("");
  const [linux, setLinux] = useState("");
  const [context, setContext] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [img, setImg] = useState(null);

  useEffect(() => {
    fetch(process.env.API_URL + "categories")
      .then((response) => response.json())
      .then((data) => setCategories(data["hydra:member"]))
      .catch((error) => console.log(error));

    fetch(process.env.API_URL + "software")
      .then((response) => response.json())
      .then((data) => setSoftwares(data["hydra:member"]))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need permissions to make this work!");
        }
      }
    })();
  }, []);

  const categorieJsx = categories
    .sort((c1, c2) => c1.name.localeCompare(c2.name))
    .map((c) => <Picker.Item key={c.id} label={c.name} value={c["@id"]} />);

  const softwareJsx = softwares
    .sort((s1, s2) => s1.name.localeCompare(s2.name))
    .map((s) => <Picker.Item key={s.id} label={s.name} value={s["@id"]} />);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImg(result.uri);
    }
  };

  return (
    <ScrollView>
      <View>
        <Text style={styles.title}>Logiciel</Text>
        <View style={styles.pickerContainer}>
          <View style={{ borderRadius: 10, overflow: "hidden" }}>
            <Picker
              style={styles.picker}
              selectedValue={cat}
              onValueChange={(c) => {
                setCat(c);
              }}
            >
              {categorieJsx}
            </Picker>
          </View>
        </View>
        <Text style={styles.title}>Catégories</Text>
        <View style={styles.pickerContainer}>
          <View style={{ borderRadius: 10, overflow: "hidden" }}>
            <Picker
              style={styles.picker}
              selectedValue={soft}
              onValueChange={(s) => {
                setSoft(s);
              }}
            >
              {softwareJsx}
            </Picker>
          </View>
        </View>
      </View>
      <View style={styles.shortcutsContainer}>
        <View style={styles.contextContainer}>
          <TextInput
            style={styles.context}
            onChangeText={setTitle}
            value={title}
            placeholder="Title"
            keyboardType="default"
          />
        </View>
        <View style={styles.shortcutContainer}>
          <Text style={styles.shortcutTitle}>Windows</Text>
          <TextInput
            style={styles.input}
            onChangeText={setWindows}
            value={windows}
            placeholder="Windows Shortcut"
            keyboardType="default"
          />
        </View>
        <View style={styles.shortcutContainer}>
          <Text style={styles.shortcutTitle}>Mac</Text>
          <TextInput
            style={styles.input}
            onChangeText={setMac}
            value={mac}
            placeholder="Mac shortcut"
            keyboardType="default"
          />
        </View>
        <View style={styles.shortcutContainer}>
          <Text style={styles.shortcutTitle}>Linux</Text>
          <TextInput
            style={styles.input}
            onChangeText={setLinux}
            value={linux}
            placeholder="Linux shortcut"
            keyboardType="default"
          />
        </View>
        <View style={styles.contextContainer}>
          <TextInput
            style={styles.context}
            onChangeText={setContext}
            value={context}
            placeholder="Context"
            keyboardType="default"
          />
        </View>
        <View style={styles.descriptionContainer}>
          <TextInput
            style={styles.description}
            onChangeText={setDescription}
            value={description}
            placeholder="Description"
            keyboardType="default"
            multiline={true}
            numberOfLines={4}
            underlineColorAndroid="transparent"
            require={true}
          />
        </View>
        <View style={styles.shortcutImageContainer}>
          <Text style={styles.shortcutPickImage} onPress={pickImage}>
            Pick une Image
          </Text>
          {img && (
            <Image
              source={{ uri: img }}
              style={{
                borderRadius: 10,
                marginTop: 20,
                width: 250,
                height: 250,
              }}
            />
          )}
        </View>
        <Text
          style={styles.button}
          onPress={() => {
            fetch(process.env.API_URL + "media_objects")
              .then((response) => response.json())
              .then((data) => setImg(data["hydra:member"]))
              .catch((error) => console.log(error));

            const shortcut = {
              title: title,
              windows: windows,
              macos: mac,
              linux: linux,
              context: context,
              description: description,
              software: soft,
              categories: [cat],
              // image: ,
            };

            fetch(process.env.API_URL + "shortcuts", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(shortcut),
            })
              .then((response) => response.json())
              .then((data) => console.log(data))
              .catch((error) => console.error(error));
          }}
        >
          Ajouter un shortcut
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    margin: 20,
    marginLeft: 30,
    fontSize: 20,
    fontWeight: "bold",
  },

  pickerContainer: {
    display: "flex",
    alignItems: "center",
  },

  picker: {
    height: 40,
    width: 350,
    backgroundColor: "white",
  },

  shortcutsContainer: {
    display: "flex",
    alignItems: "center",
  },

  shortcutContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    height: 52,
    width: 350,
    borderRadius: 10,
    overflow: "hidden",
  },

  shortcutTitle: {
    width: 100,
    padding: 17,
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    backgroundColor: "#4e4e89",
  },

  input: {
    width: 250,
    height: 52,
    paddingLeft: 20,
    backgroundColor: "white",
    textAlignVertical: "center",
    color: "grey",
  },

  contextContainer: {
    display: "flex",
  },

  context: {
    backgroundColor: "white",
    width: 350,
    height: 50,
    marginTop: 20,
    borderRadius: 10,
    paddingLeft: 20,
  },

  description: {
    display: "flex",
    backgroundColor: "white",
    textAlignVertical: "top",
    width: 350,
    marginTop: 20,
    borderRadius: 10,
    paddingLeft: 20,
    paddingTop: 20,
    height: "auto",
  },
  button: {
    marginTop: 20,
    padding: 20,
    width: "auto",
    backgroundColor: "#4e4e89",
    borderRadius: 10,
    fontWeight: "bold",
    color: "white",
  },

  shortcutImageContainer: {
    display: "flex",
    alignItems: "center",
  },

  shortcutPickImage: {
    marginTop: 20,
    padding: 20,
    width: "auto",
    backgroundColor: "#4e4e89",
    borderRadius: 10,
    fontWeight: "bold",
    color: "white",
  },
});
