const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userSchema');

const JWT_SECRET = process.env.JWT_SECRET;

const login = async(email,password)=>{
    try{
        let user = await UserModel.findOne({email});
         console.log(user);
        if (!user) {
            throw new Error('Invalid email or password');
        }
        const validPassword = await bcrypt.compare(password, user.password);  
        if(!validPassword){
            throw new Error('Invalid email or password');
        }
        const token = jwt.sign({id: user._id }, 'JWT_SECRET', { expiresIn: '1h' });
        return token;
    }catch(error){
        throw new Error(error.message || 'Error Occured');
    }
}
  module.exports = {login};