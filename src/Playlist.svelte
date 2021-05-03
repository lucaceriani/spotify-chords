<script>
    export let playlistId;
    export let token;

    import queryString from "query-string";
    import api from "./api";

    let songs = [];
    let name = "";
    api.getSongsAndName(token, playlistId).then((s) => {
        songs = s.songs;
        name = s.name;
    });

    function getLink(song) {
        let baseUrl = "https://www.ultimate-guitar.com/search.php";
        return queryString.stringifyUrl({
            url: baseUrl,
            query: {
                search_type: "title",
                value: `${song.artist} ${song.title.replace("'", "")}`,
            },
        });
    }
</script>

<h2>{name}</h2>
{#if songs.length > 0}
    {#each songs as song}
        <a class="d-block" target="_blank" href={getLink(song)}>{song.artist} - {song.title}</a>
    {/each}
{/if}
