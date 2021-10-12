import PropTypes from 'prop-types';

// const origin = {userId: 12,
//     kind: {
//         1: 'cardio',
//         2: 'energy',
//         3: 'endurance',
//         4: 'strength',
//         5: 'speed',
//         6: 'intensity'
//     },
//     data: [
//         {
//             value: 80,
//             kind: 1
//         },
//         {
//             value: 120,
//             kind: 2
//         },
//         {
//             value: 140,
//             kind: 3
//         },
//         {
//             value: 50,
//             kind: 4
//         },
//         {
//             value: 200,
//             kind: 5
//         },
//         {
//             value: 90,
//             kind: 6
//         }]}


// const dataFormated = [
//     {"kind": "Cardio", "value": 80},
//     {"kind": "Energie", "value": 120},
//     {"kind": "Endurance ", "value": 140},
//     {"kind": "Strength ", "value": 50},
//     {"kind": "Speed ", "value": 200},
//     {"kind": "Intensity ", "value": 90}
// ]

/**
 * Replace kind as number by kind as string corresponding
 * 
 * @function 
 */
function formatUserPerformance(performanceObject) {
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

    return dataFormated
}

formatUserPerformance.PropTypes = {
    performanceObject: PropTypes.object.isRequired
}

export default formatUserPerformance
