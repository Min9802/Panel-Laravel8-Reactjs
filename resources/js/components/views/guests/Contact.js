import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";

import { FaInfo } from "react-icons/fa";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
const Contact = (props) => {
    const [isLoading, setIsLoading] = useState(true);

    const alert_show = {
        icon: <FaInfo />,
        alert: true,
        severity: "info",
        showAlert: true,
        variant: "outlined",
        title: "Info",
        text: "This Contact Page!",
    };
    const cardInfo = {
        title: "Contact",
        avatar: null,
    };
    useEffect(() => {
        props.handle.setAlert(alert_show);
        // props.handle.setCardInfo(cardInfo);
        props.setInfoPageRedux(cardInfo);
        let timerAlert = setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        let timerLoading = setTimeout(() => {
            props.handle.setAlert(false);
        }, 7000);
        return () => {
            clearTimeout(timerAlert);
            clearTimeout(timerLoading);
        };
    }, []);

    return (
        <>
            <Typography paragraph>Nothing to write !</Typography>
        </>
    );
};
const mapStateToProps = (state) => {
    return {};
};
const mapDispatchToProps = (dispatch) => {
    return {
        setInfoPageRedux: (infoPage) =>
            dispatch(actions.appSetInfoPage(infoPage)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Contact);
