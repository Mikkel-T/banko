<script lang="ts">
  import { Plate } from "@utils/plate";

  import { drawn } from "@store/drawn";

  export let seed;

  let plate;

  $: plate = new Plate(seed);
  $: {
    plate.reset();
    plate.pick_nums($drawn);
    plate = plate;
  }
</script>

{#if seed && plate}
  <table class="border-2 border-dracula-darker dark:border-dracula-light">
    {#each plate.state as row, rowIdx}
      <tr class:bg-dracula-green-700={plate.check_rows().includes(rowIdx)}>
        {#each row as num}
          <td
            class="h-8 w-8 border border-dracula-darker p-0 text-center dark:border-dracula-light"
          >
            {#if num.has_number}
              <div
                class="flex h-full w-full items-center justify-center rounded-full bg-opacity-80 outline-none"
                class:bg-dracula-red={num.picked &&
                  !plate.check_rows().includes(rowIdx)}
                class:bg-dracula-green-900={num.has_number &&
                  plate.check_rows().includes(rowIdx)}
              >
                {num.number}
              </div>
            {/if}
          </td>
        {/each}
      </tr>
    {/each}
  </table>
{/if}
