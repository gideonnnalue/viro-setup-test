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
} from "react-viro-goopy";

export default class HelloWorldSceneAR extends Component {
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
        <ViroText
          text={this.state.text}
          scale={[0.5, 0.5, 0.5]}
          position={[0, 0, -1]}
          style={styles.helloWorldTextStyle}
        />
        <ViroBox
          position={[0, -0.5, -1]}
          scale={[0.3, 0.3, 0.1]}
          materials={["grid"]}
          animation={{ name: "rotate", run: true, loop: true }}
        />

        <ViroOrbitCamera position={[0, 0, -0]} focalPoint={[0, 0, -1.15]} />
        <ViroSpotLight
          position={[0, -0.25, 0]}
          color="#777777"
          direction={[0, 0, -1]}
          attenuationStartDistance={5}
          attenuationEndDistance={10}
          innerAngle={5}
          outerAngle={20}
        />
        <ViroAmbientLight color={"#aaaaaa"} />

        <ViroNode
          position={[0, -1, 0]}
          dragType="FixedToWorld"
          onDrag={() => {}}
        >
          <Viro3DObject
            source={require("../js/res/VRXFormats/Spider.vrx")}
            resources={[
              require("../js/res/VRXFormats/textures/haar-detail-NRM.jpg"),
              require("../js/res/VRXFormats/textures/SH3.png"),
              require("../js/res/VRXFormats/textures/Spinnen-Bein-tex.jpg"),
              require("../js/res/VRXFormats/textures/Spinnen-Bein-tex-COLOR.jpg"),
              require("../js/res/VRXFormats/textures/Spinnen-Bein-tex-COLOR.png"),
            ]}
            position={[0, 0, -1]}
            scale={[0.1, 0.1, 0.1]}
            type="VRX"
          />
        </ViroNode>
        {/* <ViroNode
          position={[0, -1, 0]}
          dragType="FixedToWorld"
          onDrag={() => {}}
        >
          <Viro3DObject
            source={require("../js/res/low-poly-fox-by-pixelmannen-obj/low-poly-fox-by-pixelmannen.obj")}
            resources={[
              require("../js/res/low-poly-fox-by-pixelmannen-obj/low-poly-fox-by-pixelmannen.mtl"),
              require("../js/res/low-poly-fox-by-pixelmannen-obj/texture.png"),
            ]}
            position={[0, 0, -1]}
            scale={[0.1, 0.1, 0.1]}
            type="OBJ"
          />
        </ViroNode> */}
        {/* <ViroNode
          position={[0, -1, 0]}
          dragType="FixedToWorld"
          onDrag={() => {}}>
          <Viro3DObject
            source={require('../js/res/emoji_smile/emoji_smile.vrx')}
            resources={[
              require('../js/res/emoji_smile/emoji_smile_diffuse.png'),
              require('../js/res/emoji_smile/emoji_smile_normal.png'),
              require('../js/res/emoji_smile/emoji_smile_specular.png'),
            ]}
            position={[0, 0.5, 0]}
            scale={[0.2, 0.2, 0.2]}
            type="VRX"
          />
        </ViroNode> */}
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

module.exports = HelloWorldSceneAR;
