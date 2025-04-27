// utils.js

const weatherImg = {
  sun: "../assets/sun.png",
  cloudy: "../assets/cloudy.png",
  rain: "../assets/rain.png",

  night:"../assets/moon.png",
  night_cloudy:"../assets/night_cloudy.png",
  night_rain:"../assets/night_rain.png"
};

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const today = new Date();
const dayName = days[today.getDay()];
const dayWeekNumber = today.getDay();// return a number  from 0 (Sunday) to 6 (Saturday)
console.log(dayWeekNumber);
let hour = today.getHours();   
let min = today.getMinutes();

const celsius = " °C";

// Make sure dotify and dotify.utils exist
window.dotify = window.dotify || {};
dotify.utils = dotify.utils || {};

// ----------------------------
// Update page titles (specific for CityFocus page)
// ----------------------------
dotify.utils.updateTitles = (cityName) => {
  document.getElementById("cityName").textContent = dotify.utils.formatName(cityName);
  document.getElementById("cityWeekday").textContent = dayName;
};

// ----------------------------
// Update main card info (specific for CityFocus page)
// ----------------------------
dotify.utils.updateCardRightNow = (text1, text2) => {
  const h1Title = document.getElementById("rn");
  h1Title.innerHTML = `Right Now  ⏰ ${hour}:${min}`;
  const divParent = document.getElementById("cardRN");
  divParent.innerHTML = ""; // clear existing content

  const column = document.createElement("div");
  column.innerHTML = `
    <div class="is-flex is-justify-content-space-between" style="width: 80%;">
      <p>Temperature: ${text1} ${celsius}</p>
      <p>Wind: ${text2} ${celsius}</p>
    </div>
  `;
  divParent.appendChild(column);
};

dotify.utils.updateCardTemp = (text) => {
  document.getElementById("card1").textContent = text + celsius;
};

dotify.utils.updateCardWind = (text) => {
  document.getElementById("cardWind").textContent = text;
};

dotify.utils.changeCity=(city)=>{

  const cityChoice = city;
 
  const cityData = dotify.utils.getCityObj(cityChoice);
  const cityHourly = dotify.utils.getHourObj(cityChoice);
  const tempNow = cityHourly.hourly.temperature_2m[hour];
  const img  = document.getElementById("cfIMG");

  dotify.utils.updateCardRightNow(tempNow,cityHourly.hourly.wind_speed_10m[hour])
  dotify.utils.updateTitles(cityChoice);
  dotify.utils.updateCardTemp(cityData.daily.temperature_2m_max[0]);
  dotify.utils.updateCardWind(cityData.daily.wind_speed_10m_max[0]);
  dotify.utils.updateSmallWeekCards(days, dayWeekNumber, cityData);
  img.src =dotify.utils.getImg(tempNow); 
  dotify.utils.wetherByTime(cityChoice);
}

dotify.utils.wetherByTime = (city) => {
  const hourcards = document.getElementById("weatherByHour");
  hourcards.innerHTML = ""; // clear previous content

  for (let i = 1; i <= 6; i++) {
    const cityHourly = dotify.utils.getHourObj(city);
    const tempNow = cityHourly.hourly.temperature_2m[hour + i];
    const weatherIMG = dotify.utils.getRandomImg();

    const column = document.createElement("div");
    column.className = "cell p-2"; // smaller padding

    column.innerHTML = `
      <div class="box has-background-light p-2 has-text-centered" style="min-height: 120px;">
        <h1 class="title is-size-5 mb-2">${(hour + i) % 24} hr</h1>
        <img src="${weatherIMG}" class="image" style="width: 60px; height: 60px;">
        <p class="is-size-5 mt-1">Temp: ${tempNow}${celsius}</p>
      </div>
    `;

    hourcards.appendChild(column);
  }
};



// ----------------------------
// Update weekly forecast cards (specific for CityFocus page)
// ----------------------------
dotify.utils.updateSmallWeekCards = (days, dayWeekNumber, cityData) => {
  const weekcards = document.getElementById("weekcards");

  const weekSliceStart = days.slice(dayWeekNumber);
  const weekSliceEnd = days.slice(0, dayWeekNumber);
  const weekReordered = weekSliceStart.concat(weekSliceEnd);

  const todayIndex = 0;
  let count = 0;

  weekReordered.forEach((day) => {
    const column = document.createElement("div");
    column.className = "column is-one-fifth";

    const min = cityData.daily.temperature_2m_min[todayIndex + count];
    const max = cityData.daily.temperature_2m_max[todayIndex + count];
    const weatherIMG = dotify.utils.getRandomImg();

    column.innerHTML = `
      <div class="box has-background-primary is-flex is-flex-direction-column is-align-items-center">
        <h1 class="title is-size-5">${day}</h1>
        <img src=${weatherIMG} class="image is-64x64">
        <p>Min ${min} ${celsius}</p>
        <p>Max ${max} ${celsius}</p>
      </div>
    `;

    weekcards.appendChild(column);
    count++;
  });
};

