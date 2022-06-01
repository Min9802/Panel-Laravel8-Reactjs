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

import { useMediaQuery } from "react-responsive";
import AlertMsg from "../../components/customs/AlertMsg";
import { Error, Info, Check } from "@mui/icons-material";
import { connect, useDispatch } from "react-redux";

import Logo from "../../assets/images/logo192.png";
import CardLoading from "../../components/isLoading/CardLoading";
import { FormattedMessage, useIntl } from "react-intl";

import { useCookies } from "react-cookie";
//API_Auth
import AuthAPI from "../../apis/AuthApi";
import * as actions from "../../store/actions";
import { KeyCodeUtils } from "../../utils";
import InputCustom from "../../components/customs/InputCustom";

import signinstyle from "./styles/signinstyle";

const Signin = (props) => {
    const classes = signinstyle();
    const history = useNavigate();
    const intl = useIntl();
    const dispatch = useDispatch();

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

    const initValues = {
        username: "",
        password: "",
    };
    const [formValues, setFormValues] = useState(initValues);

    const [showpasswd, setShowpass] = useState(false);

    const [formErrs, setFormErrs] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies([
        "access_token",
        "user",
    ]);
    const handlerKeyDown = (event) => {
        const keyCode = event.which || event.keyCode;
        if (keyCode === KeyCodeUtils.ENTER) {
            event.preventDefault();
            HandleAuth(event);
        }
    };
    const onChange = async (e) => {
        const { name, value } = e.target;
        await setFormValues({ ...formValues, [name]: value });
    };
    const handleShowPasswd = () => {
        setShowpass(true);
    };
    const handleHidePasswd = () => {
        setShowpass(false);
    };
    const [typeInput, setTypeInput] = useState("password");
    const input = [
        {
            name: "username",
            type: "text",
            iconStart: (
                <FaUserAlt
                    sx={{
                        color: "green",
                        fontSize: 20,
                    }}
                />
            ),
            iconEnd: null,
            error: "UserName Require",
            err: formErrs["username"],
        },
        {
            name: "password",
            type: typeInput,
            iconStart: (
                <FaLock
                    sx={{
                        color: "green",
                        fontSize: 20,
                    }}
                />
            ),

            iconEnd: showpasswd ? <FaEyeSlash /> : <FaEye />,
            handleFunc: showpasswd ? handleHidePasswd : handleShowPasswd,
            err: formErrs["password"],
        },
    ];
    useEffect(() => {
        showpasswd ? setTypeInput("text") : setTypeInput("password");
        document.addEventListener("keydown", handlerKeyDown);
        if (props.user) {
            setUser(props.user);
            console.log(user);
            history("/");
        }
        let timerAlert = setTimeout(() => {
            setAlert(null);
        }, 7000);
        let timerLoading = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => {
            clearTimeout(timerAlert);
            clearTimeout(timerLoading);
        };
    }, [props.user, showpasswd, formValues]);
    const HandleAuth = async (e) => {
        if (e) {
            e.preventDefault();
        }
        if (user && user.token) {
            return history("/");
        }
        if (formValues.username === "") {
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
        if (formValues.password === "") {
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
            let response = await AuthAPI.SignIn(formValues);
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
        // setCookie("access_token", user.token, {
        //     path: "/",
        //     expires,
        // });
        // setCookie("user", user, {
        //     path: "/",
        //     expires,
        // });
        setUser(user);

        props.userLoginSuccessRedux(user);
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
                    <CardHeader
                        avatar={<Avatar src={Logo}></Avatar>}
                        title={<FormattedMessage id={"form.signin.title"} />}
                        className={classes.header_card}
                    ></CardHeader>
                    <CardContent>
                        <Grid columns={1}>
                            <Grid item xs={4}>
                                <Stack spacing={2} className={`fadeIn first`}>
                                    {input.map((input, key) => (
                                        <Stack
                                            key={key}
                                            spacing={2}
                                            className={`fadeIn first`}
                                        >
                                            <InputCustom
                                                name={input.name}
                                                type={input.type}
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
                                                value={formValues[input.name]}
                                                label={
                                                    <FormattedMessage
                                                        id={
                                                            "form.signin." +
                                                            input.name
                                                        }
                                                    />
                                                }
                                                placeholder={intl.formatMessage(
                                                    {
                                                        id:
                                                            "form.placeholder." +
                                                            input.name,
                                                    }
                                                )}
                                                iconStart={input.iconStart}
                                                iconEnd={input.iconEnd}
                                                handleFunc={input.handleFunc}
                                                onChange={onChange}
                                            />
                                            {formErrs[input.name] ? (
                                                <Typography
                                                    className={classes.error}
                                                >
                                                    {formErrs[input.name]}
                                                </Typography>
                                            ) : null}
                                        </Stack>
                                    ))}
                                    <Button
                                        type="submit"
                                        className={`fadeIn third`}
                                        startIcon={<FaSignInAlt />}
                                        onClick={(e) => HandleAuth(e)}
                                    >
                                        <FormattedMessage
                                            id={"common.signin"}
                                        />
                                    </Button>
                                </Stack>
                            </Grid>
                            <Grid item xs={4}></Grid>
                        </Grid>
                    </CardContent>
                    <CardActions>
                        <Stack
                            spacing={1}
                            direction="column"
                            className={classes.bottom_nav}
                        >
                            <Typography>
                                <FormattedMessage id={"form.signin.ask"} />
                            </Typography>
                            <Button
                                className={`fadeIn fourth`}
                                startIcon={<FaUserPlus />}
                                onClick={() => {
                                    history("/signup");
                                }}
                            >
                                <FormattedMessage id={"menu.member.signup"} />
                            </Button>
                            <Button
                                className={`fadeIn five`}
                                startIcon={<FaHome />}
                                onClick={() => {
                                    history("/");
                                }}
                            >
                                <FormattedMessage
                                    id={"menu.guest.sidebar.Home"}
                                />
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
        user: state.user.userInfo,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        userLoginSuccessRedux: (user) =>
            dispatch(actions.userLoginSuccess(user)),
        userLoginFail: () => dispatch(actions.userLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
