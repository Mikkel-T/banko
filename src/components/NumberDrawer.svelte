<script lang="ts">
  import MdRefresh from "svelte-icons/md/MdRefresh.svelte";

  import Footer from "@components/Footer.svelte";

  import { draw, drawn, reset } from "@store/drawn";

  import MiniPlate from "./MiniPlate.svelte";

  let seed;
</script>

<div class="flex w-1/2 flex-col items-center justify-center gap-2">
  <div class="text-9xl">{$drawn[0] || 0}</div>
  <div class="text-5xl">{$drawn[1] || 0}</div>
  <div class="text-4xl">{$drawn[2] || 0}</div>
  <button
    class="cursor-pointer select-none rounded-md bg-dracula-blue-500 p-10 text-dracula-light hover:bg-dracula-blue-600 active:bg-dracula-blue-700"
    on:click={draw}
  >
    Træk et tal
  </button>
  <button
    class="flex cursor-pointer items-center justify-center rounded-md bg-dracula-red p-2 text-dracula-light hover:bg-dracula-red-500 active:bg-dracula-red-600"
    on:click={reset}
  >
    <span class="mr-2 inline-flex h-5 w-5">
      <MdRefresh />
    </span>
    Reset
  </button>

  <input
    type="text"
    bind:value={seed}
    class="rounded-md border border-dracula-darker p-1 outline-none dark:border-dracula-light"
    placeholder="Tjek plade"
  />
  <MiniPlate {seed} />

  <a href="/play" class="link my-2 text-center" rel="noreferrer">Bankoplade</a>

  <Footer />
</div>
