
import { useState, useEffect, useContext } from "react";
import styles from "./History.module.css";
import { Skeleton } from "@mui/material";
import WithAuthHOC from "../Utils/HOC/withAuthHOC";
import axios from "../Utils/axios";
import { AuthContext } from "../Utils/AuthContext";

const History = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const { userInfo } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userInfo?._id) return;

      setLoader(true);

      try {
        const results = await axios.get("/api/resume/get/" + userInfo._id);

        console.log(results.data.resumes);
        setData(results.data.resumes || []);
      } catch (err) {
        console.log(err);
        alert("Something Went Wrong");
      } finally {
        //setLoader(false);
      }
    };

    fetchUserData();
  }, [userInfo?._id]);

  return (
    <div className={styles.History}>
      <div className={styles.HistoryCardBlock}>
        {loader && (
          <>
            <Skeleton
              variant="rectangular"
              width={266}
              height={200}
              sx={{ borderRadius: "20px" }}
            />
            <Skeleton
              variant="rectangular"
              width={266}
              height={200}
              sx={{ borderRadius: "20px" }}
            />
            <Skeleton
              variant="rectangular"
              width={266}
              height={200}
              sx={{ borderRadius: "20px" }}
            />
            <Skeleton
              variant="rectangular"
              width={266}
              height={200}
              sx={{ borderRadius: "20px" }}
            />
          </>
        )}

        {data.map((item) => (
          <div key={item._id} className={styles.HistoryCard}>
            <div className={styles.cardPercentage}>{item.score}%</div>

            <p>Resume Name: {item.resume_name}</p>

            <p>{item.feedback}</p>

            <p>Dated: {item.createdAt?.slice(0, 10)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WithAuthHOC(History);

