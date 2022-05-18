import React from "react";
import {
    FaSignInAlt,
    FaSignOutAlt,
    FaUserEdit,
    FaWallet,
} from "react-icons/fa";
import Signin from "../views/members/SignIn";
import SignOut from "../views/members/SignOut";
const AuthRoute = [
    {
        name: "Sign In",
        icon: <FaSignInAlt />,
        path: "signin",
        component: <Signin />,
        protected: false,
    },
    {
        name: "Sign Up",
        icon: <FaSignInAlt />,
        path: "signup",
        protected: false,
    },
    {
        name: "Sign Out",
        icon: <FaSignOutAlt />,
        path: "signout",
        component: <SignOut />,
        protected: true,
    },
    {
        name: "Profile",
        icon: <FaUserEdit />,
        path: "profile",
        protected: true,
    },
    {
        name: "Wallet",
        icon: <FaWallet />,
        path: "wallet",
        protected: true,
    },
];

export default AuthRoute;
