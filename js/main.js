document.getElementById("year").textContent = new Date().getFullYear();

const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

const sections = document.querySelectorAll("main section[id]");
const linkByHash = new Map(
  Array.from(document.querySelectorAll(".nav-link")).map((link) => [link.getAttribute("href"), link])
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const link = linkByHash.get(`#${entry.target.id}`);
      if (!link) return;
      if (entry.isIntersecting) {
        linkByHash.forEach((l) => l.classList.remove("active"));
        link.classList.add("active");
      }
    });
  },
  { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
);

sections.forEach((section) => observer.observe(section));
