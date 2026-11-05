
/* =====================================================
   GEMSTONE & MINERAL JEWELRY STORE
   PART 4 - COMPLETE HEADER JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       01. ELEMENT SELECTORS
    ========================================= */

    const html = document.documentElement;
    const body = document.body;

    const menuToggle = document.getElementById("gmMenuToggle");
    const navigation = document.getElementById("gmNavigation");

    const dropdownToggle = document.querySelector(".gm-dropdown-toggle");
    const homeDropdown = document.querySelector(".gm-home-dropdown");

    const darkToggle = document.getElementById("gmDarkToggle");
    const rtlToggle = document.getElementById("gmRtlToggle");

    const darkIcon = darkToggle
        ? darkToggle.querySelector("i")
        : null;


    /* =========================================
       02. LOCAL STORAGE KEYS
    ========================================= */

    const DARK_MODE_KEY = "gm-dark-mode";
    const RTL_MODE_KEY = "gm-rtl-mode";


    /* =========================================
       03. RESPONSIVE BREAKPOINT
    ========================================= */

    const tabletBreakpoint = window.matchMedia("(max-width: 1199px)");

    function isTabletOrMobile() {
        return tabletBreakpoint.matches;
    }


    /* =========================================
       04. HAMBURGER MENU
    ========================================= */

    function openMenu() {

        if (!menuToggle || !navigation) return;

        navigation.classList.add("gm-menu-open");

        menuToggle.classList.add("active");

        menuToggle.setAttribute("aria-expanded", "true");

        menuToggle.setAttribute(
            "aria-label",
            "Close navigation menu"
        );

        body.classList.add("gm-menu-active");

    }


    function closeMenu() {

        if (!menuToggle || !navigation) return;

        navigation.classList.remove("gm-menu-open");

        menuToggle.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

        body.classList.remove("gm-menu-active");

        closeHomeDropdown();

    }


    if (menuToggle && navigation) {

        menuToggle.addEventListener("click", function (event) {

            event.stopPropagation();

            if (navigation.classList.contains("gm-menu-open")) {

                closeMenu();

            } else {

                openMenu();

            }

        });

    }


    /* =========================================
       05. HOME DROPDOWN
    ========================================= */

    function openHomeDropdown() {

        if (!homeDropdown || !dropdownToggle) return;

        homeDropdown.classList.add("gm-dropdown-open");

        dropdownToggle.setAttribute("aria-expanded", "true");

    }


    function closeHomeDropdown() {

        if (!homeDropdown || !dropdownToggle) return;

        homeDropdown.classList.remove("gm-dropdown-open");

        dropdownToggle.setAttribute("aria-expanded", "false");

    }


    if (dropdownToggle && homeDropdown) {

        dropdownToggle.addEventListener("click", function (event) {

            event.stopPropagation();

            const isOpen = homeDropdown.classList.contains(
                "gm-dropdown-open"
            );

            if (isOpen) {

                closeHomeDropdown();

            } else {

                openHomeDropdown();

            }

        });

    }


    /* =========================================
       06. CLOSE MENU ON NAVIGATION
    ========================================= */

    document.querySelectorAll(".gm-nav-list a").forEach(function (link) {

        link.addEventListener("click", function () {

            closeMenu();

        });

    });


    /* =========================================
       07. CLICK OUTSIDE TO CLOSE
    ========================================= */

    document.addEventListener("click", function (event) {

        if (!navigation || !menuToggle) return;

        const clickedInsideNavigation = navigation.contains(event.target);

        const clickedMenuButton = menuToggle.contains(event.target);

        if (!clickedInsideNavigation && !clickedMenuButton) {

            closeMenu();

        }

        if (
            homeDropdown &&
            !homeDropdown.contains(event.target)
        ) {

            closeHomeDropdown();

        }

    });


    /* =========================================
       08. ESCAPE KEY
    ========================================= */

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            closeMenu();

        }

    });


    /* =========================================
       09. CLOSE MENU ON DESKTOP RESIZE
    ========================================= */

    function handleResponsiveChange() {

        if (!isTabletOrMobile()) {

            closeMenu();

        }

    }

    if (tabletBreakpoint.addEventListener) {

        tabletBreakpoint.addEventListener(
            "change",
            handleResponsiveChange
        );

    } else {

        tabletBreakpoint.addListener(handleResponsiveChange);

    }


    /* =========================================
       10. DARK MODE APPLY FUNCTION
    ========================================= */

    function applyDarkMode(enabled) {

        body.classList.toggle("gm-dark-mode", enabled);

        if (darkIcon) {

            darkIcon.classList.toggle("fa-moon", !enabled);

            darkIcon.classList.toggle("fa-sun", enabled);

        }

        if (darkToggle) {

            darkToggle.setAttribute(
                "aria-label",
                enabled ? "Switch to light mode" : "Switch to dark mode"
            );

            darkToggle.setAttribute(
                "title",
                enabled ? "Light Mode" : "Dark Mode"
            );

            darkToggle.setAttribute(
                "aria-pressed",
                String(enabled)
            );

        }

    }


    /* =========================================
       11. LOAD SAVED DARK MODE
    ========================================= */

    const savedDarkMode = localStorage.getItem(DARK_MODE_KEY);

    applyDarkMode(savedDarkMode === "enabled");


    /* =========================================
       12. DARK MODE BUTTON
    ========================================= */

    if (darkToggle) {

        darkToggle.addEventListener("click", function () {

            const isDark = body.classList.contains("gm-dark-mode");

            const newDarkMode = !isDark;

            applyDarkMode(newDarkMode);

            localStorage.setItem(
                DARK_MODE_KEY,
                newDarkMode ? "enabled" : "disabled"
            );

        });

    }


    /* =========================================
       13. RTL APPLY FUNCTION
    ========================================= */

    function applyRTL(enabled) {

        html.setAttribute(
            "dir",
            enabled ? "rtl" : "ltr"
        );

        html.setAttribute("lang", "en");

        if (body) {

            body.setAttribute(
                "dir",
                enabled ? "rtl" : "ltr"
            );

        }

        if (rtlToggle) {

            rtlToggle.setAttribute(
                "aria-label",
                enabled ? "Switch to left to right layout" : "Switch to right to left layout"
            );

            rtlToggle.setAttribute(
                "title",
                enabled ? "LTR Layout" : "RTL Layout"
            );

            rtlToggle.setAttribute(
                "aria-pressed",
                String(enabled)
            );

        }

    }


    /* =========================================
       14. LOAD SAVED RTL MODE
    ========================================= */

    const savedRTLMode = localStorage.getItem(RTL_MODE_KEY);

    applyRTL(savedRTLMode === "enabled");


    /* =========================================
       15. RTL BUTTON
    ========================================= */

    if (rtlToggle) {

        rtlToggle.addEventListener("click", function () {

            const isRTL = html.getAttribute("dir") === "rtl";

            const newRTLMode = !isRTL;

            applyRTL(newRTLMode);

            localStorage.setItem(
                RTL_MODE_KEY,
                newRTLMode ? "enabled" : "disabled"
            );

            closeMenu();

        });

    }


    /* =========================================
       16. HEADER SCROLL SHADOW
    ========================================= */

    const header = document.getElementById("gmHeader");

    function updateHeader() {

        if (!header) return;

        if (window.scrollY > 30) {

            header.classList.add("gm-header-scrolled");

        } else {

            header.classList.remove("gm-header-scrolled");

        }

    }

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });

    updateHeader();


    /* =========================================
       17. CLOSE MENU AFTER LOGIN
    ========================================= */

    document.querySelectorAll(".gm-header-actions a").forEach(
        function (link) {

            link.addEventListener("click", function () {

                closeMenu();

            });

        }
    );


    /* =========================================
       18. INITIAL MENU STATE
    ========================================= */

    closeMenu();

    closeHomeDropdown();

});













