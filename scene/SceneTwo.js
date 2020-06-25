/* eslint-disable prettier/prettier */
"use strict";

import React, { Component } from "react";

import { StyleSheet } from "react-native";

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroBox,
  ViroMaterials,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight,
  ViroARPlaneSelector,
  ViroNode,
  ViroAnimations,
  ViroOrbitCamera,
  ViroCamera,
} from "react-viro-goopy";

export default class SceneTwo extends Component {
  constructor() {
    super();

    this.state = {
      text: "Initializing AR...",
    };

    this._onInitialized = this._onInitialized.bind(this);
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized}>
        <ViroOrbitCamera
          position={[0, 0, 0]}
          focalPoint={[0, 0, -1]}
          active={true}
        />
        <Viro3DObject
          source={require("./res/heart.obj")}
          position={[0, 0, -1]}
        />
      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text: "Hello World!",
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
    }
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: "Arial",
    fontSize: 30,
    color: "#ffffff",
    textAlignVertical: "center",
    textAlign: "center",
  },
});

ViroMaterials.createMaterials({
  grid: {
    diffuseTexture: require("../js/res/grid_bg.jpg"),
  },
});

ViroAnimations.registerAnimations({
  rotate: {
    properties: {
      rotateY: "+=90",
      scaleX: 0.5,
      scaleY: 0.5,
      scaleZ: 0.1,
      opacity: 0.7,
    },
    duration: 250, //.25 seconds
  },
  animateImage: {
    properties: { scaleX: 0.1, scaleY: 0.1, scaleZ: 0.1, opacity: 0.5 },
    easing: "Bounce",
    duration: 5000,
  },
});

module.exports = SceneTwo;
