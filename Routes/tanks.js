const express = require('express');
const router = express.Router();
const Joi = require('joi');
//const auth = require('./Middleware functions/authentication')
//const log = require('./Middleware functions/logger')
//Test---------
//app.use(log);
//app.use(auth);
//-------------

const tanks = [
    {id: 1, name: 'T-14 Armata'},
    {id: 2, name: 'M1-Abrams'},
    {id: 3, name: 'Challenger 2'},
]


router.get('/api/tanks', (req, res) => {
    res.send(tanks);
});

router.post('/api/tanks', (req, res) => {
    const schema = Joi.object({
        name: Joi.string().max(40).required()
    });
    const result = schema.validate(req.body);
    console.log(result);
    
   if(result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }
    const tank = {
        id: tanks.length +1,
        name: req.body.name
    }
    tanks.push(tank);
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