<script>
    import queryString from "query-string";
    import { navigate } from "svelte-routing";
    import api from "./api";

    const parsedHash = queryString.parse(location.hash);

    if (!parsedHash.access_token) navigate("/error");

    let playlists = [];
    let nextPlaylists = null;

    function loadMore() {
        api.getPlaylists(parsedHash.access_token, nextPlaylists).then((p) => {
            playlists = [...playlists, ...p.items];
            nextPlaylists = p.next;
        });
    }

    function selectPlaylist(id) {
        navigate(`/app/playlist/${id}/${parsedHash.access_token}`);
    }

    // load the default batch
    loadMore();
</script>

<!-- <pre>{JSON.stringify(parsedHash, null, '\t')}</pre> -->
<div class="d-flex flex-wrap">
    {#each playlists as playlist}
        <div class="card p-10 m-5" style="flex: 1 0 20%; cursor: pointer" on:click={selectPlaylist(playlist.id)}>
            {playlist.name}
        </div>
    {/each}
</div>
{#if nextPlaylists}
    <div class="text-center">
        <button class="btn btn-primary m-10" on:click={loadMore}>Load more ...</button>
    </div>
{/if}
