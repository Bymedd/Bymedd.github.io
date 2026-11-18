/* ==========================================================================
   TekBir Otogaz — main.js
   Vanilla JS, no dependencies. Progressive enhancement only.
   ========================================================================== */
(function () {
  "use strict";

  var body = document.body;
  var header = document.querySelector(".site-header");
  var burger = document.querySelector(".burger");
  var mobileNav = document.getElementById("mobile-nav");

  /* ---------------------------------------------------------------------
     1. Sticky header state
     --------------------------------------------------------------------- */
  var lastScroll = 0;
  function onScroll() {
    if (!header) return;
    var y = window.scrollY || window.pageYOffset;
    header.classList.toggle("is-scrolled", y > 12);
    lastScroll = y;
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------------------------------------------------------------------
     2. Mobile navigation
     --------------------------------------------------------------------- */
  function setNav(open) {
    if (!burger || !mobileNav) return;
    body.classList.toggle("nav-open", open);
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    mobileNav.setAttribute("aria-hidden", open ? "false" : "true");
    if (open) {
      var first = mobileNav.querySelector("a");
      if (first) first.focus({ preventScroll: true });
    }
  }

  if (burger && mobileNav) {
    burger.addEventListener("click", function () {
      setNav(!body.classList.contains("nav-open"));
    });

    mobileNav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setNav(false);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && body.classList.contains("nav-open")) {
        setNav(false);
        burger.focus();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 1100 && body.classList.contains("nav-open")) setNav(false);
    });
  }

  /* ---------------------------------------------------------------------
     3. Scroll reveal
     --------------------------------------------------------------------- */
  var revealItems = document.querySelectorAll(".reveal");
  if (revealItems.length) {
    if (!("IntersectionObserver" in window) ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      Array.prototype.forEach.call(revealItems, function (el) {
        el.classList.add("is-visible");
      });
    } else {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              io.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
      );
      Array.prototype.forEach.call(revealItems, function (el) {
        io.observe(el);
      });
    }
  }

  /* ---------------------------------------------------------------------
     4. FAQ accordion — one panel open at a time
     --------------------------------------------------------------------- */
  var accordion = document.querySelector("[data-accordion]");
  if (accordion) {
    accordion.addEventListener("toggle", function (e) {
      var item = e.target;
      if (!item.open || !item.matches("details")) return;
      Array.prototype.forEach.call(
        accordion.querySelectorAll("details[open]"),
        function (other) {
          if (other !== item) other.open = false;
        }
      );
    }, true);

    var openFromHash = window.location.hash
      ? accordion.querySelector(window.location.hash)
      : null;
    if (openFromHash && openFromHash.tagName === "DETAILS") openFromHash.open = true;
  }

  /* ---------------------------------------------------------------------
     5. Gallery: filters + lightbox
     --------------------------------------------------------------------- */
  var gallery = document.querySelector("[data-gallery]");
  if (gallery) {
    var filterButtons = document.querySelectorAll("[data-filter]");
    var items = Array.prototype.slice.call(gallery.querySelectorAll(".gallery__item"));

    Array.prototype.forEach.call(filterButtons, function (btn) {
      btn.addEventListener("click", function () {
        var filter = btn.getAttribute("data-filter");
        Array.prototype.forEach.call(filterButtons, function (b) {
          var active = b === btn;
          b.classList.toggle("is-active", active);
          b.setAttribute("aria-pressed", active ? "true" : "false");
        });
        items.forEach(function (item) {
          var match = filter === "all" || item.getAttribute("data-category") === filter;
          item.classList.toggle("is-hidden", !match);
          item.setAttribute("aria-hidden", match ? "false" : "true");
          item.tabIndex = match ? 0 : -1;
        });
      });
    });

    var lightbox = document.getElementById("lightbox");
    if (lightbox) {
      var lbImg = lightbox.querySelector(".lightbox__img");
      var lbCaption = lightbox.querySelector(".lightbox__caption");
      var lbCount = lightbox.querySelector(".lightbox__count");
      var closeBtn = lightbox.querySelector(".lightbox__close");
      var prevBtn = lightbox.querySelector(".lightbox__nav--prev");
      var nextBtn = lightbox.querySelector(".lightbox__nav--next");
      var current = 0;
      var lastFocused = null;

      function visibleItems() {
        return items.filter(function (item) {
          return !item.classList.contains("is-hidden");
        });
      }

      function show(index) {
        var list = visibleItems();
        if (!list.length) return;
        current = (index + list.length) % list.length;
        var item = list[current];
        var img = item.querySelector("img");
        var caption = item.querySelector(".gallery__caption > span");
        var category = caption ? caption.querySelector("small") : null;
        var captionText = caption ? caption.textContent.trim() : "";
        if (category) {
          captionText = captionText.replace(category.textContent, "").trim();
          captionText = category.textContent.trim() + " · " + captionText;
        }
        lbImg.src = img.getAttribute("data-full") || img.currentSrc || img.src;
        lbImg.alt = img.alt;
        lbCaption.textContent = captionText || img.alt;
        lbCount.textContent = current + 1 + " / " + list.length;
      }

      function openLightbox(item) {
        var list = visibleItems();
        var index = list.indexOf(item);
        lastFocused = item;
        show(index < 0 ? 0 : index);
        lightbox.classList.add("is-open");
        lightbox.setAttribute("aria-hidden", "false");
        body.classList.add("lightbox-open");
        closeBtn.focus();
      }

      function closeLightbox() {
        lightbox.classList.remove("is-open");
        lightbox.setAttribute("aria-hidden", "true");
        body.classList.remove("lightbox-open");
        if (lastFocused) lastFocused.focus();
      }

      items.forEach(function (item) {
        item.addEventListener("click", function () {
          openLightbox(item);
        });
        item.addEventListener("keydown", function (e) {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openLightbox(item);
          }
        });
      });

      closeBtn.addEventListener("click", closeLightbox);
      prevBtn.addEventListener("click", function () { show(current - 1); });
      nextBtn.addEventListener("click", function () { show(current + 1); });

      lightbox.addEventListener("click", function (e) {
        if (e.target === lightbox) closeLightbox();
      });

      document.addEventListener("keydown", function (e) {
        if (!lightbox.classList.contains("is-open")) return;
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowRight") show(current + 1);
        if (e.key === "ArrowLeft") show(current - 1);
        if (e.key === "Tab") {
          var focusables = lightbox.querySelectorAll("button");
          var first = focusables[0];
          var last = focusables[focusables.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      });
    }
  }

  /* ---------------------------------------------------------------------
     6. Appointment form -> WhatsApp (no fake submission, no backend)
     --------------------------------------------------------------------- */
  var waForm = document.querySelector("[data-wa-form]");
  if (waForm) {
    var status = waForm.querySelector(".form-status");
    waForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = new FormData(waForm);
      var name = (data.get("name") || "").toString().trim();
      var vehicle = (data.get("vehicle") || "").toString().trim();
      var service = (data.get("service") || "").toString().trim();
      var message = (data.get("message") || "").toString().trim();

      if (!name || !vehicle) {
        if (status) status.textContent = "Lütfen adınızı ve araç bilgisini yazın.";
        waForm.querySelector('[name="name"]').focus();
        return;
      }

      var lines = [
        "Merhaba, TekBir Otogaz için randevu talebi:",
        "Ad: " + name,
        "Araç: " + vehicle
      ];
      if (service) lines.push("Hizmet: " + service);
      if (message) lines.push("Not: " + message);

      var url = "https://wa.me/905059796068?text=" + encodeURIComponent(lines.join("\n"));
      if (status) {
        status.textContent = "WhatsApp açılıyor. Mesajı göndermek için WhatsApp'ta onaylayın.";
      }
      window.open(url, "_blank", "noopener");
    });
  }

  /* ---------------------------------------------------------------------
     7. Footer year
     --------------------------------------------------------------------- */
  var yearNodes = document.querySelectorAll("[data-year]");
  var year = new Date().getFullYear();
  Array.prototype.forEach.call(yearNodes, function (node) {
    node.textContent = year;
  });
})();
