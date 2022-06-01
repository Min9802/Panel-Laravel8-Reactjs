import actionTypes from "./actionTypes";

export const addUserSuccess = () => ({
    type: actionTypes.ADD_USER_SUCCESS,
});
export const userLoginSuccess = (user) => ({
    type: actionTypes.USER_LOGIN_SUCCESS,
    userInfo: user,
});
export const userLoginFail = (user) => ({
    type: actionTypes.USER_LOGIN_FAIL,
    userInfo: null,
});
export const userSignOut = (user) => ({
    type: actionTypes.USER_SIGN_OUT,
    userInfo: null,
});
