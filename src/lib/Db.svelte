<script lang="ts">
  import { onMount } from "svelte";
  import { getActionsByPage } from "./db/actions";
  import { getFeatsByPage } from "./db/feats";
  import { dbState, db, seedDb } from "./db/init";
  import Spinner from "./Spinner.svelte";

  async function load() {
    const seeded = await seedDb();
    console.log(seeded.length);
  }

  async function drop() {
    db.remove({}, { multi: true });
  }

  async function getData() {
    console.log(await getFeatsByPage(0));
  }
</script>

{#if $dbState.state !== "loaded"}
  <div class="h-screen w-screen flex justify-center items-center">
    <Spinner />
  </div>
{:else}
  <div>
    <div>Przyciski</div>
    <div>
      <button on:click={load}>load</button>
      <button on:click={drop}>drop</button>
      <button on:click={getData}>getData</button>
    </div>
  </div>
  <slot />
{/if}
