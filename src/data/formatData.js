/**
 * 
 */
class formatData{
    /**
     * Replace kind as number by kind as string corresponding
     * 
     * @function 
     */
    // const data = {userId: 12,
    //     kind: { 1: 'cardio', 2: 'energy' },
    //     data: [ { value: 80, kind: 1 }, { value: 120, kind: 2 } ]} }
    static formatUserPerformance(performanceObject) {
        // dataFormated => [[{}, {}, {}, ]]
        const dataFormated = [performanceObject.data]
    
        // Set an uppercase on first letter for kinds
        const kindsArray = Object.values(performanceObject.kind)
        kindsArray.forEach((element, index) => {
            kindsArray[index] = element.charAt(0).toUpperCase() + element.slice(1)
        });
    
        // replace kind: 1 by kind: Cardio
        dataFormated[0].forEach((obj,index) => {
            obj.kind = kindsArray[index]
        });

        // const dataFormated = [[
        //     {"kind": "Cardio", "value": 80},
        //     {"kind": "Energie", "value": 120},
        //     {"kind": "Endurance ", "value": 140},
        //     {"kind": "Strength ", "value": 50},
        //     {"kind": "Speed ", "value": 200},
        //     {"kind": "Intensity ", "value": 90}
        // ]]
        return dataFormated
    }
    
}

export default formatData
