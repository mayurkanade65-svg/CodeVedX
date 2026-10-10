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

});