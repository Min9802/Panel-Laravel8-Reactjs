import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import sideRoutes from "./routes/sideRoutes";
import AuthRoute from "./routes/AuthRoute";
import GlobalRoute from "./routes/GlobalRoute";
import NotFound404 from "./views/NotFound404";
import Layout from "./views/layouts/Layout";
const App = () => {
    return (
        <Routes>
            {GlobalRoute.map((route, key) => {
                return (
                    <Route
                        key={key}
                        path={`${route.path}/@:username`}
                        element={route.component}
                    />
                );
            })}
            {sideRoutes.map((route, key) => (
                <Route
                    exact
                    key={key}
                    path={route.path}
                    element={<Layout children={route.component} />}
                />
            ))}
            {AuthRoute.map((route, key) => {
                return route.member ? (
                    <Route
                        exact
                        key={key}
                        path={route.path}
                        element={<Layout children={route.component} />}
                    />
                ) : (
                    <Route
                        exact
                        key={key}
                        path={route.path}
                        element={route.component}
                    />
                );
            })}

            <Route path="*" element={<NotFound404 />} />
        </Routes>
    );
};

export default App;
