"use strict";

import React from "react";
import { connect } from "react-redux";
import FireworkEmitter from "../../assets/FireWorkEmitter";
import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroBox,
  ViroAnimations,
  ViroMaterials,
} from "react-viro-goopy";
import {
  getCameraPosition,
  hasArBeenInitialized,
} from "../../reducer/actionARCreator";

var createReactClass = require("create-react-class");

var interval = null;
var interval2 = null;
var interval3 = null;

var FindBox = createReactClass({
  // This is the same as state = { }
  getInitialState: function () {
    return {
      clicked: false,
      getCamPos: true,
      boxRare: "",
      runFirework: false,
      hasARInitialized: false,
      boxAnimationName: "justBox",
      text: "Wait a moment...",
    };
  },

  componentWillUnmount() {
    clearInterval(interval);
    clearInterval(interval2);
    clearInterval(interval3);
  },

  trackingUpdated(state, reason) {
    // Condition required by viro-react to let package to track AR objects
    if (
      !this.state.hasARInitialized &&
      state == ViroConstants.TRACKING_NORMAL
    ) {
      this.setState({ hasARInitialized: true, text: "Find the box" }, () => {
        interval3 = setTimeout(() => {
          this.setState({ text: "" });
        }, 1000);
      });
      this.props.hasArBeenInitialized(true);
    } else if (state == ViroConstants.TRACKING_NONE) {
    }
  },
  // The function that keeps track of the coordinates of the camera.
  // Function updates the coordinates via redux. The corrdinates are used in ARExperienceSelector
  cameraTransformUpdate(event) {
    this.props.getCameraPosition(
      event.cameraTransform.position,
      event.cameraTransform.rotation,
      event.cameraTransform.forward
    );
  },

  // The function that aloows to make box clickable.
  // The functions changes the animation of the box to openBox,
  // then the function calls update inventory
  onBoxClick(coordinates, boxType) {
    // const box = this.props.sceneNavigator.viroAppProps.box;

    // This updates the value of initialization of AR
    // The varaible helps to render the arrows in ARexperienceselector
    // once AR has been initialized.
    this.props.hasArBeenInitialized(false);

    if (!this.state.clicked) {
      // Set the animation of opening a box
      this.setState({ boxAnimationName: "openBox", clicked: true }, () => {
        // Wait a second, then run the animation of fireworks
        interval = setTimeout(() => {
          this.setState({ runFirework: true }, () => {
            // Wait two seconds to let firework finish, then
            // remove a box and update inventory, thne show model (in ARExpereince page)
            // to see what a user has found
            // interval2 = setTimeout(() =>
            // {
            //     // this.props.removeBox(this.props.reduxBoxes, coordinates);
            //     this.props.updateMap(true, box);
            //     this.updateInventory(box);
            // }, 1200);
          });
        }, 800);
      });
    }
  },

  render() {
    // Box type can be: wood, silver, gold
    // let boxType = this.props.sceneNavigator.viroAppProps.newProp;
    let boxType = "wood";

    return (
      <ViroARScene
        onTrackingUpdated={this.trackingUpdated}
        onCameraTransformUpdate={this.cameraTransformUpdate}
      >
        <ViroText
          extrusionDepth={8}
          scale={[0.5, 0.5, 0.5]}
          position={[0, 0, -1]}
          text={this.state.text}
          textLineBreakMode="Justify"
          textClipMode="ClipToBounds"
          style={styles.helloWorldTextStyle}
          outerStroke={{ type: "DropShadow", width: 2, color: "#444444" }}
        />

        {this.state.hasARInitialized ? (
          <ViroBox
            scale={[0.3, 0.3, 0.3]}
            position={this.props.sceneNavigator.viroAppProps.randPos}
            onClickState={() =>
              this.onBoxClick(
                this.props.sceneNavigator.viroAppProps.coordinates,
                boxType
              )
            }
            materials={
              boxType.includes("1")
                ? ["wood"]
                : boxType.includes("2")
                ? ["silver"]
                : ["gold"]
            }
            animation={{
              name: this.state.boxAnimationName,
              run: true,
              loop: true,
            }}
          />
        ) : null}

        {this.state.hasARInitialized ? (
          <FireworkEmitter
            explosionSize={6.0}
            explosionDelay={500}
            endColor={["#00FF00"]}
            startColor={["#FF6347"]}
            run={this.state.runFirework}
            explosionLocation={this.props.sceneNavigator.viroAppProps.randPos}
          />
        ) : null}
      </ViroARScene>
    );
  },
});

const styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: "Arial",
    fontSize: 30,
    color: "#ffffff",
    textAlignVertical: "center",
    textAlign: "center",
  },
  modalStyle: {
    height: hp(60),
    width: wp(80),
    backgroundColor: "#ffffff",
    borderRadius: 10,
    justifyContent: "space-around",
    paddingVertical: 20,
  },
});

// // Images for AR objects
ViroMaterials.createMaterials({
  wood: {
    diffuseTexture: require("../../assets/png/WoodenBoxAnimation.png"),
  },
  silver: {
    diffuseTexture: require("../../assets/png/SilverBoxAnimation.png"),
  },
  gold: {
    diffuseTexture: require("../../assets/png/GoldenBoxAnimation.png"),
  },
});

// Animations of AR objects
ViroAnimations.registerAnimations({
  rotate: {
    properties: {
      rotateY: "+=90",
    },
    duration: 900,
  },
  moveUp: {
    properties: {
      positionY: "+=0.1",
    },
    duration: 400,
    easing: "EaseOut",
  },
  moveDown: {
    properties: {
      positionY: "-=0.1",
    },
    duration: 400,
    easing: "EaseOut",
  },
  Grow: {
    properties: {
      scaleX: "+=0.3",
      scaleY: "+=0.3",
      scaleZ: "+=0.3",
    },
    duration: 500,
  },
  Disappear: {
    properties: {
      opacity: 0,
    },
    duration: 1,
  },
  openBox: [["Grow", "Disappear"]],
  justBox: [["rotate"], ["moveUp", "moveDown"]],
});

// const mapStateToProps = ({ mapReducer: {boxes, messageToRender, showModal}}) =>
// {
//     return {
//         reduxBoxes: boxes,
//         inventory,
//         messageToRender,
//         showModal
//     };
// };

export default connect(null, { getCameraPosition, hasArBeenInitialized })(
  FindBox
);
