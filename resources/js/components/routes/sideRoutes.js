import React from "react";
import { FaHome, FaInfo, FaUserCircle } from "react-icons/fa";
import About from "../views/guests/About";
import Bio from "../views/guests/Bio";
import Contact from "../views/guests/Contact";
import Home from "../views/guests/Home";

const sideRoutes = [
    {
        name: "Home",
        icon: <FaHome />,
        path: "/",
        component: <Bio />,
    },
    {
        name: "Contact",
        icon: <FaUserCircle />,
        path: "/contact",
        component: <Contact />,
    },
    {
        name: "About",
        icon: <FaInfo />,
        path: "/about",
        component: <About />,
    },
];

export default sideRoutes;
