import React from "react";
import ListItem from "@mui/material/ListItem";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

import routes from "../../../routes/sideRoutes";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

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
}));
const MenuSideBar = ({ open }) => {
    const classes = useStyles();
    return (
        <>
            {routes.map((route, index) => (
                <NavLink
                    key={index}
                    to={route.path}
                    className={classes.sidenav_navlink}
                >
                    <ListItem
                        key={index}
                        disablePadding
                        sx={{ display: "block" }}
                    >
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? "initial" : "center",
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : "auto",
                                    justifyContent: "center",
                                }}
                            >
                                {route.icon}
                            </ListItemIcon>
                            <Typography variant="h6" noWrap component="div">
                                <ListItemText
                                    secondary={
                                        <FormattedMessage
                                            id={
                                                "menu.guest.sidebar." +
                                                [route.name]
                                            }
                                        />
                                    }
                                    sx={{ opacity: open ? 1 : 0 }}
                                    className={classes.textsidebar}
                                />
                            </Typography>
                        </ListItemButton>
                    </ListItem>
                </NavLink>
            ))}
        </>
    );
};
const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};
export default connect(mapStateToProps)(MenuSideBar);
