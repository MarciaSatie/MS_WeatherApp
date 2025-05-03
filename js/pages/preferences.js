document.addEventListener("DOMContentLoaded", () => {
    const cityList = dotify.utils.getCityList();
    const suffix = "_CB";
    const retrieveStringArray = localStorage.getItem("favoriteCities");
    const retrieveLastSelCity = localStorage.getItem("selectedCity")
    const favoriteCitiesList = JSON.parse(retrieveStringArray) || [];
    const dropdown = document.getElementById("dropdownOptions");
    const cardPrefrences = document.getElementById("cardPrefrences");


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
        
        dropdown.innerHTML += `
        <option value="${city}" >${cityNameFix}</option>
        `;
        // END ofSettings code ---------------------------------------------------------------
    });
    dropdown.innerHTML += `<option value="${retrieveLastSelCity}">*** Last seen city ***<option>`;
    
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

    }

    function resetFavoriteCities(event){
        localStorage.removeItem("favoriteCities");
        location.reload();// refresh the page
    }

    function settingChanges(){
        const dropdown = document.getElementById("dropdownOptions");
        const selValue = dropdown.value;
        localStorage.setItem("cityDefault", selValue);   
    }