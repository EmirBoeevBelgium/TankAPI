const Tank = require("../Models/TankModel");
const TankType = require("../Enum/TankTypes");
const Joi = require('joi');
const getJoiTankSchema = require('../Functions/Joi_tankschema');
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/Tanks')
.then(() =>console.log('Verbonden met mongoDB'))
.catch(err => console.log('Kan niet verbinden met mongoDB...', err));
const improveTankModel = require('../Functions/improve_tankmodel');
//==========================================
const newtank = new Tank({
    name: 't-72 obyekt',
    origin: 'soviet unIon',
    type: TankType.MBT,
    date: {
        designYear: 1857,
        productionYear: 1964
    },
    top_speed_KMH: 50,
    crew: 4,
    weight_T: 19,
    max_fuel_L: 515,
    main_armament: 'smoothborne'
})
//=========================================

/*function beautifyTankAttr(attr) {
    var beautifiedTankAttr = '';
    const trimmedAttr = attr.trim();

    if(!trimmedAttr.includes(' ')) {
        beautifiedTankAttr += attr.charAt(0).toUpperCase() + attr.substring(1).toLowerCase();
    }
    else {
        const tankAttrDissect = trimmedAttr.split(' ');
    
        tankAttrDissect.forEach(tankAttr => {
            beautifiedTankAttr += tankAttr.charAt(0).toUpperCase() + tankAttr.substring(1).toLowerCase() + ' ';
        });
    
        beautifiedTankAttr = beautifiedTankAttr.trim();
    }
    

    return beautifiedTankAttr;

}*/






async function validateTank(tank) {
    console.log('Inside validateTank');
    console.log(tank);
    const schema = getJoiTankSchema(tank);
   console.log(schema.validate(tank));
 
    return schema.validate(tank);
}


module.exports = validateTank;

validateTank(newtank);

