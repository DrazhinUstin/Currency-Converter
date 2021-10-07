const API_KEY = '5a8737e0-26df-11ec-8f50-97266f187efe';

const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;  
    } catch (error) {
        document.querySelector('.exchange-result').innerHTML = `<p>Sorry, something went wrong...</p>`;
        console.log(error);
    }
};

const setThemeSwitcher = () => {
    document.querySelector('.theme-switcher').addEventListener('click', () => {
        document.body.classList.toggle('night');
    });
};

const hidePreloader = () => {
    document.querySelector('.preloader').classList.add('hide');
};

export {API_KEY, fetchData, setThemeSwitcher, hidePreloader};
