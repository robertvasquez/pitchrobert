<script>
  import { fly } from 'svelte/transition';
  import { onMount } from 'svelte';
  export let y = 20;
  export let duration = 400;

  let visible = false;
  let el;

  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          visible = true;
          observer.unobserve(el); // animate only once
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (el) observer.observe(el);
  });
</script>

<div bind:this={el}>
  {#if visible}
    <div in:fly={{ y, duration }}>
      <slot />
    </div>
  {/if}
</div>
