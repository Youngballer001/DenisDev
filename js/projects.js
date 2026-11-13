document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       1. SELECT ELEMENTS
    ===================================== */

    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");


    /* =====================================
       2. CHECK ELEMENTS
    ===================================== */

    if (!filterButtons.length || !projectCards.length) {
        return;
    }


    /* =====================================
       3. CACHE PROJECT CATEGORIES
    ===================================== */

    const projects = Array.from(projectCards).map(card => {

        const categories = (card.dataset.category || "")
            .trim()
            .split(/\s+/)
            .filter(Boolean);

        return {
            element: card,
            categories
        };

    });


    /* =====================================
       4. PROJECT FILTERING
    ===================================== */

    function filterProjects(selectedFilter) {

        projects.forEach(project => {

            const shouldShow =
                selectedFilter === "all" ||
                project.categories.includes(selectedFilter);

            project.element.hidden = !shouldShow;

        });

    }


    /* =====================================
       5. UPDATE ACTIVE FILTER
    ===================================== */

    function updateActiveButton(activeButton) {

        filterButtons.forEach(button => {

            const isActive = button === activeButton;

            button.classList.toggle("active", isActive);

            button.setAttribute(
                "aria-pressed",
                String(isActive)
            );

        });

    }


    /* =====================================
       6. FILTER BUTTON EVENTS
    ===================================== */

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            const selectedFilter = button.dataset.filter || "all";

            updateActiveButton(button);

            filterProjects(selectedFilter);

        });

    });


    /* =====================================
       7. INITIAL ACCESSIBILITY STATE
    ===================================== */

    const initialButton =
        document.querySelector(".filter-btn.active") || filterButtons[0];

    updateActiveButton(initialButton);

    filterProjects(initialButton.dataset.filter || "all");

});