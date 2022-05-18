import React, { useEffect, useState } from "react";

import {
    Avatar,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
} from "@material-ui/core";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
    FaUserAlt,
    FaLock,
    FaSignInAlt,
    FaEye,
    FaEyeSlash,
    FaHome,
    FaUserPlus,
    FaWarehouse,
} from "react-icons/fa";

import { makeStyles } from "@material-ui/core/styles";
import InputCustom from "../../components/customs/InputCustom";
import { useMediaQuery } from "react-responsive";
import AlertMsg from "../../components/customs/AlertMsg";
import { Error, Info, Check } from "@mui/icons-material";
import { connect } from "react-redux";

import Logo from "../../assets/images/logo192.png";
import CardLoading from "../../components/isLoading/CardLoading";

import { useCookies } from "react-cookie";
//API_Auth
import AuthAPI from "../../apis/AuthApi";

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
const Signin = (props) => {
    const classes = useStyles();
    const history = useNavigate();
    // const { setUser } = userAuth();
    // const { user } = userAuth();
    const [isLoading, setIsLoading] = useState(true);
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
    const [user, setUser] = useState(props.user);
    const [alert, setAlert] = useState(false);

    const [username, setUserName] = useState("");
    const [password, setPasswd] = useState("");
    const [showpasswd, setShowpass] = useState(false);

    const [cookies, setCookie, removeCookie] = useCookies([
        "access_token",
        "user",
    ]);
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
    const HandleAuth = async (e) => {
        if (e) {
            e.preventDefault();
        }
        if (user && user.token) {
            return history("/");
        }
        if (username === "") {
            const alert_show = {
                icon: <Error />,
                alert: true,
                severity: "error",
                showAlert: true,
                variant: "outlined",
                title: "Error",
                text: "You must enter your username.",
            };
            setAlert(alert_show);
        }
        if (password === "") {
            const alert_show = {
                icon: <Error />,
                alert: true,
                severity: "error",
                showAlert: true,
                variant: "outlined",
                title: "Error",
                text: "You must enter your password",
            };
            setAlert(alert_show);
        }
        try {
            let response = await AuthAPI.Login({
                username,
                password,
            });
            if (response.data.error) {
                const alert_show = {
                    icon: <Error />,
                    alert: true,
                    severity: "error",
                    showAlert: true,
                    variant: "outlined",
                    title: "Error",
                    text: response.data.error,
                };

                setAlert(alert_show);
            }
            const alert_show = {
                icon: <Check />,
                alert: true,
                severity: "success",
                showAlert: true,
                variant: "outlined",
                title: "Success",
                text: "Login Successful",
            };

            setAlert(alert_show);
            return setProfile(response);
        } catch (err) {
            if (err.response) {
                const alert_show = {
                    icon: <Error />,
                    alert: true,
                    severity: "error",
                    showAlert: true,
                    variant: "outlined",
                    title: "Error",
                    text: err.response.data.error,
                };
                setAlert(alert_show);
            }
        }
    };
    const setProfile = async (response) => {
        let user = { ...response.data.user };
        user.token = response.data.access_token;
        let expires = new Date();
        expires.setTime(expires.getTime() + user.expires_in * 1000);
        setCookie("access_token", user.token, {
            path: "/",
            expires,
        });
        setCookie("user", user, {
            path: "/",
            expires,
        });
        setUser(user);

        storeUser(user);
        setTimeout(() => {
            return history("/");
        }, 2000);
    };
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
                        title="Sign in"
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
                            <Typography>If you don't have Account ?</Typography>
                            <Button
                                className={`fadeIn fourth`}
                                startIcon={<FaUserPlus />}
                                onClick={() => {
                                    history("/signup");
                                }}
                            >
                                Sign Up
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
                    </CardActions>
                </Card>
            )}
        </Container>
    );
};
const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        storeUser: (user) =>
            dispatch({
                type: "INFO_USER",
                payload: user,
            }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
