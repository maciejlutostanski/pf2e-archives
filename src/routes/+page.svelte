<script lang="ts">
  import { getActions } from "$lib/db/actions";
  import VirtualScroll from "svelte-virtual-scroll-list";
  import { invoke } from "@tauri-apps/api/tauri";

  let actions = getActions();

  function test() {
    invoke("recreate_database")
      .then((message) => console.log(message))
      .catch((error) => console.error(error));
  }
  async function test2() {
    const start = new Date().getTime();
    const resp = await invoke("get_feats_by_page");
    const end = new Date().getTime();
    console.log(end - start);
    console.log(resp);
  }
</script>

{#await actions then items}
  <button on:click={test}>reset DB</button>
  <button on:click={test2}>get feats</button>
  <div>nazwa</div>
  <div>nazwa</div>
  <div>nazwa</div>
  <div>nazwa</div>
  <div>nazwa</div>
{/await}
