import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountryByName } from './js/fetchCountries'
import createCountryList from './templates/country-list.hbs'
import createCountryCard from './templates/country-card.hbs'

const DEBOUNCE_DELAY = 500;
const countryListEl = document.querySelector('.country-list')
countryListEl.style.listStyle = "none";
countryListEl.style.margin = "0";
const countryInfoEl = document.querySelector('.country-info')
const searchInputEl = document.querySelector('#search-box')

const onSearchInput = e => {
    e.preventDefault();
    const searchValue= e.target.value.trim()
    if (searchValue.length === 0) {
        clearFields ();
    } else {
    fetchCountryByName(searchValue)
    .then(data => {
        clearFields ()
        if (data.length > 10) {
            Notify.info('Too many matches found. Please enter a more specific name.')
        } else if (data.length === 1) {
            const langs = Object.values(data[0].languages)
            countryInfoEl.innerHTML = createCountryCard([{...data[0], languages: langs}]); 
        } else {
            countryListEl.innerHTML = createCountryList(data);
        } 
      })
      .catch(error => {
        clearFields ()
        Notify.failure('Oops, there is no country with that name')
        console.log(error);
      });
    }
}
function clearFields () {
    countryInfoEl.innerHTML = '';
    countryListEl.innerHTML = '';
}

searchInputEl.addEventListener('input', debounce(onSearchInput, DEBOUNCE_DELAY));
