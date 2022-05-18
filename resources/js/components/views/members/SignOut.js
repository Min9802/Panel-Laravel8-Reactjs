import React, { useEffect, useState } from "react";
import AuthApi from "../../apis/AuthApi";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
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

const SignOut = (props) => {
    const history = useNavigate();

    const [alert, setAlert] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies([
        "access_token",
        "user",
    ]);
    const [user, setUser] = useState(cookies);
    useEffect(() => {
        handleLogout();
    }, []);

    const handleLogout = async () => {
        try {
            let response = await AuthApi.Logout(user);
            console.log(response);
            if (response.data.error) {
                const alert_show = {
                    icon: <Error />,
                    alert: true,
                    severity: "error",
                    showAlert: true,
                    variant: "outlined",
                    title: "Error",
                    text: response.data.error,
                };
                setAlert(alert_show);
            }
            const alert_show = {
                icon: <Check />,
                alert: true,
                severity: "success",
                showAlert: true,
                variant: "outlined",
                title: "Success",
                text: "Logout Successful",
            };
            props.removeUser(user);
            removeCookie("access_token");
            removeCookie("user");
            setAlert(alert_show);
        } catch (err) {
            if (err.response) {
                const alert_show = {
                    icon: <Error />,
                    alert: true,
                    severity: "error",
                    showAlert: true,
                    variant: "outlined",
                    title: "Error",
                    text: err.response.data.error,
                };
                setAlert(alert_show);
            }
        }
        return history("/signin");
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
        removeUser: (user) =>
            dispatch({
                type: "REMOVE_USER",
                payload: user,
            }),
    };
};
export default connect(MapStateToProps, mapDispatchToProps)(SignOut);
