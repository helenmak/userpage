const usersDB = require('../user');
const dbSaver = require('./dbSaver');


const saveModelsToDb = function(...models){
    models.forEach(function (docs){
        for(let document in docs){
            if (!(docs[document].isModified())) {
                continue;
            }
            console.log(`${docs[document]} ${docs[document].isModified()}`)
            docs[document].save();
        }
    })

};

module.exports = dbSaver(function(){
    saveModelsToDb(usersDB)
});
