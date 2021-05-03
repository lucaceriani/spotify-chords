<script>
    import { Router, Route } from "svelte-routing";
    import Login from "./Login.svelte";
    import App from "./App.svelte";
    import Playlist from "./Playlist.svelte";
</script>

<div class="container">
    <h1>Spotify to Tabs</h1>
    <Router>
        <Route path="/app" component={App} />
        <Route path="/app/playlist/:playlistId/:token" component={Playlist} />
        <Route path="/" component={Login} />
    </Router>
</div>
