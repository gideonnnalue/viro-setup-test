import { CAMERA_POS, AR_INITIALIZED } from "./types";

// passes three arrays
export const getCameraPosition = (pos, rot, forward) => {
  return {
    type: CAMERA_POS,
    pos,
    rot,
    forward,
  };
};

// passes a boolean
export const hasArBeenInitialized = (bool) => {
  return {
    type: AR_INITIALIZED,
    bool,
  };
};
