const Phone = require('../models/phone.model.js');

// Create and Save a new phone
exports.create = (req, res) => { // Validate the request 
    if(!req.body) {
        return res.status(400).send({ message: "Phone content cannot be empty!"});
     }
    
     // Create a new phone (using schema)
    const phone = new Phone({ 
        Manufacturer : req.body.Manufacturer,
        Model : req.body.Model,
        Price : req.body.Price
    });
    
    // Save phone in the database
    phone.save().then(data => { 
        
        res.send(data); 

    }).catch(err => {

    res.status(500).send({

        message: err.message || "An error occurred while creating the phone."}); 

    });
    
};

// Retrieve and return all phone from the database.
exports.findAll = (req, res) => { 
    Phone.find().then( phones => { 
        
        res.send(phones);
    
    }).catch(err => { 
        
        res.status(500).send({message: err.message || "An error occurred while retrieving all Phones." });
    
    }); 
};

// Find a phone note with a phoneid
exports.findOne = (req, res) => { 
    Phone.findById(req.params.phoneId).then(phone => {
    if(!phone) {
        
        return res.status(404).send({message: "Customer not found with id " + req.params.phoneId });
    }

    res.send(phone); }).catch(err => {

    if(err.kind === 'ObjectId') { 
        return res.status(404).send({message: "Phone not found with id " + req.params.phoneId });
    }
    return res.status(500).send({message: "Error retrieving Phone with id " + req.params.phoneId });
    }); 
};

// Update a phone identified by the noteId in the request
exports.update = (req, res) => { // Validate Request 
    if(!req.body) {
        return res.status(400).send({message: "Phone content cannot be empty"}); 
    }
    // Find the phone and update it with the request body
    Phone.findByIdAndUpdate(req.params.phoneId, { 
        
        Manufacturer : req.body.Manufacturer,
        Model : req.body.Model,
        Price : req.body.Price

    },{ new: true }) // "new: true" return updated object
    .then(phone => { 
        if(!phone) {
            return res.status(404).send({message: "Phone not found with id " + req.params.phoneId}); 
        }
        res.send(phone); 
    }).catch(err => {
        if(err.kind === 'ObjectId') { 
            return res.status(404).send({message: "Phone not found with id " + req.params.phoneId });
        }
    return res.status(500).send({message: "Error updating Phone with id " + req.params.phoneId });
    }); 
};

// Delete a Phone with the specified noteId in the request
exports.delete = (req, res) => { 
    Phone.findByIdAndRemove(req.params.phoneId).then(phone => {
    if(!phone) {
        return res.status(404).send({message: "Phone not found with id " + req.params.phoneId });
    }
    res.send({
        message: "Phone deleted successfully!"}); 
    }).catch(err => {
    if(err.kind === 'ObjectId' || err.name === 'NotFound') { 
        return res.status(404).send({message: "Phone not found with id " + req.params.phoneId });
    }
    return res.status(500).send({message: "Could not delete Phone with id " + req.params.phoneId });
    }); 
};