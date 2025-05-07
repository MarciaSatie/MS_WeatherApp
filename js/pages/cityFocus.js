document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const city = params.get("city")|| "Waterford"; ;
    const savedCity = city|| localStorage.getItem("defaultCity") || localStorage.getItem("SelectedCity") ||"Waterford";

    //changing title int he header to display City Name:
    const title = document.getElementById("page-heading");
    title.innerHTML = dotify.utils.formatName(city);

   changeCity(savedCity);
});

function changeCity(city){

    const cityChoice = city;
    const today = dotify.utils.currentTimeInfo();
    let hour = parseInt(today.hour);
   
    const cityData = dotify.utils.getCityDailyObj(cityChoice);
    const cityHourly = dotify.utils.getHourObj(cityChoice);
    const tempNow = cityHourly.hourly.temperature_2m[hour];
    const img  = document.getElementById("cfIMG");
  
    updateCardRightNow(tempNow,cityHourly.hourly.wind_speed_10m[hour])
    updateCardTemp(cityData.daily.temperature_2m_max[0]);
    updateCardWind(cityData.daily.wind_speed_10m_max[0]);
    updateSmallWeekCards(today.todayIndex, cityData);
    img.src =dotify.utils.getImg(tempNow); 
    wetherByTime(cityChoice);
  }

  // ----------------------------
// Update main card info (specific for CityFocus page)
// ----------------------------
function updateCardRightNow(text1, text2) {
    const h1Title = document.getElementById("rn");
    h1Title.innerHTML = `Right Now  ${dotify.components.icons.Clock}  `;
    const divParent = document.getElementById("cardRN");
    divParent.innerHTML = ""; // clear existing content
  
    const column = document.createElement("div");
    column.innerHTML = `
      <div class="is-flex is-justify-content-space-between has-text-grey-darker" style="width: 80%;">
        <p>Temperature: ${dotify.components.icons.Temp} ${text1} ${celsius}</p>
        <p>Wind:  ${dotify.components.icons.Wind} ${text2}</p>
      </div>
    `;
    divParent.appendChild(column);
  };
  
  function updateCardTemp(text) {
    document.getElementById("card1").textContent = text + celsius;
  };
  
  function updateCardWind(text) {
    document.getElementById("cardWind").textContent = text;
  };
  
  // ----------------------------
// Update weekly forecast cards (specific for CityFocus page)
// ----------------------------
function updateSmallWeekCards ( dayWeekNumber, cityData) {
     const timeInfo= dotify.utils.currentTimeInfo();
     let weekDaysList = timeInfo.weekdays;
    const weekcards = document.getElementById("weekcards");
  
    const weekSliceStart = weekDaysList.slice(dayWeekNumber);
    const weekSliceEnd = weekDaysList.slice(0, dayWeekNumber);
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
        <div class="box has-background-primary is-flex is-flex-direction-column is-align-items-center has-text-grey-darke">
          <h1 class="title is-size-5">${day} </h1>
          <img src=${weatherIMG} class="image is-64x64">
          <div class="has-text-grey-dark">
            <p>Min  ${min} ${celsius}</p>
            <p>Max ${max} ${celsius}</p>
           </div>
        </div>
      `;
  
      weekcards.appendChild(column);
      count++;
    });
  };



  function wetherByTime(city) {
    const today = dotify.utils.currentTimeInfo();
    let hour = parseInt(today.hour);
    const hourcards = document.getElementById("weatherByHour");
    hourcards.innerHTML = ""; // clear previous content
  
    for (let i = 0; i <= 6; i++) {
      const cityHourly = dotify.utils.getHourObj(city);
      const tempNow = cityHourly.hourly.temperature_2m[hour + i];
      const weatherIMG = dotify.utils.getRandomImg();
  
      const column = document.createElement("div");
      column.className = "cell p-2"; // smaller padding

      //from prefereces
      const windNow = cityHourly.hourly.wind_speed_10m[hour + i];
      const divWindH = document.createElement("div");
      const isChecked_WH = localStorage.getItem("windHourlyCB");
      if(isChecked_WH=="true"){
        
        divWindH.innerHTML =`
          <p class="is-size-5 mt-1"> 
              wind ${dotify.components.icons.Wind}: ${windNow}
            </p>`
            
    }
  
      column.innerHTML = `
        <div id="hourlyCard${i}" class="box has-background-light p-2 has-text-centered" style="min-height: 120px;">
          <h1 class="title is-size-5 mb-2 has-text-black">${(hour + i) % 24}hr</h1>
          <img src="${weatherIMG}" class="image" style="width: 60px; height: 60px;">
          <p class="is-size-5 mt-1"> 
            Temp ${dotify.components.icons.Temp}: ${tempNow}${celsius}
          </p>
        </div>
        `;
      hourcards.appendChild(column);
      const hourlyCard = document.getElementById(`hourlyCard${i}`);
      hourlyCard.appendChild(divWindH);
    }
  };