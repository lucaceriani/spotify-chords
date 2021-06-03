<script>
    import queryString from "query-string";
    import { onMount } from "svelte";
    import { navigate } from "svelte-routing";
    const parsedHash = queryString.parse(location.hash);

    onMount(() => {
        if (parsedHash.access_token) {
            localStorage.setItem("token", parsedHash.access_token);
            navigate("app");
        } else {
            navigate("/error/login");
        }
    });
</script>
