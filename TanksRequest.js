const express = require('express');
const app = express();
const port = process.env.PORT || 3000;


const config = require('config');
const morgan = require('morgan');
console.log('Application name:', config.get('name'));
console.log('Developer contact:', config.get('mail.host'));
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/Tanks')
.then(() =>console.log('Verbonden met mongoDB'))
.catch(err => console.log('Kan niet verbinden met mongoDB...', err));

const tanks = require('./Routes/tanks');
const tankModel = require('./Models/TankModel');
const home = require('./Routes/home');
const TankType = require('./Enum/TankTypes');
const tankValidator = require('./Middleware functions/tank_validator')

app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(express.static('Public'));
app.use(morgan('combined'));
app.use('/', home, tanks);




const Tank = tankModel;



async function createTank(/*tank*/) {
    const tank = new Tank({
        name: 'M1 Abrams',
        origin: 'USA',
        type: TankType.SPAA,
        date: {
            designYear: 3000,
            productionYear: 1979
        },
        top_speed_KMH: 50,
        crew: 4,
        weight_T: 19,
        max_fuel_L: 515,
        main_armament: '120 mm L/44 smoothbore'
    });

    tankValidator

    const result = await tank.save();
    console.log(result);
}



createTank();


async function getTanks() {
    const tanks = await Tank.find();
    console.log(tanks);
}


async function getTankByType(tankType) {
    
    return await Tank
    .find({type: new RegExp(`${tankType}`, 'i')});
    
}

async function getTankByName(tankName) {
    
    return await Tank
    .find({name: new RegExp(`${tankName}`, 'i')});
    
}

async function updateTank(id) {
    const tank = await Tank.findById(id);
    if(!tank) return;
    tank.set({
        designYear: 1972,
        productionYear: 1979
    })

    const result = await tank.save();
    console.log(result);
}

//updateTank('64663d22228a744edea7c60f');


async function runGetAllTanks() {
    const tanks = await getTanks();
  
    console.log(tanks);
}

async function runTankFinderByName() {
    const tank = await getTankByName();
  
    console.log(tank);
}

async function runTankFinderByType() {
    const tank = await getTankByType();
  
    console.log(tank);
}

//runGetAllTanks();
/*runTankFinderByName();
runTankFinderByType();*/

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