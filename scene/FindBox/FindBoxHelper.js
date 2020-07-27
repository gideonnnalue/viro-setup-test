import FindBox from "./FindBox";
import { connect } from "react-redux";
import React, { Component, Fragment } from "react";
import { ViroARSceneNavigator } from "react-viro-goopy";
// import { HeaderBackButton } from '@react-navigation/stack';
import {
  View,
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  BackHandler,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { hasArBeenInitialized } from "../../reducer/actionARCreator";

const { height } = Dimensions.get("window");

// Required API key to use AR functionalities
var sharedProps = {
  apiKey: "A657F0C6-7593-4A02-894B-CF5BD322F8AF",
};

// An array that hold x, y, z positions of the box
let randBoxPos = [];
let boxX = 0;
let boxY = 0;
let boxZ = 0;

let backHandler = null;
let pressedBack = false;
let pressedOk = false;

// SVG images
import LeftArrow from "../../assets/LeftArrow";
import RightArrow from "../../assets/RightArrow";

class FindBoxHelper extends Component {
  constructor(props) {
    super(props);

    // A boolean that says to render back arrow
    this.backArrow = true;

    // A boolean that says to render right arrow
    this.right = false;

    // A boolean that says to render left arrow
    this.left = false;

    // A boolean that says that do not change right arrow (true value)
    this.stillRight = false;

    // A boolean that says that do not change left arrow (true value)
    this.stillLeft = false;

    this.state = {
      showLeft: true,
      showRight: true,
      sharedProps: sharedProps,
    };
  }

  componentDidMount = () => {
    pressedBack = false;
    pressedOk = false;

    // this.props.navigation.setOptions({
    //     headerLeft: () =>
    //     {
    //         return(
    //             <HeaderBackButton
    //                 titleLayout={{ zIndex: 10 }}
    //                 tintColor={styling.palette.red}
    //                 onPress={() =>
    //                 {
    //                     if(!pressedBack)
    //                     {
    //                         pressedBack = true;
    //                         this.props.navigation.pop();
    //                     }
    //                 }}
    //             />
    //         );
    //     }
    // });

    backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      if (!pressedBack) {
        pressedBack = true;
        this.props.navigation.pop();
      }

      return true;
    });

    this.props.hasArBeenInitialized(true);

    // Build random coordinates for boxes
    // let x = Math.floor(Math.random() * 5) + 1;
    // x = x * (Math.random() < 0.5 ? -1 : 1);

    // let y = Math.floor(Math.random() * 1) + 1;
    // y = y * (Math.random() < 0.5 ? -1 : 1);

    // We place boxes only negative z hemisphere, Android for now causes issues
    // in positive hemisphere
    // let randVal = Math.random();
    // let z = randVal <= 0.5 ? 1 : -1;
    // let z = -1;
    let x = -4;
    let y = -1;
    let z = 5;

    randBoxPos.push(x);
    randBoxPos.push(y);
    randBoxPos.push(z);

    // We build vectors out of boxe's location. Vectors help to point to boxes via arrows
    boxX =
      randBoxPos[0] /
      Math.sqrt(
        Math.pow(randBoxPos[0], 2) +
          Math.pow(randBoxPos[1], 2) +
          Math.pow(randBoxPos[2], 2)
      );
    boxY =
      randBoxPos[1] /
      Math.sqrt(
        Math.pow(randBoxPos[0], 2) +
          Math.pow(randBoxPos[1], 2) +
          Math.pow(randBoxPos[2], 2)
      );
    boxZ =
      randBoxPos[2] /
      Math.sqrt(
        Math.pow(randBoxPos[0], 2) +
          Math.pow(randBoxPos[1], 2) +
          Math.pow(randBoxPos[2], 2)
      );
    console.log(randBoxPos, "random box position");
  };

  componentWillUnmount = () => {
    boxX = 0;
    boxY = 0;
    boxZ = 0;
    randBoxPos = [];
    backHandler.remove();
  };

  // This function keeps track of changes in the props variables.
  // It allows to rerender the component via props variable.
  UNSAFE_componentWillReceiveProps = (nextProps) => {
    // The function that renders arrows that point to boxes.
    if (
      nextProps.forwardCamera[0] !== this.props.forwardCamera[0] &&
      nextProps.hasARInitialized
    )
      this.getCameraPosition();
  };

  getCameraPosition = () => {
    // If x value of  vector of camera is greater
    // than boxe's x vector, then show left arrow
    // else show right arrow.
    if (this.props.forwardCamera[0] > boxX) {
      this.left = true;
      this.right = false;
    } else {
      this.left = false;
      this.right = true;
    }

    if (this.left) {
      // This condition helps to prevent the page from multiple
      // updates of state. There is no need to update page if
      // the result of above calculations is still show left arrow
      if (!this.stillLeft) {
        this.setState({ showLeft: true, showRight: false });
        this.stillLeft = true;
        this.stillRight = false;
      }
    }
    if (this.right) {
      // This condition helps to prevent the page from multiple
      // updates of state. There is no need to update page if
      // the result of above calculations is still show right arrow
      if (!this.stillRight) {
        this.setState({ showLeft: false, showRight: true });
        this.stillLeft = false;
        this.stillRight = true;
      }
    }
  };

  render = () => {
    const { route, navigation } = this.props;

    // Get the right box the users have pressed on the map.
    // const boxID = route.params?.boxId ? route.params.boxId : "NO-ID";
    // const boxID = route.params?.boxId ? route.params.boxId : "2";
    const boxID = "2";
    // const coordinates = route.params?.coordinates ? route.params.coordinates : "NO-coordinates";
    // const box = route.params?.box ? route.params.box : "NO-BOX";

    return (
      <Fragment>
        <StatusBar barStyle="dark-content" backgroundColor={"#fff"} />

        <ViroARSceneNavigator
          {...this.state.sharedProps}
          initialScene={{ scene: FindBox }}
          viroAppProps={{ newProp: boxID, randPos: randBoxPos }}
        />
        {this.props.hasARInitialized ? (
          <Fragment>
            {this.state.showLeft ? (
              <View
                style={{
                  justifyContent: "center",
                  bottom: `${0.075 * height}%`,
                }}
              >
                <LeftArrow
                  width={wp(15)}
                  height={wp(15)}
                  style={{
                    zIndex: 50,
                    position: "absolute",
                    alignSelf: "flex-start",
                  }}
                />
              </View>
            ) : null}

            {this.state.showRight ? (
              <View
                style={{
                  justifyContent: "center",
                  bottom: `${0.075 * height}%`,
                }}
              >
                <RightArrow
                  width={wp(15)}
                  height={wp(15)}
                  style={{
                    zIndex: 50,
                    position: "absolute",
                    alignSelf: "flex-end",
                  }}
                />
              </View>
            ) : null}
          </Fragment>
        ) : null}
      </Fragment>
    );
  };
}

const styles = StyleSheet.create({
  rewardsContainer: {
    width: wp(75),
    height: hp(60),
    borderRadius: 15,
    alignSelf: "center",
    textAlign: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#ffffff",
    justifyContent: "space-around",
  },
});

const mapStateToProps = ({
  arReducer: { pos, rot, forward, hasARInitialized },
}) => {
  return {
    posCamera: pos,
    rotCamera: rot,
    forwardCamera: forward,
    hasARInitialized,
  };
};

export default connect(mapStateToProps, { hasArBeenInitialized })(
  FindBoxHelper
);
