<script lang="ts">
  import { Plate } from "@utils/plate";

  import { emitter } from "@event/plate";

  export let seed = Math.floor(Math.random() * 1000) + 1;

  let plate = new Plate(seed);

  emitter.on("reset", () => {
    plate.reset();
    plate = plate;
  });
</script>

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
            <button
              class="flex h-full w-full items-center justify-center rounded-full bg-opacity-80"
              class:bg-dracula-red={num.picked &&
                !plate.check_rows().includes(rowIdx)}
              class:bg-dracula-green-900={num.has_number &&
                plate.check_rows().includes(rowIdx)}
              class:hover:bg-dracula-orange-400={num.has_number && !num.picked}
              on:click={() => {
                if (num.has_number) {
                  plate.pick_num(num.number);
                  plate = plate;
                }
              }}
            >
              {#if num.has_number}
                {num.number}
              {/if}
            </button>
          </td>
        {/each}
      </tr>
    {/each}
  </table>
  <div class="flex flex-row justify-between">
    <div>Plade: {plate.seed}</div>
    <div>banko.mikkel-t.com</div>
  </div>
</div>
