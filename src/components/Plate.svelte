<script lang="ts">
  import { get_seed } from "@utils";
  import { onMount } from "svelte";
  import IcRoundCheck from "~icons/ic/round-check";
  import IcRoundRefresh from "~icons/ic/round-refresh";

  import { Plate } from "@utils/plate";

  import { emitter } from "@event/plate";

  export let seed = get_seed();

  let plate: Plate;

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
    class="inline-block border-4 border-dracula-darker px-2 py-1 dark:border-dracula-light"
  >
    <table
      class="border-2 border-dracula-darker text-2xl dark:border-dracula-light"
    >
      {#each plate.state as row, rowIdx}
        <tr class:bg-dracula-green-700={plate.check_rows().includes(rowIdx)}>
          {#each row as num}
            <td
              class="size-16 border border-dracula-darker p-0 text-center font-bold dark:border-dracula-light"
            >
              {#if num.has_number}
                <button
                  class="flex h-full w-full items-center justify-center rounded-full bg-opacity-80 outline-none ring-inset ring-dracula-orange hover:ring-4"
                  class:bg-dracula-red={num.picked &&
                    !plate.check_rows().includes(rowIdx)}
                  class:bg-dracula-green-900={num.has_number &&
                    plate.check_rows().includes(rowIdx)}
                  on:click={() => {
                    if (num.has_number && num.number) {
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
              class="mt-1 rounded-md bg-dracula-green-700 p-1 hover:bg-dracula-green-800 active:bg-dracula-green-900"
              on:click={edit_seed}><IcRoundCheck class="h-4 w-4" /></button
            >
          </form>
        {:else}
          <button on:click={() => (editing = true)}>
            {plate.seed}
          </button>
          <button
            class="mt-1 rounded-md bg-dracula-orange p-1 hover:bg-dracula-orange-400 active:bg-dracula-orange-500 print:hidden"
            on:click={() => {
              plate = new Plate(get_seed());
              seed = plate.seed;
            }}><IcRoundRefresh class="h-4 w-4" /></button
          >
        {/if}
      </div>
      <div>banko.mikkel-t.com</div>
    </div>
  </div>
{:else}
  <div
    class="inline-block border-4 border-dracula-darker px-2 py-1 dark:border-dracula-light"
  >
    <table
      class="border-2 border-dracula-darker text-2xl dark:border-dracula-light"
    >
      {#each Array(3) as _}
        <tr>
          {#each Array(9) as _}
            <td
              class="size-16 border border-dracula-darker p-0 dark:border-dracula-light"
            >
            </td>
          {/each}
        </tr>
      {/each}
    </table>
    <div class="flex flex-row items-end justify-between">
      <div></div>
      <div>banko.mikkel-t.com</div>
    </div>
  </div>
{/if}