/***********HOME-1**********/


/* =========================================
   GEMSTONE & MINERAL JEWELRY STORE
   HOME 1 - HERO SLIDER JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const hero = document.querySelector("#gmHero");

    // Stop if the hero slider is not present on this page
    if (!hero) return;

    const slides = hero.querySelectorAll(".gm-hero-slide");
    const dots = hero.querySelectorAll(".gm-hero-dot");

    if (!slides.length || !dots.length) return;

    let currentSlide = 0;
    let sliderInterval;

    const slideDuration = 5000;

    // SHOW SELECTED SLIDE
    function showSlide(index) {

        slides.forEach((slide, i) => {
            slide.classList.toggle("active", i === index);
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === index);

            if (i === index) {
                dot.setAttribute("aria-current", "true");
            } else {
                dot.removeAttribute("aria-current");
            }
        });

        currentSlide = index;
    }

    // NEXT SLIDE
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }

    // START AUTOMATIC SLIDER
    function startSlider() {
        stopSlider();
        sliderInterval = setInterval(nextSlide, slideDuration);
    }

    // STOP AUTOMATIC SLIDER
    function stopSlider() {
        if (sliderInterval) {
            clearInterval(sliderInterval);
        }
    }

    // PAGINATION DOT CLICK
    dots.forEach((dot, index) => {

        dot.addEventListener("click", function () {
            showSlide(index);
            startSlider();
        });

    });

    // INITIALIZE SLIDER
    showSlide(0);
    startSlider();

    // PAUSE WHEN MOUSE IS OVER HERO
    hero.addEventListener("mouseenter", stopSlider);

    // RESUME WHEN MOUSE LEAVES HERO
    hero.addEventListener("mouseleave", startSlider);

    // PAUSE WHEN TAB IS NOT ACTIVE
    document.addEventListener("visibilitychange", function () {
        if (document.hidden) {
            stopSlider();
        } else {
            startSlider();
        }
    });

});











/* =========================================
   SECTION 4 - FEATURED PRODUCTS
   FILTER + WISHLIST JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const productsSection = document.querySelector("#gmFeaturedProducts");

    // Stop if the section is not available
    if (!productsSection) return;


    /* =====================================
       PRODUCT CATEGORY FILTER
    ===================================== */

    const filterButtons = productsSection.querySelectorAll(".gm-filter-btn");
    const productCards = productsSection.querySelectorAll(".gm-product-card");

    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const selectedCategory = button.dataset.filter;

            // Update active filter button
            filterButtons.forEach(function (filter) {
                filter.classList.remove("active");
            });

            button.classList.add("active");

            // Filter product cards
            productCards.forEach(function (card) {

                const productCategory = card.dataset.category;

                if (
                    selectedCategory === "all" ||
                    productCategory === selectedCategory
                ) {
                    card.classList.remove("is-hidden");
                } else {
                    card.classList.add("is-hidden");
                }

            });

        });

    });


    /* =====================================
       PRODUCT WISHLIST
    ===================================== */

    const wishlistButtons = productsSection.querySelectorAll(
        ".gm-product-wishlist"
    );

    const wishlistStorageKey = "gm-jewelry-wishlist";

    // Read saved wishlist safely
    function getWishlist() {

        try {
            const savedWishlist = JSON.parse(
                localStorage.getItem(wishlistStorageKey)
            );

            return Array.isArray(savedWishlist) ? savedWishlist : [];

        } catch (error) {
            return [];
        }

    }

    // Save wishlist
    function saveWishlist(wishlist) {
        try {
            localStorage.setItem(
                wishlistStorageKey,
                JSON.stringify(wishlist)
            );
        } catch (error) {
            console.warn("Wishlist could not be saved.");
        }
    }

    // Create a unique product identifier
    function getProductId(button) {

        const card = button.closest(".gm-product-card");

        const productLink = card.querySelector(".gm-product-view");

        return productLink
            ? productLink.getAttribute("href")
            : card.dataset.category + "-" +
              card.querySelector(".gm-product-name").textContent.trim();

    }

    // Update heart button appearance
    function updateWishlistButton(button, isActive) {

        const icon = button.querySelector("i");

        button.classList.toggle("is-active", isActive);

        button.setAttribute("aria-pressed", String(isActive));

        if (icon) {
            icon.classList.toggle("fa-solid", isActive);
            icon.classList.toggle("fa-regular", !isActive);
        }

        const productName = button
            .closest(".gm-product-card")
            .querySelector(".gm-product-name")
            .textContent.trim();

        button.setAttribute(
            "aria-label",
            isActive
                ? "Remove " + productName + " from wishlist"
                : "Add " + productName + " to wishlist"
        );

    }

    // Restore saved wishlist on page load
    let wishlist = getWishlist();

    wishlistButtons.forEach(function (button) {

        const productId = getProductId(button);

        updateWishlistButton(
            button,
            wishlist.includes(productId)
        );

        // Toggle wishlist on click
        button.addEventListener("click", function () {

            const selectedProduct = getProductId(button);

            if (wishlist.includes(selectedProduct)) {

                wishlist = wishlist.filter(function (item) {
                    return item !== selectedProduct;
                });

                updateWishlistButton(button, false);

            } else {

                wishlist.push(selectedProduct);

                updateWishlistButton(button, true);

            }

            saveWishlist(wishlist);

        });

    });

});










