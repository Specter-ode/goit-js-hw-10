const BASE_URL = 'https://restcountries.com/v3.1/name'
const fields = 'fields=name,capital,population,flags,languages'
export const fetchCountryByName = (nameOfCountry) => {
  return fetch(`${BASE_URL}/${nameOfCountry}?${fields}`)
  .then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  })
}