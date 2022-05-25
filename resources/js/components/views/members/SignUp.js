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
            margin: "15% auto auto auto",
            padding: "3%",
            border: "1px solid",
            borderRadius: "5px",
            boxShadow: "2px 2px",
        },
        wrapper_medium: {
            width: 300,
            margin: "10% auto auto auto",

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
        error: {
            color: "red",
            border: "1px solid red",
            borderRadius: "5px",
            backgroundColor: "#f3f3f3",
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

    const [values, setValues] = useState({
        username: "",
        fullname: "",
        email: "",
        password: "",
        passwordconf: "",
    });
    const [showpasswd, setShowpass] = useState(false);

    const [typeInput, setTypeInput] = useState("password");

    const [error, setError] = useState(false);

    //method
    const handleShowPasswd = () => {
        setShowpass(true);
    };
    const handleHidePasswd = () => {
        setShowpass(false);
    };
    const TimeOut = (props) => {};
    const onChange = async (e) => {
        // e.preventDefault();
        await setValues({ ...values, [e.target.name]: e.target.value });
        !values.username
            ? setError("Username Required")
            : !values.fullname
            ? setError("Full Name Required")
            : !values.email
            ? setError("Email Required")
            : !values.password
            ? setError("Password Required")
            : !values.passwordconf
            ? setError("Confirm Password")
            : values.password !== values.passwordconf
            ? setError("Password not math")
            : setError(false);
    };
    const HandleSignUp = async (e) => {
        e.preventDefault();
        !values.username
            ? setError("Username Required")
            : !values.fullname
            ? setError("Full Name Required")
            : !values.email
            ? setError("Email Required")
            : !values.password
            ? setError("Password Required")
            : !values.passwordconf
            ? setError("Confirm Password")
            : values.password !== values.passwordconf
            ? setError("Password not math")
            : setError(false);
    };
    const input = [
        {
            name: "username",
            type: "text",
            label: "User Name",
            placeholder: "Enter UserName",
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
        },
        {
            name: "fullname",
            type: "text",
            label: "Full Name",
            placeholder: "Enter Full Name",
            iconStart: (
                <FaUserAlt
                    sx={{
                        color: "green",
                        fontSize: 20,
                    }}
                />
            ),
            iconEnd: null,
            handleFunc: null,
        },
        {
            name: "email",
            type: "email",
            label: "Email",
            placeholder: "Enter Email",
            iconStart: (
                <FaInbox
                    sx={{
                        color: "green",
                        fontSize: 20,
                    }}
                />
            ),
            iconEnd: null,
            handleFunc: null,
        },
        {
            name: "password",
            type: typeInput,
            label: "Password",
            placeholder: "Enter Password",
            iconStart: (
                <FaInbox
                    sx={{
                        color: "green",
                        fontSize: 20,
                    }}
                />
            ),

            iconEnd: showpasswd ? <FaEyeSlash /> : <FaEye />,
            handleFunc: showpasswd ? handleHidePasswd : handleShowPasswd,
        },
        {
            name: "passwordconf",
            type: typeInput,
            label: "Confirm Password",
            placeholder: "Confirm Password",
            iconStart: (
                <FaInbox
                    sx={{
                        color: "green",
                        fontSize: 20,
                    }}
                />
            ),
            iconEnd: null,
            handleFunc: null,
        },
    ];

    useEffect(() => {
        // password !== "" && passwordConf !== "" ? checkPassConf() : null;
        showpasswd ? setTypeInput("text") : setTypeInput("password");

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
                                    {error ? (
                                        <Typography className={classes.error}>
                                            {error}
                                        </Typography>
                                    ) : null}
                                    {input.map((input, key) => (
                                        <InputCustom
                                            key={key}
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
                                            label={input.label}
                                            placeholder={input.placeholder}
                                            iconStart={input.iconStart}
                                            iconEnd={input.iconEnd}
                                            handleFunc={input.handleFunc}
                                            onChange={onChange}
                                        />
                                    ))}

                                    <Button
                                        type="submit"
                                        className={`fadeIn third`}
                                        startIcon={<FaSignInAlt />}
                                        onClick={(e) => HandleSignUp(e)}
                                    >
                                        Sign Up
                                    </Button>
                                </Stack>
                            </Grid>
                            <Grid item xs={4}></Grid>
                        </Grid>
                    </CardContent>
                    <CardActions>
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
                    </CardActions>
                </Card>
            )}
        </Container>
    );
};

export default SignUp;
