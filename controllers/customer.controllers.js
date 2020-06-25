const Customer = require('../models/customer.model.js');
const Phone = require('../models/phone.model.js');

// Default message for / (get)
exports.root = (req, res) => {
    Customer.find()
    .then(customers => {
        Phone.find()
            .then(phones => {
                    res.render('assignment-07_view',{
                        results1 : customers,
                        results2: phones
                    });
          });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while retrieving all Customers."
        });
    });
    
};

exports.searchName = (req, res) => {
    var search = req.params.s;
    console.log("Searching Customer Names: "+search)
    Customer.find({ FirstName: new RegExp(search,"ig")})
    .then(customers => {
        res.render('assignment-07_view',{
            results: customers
          });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while retrieving all Customers."
        });
    });
};




// Create and Save a new Customer
exports.create = (req, res) => { // Validate the request 
    if(!req.body) {
        return res.status(400).send({ message: "Customer content cannot be empty!",
                                    request: "test"+req.body.test});
     }
    
     // Create a new Customer (using schema)
    const customer = new Customer({ 
        Title: req.body.Title,
        FirstName: req.body.FirstName,
        Surname: req.body.Surname,
        Mobile: req.body.Mobile,
        EmailAddress: req.body.EmailAddress,
        
            HomeAddressLine1: req.body.HomeAddressLine1,
            HomeAddressLine2: req.body.HomeAddressLine2,
            HomeTown: req.body.HomeTown,
            HomeCounty_City: req.body.HomeCounty_City,
            HomeEircode: req.body.HomeEircode,

            ShippingAddressLine1: req.body.ShippingAddressLine1,
            ShippingAddressLine2: req.body.ShippingAddressLine2,
            ShippingTown: req.body.ShippingTown,
            ShippingCounty_City: req.body.ShippingCounty_City,
            ShippingEircode: req.body.ShippingEircode
        
    });
    
    // Save Customer in the database
    customer.save().then(data => { 
        
        res.send(data); 

    }).catch(err => {

    res.status(500).send({

        message: err.message || "An error occurred while creating the Customer."}); 

    });
    
};

// Retrieve and return all customers from the database.
exports.findAll = (req, res) => { 
    Customer.find().then( customers => { 
        
        res.send(customers);
    
    }).catch(err => { 
        
        res.status(500).send({message: err.message || "An error occurred while retrieving all Customers." });
    
    }); 
};

// Find a single note with a noteId
exports.findOne = (req, res) => { 
    Customer.findById(req.params.customerId).then(customer => {
    if(!customer) {
        
        return res.status(404).send({message: "Customer not found with id " + req.params.customerId });
    }

    res.send(customer); }).catch(err => {

    if(err.kind === 'ObjectId') { 
        return res.status(404).send({message: "Customer not found with id " + req.params.customerId });
    }
    return res.status(500).send({message: "Error retrieving Customer with id " + req.params.customerId });
    }); 
};

// Update a Customer identified by the noteId in the request
exports.update = (req, res) => { // Validate Request 
    if(!req.body) {
        return res.status(400).send({message: "Customer content cannot be empty"}); 
    }
    // Find the Customer and update it with the request body
    Customer.findByIdAndUpdate(req.params.customerId, { 
        
        Title: req.body.Title,
        FirstName: req.body.FirstName,
        Surname: req.body.Surname,
        Mobile: req.body.Mobile,
        EmailAddress: req.body.EmailAddress,
        
            HomeAddressLine1: req.body.HomeAddressLine1,
            HomeAddressLine2: req.body.HomeAddressLine2,
            HomeTown: req.body.HomeTown,
            HomeCounty_City: req.body.HomeCounty_City,
            HomeEircode: req.body.HomeEircode,

            ShippingAddressLine1: req.body.ShippingAddressLine1,
            ShippingAddressLine2: req.body.ShippingAddressLine2,
            ShippingTown: req.body.ShippingTown,
            ShippingCounty_City: req.body.ShippingCounty_City,
            ShippingEircode: req.body.ShippingEircode

    },{ new: true }) // "new: true" return updated object
    .then(customer => { 
        if(!customer) {
            return res.status(404).send({message: "Customer not found with id " + req.params.customerId}); 
        }
        res.send(customer); 
    }).catch(err => {
        if(err.kind === 'ObjectId') { 
            return res.status(404).send({message: "Customer not found with id " + req.params.customerId });
        }
    return res.status(500).send({message: "Error updating Customer with id " + req.params.customerId });
    }); 
};

// Delete a Customer with the specified noteId in the request
exports.delete = (req, res) => { 
    Customer.findByIdAndRemove(req.params.customerId).then(customer => {
    if(!customer) {
        return res.status(404).send({message: "Customer not found with id " + req.params.customerId });
    }
    res.send({
        message: "Customer deleted successfully!"}); 
    }).catch(err => {
    if(err.kind === 'ObjectId' || err.name === 'NotFound') { 
        return res.status(404).send({message: "Customer not found with id " + req.params.customerId });
    }
    return res.status(500).send({message: "Could not delete Customer with id " + req.params.customerId });
    }); 
};