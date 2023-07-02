const express = require('express');
//--------------------------------

const router = express.Router();//created a router
const homeController = require('../controllers/home_controllers');//accesseing conroller for use with router

router.get('/', homeController.home);// now router using/accsessing controller.

console.log('router loaded');

//--------------------------------
module.exports = router;