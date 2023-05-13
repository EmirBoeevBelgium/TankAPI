const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const Joi = require('joi');

app.use(express.json())
const tanks = [
    {id: 1, name: 'T-14 Armata'},
    {id: 2, name: 'M1-Abrams'},
    {id: 3, name: 'Challenger 2'},
]


app.get('/', (req, res) => {
    res.send('Wanna see tanks?');
});

app.get('/api/tanks', (req, res) => {
    res.send(tanks);
});

;

app.get('/api/tanks/:id', (req, res) => {
    const tank = tanks.find(t => t.id === parseInt(req.params.id));

    if(!tank) return res.status(404).send('Tank with the given id doesn\'t exist.');
    res.send(tank);
})

app.post('/api/tanks', (req, res) => {
    const schema = Joi.object({
        name: Joi.string().max(40).required()
    });
    const result = schema.validate(req.body);
    console.log(result);
    
   if(result.error) {
        res.status(400).send(result.error);
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