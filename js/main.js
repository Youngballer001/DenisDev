document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       1. CURRENT YEAR
    ===================================== */

    const currentYear = document.getElementById("current-year");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    /* =====================================
       2. MOBILE NAVIGATION
    ===================================== */

    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    function closeMenu() {

        if (!menuToggle || !navMenu) return;

        navMenu.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");

    }

    function openMenu() {

        if (!menuToggle || !navMenu) return;

        navMenu.classList.add("active");

        menuToggle.setAttribute("aria-expanded", "true");
        menuToggle.setAttribute("aria-label", "Close navigation menu");

    }

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            const isOpen = navMenu.classList.contains("active");

            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }

        });

        navLinks.forEach(link => {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("keydown", event => {

            if (event.key === "Escape") {
                closeMenu();
            }

        });

        // Close mobile navigation when switching to desktop.
        const desktopMediaQuery = window.matchMedia("(min-width: 769px)");

        desktopMediaQuery.addEventListener("change", event => {

            if (event.matches) {
                closeMenu();
            }

        });

    }


    /* =====================================
       3. DARK AND LIGHT THEME
    ===================================== */

    const themeToggle = document.getElementById("theme-toggle");
    const themeIcon = themeToggle?.querySelector("span");

    let savedTheme = "dark";

    try {

        savedTheme = localStorage.getItem("portfolio-theme") || "dark";

    } catch (error) {

        console.warn("Theme preference could not be loaded.");

    }

    function applyTheme(theme) {

        const selectedTheme = theme === "light" ? "light" : "dark";

        document.documentElement.setAttribute(
            "data-theme",
            selectedTheme
        );

        if (themeToggle) {

            if (themeIcon) {
                themeIcon.textContent =
                    selectedTheme === "dark" ? "☀" : "☾";
            }

            themeToggle.setAttribute(
                "aria-label",
                selectedTheme === "dark"
                    ? "Switch to light theme"
                    : "Switch to dark theme"
            );

        }

    }

    applyTheme(savedTheme);

    if (themeToggle) {

        themeToggle.addEventListener("click", () => {

            const currentTheme =
                document.documentElement.getAttribute("data-theme");

            const newTheme =
                currentTheme === "dark" ? "light" : "dark";

            applyTheme(newTheme);

            try {

                localStorage.setItem("portfolio-theme", newTheme);

            } catch (error) {

                console.warn("Theme preference could not be saved.");

            }

        });

    }


    /* =====================================
       4. SCROLL REVEAL ANIMATIONS
    ===================================== */

    const revealElements = document.querySelectorAll(
        ".section-heading, " +
        ".skill-card, " +
        ".project-card, " +
        ".education-card, " +
        ".about-content, " +
        ".about-details, " +
        ".cv-container, " +
        ".contact-information, " +
        ".contact-form"
    );

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!prefersReducedMotion && "IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("reveal", "visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach(element => {

            element.classList.add("reveal");
            revealObserver.observe(element);

        });

    }


    /* =====================================
       5. ACTIVE NAVIGATION LINK
    ===================================== */

    const pageSections = document.querySelectorAll("main section[id]");

    if ("IntersectionObserver" in window && pageSections.length > 0) {

        const sectionObserver = new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    const currentSectionId = entry.target.id;

                    navLinks.forEach(link => {

                        const linkTarget = link.getAttribute("href");

                        const isActive =
                            linkTarget === `#${currentSectionId}`;

                        link.classList.toggle("active", isActive);

                        if (isActive) {

                            link.setAttribute("aria-current", "location");

                        } else {

                            link.removeAttribute("aria-current");

                        }

                    });

                });

            },
            {
                rootMargin: "-35% 0px -55% 0px"
            }
        );

        pageSections.forEach(section => {
            sectionObserver.observe(section);
        });

    }

});