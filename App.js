/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from "react";
import { ViroARSceneNavigator } from "react-viro-goopy";

import HelloWorldScene from "./scene/HelloWorldSceneAR";
// import SceneTwo from "./scene/SceneTwo";

var sharedProps = {
  apiKey: "A657F0C6-7593-4A02-894B-CF5BD322F8AF",
};

const App = () => {
  return (
    <ViroARSceneNavigator
      apiKey={sharedProps}
      initialScene={{ scene: HelloWorldScene }}
    />
  );
};

export default App;
