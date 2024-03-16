import {
  GET_CRYPTO_CHARTS,
  GET_CRYPTO_CANDLE,
  SET_USER_ID,
  SET_AUTH_TOKEN,
} from "./actions";

const initialState = {
  chartData: {},
  candleData: {},
  userId: "",
  authToken: "",
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CRYPTO_CHARTS:
      return {
        ...state,
        chartData: action.payload,
      };
    case GET_CRYPTO_CANDLE:
      return {
        ...state,
        candleData: action.payload,
      };
    case SET_USER_ID:
      return {
        ...state,
        userId: action.payload,
      };
    case SET_AUTH_TOKEN:
      return {
        ...state,
        authToken: action.payload,
      };
    default:
      return state;
  }
}

export default userReducer;
