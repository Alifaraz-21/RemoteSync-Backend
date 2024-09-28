const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { users, validate } = require('../models/userSchema');

const JWT_SECRET = process.env.JWT_SECRET;

const register = async(firstName,lastName,userName,email,password)=>{
    try{
        console.log(firstName+lastName+userName+email+password)
        const { error } = validate({ 
            firstName,
            lastName,
            userName,
            email,
            password});
        if (error) {
            throw new Error(error.details[0].message);
        }
        const userExist = await users.findOne({email})
        if(userExist){
            throw new Error('User with given email already Exist!');
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = new users({
            firstName,
            lastName,
            userName,
            email,
            password: hashedPassword
        });
        await newUser.save();
        console.log("User successfully registered ");
        const token = jwt.sign({ id: newUser._id},'JWT_SECRET', { expiresIn: '1h' });
        return token;
    }catch(error){
        throw new Error(error.message || 'Error Occured');
    }
}

const login = async(email,password)=>{
    try{
        let user = await users.findOne({email});
         console.log(user);
        if (!user) {
            throw new Error('Invalid Email');
        }
        const validPassword = await bcrypt.compare(password, user.password);  
        if(!validPassword){
            throw new Error('Invalid Password');
        }
        const token = jwt.sign({id: user._id }, 'JWT_SECRET', { expiresIn: '1h' });
        return token;
    }catch(error){
        throw new Error(error.message || 'Error Occured');
    }
}
  module.exports = {login,register};