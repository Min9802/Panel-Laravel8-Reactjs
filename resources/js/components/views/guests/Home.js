import React, { useEffect } from "react";
import { Typography } from "@mui/material";

import { FaInfo } from "react-icons/fa";

const Home = (props) => {
    const [isLoading, setIsLoading] = useState(true);

    const alert_show = {
        icon: <FaInfo />,
        alert: true,
        severity: "info",
        showAlert: true,
        variant: "outlined",
        title: "Info",
        text: "This Home Page!",
    };
    const cardInfo = {
        title: "Home",
        avatar: null,
    };
    useEffect(() => {
        props.handle.setAlert(alert_show);
        props.handle.setCardInfo(cardInfo);

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
            <Typography paragraph>Welcome to Min !</Typography>
            <Typography paragraph>Nothing to write !</Typography>
        </>
    );
};

export default Home;
