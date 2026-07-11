const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
    destination:(req,file,cb)=> cb(null,"uploads/"),
    filename :(req,file,cb) =>cb(null,Date.now()+path.extname(file.originalname))
});
const filefilter =(req,file,cb)=>{
    if(file.mimetype === "application/pdf")cb(null,true);
    else cb(new Error("Only PDF allowed"),false);
};
exports.upload = multer({storage,filefilter});
