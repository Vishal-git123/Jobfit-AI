const  express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;
require('./conn');
app.use(express.json());
app.use(cors({
    credentials : true,
    origin:"http://localhost:5173"

}))
const UserRoutes = require('./Routes/user');
const ResumeRoutes = require('./Routes/resume');
app.use('/api/user',UserRoutes);
app.use("/api/resume", ResumeRoutes);
 app.listen(PORT,()=>{
    console.log("backend is running on port", PORT)
        
    
})