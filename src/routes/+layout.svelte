<script>
  import Db from "$lib/Db.svelte";
  import "../app.postcss";
</script>

<Db>
  <main class="container">
    <slot />
  </main>
</Db>
