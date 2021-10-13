import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000';

/**
 * 
 * @see https://github.com/elodie-baeza/P9-front-end-dashboard
 * @class 
 */
class API {
    /**
     * @description retrieves information from a user. This first endpoint includes the user id, user information (first name, last name and age), the current day's score (todayScore) and key data (calorie, macronutrient, etc.).
     * @param {number} id   As an integer
     * @returns USER_MAIN_DATA object
     */
    static async getUserById(id){
        return await axios.get(`/user/${id}`)
    }

    /**
     * @description retrieves a user's activity day by day with kilograms and calories.
     * @param {number} id   As an integer
     * @returns USER_ACTIVITY object
     */
    static async getActivity(id) {
        // return await new Promise((resolve) => {
        //     setTimeout(() => {
        //         resolve(axios.get(`/user/${id}/activity`))
        //     }, 3000) ;
        // })
        return await axios.get(`/user/${id}/activity`);
    }

    /**
     * @description retrieves the average sessions of a user per day. The week starts on Monday.
     * @param {number} id   As an integer
     * @returns USER_AVERAGE_SESSIONS object
     */
    static async getSessionDuration(id) {
        return await axios.get(`/user/${id}/average-sessions`);
    }

    /**
     * @description retrieves a user's performance (energy, endurance, etc.)
     * @param {number} id   As an integer
     * @returns USER_PERFORMANCE object
     */
    static async getSessionIntensity(id) {
        return await axios.get(`/user/${id}/performance`);
    }
}

export default API