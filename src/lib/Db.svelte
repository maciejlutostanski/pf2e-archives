<script lang="ts">
  import { dbState } from "./db/init";
  import Spinner from "./Spinner.svelte";
</script>

{#if $dbState.state !== "loaded"}
  <div class="h-screen w-screen flex justify-center items-center">
    <Spinner />
  </div>
{:else}
  <slot />
{/if}
