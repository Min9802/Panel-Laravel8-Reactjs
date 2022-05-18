import React from "react";
import { Button, Typography, Stack, Skeleton } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { useMediaQuery } from "react-responsive";

const useStyles = makeStyles((theme) => ({
  stack_big: {
    maxWidth: "33%",
  },
  stack_medium: {
    maxWidth: "50%",
  },
  stack_mini: {
    maxWidth: "50%",
  },
}));

const ButtonBio = ({ isLoading, routes }) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isMobile = useMediaQuery({
    query: "(min-width: 375px)(max-width: 1224px)",
  });
  const isTablet = useMediaQuery({ query: "(min-width: 768px)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });
  return (
    <Stack
      spacing={2}
      className={
        isDesktop
          ? classes.stack_big
          : isTablet
          ? classes.stack_medium
          : isMobile
          ? classes.stack_mini
          : null
      }
    >
      {isLoading
        ? routes.map((route, key) => (
            <Skeleton key={key} width="100%">
              <Typography key={key}>.</Typography>
            </Skeleton>
          ))
        : routes.map((route, key) => (
            <Button
              style={{
                border: "solid 1px",
                borderRadius: "50px",
                textAlign: "left",
              }}
              key={key}
              startIcon={route.icon}
              variant="outlined"
              href={route.path}
              className={`fadeIn ${
                key === 0
                  ? "first"
                  : key === 1
                  ? "second"
                  : key === 2
                  ? "third"
                  : key === 3
                  ? "fourth"
                  : ""
              }`}
            >
              {route.name}
            </Button>
          ))}
    </Stack>
  );
};

export default ButtonBio;
