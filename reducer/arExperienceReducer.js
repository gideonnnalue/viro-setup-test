import { CAMERA_POS, AR_INITIALIZED } from "./types";

const initialState = {
  up: [0, 0, 0],
  pos: [0, 0, 0],
  rot: [0, 0, 0],
  forward: [0, 0, 0],
  hasARInitialized: false,
};

const arExperienceReducer = (state = initialState, action) => {
  switch (action.type) {
    // update camera location vectors
    case CAMERA_POS:
      return {
        ...state,
        pos: action.pos,
        rot: action.rot,
        forward: action.forward,
      };

    // update initialized boolean
    case AR_INITIALIZED:
      return { ...state, hasARInitialized: action.bool };

    default:
      return state;
  }
};

export default arExperienceReducer;
