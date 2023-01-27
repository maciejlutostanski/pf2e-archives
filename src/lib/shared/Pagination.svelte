<script lang="ts">
  import { PAGE_SIZE } from "$lib/config/lists";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { scrollElement } from "svelte-scrolling";

  export let totalCount: number;
  export let pageNumber: number;

  $: pages = Math.floor(totalCount / PAGE_SIZE);

  function prev() {
    let query = $page.url.searchParams;
    query.set("page", String(pageNumber - 1));
    goto(`?${query.toString()}`);
    scrollElement("top");
  }

  function next() {
    let query = $page.url.searchParams;
    query.set("page", String(pageNumber + 1));
    goto(`?${query.toString()}`);
    scrollElement("top");
  }
</script>

<div class="flex justify-between items-center">
  <div class="text-xs text-gray-400">
    Total: {totalCount}
  </div>
  <div class="inline-flex items-center justify-center gap-3">
    <div
      class:text-gray-300={pageNumber === 0}
      class:cursor-not-allowed={pageNumber === 0}
      on:click={prev}
      on:keypress={prev}
      class="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-300 cursor-pointer"
    >
      <span class="sr-only">Next Page</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-3 w-3"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
          clip-rule="evenodd"
        />
      </svg>
    </div>

    <p class="text-xs">
      {pageNumber + 1}
      <span class="mx-0.25">/</span>
      {pages}
    </p>

    <div
      class:text-gray-300={pageNumber === pages}
      class:cursor-not-allowed={pageNumber === pages}
      on:click={next}
      on:keypress={next}
      class="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-300 cursor-pointer"
    >
      <span class="sr-only">Next Page</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-3 w-3"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
  </div>
</div>
