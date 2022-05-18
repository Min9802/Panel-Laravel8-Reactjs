import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BioRoute from "../../routes/BioRoute";

import ButtonBio from "../../components/customs/ButtonBio";

import { FaInfo } from "react-icons/fa";
import { useCookies } from "react-cookie";

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

    const [btnTrans, setBtntrans] = useState(false);
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
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);

        setTimeout(() => {
            setBtntrans(true);
        }, 1500);
        props.handle.setAlert(alert_show);
        props.handle.setCardInfo(cardInfo);
        setTimeout(() => {
            props.handle.setAlert(false);
        }, 7000);
        return () => {};
    }, []);
    return (
        <ButtonBio
            classes={classes.Button_bio}
            btnTrans={btnTrans}
            isLoading={isLoading}
            routes={BioRoute}
            className={classes.Button_bio}
        />
    );
};

export default Bio;
