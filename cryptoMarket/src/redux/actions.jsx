export const API_BASE_URL = "https://api.coingecko.com/api/v3/";

export const GET_CRYPTO_CHARTS = "GET_CRYPTO_CHARTS";

export const GET_CRYPTO_CANDLE = "GET_CRYPTO_CANDLE";

export const SET_USER_ID = "SET_USER_ID";

export const SET_AUTH_TOKEN = "SET_AUTH_TOKEN";

export const getCryptoCharts = (id, days) => {
  try {
    return async (dispatch) => {
      const url =
        "https://api.coingecko.com/api/v3/coins/" +
        id +
        "/market_chart?vs_currency=usd&days=" +
        days;
      const result = await fetch(url);
      const data = await result.json();
      if (data) {
        dispatch({
          type: GET_CRYPTO_CHARTS,
          payload: data,
        });
      }
    };
  } catch (error) {}
};

export const getCryptoCandle = (id, days) => {
  try {
    return async (dispatch) => {
      const url =
        "https://api.coingecko.com/api/v3/coins/" +
        id +
        "/ohlc?vs_currency=usd&days=" +
        days;
      const result = await fetch(url);
      const data = await result.json();
      if (data) {
        dispatch({
          type: GET_CRYPTO_CANDLE,
          payload: data,
        });
      }
    };
  } catch (error) {}
};

export const setUserId = (id) => ({ type: SET_USER_ID, payload: id });

export const getAuthToken = (token) => ({
  type: SET_AUTH_TOKEN,
  payload: token,
});
