document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const navbar = document.getElementById("navbar");
    const topBtn = document.getElementById("topBtn");

    // IMPORTANT:
    // These IDs match your index.html
    const menuButton = document.getElementById("menuButton");
    const mobileMenu = document.getElementById("mobileMenu");
    const closeMenu = document.getElementById("closeMenu");


    /* =====================================================
       NAVBAR SCROLL EFFECT
    ===================================================== */

    function handleScroll() {

        const scrollPosition = window.scrollY;

        if (navbar) {
            navbar.classList.toggle(
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

    function openMobileMenu() {

        if (!mobileMenu) return;

        mobileMenu.classList.add("open");

        if (menuButton) {

            menuButton.setAttribute(
                "aria-expanded",
                "true"
            );

            const icon =
                menuButton.querySelector("i");

            if (icon) {

                icon.classList.remove("fa-bars");

                icon.classList.add("fa-xmark");

            }
        }

        document.body.classList.add("menu-open");
    }


    function closeMobileMenu() {

        if (!mobileMenu) return;

        mobileMenu.classList.remove("open");

        if (menuButton) {

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

            const icon =
                menuButton.querySelector("i");

            if (icon) {

                icon.classList.remove("fa-xmark");

                icon.classList.add("fa-bars");

            }
        }

        document.body.classList.remove("menu-open");
    }


    /* =====================================================
       MOBILE MENU BUTTON
    ===================================================== */

    if (menuButton && mobileMenu) {

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

        menuButton.setAttribute(
            "aria-label",
            "Open navigation menu"
        );


        menuButton.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();

                const isOpen =
                    mobileMenu.classList.contains("open");

                if (isOpen) {

                    closeMobileMenu();

                } else {

                    openMobileMenu();

                }
            }
        );


        /* =================================================
           CLOSE BUTTON
        ================================================= */

        if (closeMenu) {

            closeMenu.addEventListener(
                "click",
                (event) => {

                    event.preventDefault();
                    event.stopPropagation();

                    closeMobileMenu();

                }
            );

        }


        /* =================================================
           CLOSE WHEN LINK IS CLICKED
        ================================================= */

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


        /* =================================================
           CLOSE WITH ESCAPE
        ================================================= */

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


        /* =================================================
           CLOSE WHEN CLICKING OUTSIDE
        ================================================= */

        document.addEventListener(
            "click",
            event => {

                if (
                    !mobileMenu.classList.contains("open")
                ) {
                    return;
                }

                const clickedInsideMenu =
                    mobileMenu.contains(event.target);

                const clickedMenuButton =
                    menuButton.contains(event.target);

                if (
                    !clickedInsideMenu &&
                    !clickedMenuButton
                ) {

                    closeMobileMenu();

                }

            }
        );


        /* =================================================
           CLOSE WHEN SWITCHING TO DESKTOP
        ================================================= */

        window.addEventListener(
            "resize",
            () => {

                if (
                    window.innerWidth > 768 &&
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

        revealElements.forEach(
            element => {

                element.classList.add("show");

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
    ===================================================== */

    const aboutText =
        document.getElementById("aboutText");


    if (
        aboutText &&
        "IntersectionObserver" in window
    ) {

        const words =
            aboutText.querySelectorAll(".word");


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
        document.querySelector(".about-visual");


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
    ===================================================== */

    const contactForm =
        document.getElementById("contactForm");


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
            ".desktop-nav a, .mobile-menu a"
        );


    navigationLinks.forEach(
        link => {

            const href =
                link.getAttribute("href");


            if (!href) return;


            if (href.startsWith("#")) {
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

                link.classList.add("active");

            }

        }
    );


    /* =====================================================
       HERO PARALLAX
    ===================================================== */

    const heroArt =
        document.querySelector(".hero-art");


    if (
        heroArt &&
        window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {

        const mainBlob =
            heroArt.querySelector(".blob-main");


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
       SMART CHILD GALLERY
    ===================================================== */

    const gallery =
        document.getElementById("smartGallery");


    if (gallery) {

        const galleryItems =
            gallery.querySelectorAll(
                ".gallery-item"
            );


        if (galleryItems.length) {

            /* =============================================
               CREATE LIGHTBOX
            ============================================= */

            const lightbox =
                document.createElement("div");

            lightbox.className =
                "gallery-lightbox";


            lightbox.innerHTML = `

                <button
                    class="lightbox-close"
                    aria-label="Close gallery">

                    <i class="fa-solid fa-xmark"></i>

                </button>

                <img
                    src=""
                    alt="Smart Child Program">

                <div class="lightbox-counter">
                    01 / ${String(
                        galleryItems.length
                    ).padStart(2, "0")}
                </div>

            `;


            document.body.appendChild(
                lightbox
            );


            const lightboxImage =
                lightbox.querySelector("img");


            const galleryClose =
                lightbox.querySelector(
                    ".lightbox-close"
                );


            const counter =
                lightbox.querySelector(
                    ".lightbox-counter"
                );


            let currentImage = 0;


            /* =============================================
               OPEN IMAGE
            ============================================= */

            function openImage(index) {

                currentImage = index;


                const image =
                    galleryItems[index]
                        .querySelector("img");


                if (!image) return;


                lightboxImage.src =
                    image.src;


                lightboxImage.alt =
                    image.alt ||
                    "Smart Child Program";


                counter.textContent =
                    `${String(index + 1).padStart(2, "0")} / ${String(galleryItems.length).padStart(2, "0")}`;


                lightbox.classList.add(
                    "active"
                );


                document.body.classList.add(
                    "gallery-open"
                );

            }


            /* =============================================
               CLOSE IMAGE
            ============================================= */

            function closeImage() {

                lightbox.classList.remove(
                    "active"
                );


                document.body.classList.remove(
                    "gallery-open"
                );

            }


            /* =============================================
               GALLERY ITEMS
            ============================================= */

            galleryItems.forEach(
                (item, index) => {

                    item.addEventListener(
                        "click",
                        () => {

                            openImage(index);

                        }
                    );

                }
            );


            /* =============================================
               CLOSE BUTTON
            ============================================= */

            if (galleryClose) {

                galleryClose.addEventListener(
                    "click",
                    closeImage
                );

            }


            /* =============================================
               CLICK OUTSIDE IMAGE
            ============================================= */

            lightbox.addEventListener(
                "click",
                event => {

                    if (
                        event.target === lightbox
                    ) {

                        closeImage();

                    }

                }
            );


            /* =============================================
               KEYBOARD CONTROLS
            ============================================= */

            document.addEventListener(
                "keydown",
                event => {

                    if (
                        !lightbox.classList.contains(
                            "active"
                        )
                    ) {

                        return;

                    }


                    /* ESC */

                    if (
                        event.key === "Escape"
                    ) {

                        closeImage();

                    }


                    /* NEXT */

                    if (
                        event.key === "ArrowRight"
                    ) {

                        currentImage =
                            (
                                currentImage + 1
                            ) %
                            galleryItems.length;


                        openImage(
                            currentImage
                        );

                    }


                    /* PREVIOUS */

                    if (
                        event.key === "ArrowLeft"
                    ) {

                        currentImage =
                            (
                                currentImage - 1 +
                                galleryItems.length
                            ) %
                            galleryItems.length;


                        openImage(
                            currentImage
                        );

                    }

                }
            );

        }

    }


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

});
