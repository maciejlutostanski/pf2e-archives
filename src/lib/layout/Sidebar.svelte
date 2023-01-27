<script>
  import NavItem from "./NavItem.svelte";
</script>

<div
  class="flex flex-col justify-between h-screen bg-white border-r w-60 flex-shrink-0 shadow-lg relative z-30"
>
  <div class="px-4 py-6">
    <span class="block w-32 h-10 bg-gray-200 rounded-lg" />

    <nav aria-label="Main Nav" class="flex flex-col mt-6 space-y-1">
      <NavItem href="/">Home</NavItem>
      <NavItem href="/feats">Feats</NavItem>
    </nav>
  </div>
</div>
