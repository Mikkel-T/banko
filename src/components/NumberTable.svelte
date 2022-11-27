<script>
  import { drawn } from "@store/drawn";
  import { range } from "lodash-es";
</script>

<table
  class="h-screen w-1/2 select-none border border-dracula-darker p-0 text-center dark:border-dracula-light"
>
  <tbody>
    {#each range(10, 91, 10) as row}
      <tr>
        {#each range(9, -1) as sub}
          <td
            class:bg-red-500={$drawn.includes(row - sub)}
            class="border border-dracula-darker text-center text-3xl font-bold dark:border-dracula-light"
            >{row - sub}</td
          >
        {/each}
      </tr>
    {/each}
  </tbody>
</table>
