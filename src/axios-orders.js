import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://burgerbuilder-c8cc2.firebaseio.com/',
});

export default instance;