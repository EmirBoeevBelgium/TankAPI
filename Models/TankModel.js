const mongoose = require('mongoose');
const TankType = require('../Enum/TankTypes');


const tankSchema = new mongoose.Schema({
    name: {type: String, required: true},
    origin: {type: String, required: true},
    type: {
        type: String,
        enum: Object.values(TankType),
        required: true
    },
    date: {
        designYear: {
            type: Number,
            required: true
        },
        productionYear: {
            type: Number,
            required: true
        }
    },
    top_speed_KMH: {type: Number, required: true},
    crew: {type: Number, required: true},
    weight_T: {type: Number, required: true},
    max_fuel_L: {type: Number, required: true},
    main_armament: {type: String, required: true}
});


const Tank = mongoose.model('Tank', tankSchema);

module.exports = Tank;