module.exports = (app) => {

    const customers = require('../controllers/customer.controllers.js');
    
    app.get('/', customers.root);

    app.post('/customers', customers.create); 

    app.get('/customers', customers.findAll);

    app.get('/customers/:customerId', customers.findOne); 
    
    app.put('/customers/:customerId', customers.update);
    
    app.delete('/customers/:customerId', customers.delete); 

    app.get('/customer/:s', customers.searchName); 
    
}