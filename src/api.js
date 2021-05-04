import queryString from "query-string";

let endpoint = "https://api.spotify.com/v1"

function callApi(token, url, query) {

    url = queryString.stringifyUrl({ url, query })

    return fetch(url, {
        method: 'get',
        headers: new Headers({
            "Authorization": "Bearer " + token
        }),
    })
        .then(r => r.ok ? r : Promise.reject("Api error!"))
        .then(r => r.json())
}

function getPlaylists(token, next = null) {
    let url = endpoint + "/me/playlists"
    if (next) url = next;

    return callApi(token, url, { limit: 50 })
}

function getTracks(token, playlistId, next = null) {
    let url = `${endpoint}/playlists/${playlistId}/tracks`
    if (next) url = next;

    return callApi(token, url, {
        fields: "next,items.track(name,album(artists))"
    })
        .then((s) => ({
            songs: s.items.map((el) => ({
                artist: (el.track.album.artists[0] || { name: "" }).name, // only the first arist is considered
                title: el.track.name || "",
            })),
            next: s.next // url to next 100s songs
        }))
}

function getName(token, playlistId) {
    let url = `${endpoint}/playlists/${playlistId}`
    return callApi(token, url, {
        fields: "name"
    }).then(s => s.name)
}


export default {
    getPlaylists,
    getTracks,
    getName,
}