import React from "react";
import rootReducer from "./rootReducer";
import { combineReducers } from "redux";
import { createStore, bindActionCreators } from "redux";

const store = createStore(rootReducer);

export default store;
