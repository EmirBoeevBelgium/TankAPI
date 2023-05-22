const express = require('express');
const router = express.Router();
const tankExists = require('../Functions/tank_checker');
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



router.get('/api/tanks', (req, res) => {
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