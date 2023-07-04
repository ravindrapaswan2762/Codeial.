const express = require('express');
const router = express.Router();
//--------------------------------

const userController = require('../controllers/users_controller');//accessing user controlling
router.get('/profile', userController.profile);

//--------------------------------
module.exports = router;
