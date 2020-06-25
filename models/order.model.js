const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema(
    { 
        customerId : mongoose.Schema.Types.ObjectId,
        purchased: [mongoose.Schema.Types.ObjectId]

    }, { timestamps: true});

// export the model to our app
module.exports = mongoose.model('Order', OrderSchema);