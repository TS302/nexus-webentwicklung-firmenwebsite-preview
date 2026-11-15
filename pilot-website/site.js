(() => {
  document.documentElement.dataset.js = "true";

  const mobileQuery = window.matchMedia("(max-width: 900px)");
  const normalizeHash = (hash) => (hash === "#kontakt-status" ? "#kontakt" : hash || "#start");
  const normalizePath = (pathname) => {
    const path = pathname.split("/").pop();
    return path || "index.html";
  };
  const currentPath = normalizePath(window.location.pathname);

  const primaryLinks = [...document.querySelectorAll(".primary-nav a[href]")];
  const localPrimaryLinks = primaryLinks.filter((link) => {
    const url = new URL(link.href, window.location.href);
    return Boolean(url.hash) && normalizePath(url.pathname) === currentPath;
  });

  const markPrimaryCurrent = (hash = window.location.hash) => {
    if (!localPrimaryLinks.length) return;
    const targetHash = normalizeHash(hash);
    const match = localPrimaryLinks.find((link) => {
      const url = new URL(link.href, window.location.href);
      return normalizeHash(url.hash) === targetHash;
    });
    localPrimaryLinks.forEach((link) => link.removeAttribute("aria-current"));
    match?.setAttribute("aria-current", "location");
  };

  markPrimaryCurrent();
  window.addEventListener("hashchange", () => markPrimaryCurrent());
  primaryLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const url = new URL(link.href, window.location.href);
      if (normalizePath(url.pathname) === currentPath && url.hash) markPrimaryCurrent(url.hash);
    });
  });

  document.querySelectorAll(".site-header").forEach((header) => {
    const toggle = header.querySelector("[data-menu-toggle]");
    if (!toggle) return;

    const menuId = toggle.getAttribute("aria-controls");
    const menu = menuId ? document.getElementById(menuId) : null;
    if (!menu) return;

    const setMenu = (open, returnFocus = false) => {
      header.toggleAttribute("data-menu-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.textContent = open ? "Schließen" : "Menü";

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

    const handleViewportChange = (event) => {
      if (!event.matches) setMenu(false);
    };
    if (typeof mobileQuery.addEventListener === "function") {
      mobileQuery.addEventListener("change", handleViewportChange);
    } else {
      mobileQuery.addListener(handleViewportChange);
    }
  });

  const rail = document.querySelector("[data-section-rail]");
  if (!rail) return;

  const links = [...rail.querySelectorAll("a[href]")];
  const localTargets = links
    .map((link) => {
      const url = new URL(link.href, window.location.href);
      const targetPath = normalizePath(url.pathname);
      return targetPath === currentPath && url.hash ? document.querySelector(url.hash) : null;
    })
    .filter(Boolean);

  const markCurrent = (link) => {
    links.forEach((candidate) => candidate.removeAttribute("aria-current"));
    link?.setAttribute("aria-current", "location");
  };

  const markFromHash = () => {
    const targetHash = normalizeHash(window.location.hash);
    const matchingHash = links.find((link) => normalizeHash(link.hash) === targetHash);
    const fallback = links.find((link) => localTargets.includes(document.querySelector(link.hash))) || links[0];
    markCurrent(matchingHash || fallback);
  };

  markFromHash();
  window.addEventListener("hashchange", markFromHash);

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
