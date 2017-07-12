const users = require('libs/user');
const express = require('express');
const router = express.Router();
const app = require('http_server');

router.post('/', function (req, res) {
    console.log(req.body);
    for( let key in req.body) {

        if(key !== 'uid' && users[req.body.uid]) {
            if(users[req.body.uid][key] instanceof Date){
                //откинуть числа и значения_не_даты
                //знач. напр.'2007-' конвертируется нормально, вопреки логике. Что делать?
                if (new Date(req.body[key]) == 'Invalid Date' || parseInt(req.body[key]) == +req.body[key]) {
                    req.body[key] = users[req.body.uid][key]
                }
            }
            users[req.body.uid][key] = req.body[key];
        }
    }

    res.send('Saved')
});

app.on('userdata_not_saved', (err)=>{
    console.log('New user data were not saved because of error: '+err);
});
app.on('userdata_saved', (data)=>{
    console.log('Data were saved');
});

module.exports = router;