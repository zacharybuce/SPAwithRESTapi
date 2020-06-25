const Order = require('../models/order.model.js');

// Create and Save a new order
exports.create = (req, res) => { // Validate the request 
    if(!req.body) {
        return res.status(400).send({ message: "order content cannot be empty!"});
     }
    
     // Create a new order (using schema)
    const order = new Order({ 
        customerId : req.body.customerId,
        purchased: req.body.purchased
    });
    
    // Save order in the database
    order.save().then(data => { 
        
        res.send(data); 

    }).catch(err => {

    res.status(500).send({

        message: err.message || "An error occurred while creating the order."}); 

    });
    
};

// Retrieve and return all order from the database.
exports.findAll = (req, res) => { 
    Order.find().then( orders => { 
        
        res.send(orders);
    
    }).catch(err => { 
        
        res.status(500).send({message: err.message || "An error occurred while retrieving all orders." });
    
    }); 
};

// Find a order note with a orderid
exports.findOne = (req, res) => { 
    Order.findById(req.params.orderId).then(order => {
    if(!order) {
        
        return res.status(404).send({message: "Customer not found with id " + req.params.orderId });
    }

    res.send(order); }).catch(err => {

    if(err.kind === 'ObjectId') { 
        return res.status(404).send({message: "order not found with id " + req.params.orderId });
    }
    return res.status(500).send({message: "Error retrieving order with id " + req.params.orderId });
    }); 
};

// Update a order identified by the noteId in the request
exports.update = (req, res) => { // Validate Request 
    if(!req.body) {
        return res.status(400).send({message: "order content cannot be empty"}); 
    }
    // Find the order and update it with the request body
    Order.findByIdAndUpdate(req.params.orderId, { 
        
        customerId : req.body.customerId,
        purchased: req.body.purchased

    },{ new: true }) // "new: true" return updated object
    .then(order => { 
        if(!order) {
            return res.status(404).send({message: "order not found with id " + req.params.orderId}); 
        }
        res.send(order); 
    }).catch(err => {
        if(err.kind === 'ObjectId') { 
            return res.status(404).send({message: "order not found with id " + req.params.orderId });
        }
    return res.status(500).send({message: "Error updating order with id " + req.params.orderId });
    }); 
};

// Delete a order with the specified noteId in the request
exports.delete = (req, res) => { 
    Order.findByIdAndRemove(req.params.orderId).then(order => {
    if(!order) {
        return res.status(404).send({message: "order not found with id " + req.params.orderId });
    }
    res.send({
        message: "order deleted successfully!"}); 
    }).catch(err => {
    if(err.kind === 'ObjectId' || err.name === 'NotFound') { 
        return res.status(404).send({message: "order not found with id " + req.params.orderId });
    }
    return res.status(500).send({message: "Could not delete order with id " + req.params.orderId });
    }); 
};