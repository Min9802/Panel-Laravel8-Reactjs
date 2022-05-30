import axios from "./index";

class AuthApi {
    static Login = (data) => {
        return axios.post(`${base}/login`, data);
    };

    static Register = (data) => {
        console.log(data);
        return axios.post(`${base}/register`, data);
    };

    static Logout = (data) => {
        return axios.post(`${base}/logout`, data, {
            headers: { Authorization: "Bearer" + `${data.access_token}` },
        });
    };
    static Info = (data) => {
        return axios.get(`${base}/login`, data, {
            headers: { Authorization: "Bearer" + `${data.access_token}` },
        });
    };
}

let base = "auth";

export default AuthApi;
