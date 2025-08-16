import axios from 'axios';
const API_URL = 'http://localhost:8000/api/v1/users';

const getAuthHeader = () => {
    const token = localStorage.getItem('user_token');
    return token ? { Authorization: 'Bearer ' + token } : {};
};

const updatePassword = async (oldPassword, newPassword) => {
    const response = await axios.patch(`${API_URL}/update-password`, 
        { oldPassword, newPassword },
        { headers: getAuthHeader() }
    );
    return response.data;
};

const userService = {
    updatePassword,
};

export default userService;