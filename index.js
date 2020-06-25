//Tested using Chrome on Mac OS Catellina and Insomnia

//This db has 3 collections: Customers, Phones, and Orders -
//Customer contains personal customer data  - [Title, First Name(s)*, Surname*, Mobile*, Email Address*]
//and a home and shipping address -[HomeAddressLine1*, HomeAddressLine2, HomeTown*, HomeCounty/City*, HomeEIRCODE], [shippingAddressLine1*, shippingAddressLine2, shippingTown*, shippingCounty/City*, shippingEIRCODE]
//'Phones' contains the data for phones that would be sold in the shop - [Manufacturer*, Model*, Price*]
//'Orders' contains the _id of the customer and the _id/s of the phones they bought
//Front end only deals with customers and phones
//---------------
// This script implements restful api and CRUD and a front end
// 

const express = require('express');
const bodyParser = require('body-parser');
const app = express(); // create the ExpressJS app

const hbs = require('hbs');
const path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const _dirname = "/Users/zacharybuce/VisualStudioProjects/assignment07";
app.set('views',path.join(_dirname,'views'));
app.set('view engine','hbs');
app.use('/assets',express.static(_dirname+'/public'));


//const uri = "Uri goes here" ;
const mongoose = require('mongoose');

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:false
}).then(() => {
console.log("Successfully connected to the MongoDB database");
}).catch(err => {
console.log('Unable to connect to the MongoDB database', err); 
process.exit();
});

require('/Users/zacharybuce/VisualStudioProjects/assignment07/routes/customer.routes.js')(app);
require('/Users/zacharybuce/VisualStudioProjects/assignment07/routes/phone.routes.js')(app);
require('/Users/zacharybuce/VisualStudioProjects/assignment07/routes/order.routes.js')(app);

// listen for requests on port 3000
app.listen(3000, () => {

    console.log("Server listening on port 3000");

});
