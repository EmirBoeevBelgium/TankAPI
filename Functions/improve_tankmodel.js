const beautifyTankAttr = require('../Functions/tank_attr_beautifier');

function improveTankModel(tank) {
    const improvedTankModel = ({
        name: beautifyTankAttr(tank.name),
        origin: beautifyTankAttr(tank.origin),
        type: tank.type,
        date: {
            designYear: tank.date.designYear,
            productionYear: tank.date.productionYear
        },
        top_speed_KMH: tank.top_speed_KMH,
        crew: tank.crew,
        weight_T: tank.weight_T,
        max_fuel_L: tank.max_fuel_L,
        main_armament: tank.main_armament
    });

    return improvedTankModel;
}

module.exports = improveTankModel;