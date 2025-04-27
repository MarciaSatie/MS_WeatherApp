dotify.dataStore.data = [
    {
        name: "Chill",
        description: "A playlist to chill to",
        imageUrl: "https://source.unsplash.com/person-holding-coffee-mug-cspncX4cUnQ",
        songs: [{
            artist: "Mogwai",
            title: "Remurdered",
            duration: "6:26"
        }, {
            artist: "Explosions in the Sky",
            title: "Your Hand in Mine",
            duration: "8:17"
        }, {
            artist: "Lisa Hannigan",
            title: "Undertow",
            duration: "3:24"
        }]
    },
    {
        name: "Focus",
        description: "A playlist to focus to",
        imageUrl: "https://source.unsplash.com/person-holding-camera-lens-7KLa-xLbSXA",
        songs: [{
            artist: "Soundgarden",
            title: "Spoonman",
            duration: "6:26"
        }, {
            artist: "A Perfect Circle",
            title: "The Noose",
            duration: "8:17"
        }, {
            artist: "Lankum",
            title: "Dig My Grave",
            duration: "3:24"
        }]
    },
    {
        name: "Let Off Steam",
        description: "A playlist for one of those days",
        imageUrl: "https://source.unsplash.com/black-and-white-electric-guitar-TW-wknV1oZo"
    },
    {
        name: "Rock",
        description: "Rock your socks",
        imageUrl: "https://source.unsplash.com/grayscale-photo-of-person-in-hoodie-top-watching-a-concert-97p-JwqdyW4"
    }
]

dotify.dataStore.list = () => {
    return dotify.dataStore.data
}