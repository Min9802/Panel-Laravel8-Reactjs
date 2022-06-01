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
import { makeStyles } from "@material-ui/core/styles";

import Logo from "../../assets/images/logo512.png";
import { CompressOutlined } from "@mui/icons-material";
import { FormattedMessage, useIntl } from "react-intl";

import profilestyle from "./styles/profilestyle";
import { List } from "@material-ui/core";
import QRCode from "react-qr-code";
import { useMediaQuery } from "react-responsive";
import InputCustom from "../../components/customs/InputCustom";

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
                } else {
                    history("/signin");
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
    useEffect(() => {
        if (props.user) {
            UserDetail(props.user);
        }
        props.handle.setCardInfo(cardInfo);
    }, [props.user]);
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
                <TabPanel value="2">
                    <Grid container spacing={3}>
                        <Grid item md={4}>
                            <Stack spacing={2} className={`fadeIn first`}>
                                <InputCustom
                                    name={"username"}
                                    type={"text"}
                                    disabled
                                    className={`fadeIn`}
                                    value={user ? user.username : ""}
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
                                    onChange={() => {}}
                                />
                                {/* {formErrs[input.name] ? (
                                    <Typography className={classes.error}>
                                        {formErrs[input.name]}
                                    </Typography>
                                ) : null} */}
                            </Stack>
                        </Grid>
                        <Grid item md={4}>
                            <Stack spacing={2} className={`fadeIn first`}>
                                <InputCustom
                                    name={"name"}
                                    type={"text"}
                                    className={`fadeIn`}
                                    value={user ? user.username : ""}
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
                                    onChange={() => {}}
                                />
                                {/* {formErrs[input.name] ? (
                                    <Typography className={classes.error}>
                                        {formErrs[input.name]}
                                    </Typography>
                                ) : null} */}
                            </Stack>
                        </Grid>
                        <Grid item md={4}>
                            <Stack spacing={2} className={`fadeIn first`}>
                                <InputCustom
                                    name={"name"}
                                    type={"text"}
                                    className={`fadeIn`}
                                    value={user ? user.email : ""}
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
                                    onChange={() => {}}
                                />
                                {/* {formErrs[input.name] ? (
                                    <Typography className={classes.error}>
                                        {formErrs[input.name]}
                                    </Typography>
                                ) : null} */}
                            </Stack>
                        </Grid>
                    </Grid>
                </TabPanel>
                <TabPanel value="3">Item Three</TabPanel>
            </TabContext>
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
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
