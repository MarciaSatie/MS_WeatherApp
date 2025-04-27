document.addEventListener('DOMContentLoaded', () => {
  const cardList = getCityList();
  const main = document.getElementById('mainContent');
  cardList.forEach((city) => {
    main.innerHTML = main.innerHTML + dotify.components.createCardList(city);
  });

})

function getCityList(){
  // Get keys
  const keys = Object.keys(dotify.weatherData);
  //Using Set to avoid duplicates
  const returnList = new Set(keys.map(key => {
    // Check if "_daily" exists in the key
    if (key.indexOf("_daily") !== -1 || key.indexOf("_hourly") !== -1) {
      return key.split("_daily")[0].split("_hourly")[0];
    }
  }))
  console.log(returnList); 
  return returnList;
}