(() => {
  document.documentElement.dataset.js = "true";

  const mobileQuery = window.matchMedia("(max-width: 900px)");
  const normalizeHash = (hash) => ((hash === "#kontakt-status" || hash === "#kontakt") ? "#anfrage" : hash || "#start");
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
    const syncHeader = () => header.toggleAttribute("data-scrolled", window.scrollY > 12);
    syncHeader();
    window.addEventListener("scroll", syncHeader, { passive: true });
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

  const inquiryForm = document.querySelector("[data-inquiry-form]");
  if (inquiryForm) {
    const status = inquiryForm.querySelector("[data-form-status]");
    inquiryForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!inquiryForm.reportValidity()) return;

      const formData = new FormData(inquiryForm);
      const value = (key) => String(formData.get(key) || "").trim();
      const subject = `Anfrage über Nexus – ${value("name")}`;
      const body = [
        `Name: ${value("name")}`,
        `E-Mail: ${value("email")}`,
        `Unternehmen: ${value("company") || "Nicht angegeben"}`,
        `Projektart: ${value("projectType")}`,
        "",
        "Projektbeschreibung:",
        value("message")
      ].join("\n");

      if (status) status.textContent = "Ihr E-Mail-Programm wird geöffnet …";
      window.location.href = `mailto:info@nexus-webagentur.de?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }

  const setupScrollKickers = () => {
    const candidates = [...document.querySelectorAll(".hero .eyebrow, .section-index, .service-detail-kicker")];
    const kickers = candidates.flatMap((element) => {
      const original = element.textContent.trim().replace(/\s+/g, " ");
      const slashIndex = original.indexOf("/");
      const numberMatch = original.match(/\d{1,3}/);

      if (slashIndex < 0 || !numberMatch) return [];

      const target = Number(numberMatch[0]);
      const numberBeforeSlash = numberMatch.index < slashIndex;
      const label = (numberBeforeSlash
        ? original.slice(slashIndex + 1)
        : original.slice(0, slashIndex)
      ).trim();

      if (!label || !Number.isFinite(target)) return [];

      const accessible = document.createElement("span");
      accessible.className = "sr-only";
      accessible.textContent = original;

      const numberNode = document.createElement("span");
      numberNode.className = "scroll-kicker__number";
      numberNode.setAttribute("aria-hidden", "true");
      numberNode.textContent = "00";

      const dividerNode = document.createElement("span");
      dividerNode.className = "scroll-kicker__divider";
      dividerNode.setAttribute("aria-hidden", "true");
      dividerNode.textContent = " / ";

      const labelNode = document.createElement("span");
      labelNode.className = "scroll-kicker__label";
      labelNode.setAttribute("aria-hidden", "true");
      labelNode.textContent = label;
      element.replaceChildren(labelNode);
      const labelWidth = Math.ceil(labelNode.getBoundingClientRect().width);
      labelNode.textContent = "";
      labelNode.style.setProperty("--scroll-kicker-width", `${labelWidth}px`);

      element.classList.add("scroll-kicker");
      element.replaceChildren(
        accessible,
        ...(numberBeforeSlash
          ? [numberNode, dividerNode, labelNode]
          : [labelNode, dividerNode, numberNode])
      );

      return [{ element, target, numberNode, dividerNode, labelNode, label }];
    });

    if (!kickers.length) return;

    const formatNumber = (value) => String(value).padStart(2, "0");
    const finishKicker = (kicker) => {
      kicker.numberNode.textContent = formatNumber(kicker.target);
      kicker.numberNode.classList.add("is-visible");
      kicker.labelNode.textContent = kicker.label;
      kicker.dividerNode.classList.add("is-visible");
      kicker.labelNode.classList.add("is-visible");
      kicker.element.classList.add("is-complete");
    };

    const animateKicker = (kicker) => {
      if (kicker.element.dataset.scrollKickerState) return;
      kicker.element.dataset.scrollKickerState = "running";
      kicker.element.classList.add("is-animating");

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        finishKicker(kicker);
        return;
      }

      kicker.numberNode.classList.add("is-visible");

      const revealLabel = () => {
        kicker.dividerNode.classList.add("is-visible");
        kicker.labelNode.classList.add("is-visible");
        const characters = [...kicker.label];
        const typeStart = performance.now();
        const typeDuration = Math.max(360, characters.length * 42);

        const typeNext = (now) => {
          const progress = Math.min(1, (now - typeStart) / typeDuration);
          const visibleCharacters = Math.ceil(progress * characters.length);
          kicker.labelNode.textContent = characters.slice(0, visibleCharacters).join("");
          if (progress < 1) {
            window.requestAnimationFrame(typeNext);
          } else {
            kicker.element.classList.add("is-complete");
          }
        };

        window.requestAnimationFrame(typeNext);
      };

      const countNext = (value) => {
        kicker.numberNode.textContent = formatNumber(value);
        if (value < kicker.target) {
          window.setTimeout(() => countNext(value + 1), 120);
        } else {
          window.setTimeout(revealLabel, 140);
        }
      };

      window.setTimeout(() => countNext(0), 180);
    };

    if (!("IntersectionObserver" in window)) {
      kickers.forEach(animateKicker);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.filter((entry) => entry.isIntersecting).forEach((entry) => {
          const kicker = kickers.find((candidate) => candidate.element === entry.target);
          if (kicker) animateKicker(kicker);
        });
      },
      { rootMargin: "-12% 0px -48% 0px", threshold: 0.1 }
    );

    kickers.forEach((kicker) => observer.observe(kicker.element));
  };

  setupScrollKickers();

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
