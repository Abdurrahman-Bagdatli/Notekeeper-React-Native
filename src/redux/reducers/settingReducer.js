import { ACTİVEBUTTON, DARKMODE, PASSİVEBUTTON, WHİTEMODE } from '../actions/actionsType';

const initialState = {
  mode: false,
};

const settingReducer = (state = initialState, action) => {
  if (!action) {
    return state;
  }

  switch (action.type) {
    case DARKMODE:
      return {
        ...state, mode: true
      };
    case WHİTEMODE:
      return {
        ...state,
        mode: false
      };

    default:
      return state;
  }
};

export default settingReducer;
