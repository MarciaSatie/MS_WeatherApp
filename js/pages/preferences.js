

document.addEventListener("DOMContentLoaded", () => {
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
        location.reload();// refresh the page
    }