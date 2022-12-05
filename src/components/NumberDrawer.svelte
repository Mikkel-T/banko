<script lang="ts">
  import MdRefresh from "svelte-icons/md/MdRefresh.svelte";

  import Footer from "@components/Footer.svelte";

  import { add, drawn, reset as resetDrawn } from "@store/drawn";

  let nums = [...Array(90).keys()].map((i) => i + 1);

  function draw() {
    if (nums.length > 0) {
      let num = Math.floor(Math.random() * nums.length);
      add(nums[num]);
      nums = nums.filter((i) => i !== nums[num]);
    }
  }

  function handle_keydown(event) {
    if (event.code === "Space") draw();
  }

  function reset() {
    nums = [...Array(90).keys()].map((i) => i + 1);
    resetDrawn();
  }
</script>

<svelte:window on:keydown={handle_keydown} />
<div class="flex w-1/2 flex-col items-center justify-center gap-2">
  <div class="text-9xl">{$drawn[0] || 0}</div>
  <div class="text-5xl">{$drawn[1] || 0}</div>
  <div class="text-4xl">{$drawn[2] || 0}</div>
  <button
    class="cursor-pointer select-none rounded-md bg-dracula-blue-500 p-10 text-dracula-light active:bg-dracula-blue-600"
    on:click={draw}
  >
    Træk et tal
  </button>
  <button
    class="flex cursor-pointer items-center justify-center rounded-md bg-dracula-red p-2 text-dracula-light"
    on:click={reset}
  >
    <span class="mr-2 inline-flex h-5 w-5">
      <MdRefresh />
    </span>
    Reset
  </button>

  <a href="/play" class="link my-2 text-center" rel="noreferrer">Bankoplade</a>

  <Footer />
</div>
