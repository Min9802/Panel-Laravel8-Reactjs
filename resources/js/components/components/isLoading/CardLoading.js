import { Card, CardHeader } from "@material-ui/core";
import {
  Avatar,
  CardActions,
  CardContent,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";
import React from "react";

const CardLoading = () => {
  return (
    <Card>
      <CardHeader
        avatar={<Avatar />}
        title={
          <Skeleton width="100%">
            <Typography>.</Typography>
          </Skeleton>
        }
      ></CardHeader>
      <CardContent>
        <Skeleton width="100%">
          <Grid container wrap="nowrap" spacing={2}>
            <Typography>.</Typography>
          </Grid>
          <Grid container wrap="nowrap" spacing={2}>
            <Typography>.</Typography>
          </Grid>
        </Skeleton>
      </CardContent>
      <CardActions>
        <Skeleton width="100%">
          <Typography>.</Typography>
        </Skeleton>
      </CardActions>
    </Card>
  );
};

export default CardLoading;
