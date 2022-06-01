import actionTypes from "../actions/actionTypes";

const initialState = {
    loggedUser: false,
    userInfo: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN_SUCCESS:
            return {
                ...state,
                loggedUser: true,
                userInfo: action.userInfo,
            };
        case actionTypes.USER_LOGIN_FAIL:
            return {
                ...state,
                loggedUser: false,
                userInfo: null,
            };
        case actionTypes.USER_SIGN_OUT:
            return {
                ...state,
                loggedUser: "logout",
                userInfo: null,
            };
        case actionTypes.USER_INFO:
            return {
                ...state,
                loggedUser: true,
                userInfo: action.userInfo,
            };
        default:
            return state;
    }
};

export default userReducer;
