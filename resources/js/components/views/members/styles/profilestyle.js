import { makeStyles } from "@material-ui/core/styles";
export default makeStyles((theme) => {
    return {
        boxprofile: {
            textAlign: "center",
        },
        avatar: {
            marginLeft: "auto",
            marginRight: "auto",
        },
        headerbox: {
            backgroundColor: "#ffe8f0",
            border: "1px solid pink",
            borderRadius: "5px",
            padding: 50,
        },
        boxcontent: {
            textAlign: "center",
            backgroundColor: "#ffe8f0",
            border: "1px solid pink",
            borderRadius: "5px",
            padding: 50,
        },
        heardername: {
            margin: "30px auto 30px auto",
            boder: "1px solid ff3998",
            borderRadius: 40,
            backgroundColor: "#ff3998",
            padding: 20,
            width: 200,
        },
        bodyname: {
            margin: "30px auto 30px auto",
            boder: "1px solid ff3998",
            borderRadius: 40,
            backgroundColor: "#ff3998",
            padding: 20,
            width: 200,
            verticalAlign: "middle",
        },
        QRmodal: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            backgroundColor: "white",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            boder: "1px solid ff3998",
            borderRadius: 5,
            padding: 70,
        },
        QRmodal_medium: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            backgroundColor: "white",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            boder: "1px solid ff3998",
            borderRadius: 5,
            padding: 70,
        },
        QRcode: {
            marginLeft: "auto",
            marginRight: "auto",
        },
    };
});
