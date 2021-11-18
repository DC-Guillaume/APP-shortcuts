import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require("../../assets/short2.png")}
          style={{ width: 300, height: 200, marginBottom: 100 }}
        />
        <Text style={styles.title}>Recherche par:</Text>
        <TouchableOpacity style={styles.searchContainer}>
          <Text
            style={styles.button}
            onPress={() => this.props.navigation.navigate("Category")}
          >
            Catégorie
          </Text>
          <Text
            style={styles.button}
            onPress={() => this.props.navigation.navigate("Software")}
          >
            Logiciel
          </Text>
        </TouchableOpacity>
        <Text style={styles.title}>Ou bien:</Text>
        <TouchableOpacity>
          <Text
            style={styles.button}
            onPress={() => this.props.navigation.navigate("AddShortcut")}
          >
            Add Shortcut
          </Text>
        </TouchableOpacity>
        {/* <Text>{process.env.API_URL}</Text> */}
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  searchContainer: {
    flexDirection: "row",
  },

  button: {
    textAlign: "center",
    backgroundColor: "#4e4e89",
    marginTop: 30,
    margin: 20,
    width: 150,
    padding: 30,
    borderRadius: 20,
    color: "white",
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
