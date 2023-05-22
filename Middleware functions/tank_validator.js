const getJoiTankSchema = require('../Functions/Joi_tankschema');
const tankTypeChecker = require('../Functions/tanktype_checker');
const TankType = require('../Enum/TankTypes');




function validateTank(tank) {
    console.log('in validateTank');
    const schema = getJoiTankSchema(tank);

    const result = schema.validate(tank);
    

    if(!tankTypeChecker(result.value.type)) {
        var errorMessage = 'Tank type should be of these values: ';
        Object.values(TankType).forEach(value => {
            errorMessage += "\n" + value
        })
        throw new Error(errorMessage);
    }

    if(result.error) {
        throw new Error(result.error.message);
    }
   
    console.log(result, 'lol');
 
    return result;
}


module.exports = validateTank;

//validateTank(newtank);

