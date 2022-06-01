import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import {
    useNavigate,
    useLocation,
    Navigate,
    useParams,
} from "react-router-dom";
import UserApi from "../../apis/UserApi";
import Swal from "sweetalert2";
import {
    Avatar,
    Box,
    Container,
    Grid,
    Stack,
    Typography,
    Button,
    IconButton,
    Card,
    CardHeader,
    CardContent,
} from "@mui/material";
import { FaUserCircle, FaInfo } from "react-icons/fa";
import { AiOutlineGlobal } from "react-icons/ai";
import { makeStyles } from "@material-ui/core/styles";

import Logo from "../../assets/images/logo512.png";
import { CompressOutlined } from "@mui/icons-material";
import { FormattedMessage, useIntl } from "react-intl";
import { useMediaQuery } from "react-responsive";

import profileDetailstyle from "./styles/profileDetailstyle";

const ProfileDetail = (props) => {
    const classes = profileDetailstyle();
    const intl = useIntl();
    const location = useLocation();

    const dispatch = useDispatch();
    const history = useNavigate();
    const [card, setCard] = useState(false);
    const [user, setUser] = useState(false);
    const username = useParams();
    //response
    const isDesktop = useMediaQuery({
        query: "(min-width: 1224px)",
    });
    const isMobile = useMediaQuery({
        query: "(min-width: 375px)(max-width: 1224px)",
    });
    const isTablet = useMediaQuery({ query: "(min-width: 768px)" });
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

    const UserDetail = async (user) => {
        try {
            let response = await UserApi.GetUserInfo({ username: username });
            setUser(response.data);
        } catch (err) {
            return Swal.fire({
                title: intl.formatMessage({
                    id: "swal.title.error",
                }),
                text: intl.formatMessage({
                    id: "swal.user.notfound",
                }),
                icon: "error",
                confirmButtonText: intl.formatMessage({
                    id: "common.ok",
                }),
            }).then((result) => {
                if (result.isConfirmed) {
                    history("/");
                } else {
                    history("/");
                }
            });
        }
    };
    const cardInfo = {
        title: "Info",
        avatar: null,
    };
    const currentRoute = window.location.href;

    useEffect(() => {
        if (props.user) {
            UserDetail(props.user);
        }
        // props.handle.setCardInfo(cardInfo);
    }, [props.user]);
    return (
        <Container>
            <Card
                className={
                    isDesktop
                        ? classes.wrapper
                        : isTabletOrMobile
                        ? classes.wrapper_medium
                        : classes.wrapper
                }
                mb={{ xs: 1, md: 2 }}
            >
                <CardHeader></CardHeader>
                <CardContent>
                    <Stack
                        spacing={5}
                        className={
                            isDesktop
                                ? classes.boxprofile
                                : isTabletOrMobile
                                ? classes.boxprofile_medium
                                : classes.boxprofile
                        }
                    >
                        <Box
                            className={
                                isDesktop
                                    ? classes.headerbox
                                    : isTabletOrMobile
                                    ? classes.headerbox_medium
                                    : classes.headerbox
                            }
                        >
                            <IconButton
                                size="large"
                                className={
                                    isDesktop
                                        ? classes.avatarBox
                                        : isTabletOrMobile
                                        ? classes.avatarBox_medium
                                        : classes.avatarBox
                                }
                            >
                                <Avatar
                                    className={
                                        isDesktop
                                            ? classes.avatar
                                            : isTabletOrMobile
                                            ? classes.avatar_medium
                                            : classes.avatar
                                    }
                                    src={Logo}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                    }}
                                />
                            </IconButton>
                            <Stack
                                spacing={3}
                                className={
                                    isDesktop
                                        ? classes.heardername
                                        : isTabletOrMobile
                                        ? classes.heardername_medium
                                        : classes.heardername
                                }
                            >
                                <Typography>{user.name}</Typography>
                            </Stack>
                            <Button
                                startIcon={<AiOutlineGlobal />}
                                className={
                                    isDesktop
                                        ? classes.urlprofile
                                        : isTabletOrMobile
                                        ? classes.urlprofile_medium
                                        : classes.urlprofile
                                }
                                onClick={() => {
                                    return (
                                        <Navigate replace to={currentRoute} />
                                    );
                                }}
                            >
                                {currentRoute}
                            </Button>
                        </Box>
                        <Box
                            className={
                                isDesktop
                                    ? classes.headerbox
                                    : isTabletOrMobile
                                    ? classes.headerbox_medium
                                    : classes.headerbox
                            }
                        >
                            <Stack spacing={3}>
                                <Typography
                                    className={
                                        isDesktop
                                            ? classes.heardername
                                            : isTabletOrMobile
                                            ? classes.heardername_medium
                                            : classes.heardername
                                    }
                                >
                                    {user.name}
                                </Typography>
                                <Typography
                                    className={
                                        isDesktop
                                            ? classes.infoBox
                                            : isTabletOrMobile
                                            ? classes.infoBox_medium
                                            : classes.infoBox
                                    }
                                >
                                    {user.name}
                                </Typography>
                                <Typography
                                    className={
                                        isDesktop
                                            ? classes.infoBox
                                            : isTabletOrMobile
                                            ? classes.infoBox_medium
                                            : classes.infoBox
                                    }
                                >
                                    {user.name}
                                </Typography>
                                <Typography
                                    className={
                                        isDesktop
                                            ? classes.infoBox
                                            : isTabletOrMobile
                                            ? classes.infoBox_medium
                                            : classes.infoBox
                                    }
                                >
                                    {user.name}
                                </Typography>
                            </Stack>
                        </Box>
                    </Stack>
                </CardContent>
            </Card>
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
        userLoginFail: () => dispatch(actions.userLoginFail()),
        clearUserRedux: () => dispatch(actions.userLoginFail()),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProfileDetail);
