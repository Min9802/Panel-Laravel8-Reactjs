import React from "react";
import {
    FaSignInAlt,
    FaSignOutAlt,
    FaUserEdit,
    FaWallet,
} from "react-icons/fa";
import Signin from "../views/members/SignIn";
import SignOut from "../views/members/SignOut";
import SignUp from "../views/members/SignUp";

const AuthRoute = [
    {
        name: "signin",
        icon: <FaSignInAlt />,
        path: "/signin",
        component: <Signin />,
        protected: false,
        hidden: false,
    },
    {
        name: "signup",
        icon: <FaSignInAlt />,
        path: "/signup",
        protected: true,
        component: <SignUp />,
        hidden: false,
    },
    {
        name: "signout",
        icon: <FaSignOutAlt />,
        path: "/signout",
        component: <SignOut />,
        protected: true,
        hidden: true,
    },
    {
        name: "profile",
        icon: <FaUserEdit />,
        path: "/profile",
        protected: true,
        hidden: true,
    },
    {
        name: "wallet",
        icon: <FaWallet />,
        path: "/wallet",
        protected: true,
        hidden: true,
    },
];

export default AuthRoute;
