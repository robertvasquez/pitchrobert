<script lang="ts">
  import { fly } from 'svelte/transition';
  import { onMount, onDestroy, tick } from 'svelte';
  export let y = 20;
  export let duration = 400;

  let visible = false;
  let el: HTMLElement;
  let observer: IntersectionObserver;

  onMount(async () => {
    await tick();
    observer = new IntersectionObserver(
            ([entry]) => {
              if (entry.isIntersecting) {
                visible = true;
                observer.unobserve(el);
              }
            },
            { threshold: 0.1 }
    );
    if (el) observer.observe(el);
  });

  onDestroy(() => {
    if (observer && el) observer.unobserve(el);
    if (observer) observer.disconnect();
  });
</script>

<div bind:this={el}>
  {#if visible}
    <div in:fly={{ y, duration }}>
      <slot />
    </div>
  {/if}
</div>
