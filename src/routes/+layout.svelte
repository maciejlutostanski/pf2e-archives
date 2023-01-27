<script>
  import Db from "$lib/Db.svelte";
  import Sidebar from "$lib/layout/Sidebar.svelte";
  import Topbar from "$lib/layout/Topbar.svelte";
  import "../app.postcss";
</script>

<Db>
  <div class="flex min-h-screen w-screen">
    <Sidebar />
    <div class="flex flex-col flex-grow">
      <Topbar />
      <main class="flex-grow overflow-x-hidden overflow-y-auto">
        <slot />
      </main>
    </div>
  </div>
</Db>

<style>
  main {
    height: calc(100vh - theme(height.16));
  }
</style>
