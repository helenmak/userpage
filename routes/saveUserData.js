const users = require('libs/user');
const express = require('express');
const router = express.Router();
const app = require('http_server');

router.post('/', function (req, res) {
    console.log(req.body);
    for( let key in req.body) {
        if(key !== 'id' && users[req.body.id]) {
            users[req.body.id][key] = req.body[key];
        }
    }

    res.send()
});

app.on('userdata_not_saved', (err)=>{
    console.log('New user data were not saved because of error: '+err);
});
app.on('userdata_saved', (data)=>{
    console.log('Data were saved');
});

module.exports = router;