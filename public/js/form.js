document.addEventListener('DOMContentLoaded', () => {
    const dataTableBody = document.getElementById('data-body');
    const loginPopup = document.getElementById('login-popup');
    document.getElementById('data-update').style.display = "none";
    document.getElementById('login-form').style.display = "block";

    const showLoginPopup = () => {
        loginPopup.style.display = 'block';
    };

    // dataTableBody.addEventListener('click', (event) => {
    //     const target = event.target;
    //     if (target.tagName === 'TD' && target.cellIndex === 0) {
    //         showLoginPopup();
    //     }else if (target.tagName === 'TD'&& target.cellIndex === 9){
    //         console.log("zdfghtd")
    //     }
    // });

    dataTableBody.addEventListener('click', (event) => {
        const target = event.target;
        if (target.tagName === 'TD' && target.cellIndex === 0) {
            showLoginPopup();
        } else if (target.tagName === 'TD' && target.cellIndex === 9) {
            console.log('--------------------------');
            const dropdownMenu = document.createElement('div');
            dropdownMenu.className = 'dropdown-menu';

            // Créez les options du menu
            const optionHistorique = document.createElement('div');
            optionHistorique.textContent = 'Historique';
            optionHistorique.className = 'dropdown-option';
            optionHistorique.addEventListener('click', () => {

                console.log('Historique a été cliqué');
                 dropdownMenu.style.display = 'none';
            });

            const optionAction = document.createElement('div');
            optionAction.textContent = 'Action';
            optionAction.className = 'dropdown-option';
            optionAction.addEventListener('click', () => {
                console.log('Action a été cliqué');
                 dropdownMenu.style.display = 'none';
            });

            dropdownMenu.appendChild(optionHistorique);
            dropdownMenu.appendChild(optionAction);

            dropdownMenu.style.position = 'absolute';
            dropdownMenu.style.left = target.getBoundingClientRect().right + 'px';
            dropdownMenu.style.top = target.getBoundingClientRect().top + 'px';

            document.body.appendChild(dropdownMenu);

            document.addEventListener('click', (e) => {
                if (e.target !== optionHistorique && e.target !== optionAction) {
                    dropdownMenu.style.display = 'none';
                }
            });
        }
    });

    // ...



    const closeLoginPopup = () => {
        loginPopup.style.display = 'none';
    };

    const closeButton = document.querySelector('.close-button');
    if (closeButton) {
        closeButton.addEventListener('click', closeLoginPopup);
    }

});

function closeLoginPopup() {
    document.getElementById('login-popup').style.display = "none";
}



const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'admin' && password === '123') {
        const location_title = document.getElementById('location-title')
        location_title.innerText = selectedLocationName
        document.getElementById('data-update').style.display = "block";
        document.getElementById('login-form').style.display = "none";



    } else {
        alert('Nom d\'utilisateur ou mot de passe incorrect.');
    }
});

// -----------------------------------------------
document.getElementById('validate-button').addEventListener('click', () => {
    const newLastRefuelingValue = document.getElementById('last-refueling').value;
    const newMaxLiterValue = document.getElementById('max-liter').value;
    const observationText = document.getElementById('text-observation').value;


    const databaseRef = firebase.database().ref(selectedLocationName);

    databaseRef.update({
        lastRefueling: newLastRefuelingValue,
        maxLiter: newMaxLiterValue,
        observation: observationText
    }).then(() => {
        alert("Données mises à jour avec succès !");
        document.getElementById('data-update').style.display = "none";
        document.getElementById('modal-content').style.display = "none";
        document.getElementById('login-popup').style.display = "none";


    }).catch((error) => {
        console.error("Erreur lors de la mise à jour des données : " + error.message);
    });
});
