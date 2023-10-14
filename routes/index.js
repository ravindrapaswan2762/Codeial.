const express = require('express');

const Homecontrollers = require('../controllers/home_controllers');//accesseing conroller for use with router

const router = express.Router();//created a router
//--------------------------------



router.get('/', Homecontrollers.home);// now router using/accsessing controller.

router.use('/users', require('./users'));// switching one router to sibling router.
router.use('/posts', require('./post'));

router.use('/comments', require('./comment'));

console.log('router loaded');

//--------------------------------
module.exports = router;