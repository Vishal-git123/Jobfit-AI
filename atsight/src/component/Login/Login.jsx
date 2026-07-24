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

  const handleLogin = async () => {
    try {
      // Google Sign In
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // User Data
      const userData = {
        name: user.displayName,
        email: user.email,
        photoUrl: user.photoURL,
      };

      // Update Context
     await axios.post('/api/user',userData).then(
      (response)=>{
        setUserInfo(response.data.user);
         localStorage.setItem("userInfo", JSON.stringify(response.data.user));
      }).catch(err =>{
        console.log(err);
      }
     )
      setLogin(true);
      localStorage.setItem("isLogin", "true");
     
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Something Went Wrong");
    }
  };

  return (
    <div className={styles.Login}>
      <div className={styles.loginCard}>
        <div className={styles.loginCardTitle}>
          <h1>Login</h1>
          <VpnKeyIcon />
        </div>

        <div className={styles.googleBtn} onClick={handleLogin}>
          <GoogleIcon sx={{ fontSize: 20, color: "red" }} />
          <span>Sign in with Google</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
