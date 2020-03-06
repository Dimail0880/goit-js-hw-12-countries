import './styles.css';
import countryInfo from './templates/countryInfo.hbs';
import '../node_modules/lodash';
import PNotify from 'pnotify/dist/es/PNotify.js';
import fetchCountries from './js/fetchCountries';



const input = document.querySelector('.input');
const root = document.querySelector('#root');



function checkCountries(name) {
    fetchCountries(name)
        .then(data => {
            if (data.length >= 2 && data.length <= 10) {
                const list = data.map(el => renderList(el));
                root.innerHTML = '';
                root.insertAdjacentHTML('beforeend', list);
            } else if (data.length === 1) {
                renderCountry(data[0]);
            } else if (data.length > 10) {
                root.innerHTML = '';
                alert();
            } else {
                removeAlert();
                root.innerHTML = '';
            }
        })
        .catch(err => {
            removeAlert();
            console.warn(err);
        });
}

function renderCountry(data) {
    removeAlert();
    const description = countryInfo(data);
    root.innerHTML = '';
    root.insertAdjacentHTML('beforeend', description);
}

function renderList(data) {
    removeAlert();
    return `
<ul class="list-countries">           
<li class="list-countries_item">${data.name}</li>
</ul>
`;
}

function alert() {
    PNotify.error({
        title: 'Uh Oh!',
        text: 'Too many matches found! Please, enter more specific query!',
        hide: false,
    });
}

function removeAlert() {
    PNotify.removeAll();
}

function inputData() {
    const inputData = input.value;
    removeAlert();
    if (inputData.length > 1) {
        checkCountries(inputData)
    };
}

function start() {
    input.addEventListener('input', _.debounce(inputData, 500));
}

start();