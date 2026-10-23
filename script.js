// ==========================================
// 1. WAIT UNTIL THE HTML PAGE IS LOADED
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    console.log("Welcome to Mayur Kanade's Portfolio!");

//typing animation

    const roleElement = document.querySelector(".hero-content h3");

    if (roleElement) {

        const roles = [
            "Aspiring Software Developer",
            "Web Development Enthusiast",
            "Electronics & Telecommunication Student",
            "Java Programmer"
        ];

        let roleIndex = 0;
        let characterIndex = 0;
        let deleting = false;

        function typeRole() {

            const currentRole = roles[roleIndex];

            if (deleting) {

                characterIndex--;

            } else {

                characterIndex++;

            }

            roleElement.textContent =
                currentRole.substring(0, characterIndex);

            let delay = deleting ? 45 : 90;

            if (!deleting && characterIndex === currentRole.length) {

                deleting = true;
                delay = 1400;

            } else if (deleting && characterIndex === 0) {

                deleting = false;

                roleIndex = (roleIndex + 1) % roles.length;

                delay = 400;

            }

            setTimeout(typeRole, delay);

        }

        typeRole();

    }


    // ==========================================
    // 3. MOBILE NAVIGATION MENU
    // ==========================================

    const navbar = document.querySelector(".navbar");
    const navLinks = document.querySelector(".nav-links");

    if (navbar && navLinks) {

        // Create the mobile menu button dynamically.
        const menuButton = document.createElement("button");

        menuButton.className = "menu-toggle";
        menuButton.textContent = "☰";
        menuButton.setAttribute("aria-label", "Open navigation menu");
        menuButton.setAttribute("aria-expanded", "false");

        navbar.appendChild(menuButton);

        menuButton.addEventListener("click", function () {

            const isOpen = navLinks.classList.toggle("active");

            menuButton.textContent = isOpen ? "✕" : "☰";

            menuButton.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuButton.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );

        });

        // Close the menu after clicking a navigation link.
        navLinks.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {

                navLinks.classList.remove("active");

                menuButton.textContent = "☰";

                menuButton.setAttribute("aria-expanded", "false");

                menuButton.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

            });

        });

    }


    // ==========================================
    // 4. SMOOTH SCROLLING
    // ==========================================

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const targetElement = document.querySelector(targetId);

            if (targetElement) {

                event.preventDefault();

                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    // ==========================================
    // 5. SCROLL REVEAL ANIMATION
    // ==========================================

    const sections = document.querySelectorAll(
        ".hero, .about, .skills, .projects, .contact"
    );

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        sections.forEach(function (section) {

            section.classList.add("reveal");

            revealObserver.observe(section);

        });

    } else {

        // Fallback for older browsers.
        sections.forEach(function (section) {

            section.classList.add("visible");

        });

    }


    // ==========================================
    // 6. HIGHLIGHT ACTIVE NAVIGATION LINK
    // ==========================================

    const navigationLinks = document.querySelectorAll(".nav-links a");

    const pageSections = document.querySelectorAll(
        "#home, #about, #skills, #projects, #contact"
    );

    if ("IntersectionObserver" in window) {

        const activeObserver = new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        navigationLinks.forEach(function (link) {

                            link.classList.remove("current");

                            if (
                                link.getAttribute("href") ===
                                "#" + entry.target.id
                            ) {

                                link.classList.add("current");

                            }

                        });

                    }

                });

            },
            {
                rootMargin: "-20% 0px -65% 0px"
            }
        );

        pageSections.forEach(function (section) {

            activeObserver.observe(section);

        });

    }


    // ==========================================
    // 7. BACK-TO-TOP BUTTON
    // ==========================================

    const topButton = document.createElement("button");

    topButton.id = "backToTop";
    topButton.innerHTML = "↑";

    topButton.setAttribute("aria-label", "Back to top");

    document.body.appendChild(topButton);

    // Show the button after scrolling.
    window.addEventListener("scroll", function () {

        if (window.scrollY > 300) {

            topButton.classList.add("show");

        } else {

            topButton.classList.remove("show");

        }

    });

    // Return to the top when clicked.
    topButton.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


    // ==========================================
    // 8. DYNAMIC FOOTER YEAR
    // ==========================================

    const footerText = document.querySelector("footer p");

    if (footerText) {

        footerText.innerHTML =
            "&copy; " +
            new Date().getFullYear() +
            " Mayur Kanade. All rights reserved.";

    }


    // ==========================================
    // 9. CONTACT BUTTON INTERACTION
    // ==========================================

    const emailButton = document.querySelector(
        '#contact a[href^="mailto:"]'
    );

    if (emailButton) {

        emailButton.addEventListener("click", function (event) {

            const emailAddress = emailButton
                .getAttribute("href")
                .replace("mailto:", "")
                .trim();

            if (
                !emailAddress ||
                emailAddress === "YOUR_EMAIL@example.com"
            ) {

                event.preventDefault();

                alert(
                    "Please configure your email address in index.html."
                );

            }

        });

    }

    // ==========================================
// FEATURE: INTERACTIVE SKILL CARDS
// ==========================================

const skillCards = document.querySelectorAll(".skill-card");

const skillDetails = document.getElementById("skillDetails");

// Information displayed for each skill
const skillDescriptions = {

    html: {
        title: "HTML — Web Structure",
        description:
            "HTML is used to structure web pages with headings, paragraphs, images, links, tables, and forms. It provides the foundation of every website."
    },

    css: {
        title: "CSS — Web Styling",
        description:
            "CSS controls the appearance of websites, including colors, layouts, typography, spacing, responsive designs, and animations."
    },

    javascript: {
        title: "JavaScript — Web Interactivity",
        description:
            "JavaScript makes websites interactive. It can handle button clicks, animations, form validation, dynamic content, and user interactions."
    },

    java: {
        title: "Java — Programming",
        description:
            "Java is an object-oriented programming language used to develop applications. It also helps build programming logic and practise data structures."
    },

    github: {
        title: "GitHub — Version Control",
        description:
            "GitHub helps developers store code repositories, track changes, collaborate on projects, and share their work with others."
    }

};


// Add click events to all skill cards

skillCards.forEach(function (card) {

    card.addEventListener("click", function () {

        // Remove selection from every card
        skillCards.forEach(function (item) {
            item.classList.remove("selected");
        });

        // Highlight the clicked card
        card.classList.add("selected");

        // Read the selected skill
        const skillName = card.dataset.skill;

        const skill = skillDescriptions[skillName];

        // Display its description
        if (skill && skillDetails) {

            const heading = document.createElement("h3");
            heading.textContent = skill.title;

            const paragraph = document.createElement("p");
            paragraph.textContent = skill.description;

            skillDetails.replaceChildren(heading, paragraph);

        }

    });

});

// FEATURE 3: PROJECT FILTERING

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const selectedFilter = button.dataset.filter;

        // Update the active button
        filterButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        // Show or hide projects
        projectCards.forEach(function (card) {

            const category = card.dataset.category;

            if (selectedFilter === "all" || category === selectedFilter) {
                card.classList.remove("hidden");
            } else {
                card.classList.add("hidden");
            }

        });

    });

});
});