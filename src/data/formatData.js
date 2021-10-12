/**
 * 
 */
class formatData{
    /**
     * 
     * @param {number} cal 
     * @returns decimal with 3 digits after the decimal point
     */
    static calTokCal(cal) {
        return Number.parseFloat(cal/1000).toFixed(3)
    }
}

export default formatData
