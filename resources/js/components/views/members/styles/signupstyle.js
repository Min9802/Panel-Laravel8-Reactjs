import { makeStyles } from "@material-ui/core/styles";
export default makeStyles((theme) => {
    return {
        wrapper: {
            width: 400,
            margin: "10% auto auto auto",
            padding: "3%",
            border: "1px solid",
            borderRadius: "5px",
            boxShadow: "2px 2px",
        },
        wrapper_medium: {
            width: 300,
            margin: "10% auto auto auto",

            padding: "3%",
            border: "1px solid",
            borderRadius: "5px",
            boxShadow: "2px 2px",
        },
        headerform: {
            marginBottom: "10%",
        },
        title: {
            marginLeft: "auto",
            marginRight: "auto",
        },
        bottom_nav: {
            marginTop: 20,
        },
        loading: {
            marginTop: "10%",
            padding: "10%",
        },
        error: {
            color: "red",
            border: "1px solid red",
            borderRadius: "5px",
            backgroundColor: "#f3f3f3",
        },
    };
});
