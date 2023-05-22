const Tank = require("../Models/TankModel");

async function getTankByName(tankName) {
    
    return await Tank
    .findOne({name: new RegExp(`${tankName}`, 'i')});
    
}



async function tankExists(tank) {
  
    const tankInDb = await getTankByName(tank.name);

    if(tankInDb != null) {
        throw new Error("Tank already in database");
    }
}

module.exports = tankExists;