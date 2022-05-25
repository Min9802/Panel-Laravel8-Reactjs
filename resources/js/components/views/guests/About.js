import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";

import { FaInfo } from "react-icons/fa";

const About = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const alert_show = {
        icon: <FaInfo />,
        alert: true,
        severity: "info",
        showAlert: true,
        variant: "outlined",
        title: "Info",
        text: "This About Page!",
    };
    const cardInfo = {
        title: "About",
        avatar: null,
    };
    useEffect(() => {
        props.handle.setAlert(alert_show);
        props.handle.setCardInfo(cardInfo);

        let timerAlert = setTimeout(() => {
            props.handle.setAlert(null);
        }, 7000);
        let timerLoading = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

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

export default About;
