const express = require('express');
const router = express.Router();
const beautifyTankAttr = require('../Functions/tank_attr_beautifier')

const tankValidator = require('../Middleware functions/tank_validator')
const Joi = require('joi');
const Tank = require('../Models/TankModel');

//const auth = require('./Middleware functions/authentication')
//const log = require('./Middleware functions/logger')
//Test---------
//app.use(log);
//app.use(auth);
//-------------

/*const tanks = [
    {id: 1, name: 'T-14 Armata'},
    {id: 2, name: 'M1-Abrams'},
    {id: 3, name: 'Challenger 2'},
]*/


router.get('/api/tanks', (req, res) => {
    res.send(tanks);
});

router.post('/api/tanks', (req, res) => {

    const result = tankValidator(req.body);

    /*const improvedTankModel = ({
        name: beautifyTankAttr(req.body.name),
        origin: beautifyTankAttr(req.body.origin),
        type: req.body.type,
        date: {
            designYear: req.body.date.designYear,
            productionYear: req.body.date.productionYear
        },
        top_speed_KMH: req.body.top_speed_KMH,
        crew: req.body.crew,
        weight_T: req.body.weight_T,
        max_fuel_L: req.body.max_fuel_L,
        main_armament: req.body.main_armament
    })

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
    });*/


    
    //const result = schema.validate(improvedTankModel);
    console.log(result);
    
   if(result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }
    const tank = new Tank({improvedTankModel});
    const p = new Promise((resolve, reject) => {
        
    })
    tank.save()
    res.send(tank);
})

router.get('/api/tanks/:id', (req, res) => {
    const tank = tanks.find(t => t.id === parseInt(req.params.id));

    if(!tank) return res.status(404).send('Tank with the given id doesn\'t exist.');
    res.send(tank);
})

router.put('/api/tanks/:id', (req, res) => {
    const tank = tanks.find(t => t.id === parseInt(req.params.id));
    if(!tank) return res.status(404).send('Tank with the given id doesn\'t exist.');
    const result = validateTank(req.body);
    if(result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }
    tank.name = req.body.name;
    res.send(tank);
})

router.delete('/api/tanks/:id', (req, res) => {
    const tank = tanks.find(t => t.id === parseInt(req.params.id));
    if(!tank) return res.status(404).send('Tank with the given id doesn\'t exist.');
    const index = tanks.indexOf(tank);
    tanks.splice(index, 1);
    res.send(tank);
})

module.exports = router;