/* =====================================================
   CUSTOM DESIGN FAQ ACCORDION
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const faqItems = document.querySelectorAll(
        ".gm-custom-faq-item"
    );

    faqItems.forEach(function (item) {

        const question = item.querySelector(
            ".gm-custom-faq-question"
        );

        const answer = item.querySelector(
            ".gm-custom-faq-answer"
        );

        const icon = question.querySelector("i");

        // Set initial state
        if (item.classList.contains("active")) {
            answer.style.maxHeight = answer.scrollHeight + "px";
        } else {
            answer.style.maxHeight = "0px";
        }

        question.addEventListener("click", function () {

            const isActive = item.classList.contains("active");

            // Close all FAQ items
            faqItems.forEach(function (faq) {

                faq.classList.remove("active");

                const faqQuestion = faq.querySelector(
                    ".gm-custom-faq-question"
                );

                const faqAnswer = faq.querySelector(
                    ".gm-custom-faq-answer"
                );

                const faqIcon = faqQuestion.querySelector("i");

                faqQuestion.setAttribute("aria-expanded", "false");
                faqAnswer.style.maxHeight = "0px";

                faqIcon.classList.remove("fa-minus");
                faqIcon.classList.add("fa-plus");

            });

            // Open selected FAQ
            if (!isActive) {

                item.classList.add("active");

                question.setAttribute("aria-expanded", "true");

                answer.style.maxHeight = answer.scrollHeight + "px";

                icon.classList.remove("fa-plus");
                icon.classList.add("fa-minus");

            }

        });

    });

    // Recalculate open answer height after resizing
    window.addEventListener("resize", function () {

        document.querySelectorAll(
            ".gm-custom-faq-item.active .gm-custom-faq-answer"
        ).forEach(function (answer) {

            answer.style.maxHeight = "none";

            const height = answer.scrollHeight;

            answer.style.maxHeight = height + "px";

        });

    });

});








/* =========================================
   SCROLL TO TOP
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const scrollTopBtn = document.getElementById("gmScrollTop");

    if (!scrollTopBtn) return;

    window.addEventListener("scroll", function () {

        if (window.scrollY > 300) {
            scrollTopBtn.classList.add("show");
        } else {
            scrollTopBtn.classList.remove("show");
        }

    });

    scrollTopBtn.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

});










/* =========================================
   CERTIFICATION FEATURED PRODUCT FILTER
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const filterButtons = document.querySelectorAll(
        ".gm-cert-featured-filter"
    );

    const productCards = document.querySelectorAll(
        ".gm-cert-featured-card"
    );

    if (!filterButtons.length || !productCards.length) return;

    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const selectedCategory = this.dataset.filter;

            // Update active filter button
            filterButtons.forEach(function (filter) {
                filter.classList.remove("active");
            });

            this.classList.add("active");

            // Filter products
            productCards.forEach(function (card) {

                const productCategory = card.dataset.category;

                if (
                    selectedCategory === "all" ||
                    productCategory === selectedCategory
                ) {
                    card.style.display = "";
                } else {
                    card.style.display = "none";
                }

            });

        });

    });

});









/* =========================================
   GEMSTONE PRODUCTS - CATEGORY FILTER
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const filterButtons = document.querySelectorAll(".gm-product-filter");
    const productCards = document.querySelectorAll(".gm-product-card");
    const emptyMessage = document.getElementById("gmProductsEmpty");

    if (!filterButtons.length || !productCards.length) return;

    filterButtons.forEach(button => {

        button.addEventListener("click", function () {

            // Active button
            filterButtons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");

            const selectedFilter = this.dataset.filter;
            let visibleCount = 0;

            // Filter products
            productCards.forEach(card => {

                const category = card.dataset.category;

                if (selectedFilter === "all" || category === selectedFilter) {
                    card.style.display = "";
                    visibleCount++;
                } else {
                    card.style.display = "none";
                }

            });

            // Show empty message if no products
            if (emptyMessage) {
                emptyMessage.hidden = visibleCount !== 0;
            }

        });

    });

});