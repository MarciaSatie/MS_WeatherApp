//Variables
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const today = new Date();
const dayName = days[today.getDay()];
const dayWeekNumber = today.getDay();// return a number  from 0 (Sunday) to 6 (Saturday)
let hour = today.getHours();   
let min = today.getMinutes();
// Format minutes to always have two digits
min = min < 10 ? '0' + min : min;
let ampm = hour >= 12 ? 'PM' : 'AM';
const celsius = " °C";

//Image Object
const weatherImg = {
  sun: "../assets/sun.png",
  cloudy: "../assets/cloudy.png",
  rain: "../assets/rain.png",

  night:"../assets/moon.png",
  night_cloudy:"../assets/night_cloudy.png",
  night_rain:"../assets/night_rain.png"
};

//Functions---------------------------------------------------------------------------------

dotify.utils.currentTimeInfo=()=>{
  const obj ={};
  obj.todayIndex = dayWeekNumber;
  obj.todayWeekday = dayName;
  obj.hour = hour;
  obj.min = min;
  obj.hour12 = hour%12;
  obj.ampm= ampm;

  return obj;
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
dotify.utils.getCityDailyObj = (cityName) => {
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

