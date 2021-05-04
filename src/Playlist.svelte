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

<h4 class="d-flex">
    <button class="btn align-self-center mr-10 " on:click={() => window.history.back()}>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            style="height: 1.2em; "
        >
            <polyline points="9 14 4 9 9 4" /><path d="M20 20v-7a4 4 0 0 0-4-4H4" />
        </svg>
    </button>
    <span class="align-self-center">{name}</span>
</h4>
{#if songs.length > 0}
    <div class="ml-20">
        {#each songs as song}
            <a class="d-block" target="_blank" href={getLink(song)}>{song.artist} - {song.title}</a>
        {/each}
    </div>
{/if}
