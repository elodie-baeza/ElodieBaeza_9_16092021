import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000';

/**
 * 
 * @see https://github.com/elodie-baeza/P9-front-end-dashboard
 * @class 
 */
class API {
    /**
     * 
     * @param {number} id   As an integer
     * @returns USER_MAIN_DATA object
     */
    static async getUserById(id){
        return axios.get(`/user/${id}`)
    }

    /**
     * 
     * @param {number} id   As an integer
     * @returns USER_ACTIVITY object
     */
    static async getActivity(id) {
        return axios.get(`/user/${id}/activity`);
    }

    /**
     * 
     * @param {number} id   As an integer
     * @returns USER_AVERAGE_SESSIONS object
     */
    static async getSessionDuration(id) {
        return axios.get(`/user/${id}/average-sessions`);
    }

    /**
     * 
     * @param {number} id   As an integer
     * @returns USER_PERFORMANCE object
     */
    static async getSessionIntensity(id) {
        return axios.get(`/user/${id}/performance`);
    }
}

export default API