import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
const DEBOUNCE_DELAY = 300;
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const input = document.querySelector('#search-box');

// style 
countryList.style.listStyle = "none";
countryList.style.paddingLeft = "15px";
countryInfo.style.paddingLeft = "15px";


input.addEventListener(
  'input',
  debounce(() => {
    countryInfo.innerHTML = "";
    countryList.innerHTML = "";
    fetchCountries(input.value.trim()).then(data => makeList(data))
  }, DEBOUNCE_DELAY)
);


const makeList = (data) => {

  if (data.length === 0 ) {Notiflix.Notify.failure('Oops, there is no country with that name')}
  else if (data.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } 
  else if (data.length >= 2 && data.length <= 10) {
    renderCountries(data);
  } 
  else if (data.length === 1) {renderCountry(data)}

};

const renderCountry = (countries) => {
  
    const markup = countries
      .map((c) => {
        return `<li>

        <img src= "${c.flags.svg}" width = 30px hight = 30px>
        <b>${c.name.official}</b>
          </li>`;
      })
      .join('');
    countryList.innerHTML = markup;
  

    const markupInfo = countries
    .map((c) => {
      return `
      <p> <b>Capital: </b> ${c.capital}</p>
      <p> <b>Population:</b> ${c.population}</p>
      <p> <b>Languages: </b>  ${Object.values(c.languages)} </p>
        `;
    })
    .join('');
  countryInfo.innerHTML = markupInfo;
}

const renderCountries = (countries) => {
  const markup = countries
    .map((c) => {
      return `<li>
      <img src= "${c.flags.svg}" width = 30px hight = 30px>
      ${c.name.official}
    
        </li>`;
    })
    .join('');
  countryList.innerHTML = markup;
}



