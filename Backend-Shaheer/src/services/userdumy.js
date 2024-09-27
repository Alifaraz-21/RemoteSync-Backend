const UserModel = require('../models/userSchema');

const createUser = async () => {
    console.log('Attempting to create user...');
    try {
        const newUser = new UserModel({
            username: "SHaheer AHmed",
            email: "shaheerahmed@gmail.com",
            password: "$2a$10$EwkdLYDIL7.4mDmH5MQJqOF7Z7ciAfyJafgw3v7jXVVPw2vOSKeMm"
        });
        const savedUser = await newUser.save();
        console.log('User saved:', savedUser);
        return "success";
    } catch (error) {
        console.error('Error saving user:', error);
        return error.message;
    }
};

module.exports = {createUser};