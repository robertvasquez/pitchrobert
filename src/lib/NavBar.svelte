<script>
  import { onMount, tick } from 'svelte';
  export let brandHref = '#top';
  let activeSection = 'about';
  const sections = ['introduction', 'about', 'slides'];

  onMount(() => {
    let navEl = document.querySelector('nav');
    let navHeight = navEl ? navEl.offsetHeight : 0;

    const getSectionEls = () =>
            sections
                    .map((id) => document.getElementById(id))
                    .filter((el) => !!el);

    let sectionEls = getSectionEls();
    /** @type {IntersectionObserver | null} */ let observer = null;
    let handleScroll = () => {};

    (async () => {
      await tick(); // ensure child sections are in the DOM

      // Recompute nav height after tick
      navEl = document.querySelector('nav');
      navHeight = navEl ? navEl.offsetHeight : 0;

      handleScroll = () => {
        // Recompute sections in case DOM changed (SSR timing, conditional content, etc.)
        sectionEls = getSectionEls();
        const scrollPos = window.scrollY + navHeight + 10; // account for sticky nav height
        let current = activeSection;
        for (const el of sectionEls) {
          if (el.offsetTop <= scrollPos) {
            current = el.id;
          }
        }
        if (current && current !== activeSection) {
          activeSection = current;
        }
      };

      // Initial sync in case the page loads mid-way
      handleScroll();
      window.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('resize', () => {
        navEl = document.querySelector('nav');
        navHeight = navEl ? navEl.offsetHeight : 0;
        handleScroll();
      });

      // Keep IntersectionObserver as a fallback to handle edge cases
      observer = new IntersectionObserver(
              (entries) => {
                for (const entry of entries) {
                  if (entry.isIntersecting) {
                    activeSection = entry.target.id;
                  }
                }
              },
              {
                root: null,
                rootMargin: `-${navHeight}px 0px -50% 0px`,
                threshold: 0.1,
              }
      );

      // Observe current (and re-observe if new ones appear after initial tick)
      sectionEls.forEach((section) => observer?.observe(section));
      // Small timeout to catch any late-mounted sections
      setTimeout(() => {
        getSectionEls().forEach((section) => observer?.observe(section));
      }, 0);
    })();

    return () => {
      if (observer) observer.disconnect();
      if (handleScroll) window.removeEventListener('scroll', handleScroll);
    };
  });
</script>

<style>
  nav {
    position: sticky;
    top: 0;
    background: white;
    padding: 1rem;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    z-index: 10;
  }

  .brand {
    font-weight: 800;
    color: #2c3e50;
    letter-spacing: 0.3px;
    white-space: nowrap;
    text-decoration: none;
    transition: color 0.2s ease;
  }

  .brand:hover {
    color: #0077cc;
    text-decoration: none;
  }

  .nav-links {
    display: flex;
    gap: 1.5rem;
    align-items: center;
  }

  .nav-link {
    position: relative;
    font-weight: 600;
    color: #2c3e50;
    text-decoration: none;
    padding-bottom: 0.25rem;
    transition: color 0.2s ease;
  }

  .nav-link:hover {
    color: #0077cc;
  }

  .nav-link::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -3px;
    height: 2px;
    width: 100%;
    background-color: #0077cc;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }

  .nav-link.active::after {
    transform: scaleX(1);
  }

  @media (max-width: 600px) {
    nav {
      flex-wrap: wrap;
      row-gap: 0.5rem;
    }
    .nav-links {
      width: 100%;
      justify-content: center;
      flex-wrap: wrap;
      gap: 1rem;
    }
  }
</style>

<nav>
  <a class="brand" href={brandHref} aria-label={brandHref === '/' ? 'Go to home' : 'Go to top'}>Date Robert</a>
  <div class="nav-links">
    {#each sections as section}
      <a
              href={"#" + section}
              class="nav-link"
              class:active={activeSection === section}
              on:click={() => (activeSection = section)}
              aria-current={activeSection === section ? 'page' : undefined}
      >
        {section.charAt(0).toUpperCase() + section.slice(1)}
      </a>
    {/each}
  </div>
</nav>
