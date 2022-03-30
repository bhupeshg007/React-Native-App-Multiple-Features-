import { View } from "native-base";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import FetchNews from "./src/screens/FetchNews";
import WebViewComponent from "./src/screens/WebView";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="FetchNews"
        screenOptions={{
          presentation: "modal",
          headerShown: false,
          gestureEnabled: true,
          cardOverlayEnabled: true,
          ...TransitionPresets.ModalPresentationIOS,
        }}
      >
        <Stack.Screen name="FetchNews" component={FetchNews} />
        <Stack.Screen
          name="WebView"
          component={WebViewComponent}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
