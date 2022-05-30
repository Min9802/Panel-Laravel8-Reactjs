import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
// import store from "./store/reducers/store";
import reduxStore, { persistor } from "./store/reducers/redux";
import IntlProviderWrapper from "./utils/IntlProviderWrapper";
ReactDOM.render(
    <CookiesProvider>
        <Provider store={reduxStore}>
            <IntlProviderWrapper>
                <BrowserRouter>
                    <App persistor={persistor} />
                </BrowserRouter>
            </IntlProviderWrapper>
        </Provider>
    </CookiesProvider>,
    document.getElementById("root")
);
