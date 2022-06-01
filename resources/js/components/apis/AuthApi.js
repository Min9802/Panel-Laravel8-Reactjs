import axios from "./index";

class AuthApi {
    static SignIn = (data) => {
        return axios.post(`${base}/login`, data);
    };

    static SignUp = (data) => {
        return axios.post(`${base}/register`, data);
    };

    static SignOut = (data) => {
        return axios.post(`${base}/logout`, data, {
            headers: { Authorization: "Bearer" + `${data.token}` },
        });
    };
    static Info = (data) => {
        return axios.post(`${base}/info`, data, {
            headers: { Authorization: "Bearer" + `${data.token}` },
        });
    };
}

let base = "auth";

export default AuthApi;
