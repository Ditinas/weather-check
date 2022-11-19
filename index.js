let tempmin_max = document.getElementById('tempmin_max');
let placename = document.getElementById('place');
const temp = document.getElementById('temp');
const curDate  = document.getElementById('date');
let inputbox = document.getElementById('inputbox')
const weathercon = document.getElementById('weatherCondition');
let weathercondition1 = document.getElementById("weathercondition1");
const tempstatus = 'clouds';

const currentday = () =>{
    var weekday = new Array(7);
    weekday[0] = 'sun';
    weekday[1] = 'mon';
    weekday[2] = 'tue';
    weekday[3] = 'wed'
    weekday[4] = 'thr';
    weekday[5] = 'fri';
    weekday[6] = 'sat';
     let currtime = new Date();
     let day = weekday[currtime.getDay()];
     return day;
};
const currTime = () =>{
    var months =[
        'jan',
        'feb',
        'mar',
        'apr',
        'may',
        'jun',
        'jul',
        'aug',
        'sep',
        'oct',
        'nov',
        'dec'
        ]
    var curtime = new Date();
    var month  = months[curtime.getMonth()];
    var date = curtime.getDate();

    let hours = curtime.getHours();
    let min = curtime.getMinutes();
    let periods = 'AM';
    if(hours>11){
        periods = 'PM';
        if(hours >12) hours -=12;
    }
    if(min<10){

        min =  '0' +min;
    }

    return `${month}${date} | ${hours} :${min} ${periods}`;
};

curDate.innerHTML = currentday() + ' | ' + currTime();





//weather api work start

const  weatherApi = {
    keys: "e9876432bd68ae91c7ee8a652ea54d7b",
    baseurl: "https://api.openweathermap.org/data/2.5/weather"

}

function getweathrereport(city){
    placename.innerHTML = `<h2>loading..</h2>`;
    fetch(`${weatherApi.baseurl}?q=${city} &appid=${weatherApi.keys}`).then((weather) =>{
        return weather.json();
     }) .then((actualdata)=>{
        placename.innerHTML =`<i class="fas fa-street-view"></i> ${actualdata.name} , ${actualdata.sys.country}`;
        temp.innerHTML = ` ${Math.round(actualdata.main.temp/10)}&deg;c`;
        tempmin_max.innerHTML = ` Temp_Min ${Math.floor(actualdata.main.temp_min/10)}&deg;c |  Temp_max ${Math.floor(actualdata.main.temp_max/10)}&deg;c `;
        weathercondition1.innerHTML = `${actualdata.weather[0].main}`;
      
        const tempStatus = `${actualdata.weather[0].main}`;
// condition to check sunny or couldy

if(tempStatus==='Clear'){
    weathercon.innerHTML = "<i class='fas fa-sun' style='color: #eccc68;'></i> "
} 
else if(tempStatus==='Clouds'){
    weathercon.innerHTML = "<i class='fas fa-cloud' style='color: #eccc68;'></i> "
}
 else if(tempStatus==='Rainy'){
    weathercon.innerHTML = "<i class='fas fa-rain' style='color: #eccc68;'></i> "
}
else if(tempStatus==='Haze'){
    weathercon.innerHTML = "<i class='fa-solid fa-sun-haze'></i>"
}
else if(tempStatus==='Fog'){
    weathercon.innerHTML = "<i class='fa-solid fa-smog' style='color: #eccc68;'></i>"
}
else if(tempStatus==='Smoke'){
    weathercon.innerHTML = "<i class='fas fa-smog' style='color: #eccc68;'></i> "
}
else{
    weathercon.innerHTML = "<i class='fas fa-cloud-rain' style='color: #eccc68;'></i> "
}
    })

    
}


inputbox.addEventListener("keypress",(e)=>{
    if(e.keyCode==13){
        
        getweathrereport(inputbox.value);
    }
    
})