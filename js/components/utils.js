//Variables

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

dotify.utils.getCityList=()=>{
  // Get keys
  const keys = Object.keys(dotify.weatherData);
  //Using Set to avoid duplicates
  const returnList = new Set(keys.map(key => {
    // Check if "_daily" or "__hourly" exists in the key, if yes remove it to get City name.
    if (key.indexOf("_daily") !== -1 || key.indexOf("_hourly") !== -1) {
      return key.split("_daily")[0].split("_hourly")[0];
    }
  }))
  console.log(returnList); 
  return returnList;
}

dotify.utils.currentTimeInfo=()=>{
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const today = new Date();
  const dayName = days[today.getDay()];
  const dayWeekNumber = today.getDay();// return a number  from 0 (Sunday) to 6 (Saturday)
  let hour = today.getHours();   
  let min = today.getMinutes();
  let ampm = hour >= 12 ? 'PM' : 'AM';


  const obj ={};
  obj.weekdays = days;
  obj.todayIndex = dayWeekNumber;
  obj.todayWeekday = dayName;
  obj.hour = hour;
  obj.min = min < 10 ? '0' + min : min;
  obj.hour12 = hour%12;
  obj.ampm= ampm;

  return obj;
}

dotify.utils.imgByDayOrNight=()=>{
  const lSotrageChoice = localStorage.getItem("radioWeatherIMG");
  const today = dotify.utils.currentTimeInfo();
  let hour = today.hour;

  const dayObj ={rain:weatherImg.rain, cloudy:weatherImg.cloudy, clean: weatherImg.sun};
  const nightObj = {rain:weatherImg.night_rain, cloudy:weatherImg.night_cloudy, clean: weatherImg.night};

  switch(lSotrageChoice){
    case "Day": 
      return dayObj;
      break;
    case "Night":
      return nightObj;
      break;
    case "ByHour":
      if(hour>=7 && hour<=19){ // day time
        return dayObj;
      }else{
        return nightObj;
      }
      break;
  }

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

