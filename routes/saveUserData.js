const users = require('libs/user');
const express = require('express');
const router = express.Router();

router.post('/', function (req, res) {
    console.log(req.body);
    for( let key in req.body) {
        if(key !== 'id' && users[req.body.id]) {
            users[req.body.id][key] = req.body[key];
            users[req.body.id].modifyTime = req.body.modifyTime;
        }
    }
    res.send('Data will be saved')
});

module.exports = router;