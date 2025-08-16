import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1';

const getAuthHeader = () => {
    const token = localStorage.getItem('user_token');
    return token ? { Authorization: 'Bearer ' + token } : {};
};

// Admin dashboard ke stats fetch karna
const getDashboardStats = async () => {
    const response = await axios.get(`${API_URL}/dashboard/admin-stats`, {
        headers: getAuthHeader()
    });
    return response.data;
};

// Sabhi users ko filters ke saath fetch karna
const getAllUsers = async (params) => {
    const response = await axios.get(`${API_URL}/users`, {
        headers: getAuthHeader(),
        params: params // Jaise { role: 'NORMAL_USER', sortBy: 'name' }
    });
    return response.data;
};

const getStoreOwnerData = async () => {
    const response = await axios.get(`${API_URL}/dashboard/store-owner`, {
        headers: getAuthHeader()
    });
    return response.data;
};

const addStore = async (storeData) => {
    const response = await axios.post(`${API_URL}/stores/add`, storeData, {
        headers: getAuthHeader()
    });
    return response.data;
};

const addUser = async (userData) => {
    // Hum register endpoint ka hi istemal karenge
    const response = await axios.post(`${API_URL}/users/register`, userData, {
        headers: getAuthHeader()
    });
    return response.data;
};

const adminService = {
    getDashboardStats,
    addUser,
    getAllUsers,
    getStoreOwnerData,
    addStore// Ise yahan add karein
};

export default adminService;