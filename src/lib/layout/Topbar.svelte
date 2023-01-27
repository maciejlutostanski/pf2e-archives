<script lang="ts">
  import { shortcut } from "$lib/utils/shortcut";
  let inputRef: any;
</script>

<div class="w-full border-b border-gray-200 py-2 px-4 sm:px-6 h-16 bg-white">
  <div class="relative mt-1 flex items-center">
    <input
      type="text"
      name="search"
      id="search"
      class="block w-full rounded-md border-gray-300 pr-12 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      bind:this={inputRef}
      use:shortcut={{
        alt: true,
        code: "Digit1",
        callback: () => inputRef.focus(),
      }}
    />
    <div class="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
      <kbd
        class="inline-flex items-center rounded border border-gray-200 px-2 font-sans text-sm font-medium text-gray-400"
        >Ctrl/⌘+F</kbd
      >
    </div>
  </div>
</div>
