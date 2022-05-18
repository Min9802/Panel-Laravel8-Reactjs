import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useMediaQuery } from "react-responsive";
import { connect } from "react-redux";
import {
    FaUserAlt,
    FaLock,
    FaSignInAlt,
    FaEye,
    FaEyeSlash,
    FaHome,
    FaUserPlus,
    FaWarehouse,
    FaInbox,
} from "react-icons/fa";
import {
    Avatar,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";

import Logo from "../../assets/images/logo192.png";
import CardLoading from "../../components/isLoading/CardLoading";
import AlertMsg from "../../components/customs/AlertMsg";
import { useCookies } from "react-cookie";
import InputCustom from "../../components/customs/InputCustom";

const useStyles = makeStyles((theme) => {
    return {
        wrapper: {
            width: 400,
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "15%",
            marginBottom: "auto",

            padding: "3%",
            border: "1px solid",
            borderRadius: "5px",
            boxShadow: "2px 2px",
        },
        wrapper_medium: {
            width: 300,
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "40%",
            marginBottom: "auto",

            padding: "3%",
            border: "1px solid",
            borderRadius: "5px",
            boxShadow: "2px 2px",
        },
        headerform: {
            marginBottom: "10%",
        },
        title: {
            marginLeft: "auto",
            marginRight: "auto",
        },
        bottom_nav: {
            marginTop: 20,
        },
        loading: {
            marginTop: "10%",
            padding: "10%",
        },
    };
});
const SignUp = (props) => {
    const classes = useStyles();
    const history = useNavigate();

    //response
    const isDesktop = useMediaQuery({
        query: "(min-width: 1224px)",
    });
    const isMobile = useMediaQuery({
        query: "(min-width: 375px)(max-width: 1224px)",
    });
    const isTablet = useMediaQuery({ query: "(min-width: 768px)" });
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
    //setState
    const [isLoading, setIsLoading] = useState(true);
    const [cookies, setCookie, removeCookie] = useCookies([
        "access_token",
        "user",
    ]);
    const [alert, setAlert] = useState(false);
    const [username, setUserName] = useState("");
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPasswd] = useState("");
    const [re_password, setRePasswd] = useState("");

    const [showpasswd, setShowpass] = useState(false);

    const handleShowPasswd = () => {
        setShowpass(true);
    };
    const handleHidePasswd = () => {
        setShowpass(false);
    };
    const [typeInput, setTypeInput] = useState("password");
    useEffect(() => {
        showpasswd ? setTypeInput("text") : setTypeInput("password");
        setTimeout(() => {
            setAlert(null);
        }, 7000);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    });
    return (
        <Container>
            {isLoading ? (
                <Box className={classes.loading}>
                    <CardLoading />
                </Box>
            ) : (
                <Card
                    className={
                        isDesktop
                            ? classes.wrapper
                            : isTabletOrMobile
                            ? classes.wrapper_medium
                            : classes.wrapper
                    }
                >
                    <CardHeader
                        avatar={<Avatar src={Logo}></Avatar>}
                        title="Sign Up"
                        className={classes.header_card}
                    ></CardHeader>
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
                    <CardContent>
                        <Grid columns={1}>
                            <Grid item xs={4}>
                                <Stack spacing={2} className={`fadeIn first`}>
                                    <InputCustom
                                        label="UserName"
                                        placeholder="Enter UserName"
                                        iconStart={
                                            <FaUserAlt
                                                sx={{
                                                    color: "green",
                                                    fontSize: 20,
                                                }}
                                            />
                                        }
                                        onChange={(e) =>
                                            setUserName(e.target.value)
                                        }
                                    />
                                    <InputCustom
                                        label="Email"
                                        placeholder="Enter Email"
                                        iconStart={
                                            <FaInbox
                                                sx={{
                                                    color: "green",
                                                    fontSize: 20,
                                                }}
                                            />
                                        }
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                    <InputCustom
                                        className={`fadeIn second`}
                                        label="PassWord"
                                        type={typeInput}
                                        placeholder="Enter Password"
                                        handleFunc={
                                            showpasswd
                                                ? handleHidePasswd
                                                : handleShowPasswd
                                        }
                                        iconStart={
                                            <FaLock
                                                sx={{
                                                    color: "green",
                                                    fontSize: 20,
                                                }}
                                            />
                                        }
                                        iconEnd={
                                            showpasswd ? (
                                                <FaEyeSlash />
                                            ) : (
                                                <FaEye />
                                            )
                                        }
                                        onChange={(e) =>
                                            setPasswd(e.target.value)
                                        }
                                    />
                                    <InputCustom
                                        className={`fadeIn second`}
                                        label="ConfirmPassWord"
                                        type={typeInput}
                                        placeholder="Enter password to confirm"
                                        iconStart={
                                            <FaLock
                                                sx={{
                                                    color: "green",
                                                    fontSize: 20,
                                                }}
                                            />
                                        }
                                        onChange={(e) =>
                                            setPasswd(e.target.value)
                                        }
                                    />
                                    <Button
                                        type="submit"
                                        className={`fadeIn third`}
                                        startIcon={<FaSignInAlt />}
                                        onClick={(e) => HandleAuth(e)}
                                    >
                                        Sign in
                                    </Button>
                                </Stack>
                            </Grid>
                            <Grid item xs={4}></Grid>
                        </Grid>
                    </CardContent>
                    <CardActions>
                        <Stack spacing={1} className={classes.bottom_nav}>
                            <Stack spacing={1} className={classes.bottom_nav}>
                                <Typography>If you have Account ?</Typography>
                                <Button
                                    className={`fadeIn fourth`}
                                    startIcon={<FaSignInAlt />}
                                    onClick={() => {
                                        history("/signin");
                                    }}
                                >
                                    Sign In
                                </Button>
                                <Button
                                    className={`fadeIn five`}
                                    startIcon={<FaHome />}
                                    onClick={() => {
                                        history("/");
                                    }}
                                >
                                    To Home
                                </Button>
                            </Stack>
                        </Stack>
                    </CardActions>
                </Card>
            )}
        </Container>
    );
};

export default SignUp;
