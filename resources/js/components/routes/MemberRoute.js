import React from "react";
import { FaUserEdit, FaWallet } from "react-icons/fa";
import Profile from "../views/members/Profile";
import ProfileDetail from "../views/members/ProfileDetail";
import Wallet from "../views/members/Wallet";

const MemberRoute = [
    {
        name: "profile",
        icon: <FaUserEdit />,
        path: "/profile",
        protected: true,
        component: <ProfileDetail />,
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

export default MemberRoute;
