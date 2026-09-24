```javascript
/* =====================================================
   MOBILE MENU
===================================================== */

const menuToggle =
    document.getElementById("menuToggle");

const mainNav =
    document.getElementById("mainNav");


if (menuToggle && mainNav) {

    menuToggle.addEventListener(
        "click",
        function () {

            mainNav.classList.toggle("show");

        }
    );


    mainNav.querySelectorAll("a").forEach(
        function (link) {

            link.addEventListener(
                "click",
                function () {

                    mainNav.classList.remove("show");

                }
            );

        }
    );

}


/* =====================================================
   HOME CAROUSEL
===================================================== */

const carouselTrack =
    document.getElementById("carouselTrack");

const slides =
    document.querySelectorAll(".carousel-slide");

const previousBtn =
    document.getElementById("previousBtn");

const dotsContainer =
    document.getElementById("carouselDots");

let currentSlide = 0;

let carouselTimer;


/* CREATE DOTS */

if (dotsContainer && slides.length > 0) {

    slides.forEach(
        function (slide, index) {

            const dot =
                document.createElement("button");

            dot.classList.add("carousel-dot");

            dot.setAttribute(
                "aria-label",
                "Go to slide " + (index + 1)
            );

            dot.addEventListener(
                "click",
                function () {

                    currentSlide = index;

                    updateCarousel();

                    restartCarousel();

                }
            );

            dotsContainer.appendChild(dot);

        }
    );

}


const dots =
    document.querySelectorAll(".carousel-dot");


/* UPDATE CAROUSEL */

function updateCarousel() {

    if (!carouselTrack || slides.length === 0) {
        return;
    }


    carouselTrack.style.transform =
        "translateX(-" +
        (currentSlide * 100) +
        "%)";


    dots.forEach(
        function (dot, index) {

            dot.classList.toggle(
                "active",
                index === currentSlide
            );

        }
    );

}


/* NEXT */

function nextSlide() {

    currentSlide++;

    if (currentSlide >= slides.length) {

        currentSlide = 0;

    }

    updateCarousel();

}


/* PREVIOUS */

function previousSlide() {

    currentSlide--;

    if (currentSlide < 0) {

        currentSlide =
            slides.length - 1;

    }

    updateCarousel();

}


/* PREVIOUS BUTTON ONLY */

if (previousBtn) {

    previousBtn.addEventListener(
        "click",
        function () {

            previousSlide();

            restartCarousel();

        }
    );

}


/* =====================================================
   AUTOMATIC SLIDE
===================================================== */

function startCarousel() {

    if (slides.length <= 1) {
        return;
    }

    carouselTimer =
        setInterval(
            nextSlide,
            5000
        );

}


function restartCarousel() {

    clearInterval(carouselTimer);

    startCarousel();

}


updateCarousel();

startCarousel();


/* PAUSE WHEN MOUSE IS OVER CAROUSEL */

const homeCarousel =
    document.querySelector(".home-carousel");


if (homeCarousel) {

    homeCarousel.addEventListener(
        "mouseenter",
        function () {

            clearInterval(carouselTimer);

        }
    );


    homeCarousel.addEventListener(
        "mouseleave",
        function () {

            startCarousel();

        }
    );

}


/* =====================================================
   LIGHTBOX
===================================================== */

const galleryImages =
    document.querySelectorAll(
        ".gallery-item img"
    );

const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const lightboxCaption =
    document.getElementById("lightboxCaption");

const lightboxClose =
    document.getElementById("lightboxClose");


galleryImages.forEach(
    function (image) {

        image.addEventListener(
            "click",
            function () {

                if (!lightbox || !lightboxImage) {
                    return;
                }


                lightboxImage.src =
                    image.src;

                lightboxImage.alt =
                    image.alt;


                const caption =
                    image.parentElement.querySelector(
                        ".gallery-caption"
                    );


                if (caption) {

                    lightboxCaption.textContent =
                        caption.textContent;

                } else {

                    lightboxCaption.textContent =
                        image.alt;

                }


                lightbox.classList.add("show");

                lightbox.setAttribute(
                    "aria-hidden",
                    "false"
                );

                document.body.style.overflow =
                    "hidden";

            }
        );

    }
);


/* CLOSE BUTTON */

if (lightboxClose) {

    lightboxClose.addEventListener(
        "click",
        closeLightbox
    );

}


/* CLOSE FUNCTION */

function closeLightbox() {

    if (!lightbox) {
        return;
    }

    lightbox.classList.remove("show");

    lightbox.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow =
        "";

}


/* CLICK OUTSIDE IMAGE */

if (lightbox) {

    lightbox.addEventListener(
        "click",
        function (event) {

            if (
                event.target === lightbox
            ) {

                closeLightbox();

            }

        }
    );

}


/* ESCAPE KEY */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            closeLightbox();

        }

    }
);


/* =====================================================
   CONTACT FORM
===================================================== */

const contactForm =
    document.getElementById("contactForm");

const formMessage =
    document.getElementById("formMessage");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document
                    .getElementById("name")
                    .value
                    .trim();


            const email =
                document
                    .getElementById("email")
                    .value
                    .trim();


            const message =
                document
                    .getElementById("message")
                    .value
                    .trim();


            if (
                name === "" ||
                email === "" ||
                message === ""
            ) {

                formMessage.textContent =
                    "Please fill in all fields.";

                return;

            }


            formMessage.textContent =
                "Thank you for contacting Tana Girls First Initiative. Your message has been received on this page.";


            contactForm.reset();

        }
    );

}


/* =====================================================
   SCROLL ANIMATION
===================================================== */

const animatedElements =
    document.querySelectorAll(
        ".work-card, .team-card, .gallery-item, .impact-item"
    );


if (
    "IntersectionObserver" in window
) {

    const observer =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(
                    function (entry) {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.15
            }
        );


    animatedElements.forEach(
        function (element) {

            observer.observe(element);

        }
    );

}
```
