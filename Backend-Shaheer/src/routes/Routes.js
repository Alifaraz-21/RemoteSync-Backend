const express = require('express');
const {authLogin,authRegister} = require('../controllers/authController');


const router = express.Router();

router.post('/auth/login', authLogin);
router.post('/auth/register', authRegister);
module.exports = router;
