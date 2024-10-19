const city = document.getElementById("cityName");

fetch("/temperatures.json")
.then((resp) => resp.json())
.then(data =>{
    
    city.innerText = data.temperatureData.city;
    geDate(data.temperatureData.data);
    warmColdDays(data.temperatureData.data);
    minMaxTemp(data.temperatureData.data);

});

function geDate(data){
  
    const startDate = document.getElementById("startDate");
    const endDate = document.getElementById("endDate");
    startDate.innerText = data[0].date;
    endDate.innerText = data[data.length-1].date;
    
}

function tempList(data){
    
    const allTemps = Object.values(data.hourlyTemperatures);
    const avgTemp = counter(allTemps);
     
    const minTemp = Math.min(...allTemps);
    const maxTemp = Math.max(...allTemps);

    return {minTemp, maxTemp, avgTemp};
}

function minMaxTemp(data){
    const table = document.getElementById("table");
    let html = "";
    for(const date of data){
  
        const tempData = tempList(date);
        html += `<tr>
                    <td>${date.date}</td>
                    <td>${tempData.minTemp}</td>
                    <td>${tempData.maxTemp}</td>
                    <td>${tempData.avgTemp}</td>
                    
                    </tr>`;
    }

    table.innerHTML = html;
}

function counter(array) {

    if(array.length === 0) return 0;
    const initialValue = 0;
    let result = array.reduce((acc, curr) => acc + curr, initialValue);

    result = result / array.length;

    return result.toFixed(1);
}


function warmColdDays(data){

    container = [];
    for(let i of data) {
        const day = i.date;

        const tempArray = Object.values(i.hourlyTemperatures);

        const avgTemp = counter(tempArray);

        const obj = {day, avgTemp};

        container.push(obj);
    }
     
    let coldestDay = {
        day: null,
        avgTemp: Infinity,
    };
    let warmerDay = {
        day: null,
        avgTemp: -Infinity,
    };

    for(let i =0; i < container.length; i++) {
        const currentDay = container[i];

        if(currentDay.avgTemp < coldestDay.avgTemp) {

            coldestDay.day = currentDay.day;

            coldestDay.avgTemp = currentDay.avgTemp;
        }

        if(currentDay.avgTemp > warmerDay.avgTemp) {

            warmerDay.day = currentDay.day;

            warmerDay.avgTemp = currentDay.avgTemp;
        }

    }


    const warmDayHtml = document.getElementById("warmestAvg");
    const coldDayHtml = document.getElementById("coldestAvg");

    warmDayHtml.innerText = `${warmerDay.day} (${warmerDay.avgTemp})`;
    coldDayHtml.innerText = `${coldestDay.day} (${coldestDay.avgTemp})`;
}


