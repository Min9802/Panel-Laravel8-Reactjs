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
            headers: { Authorization: "Bearer" + `${data.access_token}` },
        });
    };
    static Info = (data) => {
        return axios.post(`${base}/info`, data, {
            headers: { Authorization: "Bearer" + `${data.access_token}` },
        });
    };
    static Refresh = (data) => {
        return axios.post(`${base}/refresh`, data, {
            headers: { Authorization: "Bearer" + `${data.access_token}` },
        });
    };
    static UpdateInfo = (data) => {
        return axios.post(`${base}/update`, data);
    };
}

let base = "auth";

export default AuthApi;
