<script lang="ts">
  import { page } from "$app/stores";
  import { getFeatByName, type Feat } from "$lib/db/feats";
  import TraitBox from "$lib/shared/TraitBox.svelte";

  const data = getFeatByName($page.params.feat);

  featData.then((data) => {
    console.log(data);
  });
</script>
