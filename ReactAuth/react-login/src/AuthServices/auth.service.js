import axios from 'axios';

const API_URL = "http://localhost:8080/api/auth/";
const register = (username, email, password) => {
    return axios
        .post(API_URL + "signup", {
            username,
            email,
            password,
        });
};

const login = (username, password) => {
    return axios
        .post(API_URL + "signin", {
            username,
            password,
        })
        .then(response => {
            if (response.data.accessToken) {

                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        });
};
const logout = () => {

    return localStorage.removeItem("user");
};

const getCurrentUser = () => {

    try {
        return JSON.parse(localStorage.getItem("user"));
    } catch (err) {
        console.log('Error', err.message);
    }
};
const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
}
export default AuthService;