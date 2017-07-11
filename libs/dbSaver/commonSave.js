const usersDB = require('../user');
const dbSaver = require('./dbSaver');
const app = require('http_server');

const saveModelsToDb = function(...models){
    models.forEach(function (docs){
        for(let document in docs){
            if (!(docs[document].isModified())) {
                continue;
            }
            console.log(`${docs[document]} ${docs[document].isModified()}`)
            docs[document].save()
                .then((result)=>{
                    app.emit('userdata_saved', result);
                })
                .catch((err)=>{
                    app.emit('userdata_not_saved', err);
                    //throw err;
                })
        }
    })

};

module.exports = dbSaver(function(){
    saveModelsToDb(usersDB)
});
