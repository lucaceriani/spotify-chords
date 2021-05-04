<script>
    import queryString from "query-string";
    import { navigate } from "svelte-routing";
    import api from "./api";

    const parsedHash = queryString.parse(location.hash);

    if (!parsedHash.access_token) navigate("/error/login");

    let playlists = [];
    let nextPlaylists = null;
    let loadMoreText = "Load more";

    function loadMore() {
        loadMoreText = "Loading ...";
        api.getPlaylists(parsedHash.access_token, nextPlaylists)
            .then((p) => {
                playlists = [...playlists, ...p.items];
                nextPlaylists = p.next;
                loadMoreText = "Load more";
            })
            .catch(() => navigate("/error/api"));
    }

    function selectPlaylist(id) {
        navigate(`/app/playlist/${id}/${parsedHash.access_token}`);
    }

    // load the default batch
    loadMore();
</script>

<!-- <pre>{JSON.stringify(parsedHash, null, '\t')}</pre> -->
<div class="rounded" style="overflow-y: auto">
    {#each playlists as playlist}
        <div class="playlist px-10 py-20" on:click={selectPlaylist(playlist.id)}>
            <div class="d-flex">
                {#if playlist.images.length > 0}
                    <img src={playlist.images[0].url} alt="" class="playlist-image" />
                {:else}
                    <div class="playlist-image">&nbsp;</div>
                {/if}
                <span class="playlist-name">
                    {playlist.name}
                </span>
            </div>
        </div>
    {/each}
    {#if nextPlaylists}
        <div class="text-center">
            <button class="btn m-20" style="width: 20em" on:click={loadMore}>{loadMoreText}</button>
        </div>
    {/if}
</div>

<style>
    .playlist {
        cursor: pointer;
        font-size: 1.3em;
        background: var(--dark-color);
    }
    .playlist:hover {
        background: var(--dark-color-light);
    }
    .playlist-name {
        align-self: center;
    }
    .playlist-image {
        margin-right: 1em;
        width: 2em;
        height: 2em;
        object-fit: cover;
    }
</style>
