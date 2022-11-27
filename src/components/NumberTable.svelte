<script>
  import { drawn } from "@store/drawn";
  import { range } from "lodash-es";
</script>

<table
  class="h-screen w-1/2 select-none border border-nord0 p-0 text-center dark:border-nord6"
>
  <tbody>
    {#each range(10, 91, 10) as row}
      <tr>
        {#each range(9, -1) as sub}
          <td
            class:bg-red-500={$drawn.includes(row - sub)}
            class="border border-nord0 text-center text-3xl font-bold dark:border-nord6"
            >{row - sub}</td
          >
        {/each}
      </tr>
    {/each}
  </tbody>
</table>
