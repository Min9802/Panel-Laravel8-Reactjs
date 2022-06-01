import { Box, Typography } from "@material-ui/core";
import { Card, CardContent, CardActions, Button } from "@mui/material";
import React from "react";
import { makeStyles } from "@material-ui/core";

import { useMediaQuery } from "react-responsive";
import { NavLink } from "react-router-dom";

import notfoundstyle from "./members/styles/notfoundstyle";

const NotFound404 = () => {
    const classes = notfoundstyle();

    const isDesktop = useMediaQuery({
        query: "(min-width: 1224px)(max-width: 1824px)",
    });
    const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
    const isMobile = useMediaQuery({ query: "(max-width: 1224px)" });
    return (
        <Card
            className={
                isDesktop
                    ? classes.content_big
                    : isMobile
                    ? classes.content_medium
                    : classes.content_big
            }
        >
            <CardContent>
                <Typography
                    variant="h1"
                    className={
                        isDesktop
                            ? classes.number_big
                            : isMobile
                            ? classes.number_medium
                            : classes.number_big
                    }
                >
                    404
                </Typography>
                <Typography
                    variant="h1"
                    className={
                        isDesktop
                            ? classes.text1_big
                            : isMobile
                            ? classes.text1_medium
                            : classes.text1_big
                    }
                >
                    Not Found
                </Typography>
                <Typography
                    variant="h4"
                    className={
                        isDesktop
                            ? classes.text2_big
                            : isMobile
                            ? classes.text2_medium
                            : classes.text2_big
                    }
                >
                    Page Not Found
                </Typography>
            </CardContent>
            <CardActions
                className={
                    isDesktop
                        ? classes.action_big
                        : isMobile
                        ? classes.action_medium
                        : classes.action_big
                }
            >
                <NavLink className={classes.nav_custom} to="/">
                    <Button size="small">Home</Button>
                </NavLink>
            </CardActions>
        </Card>
    );
};

export default NotFound404;
