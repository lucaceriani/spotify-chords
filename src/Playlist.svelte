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
                // console.log(s);
                songs = [...songs, ...s.songs];
                next = s.next;
                loadMoreText = "Load more";
            })
            .catch(() => navigate("/error/api"));
    }
    loadMore(); // load first 100 songs

    function getLink(song) {
        let baseUrl = "https://www.ultimate-guitar.com/search.php";
        return queryString.stringifyUrl({
            url: baseUrl,
            query: {
                search_type: "title",
                value: `${song.artist} ${api.cleanTitle(song.title)}`,
            },
        });
    }
</script>

<div style="overflow-y: auto; heigth: 100%">
    {#each songs as song, idx}
        <div class="d-flex">
            <span class="number">
                {idx + 1}.
            </span>
            <a target="_blank" href={getLink(song)} on:click={(e) => e.stopPropagation()}>
                {song.artist} - {song.title}
            </a>
        </div>
    {/each}
    {#if next}
        <div class="text-center">
            <button class="btn m-20" style="width: 20em" on:click|stopPropagation={loadMore}>{loadMoreText}</button>
        </div>
    {/if}
</div>

<style>
    .number {
        font-variant-numeric: tabular-nums;
        min-width: 2em;
        text-align: right;
        margin-right: 0.2em;
    }
</style>
