<script lang="ts">
  import { get_seed } from "@utils";
  import { onMount } from "svelte";
  import MdCheck from "svelte-icons/md/MdCheck.svelte";
  import MdRefresh from "svelte-icons/md/MdRefresh.svelte";

  import { Plate } from "@utils/plate";

  import { emitter } from "@event/plate";

  export let seed = get_seed();

  let plate;

  onMount(() => {
    plate = new Plate(seed);
  });

  let editing = false;

  emitter.on("reset", () => {
    plate.reset();
    plate = plate;
  });

  function edit_seed() {
    plate = new Plate(seed);
    seed = plate.seed;
    editing = false;
  }
</script>

{#if plate}
  <div
    class="inline-block border-4 border-dracula-darker py-1 px-2 dark:border-dracula-light"
  >
    <table
      class="border-2 border-dracula-darker text-2xl dark:border-dracula-light"
    >
      {#each plate.state as row, rowIdx}
        <tr class:bg-dracula-green-700={plate.check_rows().includes(rowIdx)}>
          {#each row as num}
            <td
              class="h-16 w-16 border border-dracula-darker p-0 text-center font-bold dark:border-dracula-light"
            >
              {#if num.has_number}
                <button
                  class="flex h-full w-full items-center justify-center rounded-full border-dracula-orange bg-opacity-80 outline-none hover:border-4"
                  class:bg-dracula-red={num.picked &&
                    !plate.check_rows().includes(rowIdx)}
                  class:bg-dracula-green-900={num.has_number &&
                    plate.check_rows().includes(rowIdx)}
                  on:click={() => {
                    if (num.has_number) {
                      plate.pick_num(num.number);
                      plate = plate;
                    }
                  }}
                >
                  {num.number}
                </button>
              {/if}
            </td>
          {/each}
        </tr>
      {/each}
    </table>
    <div class="flex flex-row items-end justify-between">
      <div>
        Plade:
        {#if editing}
          <form class="inline-block" on:submit|preventDefault={edit_seed}>
            <input
              class="w-14 border-0 border-b-2 border-b-dracula-darker bg-transparent outline-none focus:ring-0 dark:border-b-dracula-light"
              bind:value={seed}
              type="number"
            />
            <button
              class="mt-1 h-6 w-6 rounded-md bg-dracula-green-700 p-1 hover:bg-dracula-green-800 active:bg-dracula-green-900"
              on:click={edit_seed}><MdCheck /></button
            >
          </form>
        {:else}
          <button on:click={() => (editing = true)}>
            {plate.seed}
          </button>
          <button
            class="mt-1 h-6 w-6 rounded-md bg-dracula-orange p-1 hover:bg-dracula-orange-400 active:bg-dracula-orange-500 print:hidden"
            on:click={() => {
              plate = new Plate(get_seed());
              seed = plate.seed;
            }}><MdRefresh /></button
          >
        {/if}
      </div>
      <div>banko.mikkel-t.com</div>
    </div>
  </div>
{/if}
