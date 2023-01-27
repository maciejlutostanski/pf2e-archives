<script lang="ts">
  import { getFeatsByPage, getFeatsCount } from "$lib/db/feats";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import Pagination from "$lib/shared/Pagination.svelte";
  import { scrollRef } from "svelte-scrolling";

  $: pageNumber = Number($page.url.searchParams.get("page")) || 0;
  $: feats = getFeatsByPage(pageNumber);
  const featsCount = getFeatsCount();

  const preserveScroll = (url: string) => {
    goto(`/feats/${url}`, {});
  };
</script>

{#await feats then items}
  <div class="px-4 sm:px-6 py-6" use:scrollRef={"top"}>
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold text-gray-900">Feats</h1>
        <p class="mt-2 text-sm text-gray-700">Filters</p>
      </div>
    </div>

    <div class="mt-8">
      {#await featsCount then count}
        <div class="mb-3">
          <Pagination {pageNumber} totalCount={count} />
        </div>
      {/await}
      <div class="-my-2 -mx-4 sm:-mx-6 lg:-mx-8 ">
        <div class="inline-block min-w-full py-2 align-middle">
          <div class="shadow-sm ring-1 ring-black ring-opacity-5">
            <table class="min-w-full border-separate" style="border-spacing: 0">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                    >Name</th
                  >
                  <th
                    scope="col"
                    class="sticky top-0 z-10 hidden border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell"
                    >Rarity</th
                  >
                  <th
                    scope="col"
                    class="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                    >Traits</th
                  >
                  <th
                    scope="col"
                    class="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                    >Level</th
                  >
                  <th
                    scope="col"
                    class="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                    >Prerequisite</th
                  >
                </tr>
              </thead>
              <tbody class="bg-white">
                {#each items as item}
                  <tr>
                    <td
                      class="whitespace-nowrap border-b border-gray-200 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 hover:text-sky-700 cursor-pointer sm:pl-6 lg:pl-8"
                      on:click={() => preserveScroll(item._id)}
                      on:keypress={() => preserveScroll(item._id)}
                    >
                      <div class="text-base font-bold">
                        {item.name}
                      </div>
                      <div class="text-xs text-gray-400 font-light">
                        {item.system.source.value}
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap border-b border-gray-200 px-3 py-4 text-sm text-gray-500 hidden sm:table-cell"
                    >
                      {item.system.traits.rarity}</td
                    >
                    <td
                      class="border-b border-gray-200 px-3 py-4 text-sm text-gray-500 hidden lg:table-cell"
                      >{item.system.traits.value.join(", ")}</td
                    >
                    <td
                      class="whitespace-nowrap border-b border-gray-200 px-3 py-4 text-sm text-gray-500"
                      >{item.system.level.value}</td
                    >
                    <td
                      class="border-b border-gray-200 px-3 py-4 text-sm text-gray-500"
                      >{item.system.prerequisites.value
                        .map((val) => val.value)
                        .join("; ")}</td
                    >
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
  {#await featsCount then count}
    <div class="px-6 pb-8">
      <Pagination {pageNumber} totalCount={count} />
    </div>
  {/await}
{/await}
