const {login,register} = require('../services/userService');

const authRegister =async(req,res) =>{
  const {firstName,lastName,userName,email,password} = req.body;
  try{
    if (!firstName || !lastName || !userName || !email || !password) {
       resStatus(res,400,{message:"Empty fields"});
    }else{
    const token = await register(firstName,lastName,userName,email,password);
    resStatus(res,201,{ token });
    }
  }catch(error){
    if(error.message === "User with given email already Exist!"){
      resStatus(res,209,{message:"User with given email already Exist!"});
    }else{
      resStatus(res,400,{ message: error.message });
    }
  }
}



const authLogin =async(req,res) =>{
  const {email,password} = req.body;
  try{
    if (!email || !password) {
       resStatus(res,400,{message:"Empty fields"});
    }else{
    const token = await login(email,password);
    resStatus(res,201,{ token });
    }
  }catch(error){
    if(error.message === "Invalid Email"){
      resStatus(res,401,{message:"Invalid Email"});
    }
    else if(error.message === "Invalid Password"){
      resStatus(res,401,{message:"Invalid Password"});
    }else{
    resStatus(res,400,{ message: error.message });
    }
  }
}
const resStatus = (res,code,customMessage) =>{
  res.status(code).json(customMessage);
}

module.exports = {authLogin,authRegister};