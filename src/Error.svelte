<script>
    export let reason;

    import { link } from "svelte-routing";
</script>

{#if reason == "login"}
    <p class="text-danger">An error occurred performing login, please <a href="/" use:link>try again</a></p>
{:else if reason == "api"}
    <p class="text-danger">
        Error in Spotify response, probably <b>login has expired</b>, please <a href="/" use:link>login again</a>
    </p>
{/if}
