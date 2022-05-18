import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import GuestLayout from "../views/layouts/GuestLayout";
import sideRoutes from "./sideRoutes";
import AuthRoute from "./AuthRoute";
import NotFound404 from "../views/NotFound404";
const AppRoute = () => {
    return (
        <Routes>
            {sideRoutes.map((route, key) => (
                <Route
                    exact
                    key={key}
                    path={route.path}
                    element={<GuestLayout children={route.component} />}
                />
            ))}
            {AuthRoute.map((route, key) => (
                <Route
                    exact
                    key={key}
                    path={route.path}
                    element={route.component}
                />
            ))}
            <Route path="*" element={<NotFound404 />} />
        </Routes>
    );
};

export default AppRoute;
