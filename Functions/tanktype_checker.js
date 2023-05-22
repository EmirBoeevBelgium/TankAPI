const TankType = require('../Enum/TankTypes');

function checkTankType(tankType) {
    return Object.values(TankType).includes(tankType);
}

module.exports = checkTankType;