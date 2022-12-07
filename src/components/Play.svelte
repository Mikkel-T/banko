<script>
  import FaPlus from "svelte-icons/fa/FaPlus.svelte";
  import FaMinus from "svelte-icons/fa/FaMinus.svelte";
  import MdRefresh from "svelte-icons/md/MdRefresh.svelte";
  import Footer from "@components/Footer.svelte";

  import Plate from "./Plate.svelte";

  import { emitter } from "@event/plate";

  let count = 1;
</script>

<div>
  <div class="flex flex-col items-center justify-center gap-2">
    <div class="text-2xl">Antal plader</div>
    <div class="flex flex-row items-center justify-center gap-2 text-3xl">
      <button
        on:click={() => {
          if (count > 1) {
            count -= 1;
          }
        }}
        class="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md bg-dracula-pink p-2 hover:bg-dracula-pink-400 active:bg-dracula-pink-500"
      >
        <FaMinus />
      </button>
      <div>{count}</div>
      <button
        on:click={() => {
          if (count < 6) {
            count += 1;
          }
        }}
        class="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md bg-dracula-pink p-2 hover:bg-dracula-pink-400 active:bg-dracula-pink-500"
      >
        <FaPlus />
      </button>
    </div>
    <button
      class="flex cursor-pointer items-center justify-center rounded-md bg-dracula-red p-2 text-dracula-light hover:bg-dracula-red-500 active:bg-dracula-red-600"
      on:click={() => emitter.emit("reset")}
    >
      <span class="mr-2 inline-flex h-5 w-5">
        <MdRefresh />
      </span>
      Reset
    </button>
  </div>

  <div class=" text-center">
    {#each new Array(count) as _}
      <div class="m-2 inline-block">
        <Plate />
      </div>
    {/each}
  </div>

  <Footer />
</div>
