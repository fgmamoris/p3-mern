import React from "react";
import { MarketRouter } from "../src/routers/MarkerRouter";
import { Provider } from "react-redux";
import { store } from "./components/store/store";
export const MarketApp = () => {
  return (
    <Provider store={store}>
      <MarketRouter />
    </Provider>
  );
};
