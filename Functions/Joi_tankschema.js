const Joi = require('joi');

function getTankSchema(improveTankModel) {
    const tankModel = improveTankModel;
    const schema = Joi.object({
        name: Joi.string().max(40).required(),
        origin: Joi.string().required(),
        type: Joi.string().required(),
        date: {
            designYear: Joi.number().integer().min(1900).max(new Date().getFullYear()).required(),
            productionYear: Joi.number().integer().min(tankModel.date.designYear).max(new Date().getFullYear()).required()
        },
        top_speed_KMH: Joi.number().max(80).required(),
        crew: Joi.number().max(18).required(),
        weight_T: Joi.number().max(188).required(),
        max_fuel_L: Joi.number().max(1610).required(),
        main_armament: Joi.string().required()
    });

    return schema;
}

module.exports = getTankSchema;