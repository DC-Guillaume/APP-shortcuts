import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";
import CategoryScreen from "./src/screens/CategoryScreen";
import SoftwareScreen from "./src/screens/SoftwareScreen";
import AddShortcutScreen from "./src/screens/AddShortcutScreen";
import ShortcutScreen from "./src/screens/ShortcutScreen";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Accueil" }}
        />
        <Stack.Screen
          name="Category"
          component={CategoryScreen}
          options={{ title: "Recherche par Catégorie:" }}
          // options={({ route }) => ({ title: route.params.category.name })}
        />
        <Stack.Screen
          name="Software"
          component={SoftwareScreen}
          options={{ title: "Recherche par Logiciel:" }}
          // options={({ route }) => ({ title: route.params.category.name })}
        />
        <Stack.Screen
          name="Shortcuts"
          component={ShortcutScreen}
          options={{ title: "Détails du Shortcut:" }}
          // options={({ route }) => ({ title: route.params.category.name })}
        />
        <Stack.Screen
          name="Addshortcut"
          component={AddShortcutScreen}
          options={{ title: "Ajouter un Shortcut:" }}
          // options={({ route }) => ({ title: route.params.category.name })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
