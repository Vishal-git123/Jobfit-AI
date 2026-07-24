import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

const withAuthHOC = (WrappedComponent) => {
  return function AuthenticatedComponent(props) {
    const navigate = useNavigate();
    const { isLogin, setLogin } = useContext(AuthContext);

    useEffect(() => {
      const login = localStorage.getItem("isLogin");

      if (login !== "true") {
        setLogin(false);
        navigate("/");
      }
    }, [navigate, setLogin]);

    if (!isLogin || localStorage.getItem("isLogin") !== "true") {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuthHOC;
