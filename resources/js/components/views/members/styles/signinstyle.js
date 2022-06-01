import { makeStyles } from "@material-ui/core/styles";
export default makeStyles((theme) => {
    return {
        wrapper: {
            width: 400,
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "15%",
            marginBottom: "auto",

            padding: "3%",
            border: "1px solid",
            borderRadius: "5px",
            boxShadow: "2px 2px",
        },
        wrapper_medium: {
            width: 300,
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "30%",
            marginBottom: "auto",

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
    };
});
