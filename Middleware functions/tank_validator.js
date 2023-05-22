const Tank = require("../Models/TankModel");
const TankType = require("../Enum/TankTypes");
const Joi = require('joi');
const beautifyTankAttr = require('../Functions/tank_attr_beautifier')
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



async function getTankByName(tankName) {
    
    return await Tank
    .findOne({name: new RegExp(`${tankName}`, 'i')});
    
}




async function tankExists(tank) {
  
    const dbContainsTank = await getTankByName(tank.name);


    return dbContainsTank != null;
}


async function validateTank(tank) {
  
    if(await tankExists(tank)) {
        throw new Error('Tank already exists');
    }
   

    const improvedTankModel = improveTankModel(tank);

    const schema = Joi.object({
        name: Joi.string().max(40).required(),
        origin: Joi.string().required(),
        type: Joi.string().required(),
        date: {
            designYear: Joi.number().integer().min(1900).max(new Date().getFullYear()).required(),
            productionYear: Joi.number().integer().min(improvedTankModel.date.designYear).max(new Date().getFullYear()).required()
        },
        top_speed_KMH: Joi.number().max(80).required(),
        crew: Joi.number().max(18).required(),
        weight_T: Joi.number().max(188).required(),
        max_fuel_L: Joi.number().max(1610).required(),
        main_armament: Joi.string().required()
    });
    

    
 
    return schema.validate(improvedTankModel);
}


module.exports = validateTank;

validateTank(newtank);

