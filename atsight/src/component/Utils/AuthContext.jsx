import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const storedLogin = localStorage.getItem("isLogin");
  const storedUserInfo = localStorage.getItem("userInfo");

  const [isLogin, setLogin] = useState(storedLogin === "true");

  const [userInfo, setUserInfo] = useState(
    storedUserInfo ? JSON.parse(storedUserInfo) : null,
  );

  const updateUserInfo = (user) => {
    setUserInfo(user);

    if (user) {
      localStorage.setItem("userInfo", JSON.stringify(user));
    } else {
      localStorage.removeItem("userInfo");
    }
  };

  const updateLogin = (value) => {
    setLogin(value);
    localStorage.setItem("isLogin", value ? "true" : "false");
  };

  return (
    <AuthContext.Provider
      value={{
        isLogin,
        setLogin: updateLogin,
        userInfo,
        setUserInfo: updateUserInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
