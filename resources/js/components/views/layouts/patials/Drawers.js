import React from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";

import MenuSideBar from "./MenuSideBar";
const Drawers = ({
  Drawer,
  DrawerHeader,
  handleDrawerClose,
  open,
  theme,
  routes,
}) => {
  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <List>
        <MenuSideBar open={open} routes={routes} />
      </List>
    </Drawer>
  );
};

export default Drawers;
