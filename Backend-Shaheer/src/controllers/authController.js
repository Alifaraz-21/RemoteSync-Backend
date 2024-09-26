const {login} = require('../services/userService');

const authLogin =async(req,res) =>{
  const {email,password} = req.body;
  try{
    if (!email || !password) {
       resStatus(res,400,{message:"Empty fields"});
    }
    const token = await login(email,password);
    resStatus(res,201,{ token });
  }catch(error){
    if(error.message === "Invalid email or password"){
      resStatus(res,401,{message:"Invalid email or password"});
    }
    else if(error.message === "Error Occured"){
      resStatus(res,400,{ message: 'Error Occured' });
    }
  }
}

const resStatus = (res,code,customMessage) =>{
  res.status(code).json(customMessage);
}

module.exports = {authLogin};