dotify.utils.imgByDayOrNight=()=>{
  let weatherObj={};
  if(hour>=7 && hour<=19){ // day time
    weatherObj.rain = weatherImg.rain;
    weatherObj.cloudy = weatherImg.cloudy;
    weatherObj.clean = weatherImg.sun;
  }else{
    weatherObj.rain = weatherImg.night_rain;
    weatherObj.cloudy = weatherImg.night_cloudy;
    weatherObj.clean = weatherImg.night;
  }

  return weatherObj;
}

// Will return a imag of sun, rain or cloud
dotify.utils.getImg = (tempNow) => {
  const weatherObj =dotify.utils.imgByDayOrNight();
  return tempNow <=5? weatherObj.rain:
         tempNow <=10?weatherObj.cloudy:weatherObj.clean;
  
};

// Will return a imag of sun, rain or cloud by random
dotify.utils.getRandomImg = () => {
  const weatherObj =dotify.utils.imgByDayOrNight();
  min = 1;
  max = 3;
  let value = Math.floor(Math.random() * (max - min + 1)) + min;

  return value ==1? weatherObj.rain:
  value ==2? weatherObj.cloudy:weatherObj.clean;
  
};

// ----------------------------
// Get weather data object for city
// ----------------------------
dotify.utils.getCityObj = (cityName) => {
  const key = `${cityName}_daily`;
  console.log("Fetching weather data for:", key);
  return dotify.weatherData[key];
};

// ----------------------------
// Get weather hour object for city
// ----------------------------
dotify.utils.getHourObj = (cityName) => {
  const key = `${cityName}_hourly`;
  console.log("Fetching weather data for:", key);
  return dotify.weatherData[key];
};

// ----------------------------
// Get each word from teh array to replace "_" by space and the First letter to uppercase:
// replaceAll: will replace "_" by space
// split(space) to create an array if there is more than 1 word
// map.word
// ----------------------------
dotify.utils.formattedCities = (arrayCity) =>{
  const newArray = arrayCity.map(city => {
    // Split the city into words
    const words = city.split('_');

    // Capitalize each word
    const capitalizedWords = words.map(word => capitalizeFirstLetter(word));

    // Join the words back together
    return capitalizedWords.join(' ');
  });
  return newArray;
}
//reference: https://coreui.io/blog/how-to-capitalize-the-first-letter-in-javascript/#method-1-using-charat-touppercase-and-slice
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

// ----------------------------
// Like FormattedCities will will change the First Letter from each word to uppercase, but for  asingle variable.
// ----------------------------
dotify.utils.formatName=(currentName)=>{
  return currentName.split('_').map(word=>capitalizeFirstLetter(word)).join(' ');
}


dotify.utils.loadCardList=(cityList, divID)=>{
  const cityCards = document.getElementById(divID);
  const todayIndex = 0;
  let count = 0;
    cityList.forEach(city => {
      const column = document.createElement("div");
      column.className = "column is-one-fifth";

      //console.log(currentCity);
      const cityData =  dotify.utils.getCityObj(city);
      const min = cityData.daily.temperature_2m_min[todayIndex];
      const max = cityData.daily.temperature_2m_max[todayIndex];
      const cityHourly = dotify.utils.getHourObj(city);
      const tempNow = cityHourly.hourly.temperature_2m[hour];
      const weatherIMG = dotify.utils.getImg(tempNow); 

      column.innerHTML = `
          <a id="${city}" onclick="myFunction(event)">
              <div class="box has-background-primary is-flex is-flex-direction-column is-align-items-center min-height: 250px;">
                  <h1 class="title is-size-5">${dotify.utils.formatName(city)}</h1>
                  <img src=${weatherIMG} class="image is-64x64">
                  <p>Min ${min} ${celsius}</p>
                  <p>Max ${max} ${celsius}</p>
              </div>
      `;

      cityCards.appendChild(column);
    count++;
    });
} 

