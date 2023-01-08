<script lang="ts">
  import { drawn } from "@store/drawn";
</script>

<table
  class="h-screen select-none border border-dracula-darker p-0 text-center dark:border-dracula-light md:w-1/2"
>
  <tbody>
    {#each [...Array(9).keys()].map((i) => (i + 1) * 10) as row}
      <tr>
        {#each [...Array(10).keys()].map((i) => 9 - i) as sub}
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
