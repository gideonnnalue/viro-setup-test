/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from "react";
import { ViroARSceneNavigator } from "react-viro-goopy";
import { Provider } from "react-redux";

// import HelloWorldScene from "./scene/HelloWorldSceneAR";
// import PantherScene from "./scene/PantherScene";
import FindBoxHelper from "./scene/FindBox/FindBoxHelper";
// import SceneTwo from "./scene/SceneTwo";

import store from "./store/store";

var sharedProps = {
  apiKey: "A657F0C6-7593-4A02-894B-CF5BD322F8AF",
};

const App = () => {
  return (
    <Provider store={store}>
      <FindBoxHelper />
    </Provider>
  );
};

export default App;

// <ViroARSceneNavigator
//   apiKey={sharedProps}
//   initialScene={{ scene: HelloWorldScene }}
// />
