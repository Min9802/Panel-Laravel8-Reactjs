import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import MiniDrawer from "./views/layouts/MiniDrawer";
import AppRoute from "./routes/AppRoute";

class App extends Component {
    render() {
        return <AppRoute />;
    }
}
export default App;
