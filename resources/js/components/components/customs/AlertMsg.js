import React, { useEffect, useState } from "react";
import { Close } from "@mui/icons-material";
import { Alert, AlertTitle, IconButton } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { useMediaQuery } from "react-responsive";

const useStyles = makeStyles((theme) => ({
  alertshow_bigsize: {
    maxWidth: 300,
    position: "absolute",
    right: 10,
    top: 75,
  },
}));
/**
 *
 * Properties:
 *
 * - Icon: Icon
 * - severity: 'error' | 'info' | 'success' | 'warning' | 'string'
 * - variant: 'outlined' | 'filled' | 'standard' | 'string'
 * - action: node
 *
 */
const AlertMsg = (prop) => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  const classes = useStyles();
  const [alert, setAlert] = useState(prop.alert);
  return (
    <>
      {alert ? (
        <Alert
          className={
            isDesktopOrLaptop
              ? classes.alertshow_bigsize
              : isTabletOrMobile
              ? classes.alertshow_tablet
              : classes.alertshow_container_Retina
          }
          icon={prop.icon}
          severity={prop.severity}
          variant={prop.variant}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setAlert(false);
              }}
            >
              <Close />
            </IconButton>
          }
        >
          <AlertTitle>{prop.title}</AlertTitle>
          {prop.text}
        </Alert>
      ) : null}
    </>
  );
};

export default AlertMsg;
