import actionTypes from "./actionTypes";

export const appStartUpComplete = () => ({
    type: actionTypes.APP_START_UP_COMPLETE,
});

export const setContentOfConfirmModal = (contentOfConfirmModal) => ({
    type: actionTypes.SET_CONTENT_OF_CONFIRM_MODAL,
    contentOfConfirmModal: contentOfConfirmModal,
});
export const changeLanguageApp = (languagechange) => ({
    type: actionTypes.CHANGE_LANGUAGE,
    language: languagechange,
});
export const appSetInfoPage = (pageInfo) => ({
    type: actionTypes.SET_INFO_PAGE,
    pageInfo: pageInfo,
});
