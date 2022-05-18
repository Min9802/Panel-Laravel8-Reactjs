import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const userContext = createContext(null);

const UserProvider = ({ userData }) => {
  let [user, setUser] = useState(userData);
  user = typeof user === "string" ? JSON.parse(user) : user;
  return (
    <userContext.Provider value={{ user, setUser }}></userContext.Provider>
  );
};
UserProvider.propTypes = {
  userData: PropTypes.any,
};
const userAuth = () => {
  userContext(UserProvider);
};
export default userAuth;
