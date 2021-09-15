import axios from 'axios';

const API_URL = "http://localhost:4210/auth/";

const getLoginData = (myData) => {
    return axios.post(API_URL+"login", myData);
}

const signupData = (myData) => {
    return axios.post(API_URL+"signup", myData);
}

const postResetData = (myData) => {
    return axios.post(API_URL+"reset", myData);
}

const postResetForm = (myData) => {
    return axios.post(API_URL+"resetform", myData)
}


export { getLoginData, signupData, postResetData, postResetForm };