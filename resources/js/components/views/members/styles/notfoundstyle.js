import { makeStyles } from "@material-ui/core/styles";
export default makeStyles((styles) => {
    return {
        content_big: {
            width: "100%",
            minHeight: 300,
            maxHeight: 500,
            textAlign: "center",
            position: "relative",
            zIndex: 0,
            "&:text1_big": {
                position: "absolute",
            },
            "&:number_big": {
                position: "absolute",
            },
            "&:number_medium": {
                position: "absolute",
            },
            "&:text1_medium": {
                position: "absolute",
            },
            padding: "auto",
        },
        number_big: {
            fontSize: "500%",
            zIndex: 2,
            fontWeight: "bold",
            padding: 70,
            textShadow: "-1px -1px 1px #000, 1px 1px 1px #000",
            position: "relative",
            backdropFilter: "blur(5px)",
        },
        text1_big: {
            fontSize: "1300%",
            color: "#999999",
            position: "absolute",
            top: 0,
            left: "20%",
            padding: "auto",
            zIndex: 1,
            overflowX: "hidden",
            textShadow: "-1px -1px 1px #999999, 1px 1px 1px #000",
        },
        text2_big: {
            margin: "auto",
            textAlign: "center",
        },
        number_medium: {
            fontSize: "500%",
            zIndex: 2,
            fontWeight: "bold",
            padding: "30%",
            textShadow: "-1px -1px 1px #000, 1px 1px 1px #000",
            position: "relative",
            backdropFilter: "blur(5px)",
        },
        text1_medium: {
            fontSize: "500%",
            color: "#999999",
            position: "absolute",
            top: 0,
            padding: "auto",
            zIndex: 1,
            overflowX: "hidden",
            textShadow: "-1px -1px 1px #999999, 1px 1px 1px #000",
            textAlign: "center",
            padding: "auto",
            paddingTop: "15%",
        },
        text2_medium: {
            margin: "auto",
            textAlign: "center",
        },
        action: {
            position: "relative",
            textAlign: "center",
        },
        nav_custom: {
            textDecoration: "none",
            marginLeft: "auto",
            marginRight: "auto",
        },
    };
});
