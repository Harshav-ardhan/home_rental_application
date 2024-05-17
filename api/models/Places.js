const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    owner: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
    title: String,
    address: String,
    Photos :[String],
    description: String,
    perks: [String],
    extraInfo:String,
    checkIn : Number,
    checkOut : Number,
    maxGuest : Number,
    price:Number,
})

const placeModel = mongoose.model('place', placeSchema);

module.exports = placeModel;