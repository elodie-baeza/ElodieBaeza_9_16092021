// const data = [
//     {"area": "Central ", "value": 80},
//     {"area": "Kirkdale", "value": 40},
//     {"area": "Kensington ", "value": 40},
//     {"area": "Everton ", "value": 90},
//     {"area": "Picton ", "value": 60},
//     {"area": "Riverside ", "value": 80}
// ]

export default function formatUserPerformance(performanceObject) {
    const dataFormated = [[]]

    performanceObject.data.forEach(obj => {
        dataFormated[0].push(obj)
    });

    const kindArray = Object.values(performanceObject.kind)

    kindArray.forEach((element, index) => {
        kindArray[index] = element.charAt(0).toUpperCase() + element.slice(1)
    });

    dataFormated[0].forEach((obj,index) => {
        obj.kind = kindArray[index]
    });

    return dataFormated
}
