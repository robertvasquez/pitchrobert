<script>
  import { fly } from 'svelte/transition';
  import Reveal from '$lib/Reveal.svelte';
</script>

<Reveal>
    <section id="looking" in:fly={{ y: 20, duration: 400 }}>
      <h2>Looking for</h2>
      <p>Someone Nice!</p>
      <p>Be normal!</p>
    </section>
</Reveal>