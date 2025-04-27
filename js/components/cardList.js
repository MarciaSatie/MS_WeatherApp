window.dotify.components.createCardList = (city) => {
  const today = new Date();
  const todayIndex = today.getDay();// return a number  from 0 (Sunday) to 6 (Saturday)
  var cityData = dotify.utils.getCityDailyObj(city);
  const cityHourly = dotify.utils.getHourObj(city);
  const min = cityData.daily.temperature_2m_min[todayIndex];
  const max = cityData.daily.temperature_2m_max[todayIndex];
  let hour = today.getHours();
  const tempNow = cityHourly.hourly.temperature_2m[hour];   
  let weatherIMG = dotify.utils.getImg(tempNow);

  return `
  <a id="${city}" onclick="goToCityFous(event)">
  <div class="box has-background-primary is-flex is-flex-direction-column is-align-items-center m-1"
    style="width: 170px; min-height: 220px;">
      <h1 class="title is-size-5">${dotify.utils.formatName(city)}</h1>
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
  window.location.href = `/cityFocus/?city=${cityId}`;
}
