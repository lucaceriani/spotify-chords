import queryString from "query-string";

let endpoint = "https://api.spotify.com/v1"

function callApi(token, url, query) {

    url = queryString.stringifyUrl({ url, query })

    return fetch(url, {
        method: 'get',
        headers: new Headers({
            "Authorization": "Bearer " + token
        }),
    }).then(r => r.json())
}

function getPlaylists(token, next = null) {
    let url = endpoint + "/me/playlists"
    if (next) url = next;

    return callApi(token, url, { limit: 50 })
}

function getSongsAndName(token, playlistId) {
    let url = `${endpoint}/playlists/${playlistId}`
    return callApi(token, url, {
        playlist_id: playlistId,
        fields: "(name,tracks.items.track(album(artists),name))"
    })
        .then((s) => ({
            songs: s.tracks.items.map((el) => ({
                artist: el.track.album.artists[0].name,
                title: el.track.name,
            })),
            name: s.name // il nome dell playlist
        })).then()
}


export default {
    getPlaylists,
    getSongsAndName
}