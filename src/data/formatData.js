export default class formatData{
    static calTokCal(cal) {
        return Number.parseFloat(cal/1000).toFixed(3)
    }
}