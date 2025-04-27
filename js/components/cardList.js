window.dotify.components.createCardList = (city) => {
  return `
  <a id="${city}" onclick="goToCityFous(event)">
  <div class="box has-background-primary is-flex is-flex-direction-column is-align-items-center min-height: 250px; m-1">
      <h1 class="title is-size-5">${dotify.utils.formatName(city)}</h1>
      
      <p>Min </p>
      <p>Max $</p>
  </div>
  `
}

function goToCityFous(event){
  console.log("Click")
}
//<img src=${weatherIMG} class="image is-64x64">