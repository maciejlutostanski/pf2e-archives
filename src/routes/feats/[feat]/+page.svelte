<script lang="ts">
  import { page } from "$app/stores";
  import { getFeatByName } from "$lib/db/feats";
  import TraitBox from "$lib/shared/TraitBox.svelte";

  const featData = getFeatByName($page.params.feat);

  featData.then((data) => {
    console.log(data);
  });
</script>

{#await featData then data}
  <div class="p-6 text-gray-800">
    <div class="flex space-x-3">
      <div class="flex-grow">
        <div
          class="flex justify-between border-b-2 border-gray-800 text-xl uppercase font-bold"
        >
          <div>{data?.name}</div>
          <div>FEAT {data?.system.level.value}</div>
        </div>
        <div class="my-2 flex space-x-1">
          {#each data?.system.traits.value || [] as trait}
            <TraitBox {trait} />
          {/each}
        </div>
      </div>
      <div>
        <img src="/{data?.img}" alt={data?.name} class="rounded" />
      </div>
    </div>

    <div class="text-sm">
      <b>Source</b>
      {data?.system.source.value}
    </div>
    {#if data?.system.prerequisites.value.length}
      <div class="text-sm">
        <b>Prerequisites</b>
        {data?.system.prerequisites.value.map((item) => item.value).join("; ")}
      </div>
    {/if}
    <div class="border-b border-gray-800 mb-2" />
    <div>
      {@html data?.system.description.value}
    </div>
  </div>
{/await}
