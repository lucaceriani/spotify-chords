<script>
    import { Router, Route } from "svelte-routing";
    import Login from "./Login.svelte";
    import App from "./App.svelte";
    import Playlist from "./Playlist.svelte";
    import Error from "./Error.svelte";
</script>

<div class="container p-20">
    <h1 class="gradient-text">
        Spotify
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            style="height: 1.2em; vertical-align: middle"
        >
            <polyline points="13 17 18 12 13 7" />
            <polyline points="6 17 11 12 6 7" />
        </svg>
        Chords
    </h1>
    <span class="align-self-center font-weight-light ml-10"> by Luca</span>
    <Router>
        <Route path="/app" component={App} />
        <Route path="/app/playlist/:playlistId/:token" component={Playlist} />
        <Route path="/error" component={Error} />
        <Route path="/" component={Login} />
    </Router>
</div>

<style>
    .gradient-text {
        mix-blend-mode: lighten;
        display: inline-block;
        position: relative;
        color: #fff;
        background: #000;
    }

    .gradient-text::before {
        mix-blend-mode: multiply;
        content: "";
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        /* background: linear-gradient(90deg, rgba(32, 255, 155, 1) 0%, rgba(7, 176, 123, 1) 75%); */
        background: linear-gradient(90deg, rgba(11, 232, 129, 1) 0%, rgba(250, 223, 99, 1) 80%);
        pointer-events: none;
    }
</style>
