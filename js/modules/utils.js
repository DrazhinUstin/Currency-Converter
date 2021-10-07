const API_KEY = '5a8737e0-26df-11ec-8f50-97266f187efe';

const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;  
    } catch (error) {
        console.log(error);
    }
};

export {API_KEY, fetchData};
