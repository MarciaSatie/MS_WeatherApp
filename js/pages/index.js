document.addEventListener('DOMContentLoaded', () => {
  const cardList = dotify.utils.getCityList();
  const main = document.getElementById('mainContent');
  const favoriteCitiesList = localStorage.getItem("favoriteCities");
  const favoriteCities = JSON.parse(favoriteCitiesList || "[]");
  
  console.log(favoriteCitiesList);

  if (favoriteCities.length > 0){
    const cityFav = document.getElementById("favoriteCities");

    const div1 = document.createElement("div");
    div1.className="notification is-info is-dark";

    const h1 = document.createElement("h1");
    h1.className = "is-size-4 has-text-weight-semibold has-text-white pb-5";
    h1.textContent="Favorite Cities";

    const div2 = document.createElement("div");
    div2.className = "columns is-multiline box has-background-white is-centered is-vcentered"
    favoriteCities.forEach((cityF) => {
      div2.innerHTML = div2.innerHTML + dotify.components.createCardList(cityF);
    });

    div1.appendChild(h1);
    div1.appendChild(div2);
    cityFav.appendChild(div1);
  }
  
  //create cards of cities with min and max temperature.
  const cityAll = document.getElementById("cityAll");
  cityAll.className = "columns is-multiline box has-background-white is-centered is-vcentered"
  cardList.forEach((city) => {
  (!favoriteCities.includes(city))?cityAll.innerHTML = cityAll.innerHTML + dotify.components.createCardList(city):"";
  });

})

