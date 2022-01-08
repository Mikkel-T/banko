<script>
  import { drawn } from '@store/drawn';
  import { range } from 'lodash-es';
</script>

<table
  class="border border-nord0 dark:border-nord6 text-center p-0 w-1/2 h-screen"
>
  <tbody>
    {#each range(10, 91, 10) as row}
      <tr>
        {#each range(9, -1) as sub}
          <td
            class:bg-red-500={$drawn.includes(row - sub)}
            class="border border-nord0 dark:border-nord6 text-center text-3xl font-bold"
            >{row - sub}</td
          >
        {/each}
      </tr>
    {/each}
  </tbody>
</table>
