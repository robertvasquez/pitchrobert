<script>
  import { fly } from 'svelte/transition';
  import Reveal from '$lib/Reveal.svelte';
</script>

<Reveal>
    <section id="gallery" in:fly={{ y: 20, duration: 400 }}>
      <h2>Photo Gallery</h2>
      <p>Here are some snapshots of my life:</p>
      <img src="/photo1.jpg" alt="Me hiking" width="300" />
      <img src="/photo2.jpg" alt="My favorite coffee shop" width="300" />
    </section>
</Reveal>