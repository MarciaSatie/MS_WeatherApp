

document.addEventListener("DOMContentLoaded", () => {
    const weekDayElement = document.getElementById('weekday');
    weekDayElement.remove();// remove hour from header

    const cityList = dotify.utils.getCityList();
    const suffix = "_CB";

    const favoriteCitiesList = JSON.parse(dotify.components.LStorage.StringArray) || [];
    const dropdown = document.getElementById("dropdownOptions");
    const cardPrefrences = document.getElementById("cardPrefrences");   
    console.log("selectedCity:   " + dotify.components.LStorage.LastSelCity);
    console.log("cityDefault:   " + dotify.components.LStorage.DefaultCity);
    console.log("lastSeenWasSelected:   " + dotify.components.LStorage.LSCWasSelected);


    cityList.forEach(city => {
        const cityNameFix = dotify.utils.formatName(city);

        // Favorite cities code --------------------------------------------------
        const column = document.createElement("div");
        column.classList.add("is-size-6", "mb-4");
       //if city is inside of array favoriteCitiesList, isChecked value  is "checked" or will be empt ( ternary expression).
        const isChecked = favoriteCitiesList.includes(city) ? "checked" : "";
        column.innerHTML = `
            <li>
                <label class="checkbox">
                    <input id="${city + suffix}" type="checkbox" ${isChecked} />
                    ${cityNameFix}
                </label>
            </li>
        `;

        cardPrefrences.appendChild(column);
        // END of Favorite cities code--------------------------------------------------
        // Settings code ---------------------------------------------------------------
        const isSelected = (dotify.components.LStorage.DefaultCity === city)&&(dotify.components.LStorage.LSCWasSelected =="false") ? "selected" : "";
        dropdown.innerHTML += `
        <option value="${city}" ${isSelected}>${cityNameFix}</option>
        `;
        // END ofSettings code ---------------------------------------------------------------
    });
    const isSelected = (dotify.components.LStorage.LSCWasSelected =="true") ? "selected" : "";
    dropdown.innerHTML += `<option value="lastCity" ${isSelected}>*** Last seen city ***<option>`;

    //Settings: windHourly checkbox. --------------------------------------------------------------------
    const isChecked_WH = localStorage.getItem("windHourlyCB");
    if(isChecked_WH=="true"){
        const windHourlyCB = document.querySelector("#windHourlyCB");
        windHourlyCB.checked = true;
    }

    //Settings: manipulate weather images:
    const radioIMGSet =[{name:"Day",icon:"☀️"},
                      {name:"Night", icon:dotify.components.icons.Moon},
                      {name:"ByHour", icon:dotify.components.icons.Clock}
                     ]
    
    const weatherIMG = document.querySelector(".radioWeatherIMG");
    const selRadio= localStorage.getItem("radioWeatherIMG");

    radioIMGSet.forEach((imgSet)=>{
        let isRadioSelected= (selRadio == imgSet.name)? "checked" : "";

        weatherIMG.innerHTML += `
            <label class="radio">
            <input type="radio" name="rsvp" value="${imgSet.name}" ${isRadioSelected} />
                ${imgSet.name} ${imgSet.icon}
            </label>
        `; 
    });

    
});

function updateFavoriteCities(event){
    console.log("you clicked the button");
    const cityList = dotify.utils.getCityList();
    const suffix = "_CB";
    let checkedList =[];

    cityList.forEach(city=>{
        var checkBox = document.getElementById(city+suffix);
        if (checkBox.checked == true){
            //console.log(city);
            checkedList.push(city);
            
        }
    });
    console.log(checkedList);
    const arrayToString = JSON.stringify(checkedList);   
    localStorage.setItem("favoriteCities", arrayToString);
    location.reload();// refresh the page
}

function resetFavoriteCities(event){
    localStorage.removeItem("favoriteCities");
    location.reload();// refresh the page
}

function settingChanges(){
    // Default City.
    const dropdown = document.getElementById("dropdownOptions");
    let selValue = dropdown.value;
    if(selValue ==="lastCity"){
        selValue =dotify.components.LastSelCity;
        localStorage.setItem("cityDefault", selValue);
        localStorage.setItem("lastSeenWasSelected",true);   
    }else{
        localStorage.setItem("cityDefault", selValue);
        localStorage.setItem("lastSeenWasSelected",false);  
    }
    //End of Defaul city.

    //Storing information from windHourlyCB Checkbox
    const windHourlyCB = document.querySelector("#windHourlyCB");
    (windHourlyCB.checked == true)? localStorage.setItem("windHourlyCB",true) : localStorage.setItem("windHourlyCB",false);
    
    //Storing information from radioWeatherIMG Radio 
    const selectedWeatherIMG = document.querySelector('input[name="rsvp"]:checked');
    if (selectedWeatherIMG) {
    localStorage.setItem("radioWeatherIMG", selectedWeatherIMG.value);
    }


    location.reload();// refresh the page
}

