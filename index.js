
var express = require('express');
var path = require('path');

const bodyParser = require('body-parser');
var app = express();
const { PrismaClient } = require('@prisma/client');
var admin = require('firebase-admin')

const port = process.env.PORT || 8080;

const serviceAccount = require('./jauge-f2a22-firebase-adminsdk-ereh3-5108e1b771.json');
const { error } = require('console');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://jauge-f2a22-default-rtdb.europe-west1.firebasedatabase.app',
});

const dbRef = admin.database().ref();

// for the prisma 
const prisma = new PrismaClient();


main().then(async () => {
    await prisma.$disconnect()
}).catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
}) //end insert

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.listen(port);
console.log('Server started at http://localhost:' + port);

/**
 * Start of End-point
 */

// for the Entry-point
app.get('/', function (req, res) {
    res.redirect('index.html');
});

// endpoint to receive data from firebase
app.get('/data', (req, res)=>{
    fetchData();
    res.status(200).send("aziruherihgjreldjgfl")
});

/**
 * function to use to insert data to database 
 */
async function main() {
    await prisma.cumulus.create({
        data: {
            location_name: 'tana',
            cumulus: 12,
            last_duration: 1256
        }
    })
}

/**
 * function used to fetch data from firebase
 */
function fetchData(){
    dbRef.once('value').then((snapshot)=>{
        snapshot.forEach((locationSnapshot) => {
            const locationName = locationSnapshot.key;
            const locationData = locationSnapshot.val();

            // main(locationName, locationName)

            console.log('Location:', locationName);
            console.log('Details:', locationData);
            console.log('______')

            const filteredData = {
                TurnOnGroup: locationData.TurnOnGroup || '',
                Battery_status: locationData.battery_status || '',
                Duration: locationData.duration || '',
                Gauge: locationData.jaugeValue || '',
            }

            console.log("TurnOnGroup : ", filteredData.TurnOnGroup)
            console.log("Battery : ", filteredData.Battery_status)
            console.log("Duration : ", filteredData.Duration)
            console.log("Gauge : ", locationData.jaugeValue)
            console.log('_____________________________________________________')
        });
    }).catch((error)=>{
        console.error(error);
    }).finally(() =>{
        admin.app().delete();
    })
}
