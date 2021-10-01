import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000';

export default class API {
    static async getInitialUser(){
        return axios.get(`/user/${12}`)
    }

    static async getUserById(id){
        return axios.get(`/user/${id}`)
    }

    static async getActivity(id) {
        return axios.get(`/user/${id}/activity`);
    }

    static async getSessionDuration(id) {
        return axios.get(`/user/${id}/average-sessions`);
    }

    static async getSessionIntensity(id) {
        return axios.get(`/user/${id}/performance`);
    }
}