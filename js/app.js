import {API_KEY, fetchData} from './modules/utils.js';
import setConverter from './modules/setConverter.js';

document.addEventListener('DOMContentLoaded', async () => {
    const data = await fetchData(`https://freecurrencyapi.net/api/v2/latest?apikey=${API_KEY}`);
    setConverter(data);
});
