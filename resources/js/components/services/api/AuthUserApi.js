import React, { useState } from "react";
import AuthApi from "../../apis/AuthApi";
class AuthUserApi {
    static Signin = async (data) => {
        try {
            let response = await AuthApi.Signin(data);
            return response;
        } catch (err) {
            return err.response;
        }
    };
}

export default AuthUserApi;
