document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const nav = document.getElementById("nav");
    const topBtn = document.getElementById("topBtn");
    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");


    /* =====================================================
       NAVBAR SCROLL EFFECT
    ===================================================== */

    function handleScroll() {

        const scrollPosition = window.scrollY;

        if (nav) {
            nav.classList.toggle(
                "scrolled",
                scrollPosition > 40
            );
        }

        if (topBtn) {
            topBtn.classList.toggle(
                "show",
                scrollPosition > 600
            );
        }

    }

    window.addEventListener(
        "scroll",
        handleScroll,
        { passive: true }
    );

    // Run once when page loads
    handleScroll();


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    function closeMobileMenu() {

        if (!mobileMenu) return;

        mobileMenu.classList.remove("open");

        if (menuBtn) {

            menuBtn.setAttribute(
                "aria-expanded",
                "false"
            );

            const icon = menuBtn.querySelector("i");

            if (icon) {

                icon.classList.remove(
                    "fa-xmark"
                );

                icon.classList.add(
                    "fa-bars"
                );

            }

        }

    }


    function openMobileMenu() {

        if (!mobileMenu) return;

        mobileMenu.classList.add("open");

        if (menuBtn) {

            menuBtn.setAttribute(
                "aria-expanded",
                "true"
            );

            const icon = menuBtn.querySelector("i");

            if (icon) {

                icon.classList.remove(
                    "fa-bars"
                );

                icon.classList.add(
                    "fa-xmark"
                );

            }

        }

    }


    if (menuBtn && mobileMenu) {

        // Initial accessibility state
        menuBtn.setAttribute(
            "aria-expanded",
            "false"
        );

        menuBtn.addEventListener(
            "click",
            () => {

                const isOpen =
                    mobileMenu.classList.contains("open");

                if (isOpen) {
                    closeMobileMenu();
                } else {
                    openMobileMenu();
                }

            }
        );


        /* Close menu when clicking a link */

        mobileMenu
            .querySelectorAll("a")
            .forEach(link => {

                link.addEventListener(
                    "click",
                    () => {
                        closeMobileMenu();
                    }
                );

            });


        /* Close menu with Escape key */

        document.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Escape" &&
                    mobileMenu.classList.contains("open")
                ) {

                    closeMobileMenu();

                }

            }
        );


        /* Close menu if window becomes desktop size */

        window.addEventListener(
            "resize",
            () => {

                if (
                    window.innerWidth > 950 &&
                    mobileMenu.classList.contains("open")
                ) {

                    closeMobileMenu();

                }

            }
        );

    }


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    if (topBtn) {

        topBtn.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* =====================================================
       REVEAL ANIMATIONS
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    if (
        revealElements.length &&
        "IntersectionObserver" in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target
                                    .classList
                                    .add("show");

                                revealObserver.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(
            element => {

                revealObserver.observe(
                    element
                );

            }
        );

    } else {

        // Fallback for older browsers

        revealElements.forEach(
            element => {

                element.classList.add(
                    "show"
                );

            }
        );

    }


    /* =====================================================
       SMOOTH INTERNAL LINKS
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const id =
                        link.getAttribute("href");


                    // Ignore empty "#"
                    if (
                        !id ||
                        id === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(id);


                    if (target) {

                        event.preventDefault();

                        target.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }

                }
            );

        });


    /* =====================================================
       ABOUT PAGE - WORD REVEAL
       Works if the about text exists
    ===================================================== */

    const aboutText =
        document.getElementById("aboutText");


    if (
        aboutText &&
        "IntersectionObserver" in window
    ) {

        const words =
            aboutText.querySelectorAll(
                ".word"
            );


        if (words.length) {

            const wordObserver =
                new IntersectionObserver(
                    entries => {

                        entries.forEach(
                            entry => {

                                if (
                                    entry.isIntersecting
                                ) {

                                    words.forEach(
                                        (word, index) => {

                                            setTimeout(
                                                () => {
                                                    word.classList.add(
                                                        "on"
                                                    );
                                                },
                                                index * 55
                                            );

                                        }
                                    );


                                    wordObserver.unobserve(
                                        entry.target
                                    );

                                }

                            }
                        );

                    },
                    {
                        threshold: 0.25
                    }
                );


            wordObserver.observe(
                aboutText
            );

        }

    }


    /* =====================================================
       ABOUT PAGE - SUBTLE PARALLAX
    ===================================================== */

    const aboutVisual =
        document.querySelector(
            ".about-visual"
        );


    if (
        aboutVisual &&
        window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {

        const center =
            aboutVisual.querySelector(
                ".about-center"
            );


        if (center) {

            aboutVisual.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        aboutVisual.getBoundingClientRect();


                    const x =
                        (
                            event.clientX -
                            rect.left
                        ) / rect.width - 0.5;


                    const y =
                        (
                            event.clientY -
                            rect.top
                        ) / rect.height - 0.5;


                    center.style.transform =
                        `translate(${x * 10}px, ${y * 10}px)`;

                }
            );


            aboutVisual.addEventListener(
                "mouseleave",
                () => {

                    center.style.transform = "";

                }
            );

        }

    }


    /* =====================================================
       CONTACT FORM
       Works only when #contactForm exists
    ===================================================== */

    const contactForm =
        document.getElementById(
            "contactForm"
        );


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const button =
                    contactForm.querySelector(
                        "button[type='submit']"
                    );


                if (!button) return;


                const originalHTML =
                    button.innerHTML;


                button.innerHTML =
                    `<span>Message ready ✓</span>`;


                button.style.background =
                    "#62d6a7";

                button.style.color =
                    "#16151a";


                setTimeout(
                    () => {

                        button.innerHTML =
                            originalHTML;

                        button.removeAttribute(
                            "style"
                        );

                        contactForm.reset();

                    },
                    2500
                );

            }
        );

    }


    /* =====================================================
       CURRENT PAGE NAVIGATION
    ===================================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop() || "index.html";


    const navigationLinks =
        document.querySelectorAll(
            ".nav-links a, .mobile-menu a"
        );


    navigationLinks.forEach(
        link => {

            const href =
                link.getAttribute("href");


            if (!href) return;


            // Ignore pure section links
            if (
                href.startsWith("#")
            ) {
                return;
            }


            const linkPage =
                href
                    .split("/")
                    .pop()
                    .split("#")[0];


            if (
                linkPage === currentPage
            ) {

                link.classList.add(
                    "active"
                );

            }

        }
    );


    /* =====================================================
       HERO PARALLAX
       Works only if .hero-art exists
    ===================================================== */

    const heroArt =
        document.querySelector(
            ".hero-art"
        );


    if (
        heroArt &&
        window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {

        const mainBlob =
            heroArt.querySelector(
                ".blob-main"
            );


        if (mainBlob) {

            heroArt.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        heroArt.getBoundingClientRect();


                    const x =
                        (
                            event.clientX -
                            rect.left
                        ) / rect.width - 0.5;


                    const y =
                        (
                            event.clientY -
                            rect.top
                        ) / rect.height - 0.5;


                    mainBlob.style.marginTop =
                        `${y * 16}px`;

                    mainBlob.style.marginLeft =
                        `${x * 16}px`;

                }
            );


            heroArt.addEventListener(
                "mouseleave",
                () => {

                    mainBlob.style.marginTop = "";
                    mainBlob.style.marginLeft = "";

                }
            );

        }

    }


    /* =====================================================
       CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
    ===================================================== */

    document.addEventListener(
        "click",
        event => {

            if (
                !mobileMenu ||
                !menuBtn
            ) {
                return;
            }


            if (
                !mobileMenu.classList.contains(
                    "open"
                )
            ) {
                return;
            }


            const clickedInsideMenu =
                mobileMenu.contains(
                    event.target
                );


            const clickedMenuButton =
                menuBtn.contains(
                    event.target
                );


            if (
                !clickedInsideMenu &&
                !clickedMenuButton
            ) {

                closeMobileMenu();

            }

        }
    );


    /* =====================================================
       REDUCE MOTION SUPPORT
    ===================================================== */

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (prefersReducedMotion) {

        document.documentElement.style
            .scrollBehavior = "auto";

    }


    /* =====================================================
       PAGE READY
    ===================================================== */

    document.body.classList.add(
        "js-ready"
    );
