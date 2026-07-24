import { useState,useEffect } from 'react';
import styles from './Admin.module.css';
import { Skeleton } from "@mui/material";
import axios from "../Utils/axios";
import WithAuthHOC from "../Utils/HOC/withAuthHOC";
const Admin = () => {
  const [data, setData] = useState([]);
    const [loader, setLoader] = useState(false);
    useEffect(()=>{
      const fetchAlldata = async()=>{
        setLoader(true);
       try{
        const results = await axios.get('/api/resume/get');
        console.log(results.data);
       }catch(err){
        console.log(err);
        alert("Something went wrong");
       }finally{
        setLoader(false);
       }
      }
      fetchAlldata();
    },[])
  return (
    <div className={styles.Admin}>
      <div className={styles.AdminBlock}>
        <Skeleton
                          variant="rectangular"
                          sx={{ borderRadius: "20px" }}
                          width={280}
                          height={400}
                          sx={{borderRadius:"20px"}}
                        />
        <div className={styles.AdminCard}>
          <h2>Coding Hunger</h2>
          <p style={{ color: "blue" }}>vishal@gmail.com</p>
          <h3>Score:50%</h3>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut eum
            non, corrupti ipsum vero magni suscipit, excepturi libero voluptatem
            quod numquam doloribus repudiandae voluptatibus vitae quas! Ipsam
            voluptatum unde animi!
          </p>
        </div>
        <div className={styles.AdminCard}>
          <h2>Coding Hunger</h2>
          <p style={{ color: "blue" }}>vishal@gmail.com</p>
          <h3>Score:50%</h3>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut eum
            non, corrupti ipsum vero magni suscipit, excepturi libero voluptatem
            quod numquam doloribus repudiandae voluptatibus vitae quas! Ipsam
            voluptatum unde animi!
          </p>
        </div>
        <div className={styles.AdminCard}>
          <h2>Coding Hunger</h2>
          <p style={{ color: "blue" }}>vishal@gmail.com</p>
          <h3>Score:50%</h3>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut eum
            non, corrupti ipsum vero magni suscipit, excepturi libero voluptatem
            quod numquam doloribus repudiandae voluptatibus vitae quas! Ipsam
            voluptatum unde animi!
          </p>
        </div>
        <div className={styles.AdminCard}>
          <h2>Coding Hunger</h2>
          <p style={{ color: "blue" }}>vishal@gmail.com</p>
          <h3>Score:50%</h3>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut eum
            non, corrupti ipsum vero magni suscipit, excepturi libero voluptatem
            quod numquam doloribus repudiandae voluptatibus vitae quas! Ipsam
            voluptatum unde animi!
          </p>
        </div>
        <div className={styles.AdminCard}>
          <h2>Coding Hunger</h2>
          <p style={{ color: "blue" }}>vishal@gmail.com</p>
          <h3>Score:50%</h3>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut eum
            non, corrupti ipsum vero magni suscipit, excepturi libero voluptatem
            quod numquam doloribus repudiandae voluptatibus vitae quas! Ipsam
            voluptatum unde animi!
          </p>
        </div>
      </div>
    </div>
  );
}

export default WithAuthHOC (Admin);