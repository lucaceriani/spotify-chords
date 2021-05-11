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
                redirect_uri: location.href + "app",
                scope: scopes,
            },
        });

        location.href = redirectTo;
    }
</script>

<main style="height: 100%; display: flex; justify-content: center">
    <div style="text-align: center; align-self: center">
        <a href="" on:click|preventDefault={go} class="text-success font-weight-bold font-size-24">
            Login with spotify
        </a>
        <p style="font-size: 70%;">The login will be temporary and it'll expire in 1 hour</p>
    </div>
</main>
