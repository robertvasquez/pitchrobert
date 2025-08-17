<script>
  let name = "I'm Robert!";
  import Navbar from '$lib/Navbar.svelte';
  import AboutMe from '$lib/AboutMe.svelte';
  import Gallery from '$lib/Gallery.svelte';
  import Looking from '$lib/Looking.svelte';
  import { fly } from 'svelte/transition';
  import { onMount } from 'svelte';

  let show = false;

  onMount(() => {
    show = true;
  });
</script>

<style>
.hero {
  position: relative;
  height: 400px;
  background-image: url('/header.jpg');
  background-attachment: fixed;
  background-size: cover;
  background-position: center top;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
}

.hero::before {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4); /* dark overlay */
  z-index: 1;
}

.hero-text {
  position: relative;
  z-index: 2;
  padding: 1rem;
}

.hero-text h1 {
  font-size: 2.5rem;
  margin: 0;
}

.hero-text p {
  font-size: 1.2rem;
  margin-top: 0.5rem;
}

.hero-text h1, .hero-text p {
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}
</style>

<Navbar />

<header class="hero">
  {#if show}
  <div class="hero-text" in:fly={{ y: -20, duration: 600, delay: 600}}>
    <h1>Hi, I'm Robert 👋</h1>
    <p>Welcome to my dating pitch site. Let’s make a great connection.</p>
  </div>
    {/if}
</header>

<main>
  <h1>Welcome to My Dating Pitch Site 👋</h1>

  <AboutMe name="Robert" />
  <Gallery />
  <Looking />
</main>
