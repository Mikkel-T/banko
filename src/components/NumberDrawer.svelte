<script>
  import { drawn, add, reset as resetDrawn } from "@store/drawn";
  import MdRefresh from "svelte-icons/md/MdRefresh.svelte";

  let nums = [...Array(90).keys()].map((i) => i + 1);

  function draw() {
    if (nums.length > 0) {
      let num = Math.floor(Math.random() * nums.length);
      add(nums[num]);
      nums = nums.filter((i) => i !== nums[num]);
    }
  }

  function handleKeydown(event) {
    if (event.code === "Space") draw();
  }

  function reset() {
    nums = [...Array(90).keys()].map((i) => i + 1);
    resetDrawn();
  }
</script>

<svelte:window on:keydown={handleKeydown} />
<div class="flex w-1/2 flex-col items-center justify-center gap-2">
  <div class="text-9xl">{$drawn[0] || 0}</div>
  <div class="text-5xl">{$drawn[1] || 0}</div>
  <div class="text-4xl">{$drawn[2] || 0}</div>
  <div
    class="cursor-pointer select-none rounded-md bg-dracula-blue-500 p-10 text-dracula-light active:bg-dracula-blue-600"
    on:click={draw}
  >
    Træk et tal
  </div>
  <div
    class="flex cursor-pointer items-center justify-center rounded-md bg-dracula-red p-2 text-dracula-light"
    on:click={reset}
  >
    <span class="mr-2 inline-flex h-5 w-5">
      <MdRefresh />
    </span>
    Reset
  </div>

  <div class="mt-2 mb-5 text-center">
    <a
      href="https://github.com/Mikkel-T/banko"
      class="link"
      target="_blank"
      rel="noreferrer">Open Source</a
    >
    projekt lavet af
    <a class="link" href="https://mikkel-t.com" target="_blank" rel="noreferrer"
      >Mikkel Tønder
    </a>
  </div>
</div>
