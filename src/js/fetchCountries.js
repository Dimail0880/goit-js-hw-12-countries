const URL = 'https://restcountries.eu/rest/v2/';

export default function fetchCountries(searchQuery) {
    const requestParams = `${searchQuery}`;

    return fetch(URL + 'name/' + requestParams)
        .then(response => response.json())
        .catch(error => console.warn(error));
}