(() => {
  document.documentElement.dataset.js = "true";
  const mobileQuery = window.matchMedia("(max-width: 900px)");

  document.querySelectorAll(".site-header").forEach((header) => {
    const toggle = header.querySelector("[data-menu-toggle]");
    if (!toggle) return;

    const menuId = toggle.getAttribute("aria-controls");
    const menu = menuId ? document.getElementById(menuId) : null;
    if (!menu) return;

    const setMenu = (open, returnFocus = false) => {
      header.toggleAttribute("data-menu-open", open);
      toggle.setAttribute("aria-expanded", String(open));

      if (open && mobileQuery.matches) {
        menu.querySelector("a")?.focus();
      } else if (returnFocus) {
        toggle.focus();
      }
    };

    toggle.addEventListener("click", () => {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });

    menu.addEventListener("click", (event) => {
      if (event.target.closest("a") && mobileQuery.matches) setMenu(false);
    });

    header.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        event.preventDefault();
        setMenu(false, true);
      }
    });

    mobileQuery.addEventListener("change", (event) => {
      if (!event.matches) setMenu(false);
    });
  });

  const rail = document.querySelector("[data-section-rail]");
  if (!rail) return;

  const links = [...rail.querySelectorAll("a[href]")];
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const localTargets = links
    .map((link) => {
      const url = new URL(link.href, window.location.href);
      const targetPath = url.pathname.split("/").pop() || "index.html";
      return targetPath === currentPath && url.hash ? document.querySelector(url.hash) : null;
    })
    .filter(Boolean);

  const markCurrent = (link) => {
    links.forEach((candidate) => candidate.removeAttribute("aria-current"));
    link?.setAttribute("aria-current", "location");
  };

  const matchingHash = links.find((link) => link.hash === window.location.hash);
  markCurrent(matchingHash || links.find((link) => localTargets.includes(document.querySelector(link.hash))) || links[0]);

  links.forEach((link) => {
    link.addEventListener("click", () => markCurrent(link));
  });

  if ("IntersectionObserver" in window && localTargets.length >= 3) {
    const targetToLink = new Map(
      localTargets.map((target) => [target.id, links.find((link) => link.hash === `#${target.id}`)])
    );
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) markCurrent(targetToLink.get(visible[0].target.id));
      },
      { rootMargin: "-28% 0px -58% 0px", threshold: [0, 0.25, 0.75] }
    );
    localTargets.forEach((target) => observer.observe(target));
  }
})();
