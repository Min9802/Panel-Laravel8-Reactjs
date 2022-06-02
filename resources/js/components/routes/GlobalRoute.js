import React from "react";
import { FaUserEdit, FaWallet } from "react-icons/fa";
import Profile from "../views/members/Profile";
import ProfileDetail from "../views/members/ProfileDetail";

const GlobalRoute = [
    {
        name: "profile",
        icon: <FaUserEdit />,
        path: "",
        protected: true,
        component: <ProfileDetail />,
        hidden: true,
        member: true,
    },
];

export default GlobalRoute;
