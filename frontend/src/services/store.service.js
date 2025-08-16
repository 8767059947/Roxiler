import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1';

// Yeh function localStorage se token lekar header banata hai
const getAuthHeader = () => {
    const token = localStorage.getItem('user_token');
    if (token) {
        return { Authorization: 'Bearer ' + token };
    } else {
        return {};
    }
};

// Sabhi stores ko fetch karne wala function
const getAllStores = async (searchTerm = '') => {
    // Agar searchTerm hai, to use URL me add karein
    const response = await axios.get(`${API_URL}/stores?search=${searchTerm}`, {
        headers: getAuthHeader()
    });
    return response.data;
};



const rateStore = async (storeId, ratingValue) => {
    // Hum pehle se nahi jaante ki user create karega ya update,
    // isliye hum dono API calls ko alag-alag functions me rakhenge.
    // Pehle rating submit karne ki koshish karte hain (POST)
    try {
        const response = await axios.post(`${API_URL}/stores/${storeId}/rate`, 
            { rating_value: ratingValue }, 
            { headers: getAuthHeader() }
        );
        return response.data;
    } catch (error) {
        // Agar POST fail hota hai (मतलब user pehle rate kar chuka hai), to PUT try karein
        if (error.response && error.response.status === 409) {
            const response = await axios.put(`${API_URL}/stores/${storeId}/rate`, 
                { rating_value: ratingValue }, 
                { headers: getAuthHeader() }
            );
            return response.data;
        }
        // Agar koi aur error hai, to use throw karein
        throw error;
    }
};


const storeService = {
    getAllStores,
    rateStore,
    getAuthHeader
};

export default storeService;