<script>
    import { afterUpdate, onMount, tick } from "svelte";
    import { navigate } from "svelte-routing";
    import api from "./api";
    import Playlist from "./Playlist.svelte";

    const token = localStorage.getItem("token");
    // console.log(token);
    if (!token) navigate("/error/login");

    let playlists = [
        {
            images: [{ url: "/liked.jpg" }],
            name: "Liked tracks",
            id: "liked-tracks",
        },
    ];
    let nextPlaylists = null;
    let loadMoreText = "Load more";

    window.onhashchange = (e) => {
        // console.log(e);
        // same as selecting the same playlist
        if (/#.+$/.test(e.oldURL)) {
            // if i am currently inside one playlist
            selectPlaylist(null, selectedPlaylistId);
        } else {
            selectedPlaylistId = window.location.hash.substring(1);
        }
        // console.log(e);
    };

    function loadMore(e) {
        if (e) {
            scrollBackTo = e.currentTarget.offsetTop;
            needsToScrollBack = true;
        }
        loadMoreText = "Loading ...";
        api.getPlaylists(token, nextPlaylists)
            .then((p) => {
                playlists = [...playlists, ...p.items];
                nextPlaylists = p.next;
                loadMoreText = "Load more";
            })
            .catch(() => navigate("/error/api"));
    }

    function selectPlaylist(e, id) {
        if (selectedPlaylistId != id) {
            navigate("#" + id);
            scrollBackTo = e.currentTarget.offsetTop;
            selectedPlaylistId = id;
        } else {
            location.hash = "";
            needsToScrollBack = true;
            selectedPlaylistId = null;
        }
    }

    let selectedPlaylistId = null;
    let scrollBackTo = null;
    let needsToScrollBack = false;

    afterUpdate(() => {
        // when the user exits from a playlist view
        if (needsToScrollBack) {
            console.log("scrolling back to", scrollBackTo);
            api.scrollTo(document.getElementById("container-scroll"), scrollBackTo);
            scrollBackTo = null;
            needsToScrollBack = false;
        }
    });

    // load the first batch of playlists
    loadMore();
</script>

<div class="border" style="overflow-y: auto; border-radius: 1.2rem;" id="container-scroll">
    {#each playlists.filter((p) => (selectedPlaylistId ? selectedPlaylistId == p.id : true)) as playlist}
        <div
            class="playlist d-flex flex-column"
            class:h-full={!!selectedPlaylistId}
            class:is-big={!!selectedPlaylistId}
            data-id={playlist.id}
            on:click={(e) => {
                selectPlaylist(e, playlist.id);
            }}
        >
            <div class="d-flex p-20 border-bottom">
                {#if playlist.images.length > 0}
                    <img src={playlist.images[0].url} alt="" class="playlist-image" />
                {:else}
                    <div class="playlist-image">&nbsp;</div>
                {/if}
                <span class="playlist-name flex-grow-1">
                    {playlist.name}
                </span>
                {#if !!selectedPlaylistId}
                    <span class="text-success playlist-name w-25"> &times; </span>
                {/if}
            </div>
            {#if !!selectedPlaylistId}
                <div class="d-flex flex-column py-10" style="flex: 1 1 1px">
                    <div style="flex: 1 1 1px; overflow-y:auto">
                        <Playlist playlistId={selectedPlaylistId} {token} />
                    </div>
                </div>
            {/if}
        </div>
    {/each}
    {#if nextPlaylists && selectedPlaylistId == null}
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
    .is-big:hover {
        background: var(--dark-color);
    }

    .playlist-name {
        font-weight: bold;
        align-self: center;
    }
    .playlist-image {
        margin-right: 1em;
        width: 2em;
        height: 2em;
        object-fit: cover;
    }
</style>
