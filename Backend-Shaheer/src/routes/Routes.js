const express = require('express');
const {authLogin} = require('../controllers/authController');


const router = express.Router();

router.post('/auth/login', authLogin);
module.exports = router;
