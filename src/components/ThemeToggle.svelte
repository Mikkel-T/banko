<script lang="ts">
  import { onMount } from "svelte";
  import FaMoon from "svelte-icons/fa/FaMoon.svelte";
  import FaSun from "svelte-icons/fa/FaSun.svelte";

  let theme = "";
  onMount(() => {
    theme = document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
  });

  function chnage_theme() {
    theme = theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark");
  }
</script>

<button
  on:click={chnage_theme}
  class="group absolute right-0 m-2 ml-2 inline-flex h-6 w-12 items-center rounded-full bg-dracula-blue-500 transition-opacity duration-300 ease-in print:hidden"
  class:opacity-0={!theme}
  class:cursor-pointer={theme}
>
  <div
    class="absolute ml-0.5 h-5 w-5 rounded-full bg-dracula-light ring-dracula-red transition-all duration-300 group-hover:ring-4 dark:translate-x-6"
  />
  <span
    class="icon absolute h-4 w-4 translate-x-1 text-dracula-orange-300 transition-colors duration-300 dark:text-dracula-darker-800"
  >
    <FaSun />
  </span>
  <span
    class="icon absolute ml-1 h-4 w-4 translate-x-6 text-dracula-darker-800 transition-colors duration-300 dark:text-dracula-orange-300"
  >
    <FaMoon />
  </span>
</button>
