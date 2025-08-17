<script>
  import { fly } from 'svelte/transition';
  import Reveal from '$lib/Reveal.svelte';
</script>

<Reveal>
    <section id="about" in:fly={{ y: 20, duration: 400 }}>
      <h2>About Me</h2>
      <p>Hi! I'm Robert. I'm empathetic, kind, introverted, and down-to-earth.</p>
      <p>I love deep conversations, quiet mornings, and chicken-based snacks. 😄</p>
    </section>
</Reveal>