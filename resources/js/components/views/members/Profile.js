import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import {
    useNavigate,
    useLocation,
    Navigate,
    Link,
    Redirect,
} from "react-router-dom";
import AuthApi from "../../apis/AuthApi";
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
    Tab,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Modal,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

import { FaUserCircle, FaInfo, FaInbox } from "react-icons/fa";
import {
    AiOutlineGlobal,
    AiOutlineQrcode,
    AiOutlineMail,
} from "react-icons/ai";
import { MdExpandMore, MdMail } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import { makeStyles } from "@material-ui/core/styles";

import Logo from "../../assets/images/logo512.png";
import { CompressOutlined } from "@mui/icons-material";
import { FormattedMessage, useIntl } from "react-intl";

import profilestyle from "./styles/profilestyle";
import { List } from "@material-ui/core";
import QRCode from "react-qr-code";
import { useMediaQuery } from "react-responsive";
import InputCustom from "../../components/customs/InputCustom";
import * as actions from "../../store/actions";

const Profile = (props) => {
    const classes = profilestyle();
    const intl = useIntl();
    const location = useLocation();

    const dispatch = useDispatch();
    const history = useNavigate();
    const [card, setCard] = useState(false);
    const [user, setUser] = useState(false);
    const [tab, setTab] = useState("1");

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const UserDetail = async (user) => {
        try {
            let response = await AuthApi.Info(user);
            if (response.status === 200) {
                setUser(response.data);
            }
        } catch (err) {
            return Swal.fire({
                title: intl.formatMessage({
                    id: "swal.title.error",
                }),
                text: intl.formatMessage({
                    id: "swal.logout.needsignin",
                }),
                icon: "error",
                confirmButtonText: intl.formatMessage({
                    id: "common.ok",
                }),
            }).then((result) => {
                if (result.isConfirmed) {
                    history("/signin");
                    props.userLoginFail();
                } else {
                    history("/signin");
                    props.userLoginFail();
                }
            });
        }
    };
    const cardInfo = {
        title: intl.formatMessage({
            id: "user.profile.title",
        }),
        avatar: null,
    };
    const isDesktop = useMediaQuery({
        query: "(min-width: 1224px)",
    });
    const isMobile = useMediaQuery({
        query: "(min-width: 375px)(max-width: 1224px)",
    });
    const isTablet = useMediaQuery({ query: "(min-width: 768px)" });
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

    const [values, setValues] = useState({
        username: "",
        name: "",
        email: "",
    });

    const currentRoute = window.location.href;
    const handleChange = (event, newValue) => {
        setTab(newValue);
    };
    const GenerateQR = (value) => {
        handleOpen();
    };
    const QRGenerate = (value) => {
        return <QRCode value={value.value} bgColor="#FFFFFF" level="H" />;
    };
    const [rerender, setRenderer] = useState(false);

    const onChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };
    const handleUpdate = async (e) => {
        e.preventDefault();
        let responseUpdate = await AuthApi.UpdateInfo(values);
        if (responseUpdate.status === 200) {
            let refresh = await AuthApi.Refresh(props.user);
            if (refresh.status === 200) {
                let user = { ...refresh.data.user };
                user.access_token = refresh.data.access_token;
                props.userLoginSuccessRedux(user);
                setRenderer(false);
            } else {
                props.clearUserRedux();
                setRenderer(false);
            }
        } else {
            props.clearUserRedux();
            setRenderer(false);
        }
    };
    useEffect(() => {
        if (props.user) {
            UserDetail(props.user);
        }
        if (!rerender && props.user) {
            setValues(props.user);
            setRenderer(true);
        }

        props.handle.setCardInfo(cardInfo);
    }, [props.user, values]);
    return (
        <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={tab}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList onChange={handleChange} aria-label="tab profile">
                        <Tab
                            label={intl.formatMessage({
                                id: "user.profile.tab.info",
                            })}
                            value="1"
                        />
                        <Tab
                            label={intl.formatMessage({
                                id: "user.profile.tab.editinfo",
                            })}
                            value="2"
                        />
                        <Tab
                            label={intl.formatMessage({
                                id: "user.profile.tab.security",
                            })}
                            value="3"
                        />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    {/* account */}
                    <Accordion>
                        <AccordionSummary
                            id="username"
                            expandIcon={<MdExpandMore />}
                        >
                            <Typography>
                                <FormattedMessage id={"user.profile.account"} />
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <List>
                                <ListItem>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <FaUserCircle />
                                        </ListItemIcon>
                                        <ListItemText>{user.name}</ListItemText>
                                    </ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <FaUserCircle />
                                        </ListItemIcon>
                                        <ListItemText>{user.name}</ListItemText>
                                    </ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <MdMail />
                                        </ListItemIcon>
                                        <ListItemText>
                                            {user.email}
                                        </ListItemText>
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        </AccordionDetails>
                    </Accordion>
                    {/* end account */}
                    {/* Bio */}
                    <Accordion>
                        <AccordionSummary
                            id="username"
                            expandIcon={<MdExpandMore />}
                        >
                            <Typography>
                                <FormattedMessage id={"user.profile.bio"} />
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <ListItem>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <AiOutlineGlobal />
                                    </ListItemIcon>
                                    <ListItemText>
                                        <Button>
                                            {currentRoute +
                                                "/@" +
                                                user.username}
                                        </Button>
                                    </ListItemText>
                                </ListItemButton>
                                <ListItemButton
                                    onClick={() => {
                                        GenerateQR();
                                    }}
                                >
                                    <ListItemIcon>
                                        <AiOutlineQrcode />
                                    </ListItemIcon>
                                    <ListItemText>
                                        <FormattedMessage
                                            id={"user.profile.createqr"}
                                        />
                                    </ListItemText>
                                </ListItemButton>
                            </ListItem>
                        </AccordionDetails>
                    </Accordion>
                    {/* end Bio */}
                </TabPanel>
                {/* edit profile */}
                <TabPanel value="2">
                    <Grid container spacing={3}>
                        <Grid item md={4}>
                            <Stack spacing={2}>
                                <InputCustom
                                    name={"username"}
                                    type={"text"}
                                    disabled
                                    className={`fadeIn first`}
                                    value={values.username}
                                    label={
                                        <FormattedMessage
                                            id={"form.edit.username"}
                                        />
                                    }
                                    placeholder={intl.formatMessage({
                                        id: "form.placeholder.username",
                                    })}
                                    iconStart={<FaUserCircle />}
                                    iconEnd={""}
                                    handleFunc={""}
                                    onChange={(e) => {
                                        onChange(e);
                                    }}
                                />
                                <InputCustom
                                    name={"name"}
                                    type={"text"}
                                    className={`fadeIn second`}
                                    value={values.name}
                                    label={
                                        <FormattedMessage
                                            id={"form.edit.name"}
                                        />
                                    }
                                    placeholder={intl.formatMessage({
                                        id: "form.placeholder.name",
                                    })}
                                    iconStart={<FaUserCircle />}
                                    iconEnd={""}
                                    handleFunc={""}
                                    onChange={(e) => {
                                        onChange(e);
                                    }}
                                />
                                <InputCustom
                                    name={"email"}
                                    type={"text"}
                                    className={`fadeIn third`}
                                    value={values.email}
                                    label={
                                        <FormattedMessage
                                            id={"form.edit.email"}
                                        />
                                    }
                                    placeholder={intl.formatMessage({
                                        id: "form.placeholder.email",
                                    })}
                                    iconStart={<AiOutlineMail />}
                                    iconEnd={""}
                                    handleFunc={""}
                                    onChange={(e) => {
                                        onChange(e);
                                    }}
                                />
                                <Button
                                    type="submit"
                                    className={`fadeIn fourth`}
                                    startIcon={<GrUpdate />}
                                    onClick={(e) => handleUpdate(e)}
                                >
                                    <FormattedMessage id={"common.update"} />
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                </TabPanel>
                {/* end edit profile */}
                <TabPanel value="3">
                    <FormattedMessage id={"user.profile.tab.security"} />
                </TabPanel>
            </TabContext>
            {/* Modal QR */}
            <Modal open={open} onClose={handleClose}>
                <Box
                    className={
                        isDesktop
                            ? classes.QRmodal
                            : isTabletOrMobile
                            ? classes.QRmodal_medium
                            : classes.QRmodal
                    }
                >
                    <Stack spacing={2}>
                        <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                        >
                            <FormattedMessage id={"user.profile.modelQR"} />
                        </Typography>
                        <Box>
                            <QRGenerate
                                value={currentRoute + "/@" + user.username}
                            />
                        </Box>
                    </Stack>
                </Box>
            </Modal>
            {/* End Modal QR */}
        </Box>
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
        userLoginSuccessRedux: (user) =>
            dispatch(actions.userLoginSuccess(user)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
