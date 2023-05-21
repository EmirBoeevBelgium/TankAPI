const mongoose = require('mongoose');
const TankType = require('../Enum/TankTypes');

const tankSchema = new mongoose.Schema({
    name: String,
    origin: String,
    type: {
        type: String,
        enum: Object.values(TankType)
    },
    date: {
        design: Date,
        production: Date
    },
    top_speed_KMH: Number,
    crew: Number,
    weight_T: Number,
    max_fuel_L: Number,
    main_armament: String
});


const Tank = mongoose.model('Tank', tankSchema);

module.exports = Tank;