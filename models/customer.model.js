const mongoose = require('mongoose');

// create a mongoose schema for a customer
const CustomerSchema = mongoose.Schema(
    { 
        Title: String,
        FirstName: String,
        Surname: String,
        Mobile: String,
        EmailAddress: String,
           
            HomeAddressLine1: String,
            HomeAddressLine2: String,
            HomeTown: String,
            HomeCounty_City: String,
            HomeEircode: String,
       
            ShippingAddressLine1: String,
            ShippingAddressLine2: String,
            ShippingTown: String,
            ShippingCounty_City: String,
            ShippingEircode: String

    }, { timestamps: true});

// export the model to our app
module.exports = mongoose.model('Customer', CustomerSchema);