<script>
    import queryString from "query-string";

    function go() {
        // see https://developer.spotify.com/documentation/general/guides/authorization-guide/#authorization-flows

        let scopes = "playlist-read-private playlist-read-collaborative";
        let redirectTo = queryString.stringifyUrl({
            url: "https://accounts.spotify.com/authorize",
            query: {
                client_id: "f8ac1ba570f24cbd9b444418f4cfc25a",
                response_type: "token",
                redirect_uri: "http://localhost:5000/app",
                scope: scopes,
            },
        });

        location.href = redirectTo;
    }
</script>

<main>
    <button on:click={go} class="btn btn-large btn-success">Please login with Spotify</button>
</main>
