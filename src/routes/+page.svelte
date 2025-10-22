<!--
  This Svelte page is a personal portfolio landing page for "Robert."
  It features a hero section with a background image and animated intro text,
  followed by sections for About Me, Gallery, Testimonials, Contact, and Compatibility,
  each rendered as separate components. The layout uses modern CSS for styling
  and transitions for smooth visual effects.
-->

<script>
  import NavBar from '$lib/NavBar.svelte';
  import Introduction from "$lib/components/home/Introduction.svelte";
  import About from "$lib/components/home/About.svelte";
  import Slides from "$lib/components/home/Slides.svelte";

  import { fly } from 'svelte/transition';
  import { onMount } from 'svelte';

  export let data;
  let show = false;

  onMount(() => {
    show = true;
  });
</script>

<div id="top"></div>
<NavBar />

<header class="hero">
  {#if show}
    <div class="hero-text" in:fly={{ y: -20, duration: 600, delay: 600}}>
      <h1>Robert</h1>
      <p>Empathetic • Kind • Introverted • Down to Earth</p>
    </div>
  {/if}
</header>

<main>
  <Introduction />
  <About />
  <Slides slides={data?.slides ?? []} />
</main>
