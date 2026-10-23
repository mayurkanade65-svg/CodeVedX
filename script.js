
document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    // =====================================================
    // 1. CONFIGURATION
    // =====================================================
    const SUPABASE_URL = "https://gtzspiosjpwrgybxoqjl.supabase.co";
    const SUPABASE_KEY = "sb_publishable_mAQZhV4VjFBusSQQ0rM_lg_QNVFm3g7";

    // Replace this with your actual email address.
    const YOUR_EMAIL = "YOUR_EMAIL@gmail.com";

    // =====================================================
    // 2. SKILLS SECTION
    // =====================================================

    const skillCards = document.querySelectorAll(".skill-card");
    const skillDetails = document.getElementById("skillDetails");

    const skillsData = {
        html: {
            title: "HTML",
            description:
                "HTML creates the structure of web pages using headings, paragraphs, images, links, forms, and other elements."
        },
        css: {
            title: "CSS",
            description:
                "CSS styles web pages using colors, layouts, spacing, responsive design, animations, and visual effects."
        },
        javascript: {
            title: "JavaScript",
            description:
                "JavaScript adds interactivity to websites, including dynamic project cards, search, filters, form validation, and interactive features."
        },
        java: {
            title: "Java",
            description:
                "Java is an object-oriented programming language used to build applications, implement logic, and solve programming problems."
        },
        github: {
            title: "GitHub",
            description:
                "GitHub helps store code repositories, track changes, manage projects, and collaborate with other developers."
        }
    };

    skillCards.forEach(function (card) {
        card.addEventListener("click", function () {
            const skill = card.dataset.skill;
            const details = skillsData[skill];

            if (!details || !skillDetails) return;

            skillCards.forEach(function (item) {
                item.classList.remove("selected");
                item.setAttribute("aria-pressed", "false");
            });

            card.classList.add("selected");
            card.setAttribute("aria-pressed", "true");

            skillDetails.replaceChildren();

            const heading = document.createElement("h3");
            heading.textContent = details.title;

            const paragraph = document.createElement("p");
            paragraph.textContent = details.description;

            skillDetails.append(heading, paragraph);
        });

        card.setAttribute("aria-pressed", "false");
    });


    // =====================================================
    // 3. PROJECT DATA
    // Edit project descriptions and links here.
    // =====================================================

    const projects = [
        {
            id: "coal-mine",
            title: "Coal Mine Safety & Monitoring",
            category: "Web Development",
            description:
                "A web-based dashboard concept for monitoring coal-mine risk and alerts.",
            fullDescription:
                "A coal mine monitoring project concept designed to display mine conditions, sensor readings, potential risks, and early-warning alerts through a web dashboard.",
            technologies: ["HTML", "CSS", "JavaScript", "IoT"],
            features: [
                "Dashboard for viewing mine-related information",
                "Display of sensor readings and risk indicators",
                "Early-warning alert interface concept"
            ],
            learning:
                "This project provides an opportunity to practise dashboard design, data presentation, and the integration of web interfaces with monitoring systems.",
            github: "",
            demo: ""
        },
        {
            id: "finance-tracker",
            title: "Personal Finance Tracker",
            category: "Java",
            description:
                "A Java project for recording expenses and tracking personal budgets.",
            fullDescription:
                "A personal finance application concept for recording income and expenses, categorising transactions, and helping users understand their spending.",
            technologies: ["Java", "OOP"],
            features: [
                "Record income and expenses",
                "Organise transactions into categories",
                "Track spending and budget totals"
            ],
            learning:
                "This project can help practise Java fundamentals, object-oriented programming, data handling, and financial calculations.",
            github: "",
            demo: ""
        },
        {
            id: "noise-monitor",
            title: "Noise Monitoring System",
            category: "IoT",
            description:
                "An ESP8266-based project that monitors sound using a sensor and web dashboard.",
            fullDescription:
                "An IoT noise-monitoring project using an ESP8266, a sound sensor, indicator LEDs, and a web interface to show sound detection status.",
            technologies: ["ESP8266", "Arduino IDE", "C++", "HTML", "CSS"],
            features: [
                "Read input from a sound sensor",
                "Indicate noise status using LEDs",
                "Display monitoring information on a web dashboard"
            ],
            learning:
                "This project provides practical experience with microcontrollers, sensor inputs, Wi-Fi connectivity, and web-based monitoring.",
            github: "",
            demo: ""
        }
    ];

    // =====================================================
    // 4. PROJECT ELEMENTS
    // =====================================================

    const projectsGrid = document.getElementById("projectsGrid");
    const projectDetails = document.getElementById("projectDetails");
    const projectSearch = document.getElementById("projectSearch");
    const filterButtons = document.querySelectorAll(".filter-btn");

    let activeCategory = "All";
    let searchTerm = "";
    let currentProjectIndex = 0;

    // Escape text before inserting it into generated HTML.
    function escapeHTML(value) {
        return String(value).replace(/[&<>"']/g, function (character) {
            const entities = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"
            };

            return entities[character];
        });
    }

    function getFilteredProjects() {
        return projects.filter(function (project) {
            const matchesCategory =
                activeCategory === "All" ||
                project.category === activeCategory;

            const searchableText = [
                project.title,
                project.category,
                project.description,
                ...project.technologies
            ].join(" ").toLowerCase();

            const matchesSearch = searchableText.includes(
                searchTerm.toLowerCase()
            );

            return matchesCategory && matchesSearch;
        });
    }

    // =====================================================
    // 5. RENDER PROJECT CARDS
    // =====================================================

    function renderProjects() {
        if (!projectsGrid) return;

        const filteredProjects = getFilteredProjects();

        projectsGrid.replaceChildren();

        if (projectDetails) {
            projectDetails.hidden = true;
            projectDetails.replaceChildren();
        }

        projectsGrid.hidden = false;

        if (filteredProjects.length === 0) {
            const emptyMessage = document.createElement("p");
            emptyMessage.className = "project-empty";
            emptyMessage.textContent =
                "No projects found. Try another search or category.";

            projectsGrid.appendChild(emptyMessage);
            return;
        }

        filteredProjects.forEach(function (project) {
            const card = document.createElement("article");
            card.className = "project-card";

            const category = document.createElement("span");
            category.className = "project-category";
            category.textContent = project.category;

            const heading = document.createElement("h3");
            heading.textContent = project.title;

            const description = document.createElement("p");
            description.textContent = project.description;

            const openButton = document.createElement("button");
            openButton.type = "button";
            openButton.className = "project-action secondary project-open-hint";
            openButton.textContent = "View project details →";
            openButton.addEventListener("click", function () {
                openProject(project.id);
            });

            card.append(category, heading, description, openButton);
            projectsGrid.appendChild(card);
        });
    }

    // =====================================================
    // 6. PROJECT DETAILS VIEW
    // =====================================================

    function openProject(projectId) {
        if (!projectsGrid || !projectDetails) return;

        const projectIndex = projects.findIndex(function (project) {
            return project.id === projectId;
        });

        if (projectIndex === -1) return;

        currentProjectIndex = projectIndex;

        const project = projects[currentProjectIndex];

        const technologiesHTML = project.technologies.map(function (tech) {
            return `<span class="project-tag">${escapeHTML(tech)}</span>`;
        }).join("");

        const featuresHTML = project.features.map(function (feature) {
            return `<li>${escapeHTML(feature)}</li>`;
        }).join("");

        const githubHTML = project.github
            ? `<a class="project-action" href="${escapeHTML(project.github)}" target="_blank" rel="noopener noreferrer">View GitHub</a>`
            : "";

        const demoHTML = project.demo
            ? `<a class="project-action" href="${escapeHTML(project.demo)}" target="_blank" rel="noopener noreferrer">Live Demo</a>`
            : "";

        projectDetails.innerHTML = `
            <button type="button" class="project-back">
                ← Back to all projects
            </button>

            <span class="project-category">
                ${escapeHTML(project.category)}
            </span>

            <h2>${escapeHTML(project.title)}</h2>

            <p>${escapeHTML(project.fullDescription)}</p>

            <h3>Technologies Used</h3>
            <div class="project-tags">
                ${technologiesHTML}
            </div>

            <h3>Key Features</h3>
            <ul>
                ${featuresHTML}
            </ul>

            <h3>What I Learn From This Project</h3>
            <p>${escapeHTML(project.learning)}</p>

            <div class="project-actions">
                ${githubHTML}
                ${demoHTML}
            </div>

            <div class="project-pagination">
                <button type="button"
                    class="project-action secondary"
                    data-project-direction="-1">
                    ← Previous Project
                </button>

                <button type="button"
                    class="project-action secondary"
                    data-project-direction="1">
                    Next Project →
                </button>
            </div>
        `;

        projectsGrid.hidden = true;
        projectDetails.hidden = false;

        projectDetails.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        projectDetails.focus({ preventScroll: true });
    }

    // Use event delegation for buttons inside the details panel.
    if (projectDetails) {
        projectDetails.addEventListener("click", function (event) {
            const backButton = event.target.closest(".project-back");

            if (backButton) {
                projectDetails.hidden = true;
                projectsGrid.hidden = false;

                projectsGrid.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                return;
            }

            const paginationButton = event.target.closest(
                "[data-project-direction]"
            );

            if (paginationButton) {
                const direction = Number(
                    paginationButton.dataset.projectDirection
                );

                const nextIndex =
                    (currentProjectIndex + direction + projects.length) %
                    projects.length;

                openProject(projects[nextIndex].id);
            }
        });
    }

    // =====================================================
    // 7. PROJECT SEARCH AND CATEGORY FILTERS
    // =====================================================

    if (projectSearch) {
        projectSearch.addEventListener("input", function () {
            searchTerm = projectSearch.value.trim();
            renderProjects();
        });
    }

    filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            activeCategory = button.dataset.filter || "All";

            filterButtons.forEach(function (item) {
                item.classList.remove("active");
                item.setAttribute("aria-pressed", "false");
            });

            button.classList.add("active");
            button.setAttribute("aria-pressed", "true");

            renderProjects();
        });

        button.setAttribute(
            "aria-pressed",
            button.classList.contains("active") ? "true" : "false"
        );
    });

    // Render only the dynamic project cards.
    // No second static projects-container is required.
    renderProjects();


    
    // =====================================================
    // 8. CONTACT FORM - SAVE MESSAGES TO SUPABASE
    // =====================================================

    const contactForm = document.getElementById("contactForm");
    const contactStatus = document.getElementById("contactStatus");

    if (contactForm) {
        contactForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            if (!contactForm.reportValidity()) return;

            const name = document.getElementById("contactName").value.trim();
            const email = document.getElementById("contactEmail").value.trim();
            const subject = document.getElementById("contactSubject").value.trim();
            const message = document.getElementById("contactMessage").value.trim();

            if (!name || !email || !subject || !message) {
                if (contactStatus) {
                    contactStatus.textContent = "Please fill in all fields.";
                }
                return;
            }

            const submitButton = contactForm.querySelector(
                'button[type="submit"], input[type="submit"]'
            );

            if (submitButton) submitButton.disabled = true;

            if (contactStatus) {
                contactStatus.textContent = "Sending your message...";
            }

            try {
                const response = await fetch(
                    `${SUPABASE_URL}/rest/v1/contact_messages`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "apikey": SUPABASE_KEY,
                            "Authorization": `Bearer ${SUPABASE_KEY}`,
                            "Prefer": "return=minimal"
                        },
                        body: JSON.stringify({
                            name: name,
                            email: email,
                            subject: subject,
                            message: message
                        })
                    }
                );

                if (!response.ok) {
                    const errorDetails = await response.text();
                    console.error("Supabase error:", errorDetails);
                    throw new Error("Unable to save message.");
                }

                if (contactStatus) {
                    contactStatus.textContent =
                        "Thank you! Your message was sent successfully.";
                }

                contactForm.reset();

            } catch (error) {
                console.error("Contact form error:", error);

                if (contactStatus) {
                    contactStatus.textContent =
                        "Sorry, your message could not be sent. Please try again.";
                }
            } finally {
                if (submitButton) submitButton.disabled = false;
            }
        });
    }


    // =====================================================
    // 9. MOBILE NAVIGATION
    // Creates a menu button if the HTML does not already have one.
    // =====================================================

    const navbar = document.querySelector(".navbar");
    const navLinks = document.querySelector(".nav-links");

    if (navbar && navLinks) {
        let menuToggle = navbar.querySelector(".menu-toggle");

        if (!menuToggle) {
            menuToggle = document.createElement("button");
            menuToggle.type = "button";
            menuToggle.className = "menu-toggle";
            menuToggle.textContent = "☰";
            menuToggle.setAttribute("aria-label", "Toggle navigation");
            menuToggle.setAttribute("aria-expanded", "false");

            navbar.appendChild(menuToggle);
        }

        menuToggle.addEventListener("click", function () {
            const isOpen = navLinks.classList.toggle("active");

            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.textContent = isOpen ? "✕" : "☰";
        });

        navLinks.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                navLinks.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.textContent = "☰";
            });
        });
    }


    // =====================================================
    // 10. SMOOTH SCROLLING
    // =====================================================

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener("click", function (event) {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });


    // =====================================================
    // 11. ACTIVE NAVIGATION LINK
    // =====================================================

    const pageSections = document.querySelectorAll(
        "section[id]"
    );

    const navigationLinks = document.querySelectorAll(
        '.nav-links a[href^="#"]'
    );

    if ("IntersectionObserver" in window) {
        const sectionObserver = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (!entry.isIntersecting) return;

                    navigationLinks.forEach(function (link) {
                        const isCurrent =
                            link.getAttribute("href") ===
                            "#" + entry.target.id;

                        link.classList.toggle("current", isCurrent);
                    });
                });
            },
            {
                rootMargin: "-30% 0px -60% 0px",
                threshold: 0
            }
        );

        pageSections.forEach(function (section) {
            sectionObserver.observe(section);
        });
    }


    // =====================================================
    // 12. SCROLL REVEAL ANIMATION
    // =====================================================

    const revealElements = document.querySelectorAll(
        ".hero-content, .hero-image, .about-content, .about-image, .skill-card, #skillDetails, .projects-toolbar, .projects-grid, .contact-form"
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

        revealElements.forEach(function (element) {
            element.classList.add("reveal");
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach(function (element) {
            element.classList.add("visible");
        });
    }


    // =====================================================
    // 13. BACK-TO-TOP BUTTON
    // =====================================================

    let backToTop = document.getElementById("backToTop");

    if (!backToTop) {
        backToTop = document.createElement("button");
        backToTop.id = "backToTop";
        backToTop.type = "button";
        backToTop.textContent = "↑";
        backToTop.setAttribute("aria-label", "Back to top");

        document.body.appendChild(backToTop);
    }

    function updateBackToTop() {
        backToTop.classList.toggle("show", window.scrollY > 300);
    }

    window.addEventListener("scroll", updateBackToTop, {
        passive: true
    });

    updateBackToTop();

    backToTop.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });


    // =====================================================
    // 14. AUTOMATIC FOOTER YEAR
    // =====================================================

    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
});
