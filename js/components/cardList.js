window.dotify.components.createCardList = (city) => {
  const today = dotify.utils.currentTimeInfo();
  const todayIndex = today.todayIndex;// return a number  from 0 (Sunday) to 6 (Saturday)
  var cityData = dotify.utils.getCityDailyObj(city);
  const cityHourly = dotify.utils.getHourObj(city);
  const min = cityData.daily.temperature_2m_min[todayIndex];
  const max = cityData.daily.temperature_2m_max[todayIndex];
  let hour = today.hour;
  const tempNow = cityHourly.hourly.temperature_2m[hour];   
  let weatherIMG = dotify.utils.getImg(tempNow);

  return `
  <a id="${city}" onclick="goToCityFous(event)">
  <div class="box has-background-primary is-flex is-flex-direction-column is-align-items-center m-1"
    style="width: 170px; min-height: 220px;">
      <h1 class="title is-size-5 has-text-white">${dotify.utils.formatName(city)}</h1>
      <div class="has-text-grey-dark">
        <img src=${weatherIMG} class="image is-64x64">
        <p>Min ${min} ${celsius}</p>
        <p>Max ${max} ${celsius}</p>
      </div>
  </div>
  `
}

function goToCityFous(event){
  const cityId = event.currentTarget.id;
  localStorage.setItem("selectedCity",cityId);
  window.location.href = `/cityFocus/?city=${cityId}`;
}

//I had to make each key inside of the object call a fucntion to update teh value each time the brouswer reloads.
// Getters and setters allow you to define Object Accessors.
//reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get
window.dotify.components.LStorage = {
  get LastSelCity() {
    return localStorage.getItem("selectedCity") || "";
  },
  get StringArray() {
    return localStorage.getItem("favoriteCities") || "[]";
  },
  get LSCWasSelected() {
    return localStorage.getItem("lastSeenWasSelected") || "true";
  },
  get DefaultCity() {
    return localStorage.getItem("cityDefault") || "";
  },
};
