<script>
  import { onMount } from 'svelte';
  let activeSection = 'about';
  const sections = ['about', 'gallery', 'looking', 'testimonials', 'contact'];

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            activeSection = entry.target.id;
          }
        }
      },
      {
        root: null,
        rootMargin: '0px 0px -60% 0px',
        threshold: 0.1,
      }
    );

    sections.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
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
    justify-content: center;
    gap: 1.5rem;
    z-index: 10;
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
      gap: 1rem;
    }
  }
</style>

<nav>
  {#each sections as section}
    <a
      href={"#" + section}
      class="nav-link"
      class:active={activeSection === section}
    >
      {section.charAt(0).toUpperCase() + section.slice(1)}
    </a>
  {/each}
</nav>
