const users = require('libs/user');
const express = require('express');
const router = express.Router();

router.post('/', function (req, res) {
    console.log(req.body);

    if(users[req.body.id]){
        if(req.body.username) users[req.body.id].username = req.body.username;
        if(req.body.birthday) users[req.body.id].birthday = req.body.birthday;
        if(req.body.phone) users[req.body.id].phone = req.body.phone;
    }

});

module.exports = router;