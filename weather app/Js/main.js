
async function countrySearch(countryName){
    let request = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=f220cebb55de43acbcf141514240504&q=${countryName}&days=3`);
    if(request.status === 200){
            let respond = await request.json();
            // calling function for the current weather 
            displayCurrentDay(respond.current, respond.location );
            // calling function for the other days weather 
            displayOtherDays(respond.forecast.forecastday);
            console.log(respond.forecast.forecastday[1]);
            console.log(respond.forecast.forecastday[2]);

    }

}

const days=["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday"];
const months=["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const dayOne = document.querySelector("#day-one");
const searchInput = document.querySelector("#search-bar-input");
const dayTwo = document.querySelector("#day-two"); 
const dayThree =document.querySelector("#day-three");

countrySearch("cairo");
searchInput.addEventListener("input",event=>countrySearch(event.target.value));


function displayCurrentDay(currentData, location){
    if(currentData != null){ // to make sure data isn't empty
        let dateData = new Date(currentData.last_updated); //time and date of the location
        let day = dateData.getDay(); 
        let month = dateData.getMonth();
        let date = dateData.getDate();
        // console.log(month);
        dayOne.innerHTML = `<div class="inner">
        <div class="day-one-three-header day-one-header-radius-top d-flex justify-content-between p-2">
            <span class="ms-2">${days[day]}</span> 
            <span class="me-2"> ${date} ${months[month]}</span>
        </div>

        <div class="weather-content ms-4 m-5">
            <h1 class="country-name h6 mt-4 fw-lighter">${location.name}</h1>

            <div class="temperature d-flex align-items-center gap-3 my-4">
                <h1 class="display-1 fw-bolder text-white">${currentData.temp_c}&degC</h1>
                <span><img src="${currentData.condition.icon}" alt="night" width="90"/></span>
            </div>

            <span class="weather-description d-block mt-5">${currentData.condition.text}</span>

            <div class="extra-into-weather d-flex align-items-center gap-3 mt-3">
                <div class="rain">
                    <span><img src="../images/icon-umberella.png" alt="rain icon" /></span>
                    <span>20%</span>
                </div>

                <div class="wind">
                    <span><img src="../images/icon-wind.png" alt="wind icon" /></span>
                    <span>18km/h</span>
                </div>

                <div class="wind-direction">
                    <span><img src="../images/icon-compass.png" alt="compass icon" /></span>
                    <span>East</span>
                </div>
            </div>
        </div>
    </div>`;



    }
}


function displayOtherDays(data){
    if(data != null){
        let dateDataOne = new Date(data[1].date); //time and date for day 2
        let dateOne = dateDataOne.getDay();

        let dateDataTwo = new Date(data[2].date); //time and date of day 3
        let dateTwo = dateDataTwo.getDay();  

        //* ---- For Day 2 ----
        dayTwo.innerHTML=`<div class="inner">
        <div class="day-two-header p-2 text-center">
            <span class="ms-2">${days[dateOne]}</span>
        </div>

        <div class="weather-content ms-4 m-5 d-flex flex-column align-items-center">
            <img src="${data[1].day.condition.icon}" alt="sunny icon" width="48">

            <div class="day-night-temp text-center">
                <h6 class="middle-last-card-sunny d-block mt-4">${data[1].day.maxtemp_c}&degC</h6>
                <span class="middle-last-card-night d-block">${data[1].day.mintemp_c}&deg</span>
            </div>

                <span class="weather-description d-block mt-5">${data[1].day.condition.text}</span>

        </div>
    </div>`;


        //* ---- For Day 3 ----
        dayThree.innerHTML= `<div class="inner">
        <div class="day-one-three-header p-2 text-center day-three-header-radius-top">
            <span class="ms-2">${days[dateTwo]}</span>
        </div>

        <div class="weather-content ms-4 m-5 d-flex flex-column align-items-center">
            <img src="${data[2].day.condition.icon}" alt="sunny icon" width="48">

            <div class="day-night-temp text-center">
                <h6 class="middle-last-card-sunny d-block mt-4">${data[2].day.maxtemp_c}&degC</h6>
                <span class="middle-last-card-night d-block">${data[2].day.mintemp_c}&deg</span>
            </div>

                <span class="weather-description d-block mt-5">${data[2].day.condition.text}</span>

        </div>
    </div>`;
    }
}

