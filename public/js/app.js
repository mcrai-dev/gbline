
// variable globale
let selectedLocationName = '';
let cumulus =0;


// app.js
const firebaseConfig = {
    apiKey: "AIzaSyDeq9BJWHeQnHxeg7VWkm6guym42s22fV0",
    authDomain: "jauge-f2a22.firebaseapp.com",
    databaseURL: "https://jauge-f2a22-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "jauge-f2a22",
    storageBucket: "jauge-f2a22.appspot.com",
    messagingSenderId: "767973833886",
    appId: "1:767973833886:web:463841bead32158fc44f8f",
    measurementId: "G-D480FN8KYB"
};

function fetchData() {
    const dataTableBody = document.getElementById('data-body');

    firebase.initializeApp(firebaseConfig);

    const dbRef = firebase.database().ref();

    function updateData() {
        dbRef.once('value', (snapshot) => {
            dataTableBody.innerHTML = ''; // Clear previous data

            snapshot.forEach((locationSnapshot) => {
                const locationName = locationSnapshot.key; // Get location name
                const locationData = locationSnapshot.val(); // Get location data
                const dataRow = document.createElement('tr');

                // const locationCell = document.createElement('td');
                // locationCell.textContent = locationName;
                // dataRow.appendChild(locationCell);
                const locationCell = document.createElement('td');

                const locationIcon = document.createElement('i');
                locationIcon.classList.add('material-icons-outlined');
                // locationIcon.textContent = 'location_on';
                // locationCell.appendChild(locationIcon);

                locationCell.textContent += ` ${locationName}`;
                dataRow.appendChild(locationCell);

                if (locationName === "Ivandry Villa 31") {
                    locationCell.style.color = 'black';
                } else {
                    locationCell.style.color = 'gray'
                    dataRow.style.color = 'gray'
                }

                const batteryStatusCell = document.createElement('td');
                batteryStatusCell.textContent = locationData.battery_status;
                dataRow.appendChild(batteryStatusCell);

                const durationCell = document.createElement('td');
                // cumulus = cumulus + locationData.duration;
                // durationCell.textContent = formatDuration();
                durationCell.textContent = formatDuration(locationData.duration);

                dataRow.appendChild(durationCell);

                // const jaugeValueCell = document.createElement('td');
                // jaugeValueCell.textContent = locationData.jaugeValue;
                // dataRow.appendChild(jaugeValueCell);
                const jaugeValueCell = document.createElement('td');
                minValue = 0, maxValue = 4095;

                if (locationName === "MERCEDES 4194 TAF") {
                    minValue = 406, maxValue = 2867;
                    locationCell.style.color = 'black';
                    dataRow.style.color = 'black'
                } else {

                }
                const rawValue = locationData.jaugeValue;
                const percentage = ((rawValue - minValue) / (maxValue - minValue)) * 100;
                const litersValue = (percentage / 100) * locationData.maxLiter;
                const formattedLiters = litersValue.toFixed(1);
                jaugeValueCell.textContent = ` ${formattedLiters} L. ${percentage.toFixed(2)}% `;

                // jaugeValueCell.textContent = `${percentage.toFixed(2)}%`;
                dataRow.appendChild(jaugeValueCell);
                // dataRow.appendChild(jaugeValueCell);


                const jiramaStatusCell = document.createElement('td');
                jiramaStatusCell.textContent = locationData.jirama_status;
                dataRow.appendChild(jiramaStatusCell);

                const rectiferDC = document.createElement('td');
                rectiferDC.textContent = locationData.voltageRectifierDC;
                dataRow.appendChild(rectiferDC);

                const lastStartedCell = document.createElement('td');
                lastStartedCell.textContent = locationData.lastStarted;
                dataRow.appendChild(lastStartedCell);

                const lastStoppedCell = document.createElement('td');
                lastStoppedCell.textContent = locationData.lastStopped;
                dataRow.appendChild(lastStoppedCell);

                const startedDayCell = document.createElement('td');
                startedDayCell.textContent = locationData.startedDay;
                dataRow.appendChild(startedDayCell);

                const turnOnGroupCell = document.createElement('td');
                turnOnGroupCell.textContent = locationData.turnOnGroup;
                dataRow.appendChild(turnOnGroupCell);

                const maxLiter = document.createElement('td');
                maxLiter.textContent = locationData.maxLiter;
                dataRow.appendChild(maxLiter);

                const lastRefueling = document.createElement('td');
                lastRefueling.textContent = locationData.lastRefueling;
                dataRow.appendChild(lastRefueling);

                const observation = document.createElement('td');
                observation.textContent = locationData.observation;
                dataRow.appendChild(observation);

                const turnOnOffGroupCell = createToggleButton(locationName, locationData.turnOnGroup);
                dataRow.appendChild(turnOnOffGroupCell);


                if (locationData.jirama_status < 170) {
                    jiramaStatusCell.style.backgroundColor = 'rgba(255, 66, 66, 0.3)';
                } else {
                    jiramaStatusCell.style.backgroundColor = 'none';
                }

                if (locationData.battery_status > 170) {
                    batteryStatusCell.style.backgroundColor = 'rgba(66, 255, 80, 0.3)';
                } else {
                    batteryStatusCell.style.backgroundColor = 'none';
                }

                if (percentage < 30 && percentage > 10) {
                    jaugeValueCell.style.backgroundColor = 'rgba(255, 66, 66, 0.3)';

                } else if (percentage < 30 && percentage < 10) {
                    executeAsync(function () {

                        const blinkInterval = setInterval(() => {

                       
                       
                            jaugeValueCell.style.backgroundColor = 'rgba(255, 66, 66, 0.6)';

                        }, 500);

                        setTimeout(() => {
                            clearInterval(blinkInterval);
                            jaugeValueCell.style.backgroundColor = 'none';

                        }, 10000);

                    });
                } else {
                    jaugeValueCell.style.backgroundColor = 'none';
                }

                locationCell.addEventListener('click', () => {
                    selectedLocationName = locationName;
                });

                dataTableBody.appendChild(dataRow);
            });
        });

    }

    updateData();

    setInterval(updateData, 2000);
}

window.onload = fetchData;

// calcul pour convertir les duration en heure min sec, utilisée dans la app.js
function formatDuration(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours}H ${minutes}m ${remainingSeconds}s`;
}

// function used for async task 
function executeAsync(func) {
    setTimeout(func, 0);
}



// for the switch button
function createToggleButton(locationName, currentState) {
    const toggleButtonCell = document.createElement('td');
    const toggleSwitch = document.createElement('label');
    toggleSwitch.classList.add('switch');
    const toggleInput = document.createElement('input');
    toggleInput.type = 'checkbox';
    toggleInput.checked = currentState;
    toggleInput.addEventListener('change', (event) => {
        const newState = event.target.checked;
        const databaseRef = firebase.database().ref(locationName + '/turnOnGroup');
        databaseRef.set(newState).then(() => {
            console.log(`État de ${locationName} mis à jour : ${newState}`);
        }).catch((error) => {
            console.error(`Erreur lors de la mise à jour de l'état : ${error.message}`);
        });
    });
    const toggleSpan = document.createElement('span');
    toggleSpan.classList.add('slider', 'round');
    toggleSwitch.appendChild(toggleInput);
    toggleSwitch.appendChild(toggleSpan);
    toggleButtonCell.appendChild(toggleSwitch);
    return toggleButtonCell;
}


