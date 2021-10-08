import * as utils from './modules/utils.js';
import setConverter from './modules/setConverter.js';

document.addEventListener('DOMContentLoaded', async () => {
    const settings = utils.getFromStorage('settings');
    utils.setThemeSwitcher(settings);
    const data = await utils.fetchData(`https://freecurrencyapi.net/api/v2/latest?apikey=${utils.API_KEY}`);
    setConverter(data, settings);
});

window.addEventListener('load', utils.hidePreloader);
