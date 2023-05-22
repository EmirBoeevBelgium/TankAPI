const express = require('express');
const app = express();
const router = express.Router();

const tankExists = require('../Functions/tank_checker');
app.use(express.urlencoded({extended: true}));
const improveTankModel = require('../Functions/improve_tankmodel');
const tankValidator = require('../Middleware functions/tank_validator')
const Joi = require('joi');
const Tank = require('../Models/TankModel');

//const auth = require('./Middleware functions/authentication')
//const log = require('./Middleware functions/logger')
//Test---------
//app.use(log);
//app.use(auth);
//-------------



router.get('/api/tanks', async (req, res) => {
    const tanks = await Tank.find();
    res.send(tanks);
});

router.post('/api/tanks', async (req, res) => {
    const improvedTankModel = improveTankModel(req.body);


    try {
        await tankExists(improvedTankModel);
        const result = tankValidator(improvedTankModel);
        
        
        const tank = new Tank(result.value);
        tank.save()
        res.send(tank);
    }
    catch(err) {
        res.status(400).send(err.message);
    }
      
});


router.get('/api/tanks/name/:name', async (req, res) => {

    const tankName = req.params.name;
    console.log(tankName);
    const tank = await Tank.findOne({name: new RegExp(`${tankName}`, 'i')});

    if(!tank) return res.status(404).send('Tank with the given name doesn\'t exist.');
    res.send(tank);
});

router.get('/api/tanks/origin/:origin', async (req, res) => {

    const tankOrigin = req.params.origin;
    console.log(tankOrigin);
    const tanks = await Tank.find({origin: new RegExp(`${tankOrigin}`, 'i')});
    if(tanks.length === 0) return res.status(404).send('No tanks from given origin.');
    res.send(tanks);
});

router.get('/api/tanks/type/:type', async (req, res) => {

    const tankType = req.params.type;
    console.log(tankType);
    const tanks = await Tank.find({type: new RegExp(`${tankType}`, 'i')});
    if(tanks.length === 0) return res.status(404).send('No tanks of given type.');
    res.send(tanks);
});

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