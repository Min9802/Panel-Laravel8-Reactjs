import React from "react";
import { useCookies } from "react-cookie";

let initState = {};

const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case "INFO_USER":
            let userData = action.payload;
            return {
                ...state,
                user: userData,
            };
            break;
        default:
            return state;
    }
};

export default rootReducer;