/* =========================================================
   SMART CHILD GALLERY
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const gallery = document.getElementById("smartGallery");

    if (!gallery) return;

    const galleryItems =
        gallery.querySelectorAll(".gallery-item");

    if (!galleryItems.length) return;


    /* Create Lightbox */

    const lightbox = document.createElement("div");

    lightbox.className = "gallery-lightbox";

    lightbox.innerHTML = `
        <button class="lightbox-close"
                aria-label="Close gallery">
            <i class="fa-solid fa-xmark"></i>
        </button>

        <img src="" alt="Smart Child Program">

        <div class="lightbox-counter">
            01 / ${String(galleryItems.length).padStart(2, "0")}
        </div>
    `;

    document.body.appendChild(lightbox);


    const lightboxImage =
        lightbox.querySelector("img");

    const closeButton =
        lightbox.querySelector(".lightbox-close");

    const counter =
        lightbox.querySelector(".lightbox-counter");


    let currentImage = 0;


    /* Open Image */

    function openImage(index) {

        currentImage = index;

        const image =
            galleryItems[index].querySelector("img");

        if (!image) return;

        lightboxImage.src = image.src;

        lightboxImage.alt =
            image.alt || "Smart Child Program";

        counter.textContent =
            `${String(index + 1).padStart(2, "0")} / ${String(galleryItems.length).padStart(2, "0")}`;

        lightbox.classList.add("active");

        document.body.style.overflow = "hidden";
    }


    /* Close Image */

    function closeImage() {

        lightbox.classList.remove("active");

        document.body.style.overflow = "";
    }


    /* Gallery Click */

    galleryItems.forEach((item, index) => {

        item.addEventListener("click", function () {

            openImage(index);

        });

    });


    /* Close Button */

    closeButton.addEventListener(
        "click",
        closeImage
    );


    /* Click Outside */

    lightbox.addEventListener(
        "click",
        function (event) {

            if (event.target === lightbox) {

                closeImage();

            }

        }
    );


    /* Keyboard Controls */

    document.addEventListener(
        "keydown",
        function (event) {

            if (!lightbox.classList.contains("active")) {
                return;
            }


            /* ESC */

            if (event.key === "Escape") {

                closeImage();

            }


            /* Next */

            if (event.key === "ArrowRight") {

                currentImage =
                    (currentImage + 1) %
                    galleryItems.length;

                openImage(currentImage);

            }


            /* Previous */

            if (event.key === "ArrowLeft") {

                currentImage =
                    (currentImage - 1 +
                    galleryItems.length) %
                    galleryItems.length;

                openImage(currentImage);

            }

        }
    );

});
});
