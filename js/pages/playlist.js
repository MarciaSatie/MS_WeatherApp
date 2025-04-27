document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const playlistName = urlParams.get('name');

    const playlist = dotify.dataStore.list().find(item => item.name === playlistName);
    document.getElementById('page-heading').textContent = playlist.name;

    const main = document.querySelector('main');
    main.innerHTML = main.innerHTML + dotify.components.createPlaylistItem(playlist);
    main.innerHTML = main.innerHTML + dotify.components.createPlaylistList(playlist.songs);
});