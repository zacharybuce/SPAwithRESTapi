module.exports = (app) => {

    const phones = require('../controllers/phone.controllers.js');
        
    app.post('/phones', phones.create); 

    app.get('/phones', phones.findAll);

    app.get('/phones/:phoneId', phones.findOne); 
    
    app.put('/phones/:phoneId', phones.update);
    
    app.delete('/phones/:phoneId', phones.delete); 

    //app.get('/phone/:s', quotations.searchModel);
}