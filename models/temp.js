const mongoose = require('mongoose');

const tempSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

const Temp = mongoose.model('Temp', tempSchema);
module.exports = Temp;