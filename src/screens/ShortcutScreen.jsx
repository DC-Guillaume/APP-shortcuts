import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function ShortcutScreen(props) {
  const { shortcut } = props.route.params;

  const shortcutCategorieJsx = shortcut.categories.map((c) => (
    <Text key={c.id} style={styles.btnCategory}>
      {c.name}
    </Text>
  ));

  {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{shortcut.title}</Text>
        <Text style={styles.btnSoftware}>{shortcut.software.name}</Text>
        <View style={styles.categoriesContainer}>{shortcutCategorieJsx}</View>
        <View style={styles.containerSubTitle}>
          <Text style={styles.subTitle}>Windows:</Text>
          <Text style={styles.subTitleShortcut}>{shortcut.windows}</Text>
        </View>
        <View style={styles.containerSubTitle}>
          <Text style={styles.subTitle}>MacOs:</Text>
          <Text style={styles.subTitleShortcut}>{shortcut.macos}</Text>
        </View>
        <View style={styles.containerSubTitle}>
          <Text style={styles.subTitle}>Linux:</Text>
          <Text style={styles.subTitleShortcut}>{shortcut.linux}</Text>
        </View>
        <View style={styles.containerContext}>
          <Text style={styles.titleContext}>Context:</Text>
          <Text style={styles.context}>{shortcut.context}</Text>
        </View>
        <View style={styles.containerContext}>
          <Text style={styles.titleContext}>Description:</Text>
          <Text style={styles.context}>{shortcut.description}</Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
  },

  title: {
    marginTop: 20,
    fontSize: 25,
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
    marginTop: 20,
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
    margin: 10,
    marginBottom: 10,
    fontSize: 10,
  },

  categoriesContainer: {
    display: "flex",
    flexDirection: "row",
  },

  containerSubTitle: {
    width: 300,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    fontSize: 20,
  },

  subTitle: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
  },

  subTitleShortcut: {
    fontSize: 20,
    display: "flex",
    alignItems: "center",
  },

  containerContext: {
    width: 300,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    fontSize: 20,
  },

  titleContext: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 10,
  },

  context: {
    fontSize: 20,
    marginBottom: 20,
    paddingLeft: 15,
  },
});
