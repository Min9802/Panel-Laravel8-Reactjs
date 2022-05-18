import { Box, Typography } from "@material-ui/core";
import { Card, CardContent, CardActions, Button } from "@mui/material";
import React from "react";
import { makeStyles } from "@material-ui/core";

import { useMediaQuery } from "react-responsive";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((styles) => {
  return {
    content_big: {
      width: "100%",
      minHeight: 300,
      maxHeight: 500,
      textAlign: "center",
      position: "relative",
      zIndex: 0,
      "&:text1_big": {
        position: "absolute",
      },
      "&:number_big": {
        position: "absolute",
      },
      "&:number_medium": {
        position: "absolute",
      },
      "&:text1_medium": {
        position: "absolute",
      },
      padding: "auto",
    },
    number_big: {
      fontSize: "500%",
      zIndex: 2,
      fontWeight: "bold",
      padding: 70,
      textShadow: "-1px -1px 1px #000, 1px 1px 1px #000",
      position: "relative",
      backdropFilter: "blur(5px)",
    },
    text1_big: {
      fontSize: "1300%",
      color: "#999999",
      position: "absolute",
      top: 0,
      left: "20%",
      padding: "auto",
      zIndex: 1,
      overflowX: "hidden",
      textShadow: "-1px -1px 1px #999999, 1px 1px 1px #000",
    },
    text2_big: {
      margin: "auto",
      textAlign: "center",
    },
    number_medium: {
      fontSize: "500%",
      zIndex: 2,
      fontWeight: "bold",
      padding: "30%",
      textShadow: "-1px -1px 1px #000, 1px 1px 1px #000",
      position: "relative",
      backdropFilter: "blur(5px)",
    },
    text1_medium: {
      fontSize: "500%",
      color: "#999999",
      position: "absolute",
      top: 0,
      padding: "auto",
      zIndex: 1,
      overflowX: "hidden",
      textShadow: "-1px -1px 1px #999999, 1px 1px 1px #000",
      textAlign: "center",
      padding: "auto",
      paddingTop: "15%",
    },
    text2_medium: {
      margin: "auto",
      textAlign: "center",
    },
    action: {
      position: "relative",
      textAlign: "center",
    },
    nav_custom: {
      textDecoration: "none",
      marginLeft: "auto",
      marginRight: "auto",
    },
  };
});
const NotFound404 = () => {
  const classes = useStyles();

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
