import React, { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import { makeStyles } from "@material-ui/core/styles";

import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import CssBaseline from "@mui/material/CssBaseline";

import { Typography, MenuItem, Menu, Avatar, Badge } from "@mui/material";

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import Drawers from "./patials/Drawers";
import { Link } from "react-router-dom";
import {
    FaUserCircle,
    FaSignInAlt,
    FaSignOutAlt,
    FaUserEdit,
    FaWallet,
    FaBell,
    FaInbox,
} from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi";
import { ListItemIcon, ListItemText } from "@material-ui/core";
import { connect, useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import AuthRoute from "../../routes/AuthRoute";
import MemberRoute from "../../routes/MemberRoute";
import { FormattedMessage } from "react-intl";

import EN from "../../assets/images/lang/EN.png";
import VI from "../../assets/images/lang/VI.png";

import { LANGUAGES } from "../../utils";

import * as actions from "../../store/actions";

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
    }),
}));

//style
const useStyles = makeStyles((theme) => {
    return {
        sidenav_Link: {
            textDecoration: "none",
        },
        textsidebar: {
            fontWeight: "bold",
            fontSize: "",
            fontFamily: "Roboto",
            textTransform: "uppercase",
        },
        authButton: {
            position: "absolute",
            right: 0,
        },
        urlAuth: {
            textDecoration: "none",
            color: "rgba(0, 0, 0, 0.87)",
        },
        UserName: {
            fontWeight: "bold",
            fontSize: "",
            fontFamily: "Roboto",
            textTransform: "uppercase",
            paddingRight: 10,
        },
        lang: {
            height: 28,
            width: 28,
            margin: "auto 5% auto auto",
        },
    };
});
const MiniDrawer = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const [auth, setAuth] = useState(false);

    ////
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    ///
    const { MIX_APP_NAME } = process.env;
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const [cookies, setCookie, removeCookie] = useCookies([
        "access_token",
        "user",
    ]);
    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleChangeLang = () => {
        props.language === "en"
            ? props.changeLanguageAppRedux(LANGUAGES.VI)
            : props.changeLanguageAppRedux(LANGUAGES.EN);
    };

    useEffect(() => {
        if (props.user) {
            setAuth(props.user);
        } else {
            setAuth(false);
            props.clearUserRedux();
        }
    });
    const menuId = "primary-search-account-menu";
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            {auth
                ? AuthRoute.map((route, key) => {
                      if (route.protected && route.hidden) {
                          return (
                              <MenuItem key={key}>
                                  <ListItemIcon>{route.icon}</ListItemIcon>
                                  <Link
                                      to={route.path}
                                      className={classes.urlAuth}
                                  >
                                      <ListItemText>
                                          <FormattedMessage
                                              id={"menu.member." + route.name}
                                          />
                                      </ListItemText>
                                  </Link>
                              </MenuItem>
                          );
                      }
                  })
                : AuthRoute.map((route, key) => {
                      if (!route.protected) {
                          return (
                              <MenuItem key={key}>
                                  <ListItemIcon>{route.icon}</ListItemIcon>
                                  <Link
                                      to={route.path}
                                      className={classes.urlAuth}
                                  >
                                      <ListItemText>
                                          <FormattedMessage
                                              id={"menu.member." + [route.name]}
                                          />
                                      </ListItemText>
                                  </Link>
                              </MenuItem>
                          );
                      }
                  })}
        </Menu>
    );
    const mobileMenuId = "primary-search-account-menu-mobile";
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton
                    size="large"
                    color="inherit"
                    onClick={handleChangeLang}
                >
                    <Avatar
                        src={props.language === "en" ? EN : VI}
                        style={{ height: 28, width: 28 }}
                    />
                </IconButton>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="medium"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <FaUserCircle />
                    {auth ? (
                        <>{auth.name}</>
                    ) : (
                        <FormattedMessage id={"menu.header.account"} />
                    )}
                </IconButton>
            </MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: "none" }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Link to="/" className={classes.sidenav_Link}>
                        <Typography
                            className={classes.textsidebar}
                            variant="h6"
                            noWrap
                            color="white"
                            component="div"
                        >
                            {MIX_APP_NAME}
                        </Typography>
                    </Link>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: "none", md: "flex" } }}>
                        <IconButton
                            size="large"
                            color="inherit"
                            style={{
                                position: "absolute",
                                marginRight: 50,
                                right: 80,
                            }}
                        >
                            {auth ? (
                                <Typography
                                    className={classes.UserName}
                                    variant="h6"
                                    noWrap
                                    color="white"
                                    component="div"
                                >
                                    {auth.name}
                                </Typography>
                            ) : null}
                        </IconButton>
                        <IconButton
                            size="large"
                            color="inherit"
                            onClick={handleChangeLang}
                        >
                            <Avatar
                                src={props.language === "en" ? EN : VI}
                                style={{ height: 28, width: 28 }}
                            />
                        </IconButton>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <FaUserCircle />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <FiMoreVertical />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
            <Drawers
                Drawer={Drawer}
                DrawerHeader={DrawerHeader}
                handleDrawerClose={handleDrawerClose}
                theme={theme}
                open={open}
                SideBarRoutes={props.SideBarRoutes}
            />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                {props.Content}
            </Box>
        </Box>
    );
};
const mapStateToProps = (state) => {
    return {
        user: state.user.userInfo,
        language: state.app.language,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        changeLanguageAppRedux: (language) =>
            dispatch(actions.changeLanguageApp(language)),
        clearUserRedux: () => dispatch(actions.userLoginFail()),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(MiniDrawer);
