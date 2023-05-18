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
const home = require('./Routes/home');
const TankType = require('./Enum/TankTypes');

app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(express.static('Public'));
app.use(morgan('combined'));
app.use('/', home, tanks);




const tankSchema = new mongoose.Schema({
    name: String,
    origin: String,
    type: {
        type: String,
        enum: Object.values(TankType)
    },
    date: {
        design: Date,
        production: Date
    },
    top_speed_KMH: Number,
    crew: Number,
    weight_T: Number,
    max_fuel_L: Number,
    main_armament: String
});


const Tank = mongoose.model('Tank', tankSchema);



/*async function createTank() {
    const tank = new Tank({
        name: 'M1 Abrams',
        origin: 'USA',
        type: TankType.MBT,
        date: {
            design: 1972,
            production: 1979
        },
        top_speed_KMH: 72,
        crew: 4,
        weight_T: 57,
        max_fuel_L: 1909,
        main_armament: '120 mm L/44 smoothbore'
    });

    const result = await tank.save();
    console.log(result);
}



createTank();*/


async function getTanks() {
    const tanks = await Tank.find();
    console.log(tanks);
}

getTanks();




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