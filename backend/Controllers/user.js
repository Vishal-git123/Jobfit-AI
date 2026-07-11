const UserModel = require('../Models/user');
exports.register = async(req,res)=>{
    try{
      const{name,email,PhotoUrl}=req.body;
      const userExist = await UserModel.findOne({email:email});
      if(!userExist){
        let newUser = new UserModel({ name, email, PhotoUrl });
        await newUser.save();
        return res.status(200).json({
            message:"User Registered Successfully",
            user:newUser
        })
      }
       return res.status(200).json({
         message: "Welcome Back",
         user: userExist,
       })
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Server error',message:err.message});
    }
}