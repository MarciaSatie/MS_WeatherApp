window.dotify.components.createCityCards = (city = []) => {
    console.log(city);
    const cityToRows = songs.map(song => {
        return `
        <tr>
            <td>${song.title}</td>
            <td>${song.artist}</td>
            <td>${song.duration}</td>
        </tr>`
    });
    return  `
    <div class="column is-8">
        <table class="table is-fullwidth">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Artist</th>
                    <th>Duration</th>
                </tr>
            </thead>
            <tbody>
            ${songsToRows.join()}
            </tbody>
        </table>
    </div>`
}

function getCityList (){
    const keys = Object.keys(dotify.weatherData);
    console.log(keys);
}