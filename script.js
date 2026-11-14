/* =====================================================
   TANA GIRLS FIRST INITIATIVE - JAVASCRIPT
   "Voice of the Voiceless"
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       1. MOBILE MENU NAVIGATION
    ===================================================== */
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", function (e) {
            e.stopPropagation();
            const isOpen = navLinks.classList.toggle("active");
            menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
            menuToggle.innerHTML = isOpen ? "&times;" : "&#9776;";
        });

        // Close when clicking any nav link
        navLinks.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                navLinks.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.innerHTML = "&#9776;";
            });
        });

        // Close when clicking outside of navbar
        document.addEventListener("click", function (event) {
            if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
                navLinks.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.innerHTML = "&#9776;";
            }
        });
    }


    /* =====================================================
       2. HOME ACTIVITY CAROUSEL
    ===================================================== */
    const carouselTrack = document.getElementById("carouselTrack");
    const slides = document.querySelectorAll(".carousel-slide");
    const previousBtn = document.getElementById("previousBtn");
    const nextBtn = document.getElementById("nextBtn");
    const dotsContainer = document.getElementById("carouselDots");
    const homeCarousel = document.querySelector(".home-carousel");

    let currentSlide = 0;
    let carouselTimer = null;

    // Dynamically build dot indicators
    if (dotsContainer && slides.length > 0) {
        dotsContainer.innerHTML = "";
        slides.forEach(function (_, index) {
            const dot = document.createElement("button");
            dot.classList.add("carousel-dot");
            if (index === 0) dot.classList.add("active");
            dot.setAttribute("type", "button");
            dot.setAttribute("aria-label", "Go to slide " + (index + 1));

            dot.addEventListener("click", function () {
                currentSlide = index;
                updateCarousel();
                restartCarousel();
            });

            dotsContainer.appendChild(dot);
        });
    }

    const dots = document.querySelectorAll(".carousel-dot");

    function updateCarousel() {
        if (!carouselTrack || slides.length === 0) return;

        carouselTrack.style.transform = "translateX(-" + (currentSlide * 100) + "%)";

        dots.forEach(function (dot, index) {
            dot.classList.toggle("active", index === currentSlide);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateCarousel();
    }

    function previousSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateCarousel();
    }

    if (previousBtn) {
        previousBtn.addEventListener("click", function () {
            previousSlide();
            restartCarousel();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", function () {
            nextSlide();
            restartCarousel();
        });
    }

    function startCarousel() {
        if (slides.length <= 1) return;
        clearInterval(carouselTimer);
        carouselTimer = setInterval(nextSlide, 5000);
    }

    function restartCarousel() {
        clearInterval(carouselTimer);
        startCarousel();
    }

    // Pause on hover
    if (homeCarousel) {
        homeCarousel.addEventListener("mouseenter", function () {
            clearInterval(carouselTimer);
        });

        homeCarousel.addEventListener("mouseleave", function () {
            startCarousel();
        });

        // Touch swipe gestures for mobile screens
        let touchStartX = 0;
        let touchEndX = 0;

        homeCarousel.addEventListener("touchstart", function (e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        homeCarousel.addEventListener("touchend", function (e) {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            if (diff > 45) {
                nextSlide();
                restartCarousel();
            } else if (diff < -45) {
                previousSlide();
                restartCarousel();
            }
        }, { passive: true });
    }

    updateCarousel();
    startCarousel();


    /* =====================================================
       3. GALLERY LIGHTBOX
    ===================================================== */
    const galleryItems = document.querySelectorAll(".gallery-item");
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const lightboxCaption = document.getElementById("lightboxCaption");
    const lightboxClose = document.getElementById("lightboxClose");

    if (lightbox && lightboxImage) {
        galleryItems.forEach(function (item) {
            item.addEventListener("click", function () {
                const img = item.querySelector("img");
                const caption = item.querySelector(".gallery-caption");

                if (!img) return;

                lightboxImage.src = img.src;
                lightboxImage.alt = img.alt || "Gallery image";
                lightboxCaption.textContent = caption ? caption.textContent.trim() : (img.alt || "");

                lightbox.classList.add("show");
                lightbox.setAttribute("aria-hidden", "false");
                document.body.style.overflow = "hidden";
            });
        });

        function closeLightbox() {
            lightbox.classList.remove("show");
            lightbox.setAttribute("aria-hidden", "true");
            document.body.style.overflow = "";
        }

        if (lightboxClose) {
            lightboxClose.addEventListener("click", closeLightbox);
        }

        lightbox.addEventListener("click", function (event) {
            if (event.target === lightbox) {
                closeLightbox();
            }
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape" && lightbox.classList.contains("show")) {
                closeLightbox();
            }
        });
    }


    /* =====================================================
       4. CONTACT FORM VALIDATION & FEEDBACK
    ===================================================== */
    const contactForm = document.getElementById("contactForm");
    const formMessage = document.getElementById("formMessage");

    if (contactForm && formMessage) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const nameInput = document.getElementById("name");
            const emailInput = document.getElementById("email");
            const messageInput = document.getElementById("message");

            const name = nameInput ? nameInput.value.trim() : "";
            const email = emailInput ? emailInput.value.trim() : "";
            const message = messageInput ? messageInput.value.trim() : "";

            if (!name || !email || !message) {
                formMessage.textContent = "Please fill in all fields before sending.";
                formMessage.className = "form-message error";
                return;
            }

            formMessage.textContent = "Thank you, " + name + "! Your message has been received. We will get in touch with you shortly.";
            formMessage.className = "form-message success";
            contactForm.reset();
        });
    }


    /* =====================================================
       5. SCROLL REVEAL ANIMATIONS
    ===================================================== */
    const animatedElements = document.querySelectorAll(
        ".work-card, .team-card, .gallery-item, .impact-item, .about-highlights div, .intro-card"
    );

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        animatedElements.forEach(function (element) {
            observer.observe(element);
        });
    } else {
        // Fallback for older browsers
        animatedElements.forEach(function (element) {
            element.classList.add("visible");
        });
    }

});
