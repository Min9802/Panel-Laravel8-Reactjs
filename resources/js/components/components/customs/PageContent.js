import React, { useEffect, useState } from "react";
import {
    CardActions,
    CardContent,
    CardHeader,
    Container,
} from "@material-ui/core";
import { Card } from "@mui/material";

const PageContent = (props) => {
    const [cardInfo, setCardInfo] = useState(false);
    const [alert, setAlert] = useState(false);
    const ChirenPages = React.cloneElement(props.children, {
        handle: { setAlert, setCardInfo },
    });
    useEffect(() => {
        console.log(props);
    }, []);
    return (
        <Card>
            <CardHeader
                avatar={cardInfo.avatar}
                title={cardInfo.title}
            ></CardHeader>
            <CardContent>{ChirenPages}</CardContent>
            <CardActions>{cardInfo.actions}</CardActions>
        </Card>
    );
};

export default PageContent;
