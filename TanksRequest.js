const express = require('express');
const app = express();
const port = process.env.PORT || 3000;


const config = require('config');
const morgan = require('morgan');
console.log('Application name:', config.get('name'));
console.log('Developer contact:', config.get('mail.host'));


const tanks = require('./Routes/tanks');
const home = require('./Routes/home');

app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(express.static('Public'));
app.use(morgan('combined'));
app.use('/', home, tanks);



















function validateTank(tank) {
    const schema = Joi.object({
        name: Joi.string().max(40).required()
    });
    
    return schema.validate(tank);
}




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