import React, { useContext } from "react";
import styles from "./Login.module.css";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import GoogleIcon from "@mui/icons-material/Google";
import { auth, provider } from "../Utils/firebase";
import { signInWithPopup } from "firebase/auth";
import { AuthContext } from "../Utils/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "../Utils/axios";

const Login = () => {
  const { setLogin, setUserInfo } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      // 1. Google Sign In
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // 2. Prepare User Data
      const userData = {
        name: user.displayName,
        email: user.email,
        photoUrl: user.photoURL,
      };

      console.log("Firebase User Data:", userData);

      // 3. Send User Data to Backend
      const response = await axios.post("/api/user", userData);

      console.log("Backend User Response:", response.data);

      const loggedInUser = response.data.user;

      console.log("Logged In User:", loggedInUser);

      if (!loggedInUser || !loggedInUser._id) {
        throw new Error("Backend did not return a valid user");
      }

      // 4. Update Auth Context
      setUserInfo(loggedInUser);
      setLogin(true);

      // 5. Navigate
      navigate("/dashboard");
    } catch (err) {
      console.error("Login Error:", err.response?.data || err.message);

      alert(
        err.response?.data?.message ||
          err.message ||
          "Something went wrong during login"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.Login}>
      <div className={styles.loginContainer}>
        <div className={styles.loginCard}>
          <div className={styles.loginCardTitle}>
            <h1>JobFit AI</h1>
            <VpnKeyIcon />
          </div>
          
          <p className={styles.subtitleText}>
            Smart Resume Analysis Powered by AI
          </p>

          <div className={styles.divider}></div>

          <button 
            className={styles.googleBtn} 
            onClick={handleLogin}
            disabled={isLoading}
          >
            <GoogleIcon />
            <span>{isLoading ? "Signing in..." : "Sign in with Google"}</span>
          </button>

          <p className={styles.footerText}>
            Secure login with Google. Your data is protected.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;