import React, { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import { makeStyles } from "@material-ui/core/styles";

import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import CssBaseline from "@mui/material/CssBaseline";

import { Typography, MenuItem, Menu } from "@mui/material";

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import Drawers from "./patials/Drawers";
import { Link, NavLink } from "react-router-dom";
import {
    FaUserCircle,
    FaSignInAlt,
    FaSignOutAlt,
    FaUserEdit,
    FaWallet,
} from "react-icons/fa";
import { ListItemIcon, ListItemText } from "@material-ui/core";
import { connect } from "react-redux";
import { useCookies } from "react-cookie";
import AuthRoute from "../../routes/AuthRoute";

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
const useStyles = makeStyles((theme) => ({
    sidenav_navlink: {
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
}));
const MiniDrawer = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [auth, setAuth] = useState(false);
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

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    useEffect(() => {
        if (cookies.user) {
            setAuth(cookies.user);
        }
    });
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
                    <NavLink to="/" className={classes.sidenav_navlink}>
                        <Typography
                            className={classes.textsidebar}
                            variant="h6"
                            noWrap
                            color="white"
                            component="div"
                        >
                            {MIX_APP_NAME}
                        </Typography>
                    </NavLink>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                        style={{ position: "absolute", right: 20 }}
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

                        <FaUserCircle />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        {auth
                            ? AuthRoute.map((route, key) => {
                                  if (route.protected) {
                                      return (
                                          <MenuItem key={key}>
                                              <ListItemIcon>
                                                  {route.icon}
                                              </ListItemIcon>
                                              <NavLink
                                                  to={route.path}
                                                  className={classes.urlAuth}
                                              >
                                                  <ListItemText>
                                                      {route.name}
                                                  </ListItemText>
                                              </NavLink>
                                          </MenuItem>
                                      );
                                  }
                              })
                            : AuthRoute.map((route, key) => {
                                  if (!route.protected) {
                                      return (
                                          <MenuItem key={key}>
                                              <ListItemIcon>
                                                  {route.icon}
                                              </ListItemIcon>
                                              <NavLink
                                                  to={route.path}
                                                  className={classes.urlAuth}
                                              >
                                                  <ListItemText>
                                                      {route.name}
                                                  </ListItemText>
                                              </NavLink>
                                          </MenuItem>
                                      );
                                  }
                              })}
                    </Menu>
                </Toolbar>
            </AppBar>
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
        state: state,
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
export default connect(mapStateToProps, mapDispatchToProps)(MiniDrawer);
