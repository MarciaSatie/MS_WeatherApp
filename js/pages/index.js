document.addEventListener('DOMContentLoaded', () => {
  const cardList = dotify.utils.getCityList();
  const main = document.getElementById('mainContent');
  main.className = "columns is-multiline box has-background-white is-centered is-vcentered"
  cardList.forEach((city) => {
    main.innerHTML = main.innerHTML + dotify.components.createCardList(city);
  });

})

