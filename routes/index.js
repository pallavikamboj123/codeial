var express = require('express');
var router = express.Router();
var index_controller = require('../controller/indexController');
//var message_controller = require('../controller/messageController');
/* GET home page. */
router.get('/',index_controller.index);
//sign-up get request
router.get('/sign-up',index_controller.signUp_get);
//sign-up post request
router.post('/sign-up', index_controller.signUp_post);
//login get 
router.get('/login', index_controller.login_get);
//login post
router.post('/login', index_controller.login_post);
//display messages
router.get('/messages', index_controller.get_messages);
//create new message
router.get('/messages/create', index_controller.create_message_get);
//post request for creating message
router.post('/messages/create', index_controller.create_message_post);

module.exports = router;
