import * as React from "react";
import Box from "@mui/material/Box";

import { BottomNavigation, BottomNavigationAction } from "@mui/material";

import { Restore, Favorite } from "@mui/icons-material";

import Paper from "@mui/material/Paper";

export default function FixedBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const ref = React.useRef(null);

  return (
    <Box sx={{}} ref={ref}>
      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          width: "100%",
          paddingLeft: 5,
        }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="Recents" icon={<Restore />} />
          <BottomNavigationAction label="Favorites" icon={<Favorite />} />
          <BottomNavigationAction label="By Min" />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
