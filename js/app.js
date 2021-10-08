import * as utils from './modules/utils.js';
import setConverter from './modules/setConverter.js';

document.addEventListener('DOMContentLoaded', async () => {
    const data = await utils.fetchData(`https://freecurrencyapi.net/api/v2/latest?apikey=${utils.API_KEY}`);
    const settings = utils.getFromStorage('settings');
    setConverter(data, settings);
    utils.setThemeSwitcher(settings);
});

window.addEventListener('load', utils.hidePreloader);
