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
import { AiOutlineGlobal, AiOutlineQrcode } from "react-icons/ai";
import { MdExpandMore, MdMail } from "react-icons/md";
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
import { Error, Info, Check } from "@mui/icons-material";

import Logo from "../../assets/images/logo192.png";
import CardLoading from "../../components/isLoading/CardLoading";
import AlertMsg from "../../components/customs/AlertMsg";
import { useCookies } from "react-cookie";
import InputCustom from "../../components/customs/InputCustom";
//API_Auth
import AuthAPI from "../../apis/AuthApi";
import { FormattedMessage, useIntl } from "react-intl";
import { KeyCodeUtils } from "../../utils";
import AuthUserApi from "../../services/api/AuthUserApi";
import * as actions from "../../store/actions";

import signupstyle from "./styles/signupstyle";

const SignUp = (props) => {
    const classes = signupstyle();
    const history = useNavigate();
    const intl = useIntl();
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
    const handlerKeyDown = (event) => {
        const keyCode = event.which || event.keyCode;
        if (keyCode === KeyCodeUtils.ENTER) {
            event.preventDefault();
            HandleSignUp(event);
        }
    };
    const [showpasswd, setShowpass] = useState(false);

    const [typeInput, setTypeInput] = useState("password");

    const [alert, setAlert] = useState(false);
    const [error, setError] = useState(false);
    const [user, setUser] = useState(false);
    const initValues = {
        username: "",
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    };
    const [formValues, setFormValues] = useState(initValues);

    const [formErrs, setFormErrs] = useState(false);

    //method
    const handleShowPasswd = () => {
        setShowpass(true);
    };
    const handleHidePasswd = () => {
        setShowpass(false);
    };
    const onChange = async (e) => {
        // e.preventDefault();
        const { name, value } = e.target;
        await setFormValues({ ...formValues, [name]: value });
    };
    const validate = () => {
        !formValues.username
            ? setFormErrs({ username: "Username Required" })
            : !formValues.name
            ? setFormErrs({ name: "Name Required" })
            : !formValues.email
            ? setFormErrs({ email: "Email Required" })
            : !formValues.password
            ? setFormErrs({ password: "Password Required" })
            : !formValues.password_confirmation
            ? setFormErrs({ password_confirmation: "Confirm Password" })
            : formValues.password !== formValues.password_confirmation
            ? setFormErrs({ password_confirmation: "Password not match" })
            : setFormErrs(false);
    };
    const HandleSignUp = async (e) => {
        e.preventDefault();
        validate();
        try {
            let response = await AuthAPI.SignUp(formValues);
            return SignupSuccess(response);
        } catch (err) {
            if (err.response) {
                let errRes = err.response.data.message;
                console.log(err);
                setFormErrs({
                    username: errRes.username,
                    name: errRes.name,
                    email: errRes.email,
                    password: errRes.password,
                });
            }
        }
    };
    const SignupSuccess = async (response) => {
        let message = response.data.message;
        const alert_show = {
            icon: <Check />,
            alert: true,
            severity: "success",
            showAlert: true,
            variant: "outlined",
            title: "Success",
            text: message,
        };
        setAlert(alert_show);
        setTimeout(() => {
            console.log(alert_show);
            return history("/signin");
        }, 2000);
    };
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
            name: "name",
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
            handleFunc: null,
            err: formErrs["name"],
        },
        {
            name: "email",
            type: "email",
            iconStart: (
                <MdMail
                    sx={{
                        color: "green",
                        fontSize: 20,
                    }}
                />
            ),
            iconEnd: null,
            handleFunc: null,
            err: formErrs["email"],
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
        {
            name: "password_confirmation",
            type: typeInput,
            iconStart: (
                <FaLock
                    sx={{
                        color: "green",
                        fontSize: 20,
                    }}
                />
            ),
            iconEnd: null,
            handleFunc: null,
            err: formErrs["password_confirmation"],
        },
    ];
    useEffect(() => {
        // password !== "" && passwordConf !== "" ? checkPassConf() : null;
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
    }, [props.user, showpasswd, formErrs]);
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
                        title={<FormattedMessage id={"form.signup.title"} />}
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
                                                            "form.signup." +
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
                                        onClick={(e) => HandleSignUp(e)}
                                    >
                                        <FormattedMessage
                                            id={"common.signup"}
                                        />
                                    </Button>
                                </Stack>
                            </Grid>
                            <Grid item xs={4}></Grid>
                        </Grid>
                    </CardContent>
                    <CardActions>
                        <Stack spacing={1} className={classes.bottom_nav}>
                            <Typography>
                                <FormattedMessage id={"form.signin.ask"} />
                            </Typography>
                            <Button
                                className={`fadeIn fourth`}
                                startIcon={<FaSignInAlt />}
                                onClick={() => {
                                    history("/signin");
                                }}
                            >
                                <FormattedMessage id={"common.signin"} />
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
        userCreatedRedux: (user) => dispatch(actions.userLoginSuccess(user)),
        userLoginFail: () => dispatch(actions.userLoginFail()),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
