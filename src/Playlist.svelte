<script>
    export let playlistId;
    export let token;

    import queryString from "query-string";
    import { navigate } from "svelte-routing";
    import api from "./api";

    let songs = [];
    let name = null;
    let next = null;
    let loadMoreText = "Load more";

    function loadMore() {
        loadMoreText = "...";
        api.getTracks(token, playlistId, next)
            .then((s) => {
                console.log(s);
                songs = [...songs, ...s.songs];
                next = s.next;
                loadMoreText = "Load more";
            })
            .catch(() => navigate("/error/timeout"));
    }

    api.getName(token, playlistId)
        .then((n) => (name = n))
        .catch(() => navigate("/error/timeout")); // get playlist name
    loadMore(); // load first 100 songs

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

<main>
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
        <span class="align-self-center">{name ? name : "..."}</span>
    </h4>
    <div style="overflow-y: auto">
        {#each songs as song, idx}
            <div class="d-flex">
                <div class="text-right mr-10" style="font-variant-numeric: tabular-nums; width: 4em;">
                    {idx + 1}.
                </div>
                <a target="_blank" href={getLink(song)}>{song.artist} - {song.title}</a>
            </div>
        {/each}
        {#if next}
            <div class="text-center">
                <button class="btn m-20" style="width: 20em" on:click={loadMore}>{loadMoreText}</button>
            </div>
        {/if}
    </div>
</main>

<style>
    main {
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    main > div {
        flex: 1 1 1px;
    }
</style>
