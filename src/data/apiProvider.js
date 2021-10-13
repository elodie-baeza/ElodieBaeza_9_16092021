import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000';

/**
 * 
 * @see https://github.com/elodie-baeza/P9-front-end-dashboard
 * @class 
 */
class apiProvider {
    /**
     * @description retrieves information from a user. This first endpoint includes the user id, user information (first name, last name and age), the current day's score (todayScore) and key data (calorie, macronutrient, etc.).
     * @param {number} id   As an integer
     * @returns USER_MAIN_DATA object
     */
    static async getUserById(id){
        const response = await axios.get(`/user/${id}`)
        return response
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
        const response = await axios.get(`/user/${id}/activity`);
        return response
    }

    /**
     * @description retrieves the average sessions of a user per day. The week starts on Monday.
     * @param {number} id   As an integer
     * @returns USER_AVERAGE_SESSIONS object
     */
    static async getSessionDuration(id) {
        const response =  await axios.get(`/user/${id}/average-sessions`);
        return response
    }

    /**
     * @description retrieves a user's performance (energy, endurance, etc.)
     * @param {number} id   As an integer
     * @returns USER_PERFORMANCE object
     */
    static async getSessionIntensity(id) {
        const response =  await axios.get(`/user/${id}/performance`);
        return response
    }
}

export default apiProvider