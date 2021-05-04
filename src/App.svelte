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
<div style="overflow-y: auto">
    <div class="d-flex flex-wrap">
        {#each playlists as playlist}
            <div class="card p-10 m-5" style="flex: 1 0 20%; cursor: pointer" on:click={selectPlaylist(playlist.id)}>
                {playlist.name}
            </div>
        {/each}
    </div>
    {#if nextPlaylists}
        <div class="text-center">
            <button class="btn m-20" style="width: 20em" on:click={loadMore}>{loadMoreText}</button>
        </div>
    {/if}
</div>
