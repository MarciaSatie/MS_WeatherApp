document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const city = params.get("city")|| "Waterford"; ;
    localStorage.setItem("selectedCity",city);
    const savedCity = city|| localStorage.getItem("selectedCity") || "waterford";

    //changing title:
    const title = document.getElementById("page-heading");

    title.innerHTML = dotify.utils.formatName(city);

   changeCity(savedCity);
});

function changeCity(city){

    const cityChoice = city;
   
    const cityData = dotify.utils.getCityDailyObj(cityChoice);
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