<script>
    import { Router, Route, navigate } from "svelte-routing";
    import Login from "./Login.svelte";
    import App from "./App.svelte";
    import Playlist from "./Playlist.svelte";
    import Error from "./Error.svelte";
</script>

<div class="container pb-10 px-5 grid h-full">
    <header>
        <h3 class="gradient-text my-10 pl-10" style="cursor: pointer;" on:click={() => navigate("/")}>
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
        </h3>
    </header>
    <Router>
        <Route path="/app" component={App} />
        <Route path="/error/:reason" component={Error} />
        <Route path="/" component={Login} />
    </Router>
    <footer style="font-size: 70%" class="mt-15 text-center">
        Made with
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            class="text-danger"
            viewBox="0 0 16 16"
            style="height: 1.2em; vertical-align: middle"
        >
            <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
        </svg>
        by <a target="_blank" href="https://github.com/lucaceriani">lucaceriani</a>
    </footer>
</div>

<style>
    .grid {
        display: grid;
        grid-template-rows: auto 1fr auto;
    }

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
        background: var(--gradient);
        pointer-events: none;
    }
</style>
