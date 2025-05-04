document.addEventListener("DOMContentLoaded", () => {
const path = window.location.pathname; // get URL path

//adding link to cityFocus button
const savedCity = (dotify.components.LStorage.LSCWasSelected=="false")? localStorage.getItem("cityDefault"):localStorage.getItem("selectedCity");
const btnOptions =[{name:"Dashboard", a:"/"},
                    {name:"City Focus",a:`/cityFocus/?city=${savedCity}`},
                    {name:"Preferences",a:`/preferences/`}];

const navBtn = document.getElementById("navBtn");
btnOptions.forEach((item) => {
    let isSelected = "has-text-white";
    
    const onlyPath = item.a.split("?")[0]; // to remove query selector from the string.
    if (onlyPath.toLowerCase() === path.toLowerCase()) { // to lower because at Natlify for some reason the path was lowercase /cityfocus/ instead of /cityFocus/
    isSelected = "has-text-info";
}

    navBtn.innerHTML +=`
    <a href="${item.a}" class="navbar-item ${isSelected}">${item.name} </a>
    `;
});
});