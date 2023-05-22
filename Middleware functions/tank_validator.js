const getJoiTankSchema = require('../Functions/Joi_tankschema');





function validateTank(tank) {

    const schema = getJoiTankSchema(tank);

    const result = schema.validate(tank);



    if(result.error) {
        throw new Error(result.error.message);
    }
   
 
    return result;
}


module.exports = validateTank;

//validateTank(newtank);

