<script>
  import { random, pull, range } from 'lodash-es';
  import { drawn, add, reset as resetDrawn } from '@store/drawn';
  import ThemeToggle from '@components/ThemeToggle.svelte';
  import MdRefresh from 'svelte-icons/md/MdRefresh.svelte';

  let nums = range(1, 91);

  function draw() {
    if (nums.length > 0) {
      let num = random(1, nums.length);
      add(nums[num - 1]);
      pull(nums, nums[num - 1]);
    }
  }

  function handleKeydown(event) {
    if (event.code === 'Space') draw();
  }

  function reset() {
    nums = range(1, 91);
    resetDrawn();
  }
</script>

<svelte:window on:keydown={handleKeydown} />
<ThemeToggle />
<div class="flex justify-center items-center flex-col w-1/2 gap-2">
  <div class="text-9xl">{$drawn[0] || 0}</div>
  <div class="text-5xl">{$drawn[1] || 0}</div>
  <div class="text-4xl">{$drawn[2] || 0}</div>
  <div
    class="bg-nord9 p-10 rounded-md cursor-pointer select-none active:bg-nord10 text-nord6"
    on:click={draw}
  >
    Træk et tal
  </div>
  <div
    class="bg-nord11 p-2 rounded-md justify-center flex items-center cursor-pointer text-nord6"
    on:click={reset}
  >
    <span class="h-5 w-5 inline-flex mr-2">
      <MdRefresh />
    </span>
    Reset
  </div>
</div>
