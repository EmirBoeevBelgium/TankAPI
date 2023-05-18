const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const Joi = require('joi');
const auth = require('./Middleware functions/authentication')
const log = require('./Middleware functions/logger')

app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(express.static('Public'));

//Test---------
//app.use(log);
//app.use(auth);
//-------------

const tanks = [
    {id: 1, name: 'T-14 Armata'},
    {id: 2, name: 'M1-Abrams'},
    {id: 3, name: 'Challenger 2'},
]


app.get('/', auth, (req, res) => {
    res.send('Wanna see tanks?');
    console.log('User is admin =', req.admin);
});


app.get('/api/tanks', (req, res) => {
    res.send(tanks);
 
});



app.get('/api/tanks/:id', (req, res) => {
    const tank = tanks.find(t => t.id === parseInt(req.params.id));

    if(!tank) return res.status(404).send('Tank with the given id doesn\'t exist.');
    res.send(tank);
})

app.put('/api/tanks/:id', (req, res) => {
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

app.delete('/api/tanks/:id', (req, res) => {
    const tank = tanks.find(t => t.id === parseInt(req.params.id));
    if(!tank) return res.status(404).send('Tank with the given id doesn\'t exist.');
    const index = tanks.indexOf(tank);
    tanks.splice(index, 1);
    res.send(tank);
})

function validateTank(tank) {
    const schema = Joi.object({
        name: Joi.string().max(40).required()
    });
    
    return schema.validate(tank);
}

app.post('/api/tanks', (req, res) => {
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


app.listen(port, () => console.log("Listening on port " + port + "..."));




/*const http = require('http');
const server = http.createServer((req, res) => {
    if(req.url === '/') {
        res.write('Wanna see tanks?');
        res.end();
    }
    if(req.url === '/api/tanks') {
        res.write(JSON.stringify(['T-34', 'M1-Abrams', 'Challanger 2']));
        res.end();
    }
});
server.on('connection', (socket) => {
    console.log('New connection...');
});
server.listen(3000);
console.log('Listening on port 3000...');*/