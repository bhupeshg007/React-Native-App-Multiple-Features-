import { WebView } from "react-native-webview";
import React, { Component } from "react";
import { View} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

class WebViewComponent extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ display: "flex" }}>
          <MaterialCommunityIcons
            name="home-circle-outline"
            color="#1A1A40"
            size={30}
            onPress={() => this.props.navigation.goBack()}
          />
        </View>
        <WebView source={{ uri: `${this.props.route.params.url}` }} />
      </View>
    );
  }
}
export default WebViewComponent;
