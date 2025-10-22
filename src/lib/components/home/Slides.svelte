<script lang="ts">
    import Reveal from "$lib/Reveal.svelte";
    export let slides: string[] = [];

    let selectedIndex: number | null = null;
    let currentIndex = 0;

    function open(index: number) {
        currentIndex = index;
        selectedIndex = index;
    }
    function close() {
        selectedIndex = null;
    }
    function next() {
        if (!slides.length) return;
        currentIndex = (currentIndex + 1) % slides.length;
        selectedIndex = currentIndex;
    }
    function prev() {
        if (!slides.length) return;
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        selectedIndex = currentIndex;
    }
    function onKeydown(e: KeyboardEvent) {
        if (selectedIndex === null) return;
        if (e.key === 'Escape') {
            e.preventDefault();
            close();
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            next();
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            prev();
        }
    }
</script>

<svelte:window on:keydown={onKeydown} />

<Reveal>
    {#if slides && slides.length}
        <section id="slides" class="home-section">
            <h2>Slides</h2>
            <div class="home-container">
                <div class="slides" aria-label="Image slides grid">
                    <div class="slides-grid">
                        {#each slides as src, i}
                            <button class="slide-thumb" on:click={() => open(i)} aria-label={`Open slide ${i + 1}`}>
                                <img class="slide-image" src={src} alt={`Slide ${i + 1}`} loading="lazy" />
                            </button>
                        {/each}
                    </div>
                </div>
            </div>
        </section>
    {/if}
</Reveal>

{#if selectedIndex !== null}
    <div class="lightbox-overlay" role="dialog" aria-modal="true" aria-label="Slide viewer" on:click={(e) => { if (e.currentTarget === e.target) close(); }}>
        <button class="lightbox-close" on:click={close} aria-label="Close full screen">×</button>
        <img class="lightbox-image" src={slides[currentIndex]} alt={`Slide ${currentIndex + 1} full view`} />
        {#if slides.length > 1}
            <button class="lightbox-nav prev" aria-label="Previous" on:click={prev}>❮</button>
            <button class="lightbox-nav next" aria-label="Next" on:click={next}>❯</button>
        {/if}
    </div>
{/if}

<style>
    .slides .slide-thumb {
        display: block;
        padding: 0;
        border: none;
        background: transparent;
        border-radius: 8px;
        overflow: hidden;
        cursor: zoom-in;
    }

    .lightbox-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.85);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    }
    .lightbox-image {
        max-width: 90vw;
        max-height: 90vh;
        box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        border-radius: 8px;
    }
    .lightbox-close {
        position: fixed;
        top: 14px;
        right: 16px;
        color: #fff;
        background: transparent;
        border: none;
        font-size: 2rem;
        line-height: 1;
        cursor: pointer;
    }
    .lightbox-nav {
        position: fixed;
        top: 50%;
        transform: translateY(-50%);
        color: #fff;
        background: rgba(255,255,255,0.1);
        border: 1px solid rgba(255,255,255,0.25);
        width: 44px;
        height: 44px;
        border-radius: 999px;
        display: grid;
        place-items: center;
        cursor: pointer;
        user-select: none;
    }
    .lightbox-nav.prev { left: 18px; }
    .lightbox-nav.next { right: 18px; }
</style>