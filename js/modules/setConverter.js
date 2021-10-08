import {API_KEY, fetchData, saveToStorage} from './utils.js';

const setConverter = (data, settings) => {

    const form = document.querySelector('.conversion-form');
    const input = document.getElementById('convert-amount');
    const selects = [...document.querySelectorAll('.conversion-settings select')];
    const flags = document.querySelectorAll('.flags-container img');
    const swapBtn = document.querySelector('.swap-btn');
    const resetBtn = document.querySelector('.reset-btn');
    const resultDOM = document.querySelector('.exchange-result');

    const populateSelects = () => {
        const symbols = Object.keys(data.data);
        const baseCurrency = data.query['base_currency'];
        symbols.push(baseCurrency);
        symbols.sort();
        selects.forEach(elem => {
            elem.innerHTML = symbols.map(symbol => {
                if (symbol === settings.valueFrom && elem.id === 'convert-from') {
                    return `<option value="${symbol}" selected>${symbol}</option>`;
                }
                if (symbol === settings.valueTo && elem.id === 'convert-to') {
                    return `<option value="${symbol}" selected>${symbol}</option>`;
                } 
                return `<option value="${symbol}">${symbol}</option>`;
            }).join('');
        });
        loadFlags();
    };

    const loadFlags = () => {
        const firstCode = selects[0].value.slice(0, 2);
        const secondCode = selects[1].value.slice(0, 2);
        flags[0].src = `https://www.countryflags.io/${firstCode}/shiny/48.png`;
        flags[1].src = `https://www.countryflags.io/${secondCode}/shiny/48.png`;
    };

    const getExchangeRate = async () => {
        const convertFrom = selects[0].value;
        const convertTo = selects[1].value;
        const data = await fetchData(`https://freecurrencyapi.net/api/v2/latest?apikey=${API_KEY}&base_currency=${convertFrom}`);
        const exchangeRate = data.data[convertTo];
        return exchangeRate;
    };

    input.addEventListener('input', () => {
        const value = input.value;
        const maxLength = 9;
        if (value.length > maxLength) {
            input.value = value.slice(0, maxLength);
        }
        if (value < 0) input.value = Math.abs(value);
    });

    selects.forEach(elem => {
        elem.addEventListener('change', event => {
            const target = event.currentTarget;
            if (target.id === 'convert-from') {
                settings.valueFrom = target.value;
            }
            if (target.id === 'convert-to') {
                settings.valueTo = target.value;
            }
            loadFlags();
            saveToStorage('settings', settings);
        });
    });

    swapBtn.addEventListener('click', () => {
        const savedValue = selects[0].value;
        selects[0].value = selects[1].value;
        selects[1].value = savedValue;
        settings.valueFrom = selects[0].value;
        settings.valueTo = selects[1].value;
        loadFlags();
        saveToStorage('settings', settings);
    });

    resetBtn.addEventListener('click', () => {
        input.value = '';
        resultDOM.innerHTML = `<p>Welcome to the world of currencies!</p>`;
    });

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const amount = +input.value;
        if (!amount) {
            input.focus();
            resultDOM.innerHTML = `<p>Set value before converting...</p>`;
        } else if (isNaN(amount)) {
            input.focus();
            resultDOM.innerHTML = `<p>Invalid amount...</p>`;
        } else {
            resultDOM.innerHTML = `<p>Getting exchange rate...</p>`;
            const exchangeRate = await getExchangeRate();
            if (!exchangeRate) {
                resultDOM.innerHTML = `<p>Sorry, something went wrong...</p>`;
                return;    
            }
            const result = (amount * exchangeRate).toFixed(2);
            resultDOM.innerHTML = `<p>Exchange rate: <span>${exchangeRate}</span></p>
                                   <p>Result: <span>${result}</span></p>`;
        }
    });

    populateSelects();

}

export default setConverter;