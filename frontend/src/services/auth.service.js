import axios from 'axios';

// Backend ka base URL
const API_URL = 'http://localhost:8000/api/v1';

const login = async (email, password) => {
    // API call karein
    const response = await axios.post(`${API_URL}/users/login`, {
        email,
        password,
    });

    // Agar token milta hai, to use localStorage me save karein
    if (response.data.token) {
        localStorage.setItem('user_token', response.data.token);
    }

    return response.data;
};

const register = async (name, email, password, address) => {
     const response = await axios.post(`${API_URL}/users/register`, {
        name,
        email,
        password,
        address,
    });
    return response.data;
}

const authService = {
    login,
    register
};

export default authService;