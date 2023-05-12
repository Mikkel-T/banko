<script>
  import IcRoundRefresh from "~icons/ic/round-refresh";
  import IcRoundPlus from "~icons/ic/round-plus";
  import IcRoundMinus from "~icons/ic/round-minus";
  import IcRoundPrint from "~icons/ic/round-print";

  import Footer from "@components/Footer.svelte";
  import Plate from "@components/Plate.svelte";

  import { emitter } from "@event/plate";

  let count = 1;
</script>

<div>
  <div class="flex flex-col items-center justify-center gap-2 print:hidden">
    <div class="text-2xl">Antal plader</div>
    <div class="flex flex-row items-center justify-center gap-2 text-3xl">
      <button
        on:click={() => {
          if (count > 1) {
            count -= 1;
          }
        }}
        class="flex cursor-pointer items-center justify-center rounded-md bg-dracula-pink p-1 hover:bg-dracula-pink-400 active:bg-dracula-pink-500"
      >
        <IcRoundMinus class="h-6 w-6" />
      </button>
      <div>{count}</div>
      <button
        on:click={() => {
          count += 1;
        }}
        class="flex cursor-pointer items-center justify-center rounded-md bg-dracula-pink p-1 hover:bg-dracula-pink-400 active:bg-dracula-pink-500"
      >
        <IcRoundPlus class="h-6 w-6" />
      </button>
    </div>
    <button
      class="flex cursor-pointer items-center justify-center rounded-md bg-dracula-red p-2 text-dracula-light hover:bg-dracula-red-500 active:bg-dracula-red-600"
      on:click={() => emitter.emit("reset")}
    >
      <IcRoundRefresh class="mr-2 inline-flex h-5 w-5" />
      Nulstil alle plader
    </button>
    <button
      class="flex cursor-pointer items-center justify-center rounded-md bg-dracula-orange-400 p-2 text-dracula-light hover:bg-dracula-orange-500 active:bg-dracula-orange-600"
      on:click={() => window.print()}
    >
      <IcRoundPrint class="mr-2 inline-flex h-5 w-5" />
      Print bankoplader
    </button>
  </div>

  <div class="text-center">
    {#each new Array(count) as _}
      <div class="m-2 inline-block">
        <Plate />
      </div>
    {/each}
  </div>

  <Footer />
</div>
