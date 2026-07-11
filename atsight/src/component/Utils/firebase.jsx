
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyBXnOWvEK_C4D7kbjmqoCB-F1VLz04TD_8",
  authDomain: "atsight-59ac9.firebaseapp.com",
  projectId: "atsight-59ac9",
  storageBucket: "atsight-59ac9.firebasestorage.app",
  messagingSenderId: "629347179366",
  appId: "1:629347179366:web:a30ac10cefa5e368d306a7",
  measurementId: "G-ZRPDCWV8XF",
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
