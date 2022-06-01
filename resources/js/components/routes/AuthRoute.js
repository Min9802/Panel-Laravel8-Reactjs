import React from "react";
import {
    FaSignInAlt,
    FaSignOutAlt,
    FaUserEdit,
    FaWallet,
} from "react-icons/fa";
import Profile from "../views/members/Profile";
import Signin from "../views/members/SignIn";
import SignOut from "../views/members/SignOut";
import SignUp from "../views/members/SignUp";
import Wallet from "../views/members/Wallet";

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
        component: <Profile />,
        hidden: true,
        member: true,
    },
    {
        name: "wallet",
        icon: <FaWallet />,
        path: "/wallet",
        protected: true,
        component: <Wallet />,
        hidden: true,
        member: true,
    },
];

export default AuthRoute;
