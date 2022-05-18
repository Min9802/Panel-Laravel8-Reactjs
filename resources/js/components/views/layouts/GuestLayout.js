import {
    CardActions,
    CardContent,
    CardHeader,
    Container,
} from "@material-ui/core";
import { Card } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";

import FixedBottomNavigation from "./footerNav";

import { makeStyles } from "@material-ui/core/styles";
import { useMediaQuery } from "react-responsive";

import MiniDrawer from "./MiniDrawer";
import AlertMsg from "../../components/customs/AlertMsg";
import CardLoading from "../../components/isLoading/CardLoading";
import { withCookies, useCookies } from "react-cookie";

const useStyles = makeStyles((theme) => {
    return {
        container_big: {
            marginTop: "6%",
            height: "100%",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100%",
            maxWidth: "100%",
        },
        container_medium: {
            marginTop: "7%",
            backgroundSize: "100%",
        },
    };
});
const ContentPages = (props) => {
    return <Box></Box>;
};
const GuestLayout = (props) => {
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(true);
    const [alert, setAlert] = useState(false);
    const [cardInfo, setCardInfo] = useState(false);
    // response
    const isDesktop = useMediaQuery({
        query: "(min-width: 1224px)",
    });
    const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
    const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
    const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });
    //end
    const ChirenPages = React.cloneElement(props.children, {
        handle: { setAlert, setCardInfo },
    });

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    });
    return (
        <MiniDrawer
            Content={
                <>
                    {alert ? (
                        <AlertMsg
                            icon={alert.icon}
                            alert={alert.alert}
                            severity={alert.severity}
                            showAlert={alert.showAlert}
                            variant={alert.variant}
                            title={alert.title}
                            text={alert.text}
                        />
                    ) : null}
                    <Container
                        className={
                            isDesktop
                                ? classes.container_big
                                : isTabletOrMobile
                                ? classes.container_medium
                                : classes.container
                        }
                    >
                        {isLoading ? (
                            <CardLoading />
                        ) : (
                            <Card>
                                <CardHeader
                                    avatar={cardInfo.avatar}
                                    title={cardInfo.title}
                                ></CardHeader>
                                <CardContent>{ChirenPages}</CardContent>
                                <CardActions>{cardInfo.actions}</CardActions>
                            </Card>
                        )}
                    </Container>
                    <FixedBottomNavigation />
                </>
            }
        ></MiniDrawer>
    );
};
export default withCookies(GuestLayout);
