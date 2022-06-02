import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BioRoute from "../../routes/BioRoute";

import ButtonBio from "../../components/customs/ButtonBio";

import { FaInfo } from "react-icons/fa";
import { useCookies } from "react-cookie";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import { FormattedMessage, useIntl } from "react-intl";

const useStyles = makeStyles((theme) => {
    return {
        Button_bio: {
            padding: theme.spacing(1),
            textAlign: "left",
            color: theme.palette.text.secondary,
        },
    };
});

const Bio = (props) => {
    const classes = useStyles();
    const intl = useIntl();

    const [isLoading, setIsLoading] = useState(true);
    const [Alert, setUpdateAlert] = useState(false);
    const [card, setUpdateCard] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies([
        "access_token",
        "refresh_token",
    ]);
    const alert_show = {
        icon: <FaInfo />,
        alert: true,
        severity: "info",
        showAlert: true,
        variant: "outlined",
        title: "Info",
        text: "Welcome to Min!",
    };
    const cardInfo = {
        title: "Bio",
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
        }, 1000);
        return () => {
            clearTimeout(timerAlert);
            clearTimeout(timerLoading);
        };
    }, []);
    return (
        <ButtonBio
            classes={classes.Button_bio}
            isLoading={isLoading}
            routes={BioRoute}
            className={classes.Button_bio}
        />
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
export default connect(mapStateToProps, mapDispatchToProps)(Bio);
