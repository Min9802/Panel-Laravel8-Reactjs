import React, { useEffect, useState } from "react";
import AuthApi from "../../apis/AuthApi";
import { useNavigate } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import {
    FaUserAlt,
    FaLock,
    FaSignInAlt,
    FaEye,
    FaEyeSlash,
    FaHome,
    FaUserPlus,
    FaWarehouse,
} from "react-icons/fa";
import { Error, Info, Check } from "@mui/icons-material";
import { useCookies } from "react-cookie";
import * as actions from "../../store/actions";
import Swal from "sweetalert2";
import { FormattedMessage, useIntl } from "react-intl";

const SignOut = (props) => {
    const history = useNavigate();
    const dispatch = useDispatch;
    const intl = useIntl();

    const [alert, setAlert] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies([
        "access_token",
        "user",
    ]);
    const [user, setUser] = useState(false);

    const handleLogout = async (user) => {
        try {
            if (!props.user.userInfo) {
                return Swal.fire({
                    title: intl.formatMessage({
                        id: "swal.title.error",
                    }),
                    text: intl.formatMessage({
                        id: "swal.logout.needsignin",
                    }),
                    icon: "error",
                    confirmButtonText: intl.formatMessage({
                        id: "common.ok",
                    }),
                }).then((result) => {
                    if (result.isConfirmed) {
                        history("/signin");
                    } else {
                        history("/signin");
                    }
                });
            }
            let response = await AuthApi.SignOut(props.user.userInfo);

            // removeCookie("access_token");
            // removeCookie("user");
            // setAlert(alert_show);
            AfterSignOut(response);
        } catch (err) {
            if (err.response) {
                return Swal.fire({
                    title: intl.formatMessage({
                        id: "swal.title.warning",
                    }),
                    text: intl.formatMessage({
                        id: "swal.logout.fail",
                    }),
                    icon: "error",
                    confirmButtonText: intl.formatMessage({
                        id: "common.ok",
                    }),
                }).then((result) => {
                    if (result.isConfirmed) {
                        props.clearUserRedux();
                        history("/");
                    } else {
                        props.clearUserRedux();
                        history("/");
                    }
                });
            }
        }
    };
    const AfterSignOut = (response) => {
        if (response.status === 200) {
            props.userSignOutRedux();
            history("/");
        }
    };
    const cancelLogout = () => {
        history("/");
    };
    useEffect(() => {
        SwalLogout();
    }, [props.user]);

    const SwalLogout = () => {
        console.log(props.user);
        switch (props.user.loggedUser) {
            case true:
                return Swal.fire({
                    showCancelButton: true,
                    title: intl.formatMessage({
                        id: "swal.title.warning",
                    }),
                    text: intl.formatMessage({
                        id: "swal.logout.ask",
                    }),
                    icon: "error",
                    confirmButtonText: intl.formatMessage({
                        id: "common.confirm",
                    }),

                    cancelButtonText: intl.formatMessage({
                        id: "common.close",
                    }),
                }).then((result) => {
                    if (result.isConfirmed) {
                        handleLogout(user);
                    } else {
                        cancelLogout();
                    }
                });
            case "logout":
                return Swal.fire({
                    title: intl.formatMessage({
                        id: "swal.title.success",
                    }),
                    text: intl.formatMessage({
                        id: "swal.logout.success",
                    }),
                    icon: "success",
                    confirmButtonText: intl.formatMessage({
                        id: "common.ok",
                    }),
                }).then((result) => {
                    if (result.isConfirmed) {
                        props.userSignOutRedux();
                        props.clearUserRedux();
                        history("/");
                    } else {
                        history("/");
                    }
                });
            case false:
                return Swal.fire({
                    title: intl.formatMessage({
                        id: "swal.title.error",
                    }),
                    text: intl.formatMessage({
                        id: "swal.logout.needsignin",
                    }),
                    icon: "error",
                    confirmButtonText: intl.formatMessage({
                        id: "common.ok",
                    }),
                }).then((result) => {
                    if (result.isConfirmed) {
                        history("/signin");
                    } else {
                        history("/signin");
                    }
                });
        }
    };
    return <></>;
};
const MapStateToProps = (state) => {
    return {
        user: state.user,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        userSignOutRedux: () => dispatch(actions.userSignOut()),
        clearUserRedux: () => dispatch(actions.userLoginFail()),
    };
};
export default connect(MapStateToProps, mapDispatchToProps)(SignOut);
