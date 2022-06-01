import axios from "./index";

class UserApi {
    static GetUserInfo = (data) => {
        return axios.post(`${base}/getuser`, data);
    };
}

let base = "user";

export default UserApi;
