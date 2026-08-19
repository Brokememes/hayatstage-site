document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("primary-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  document.querySelectorAll(".nav-dropdown-trigger").forEach(function (trigger) {
    trigger.addEventListener("click", function (event) {
      event.stopPropagation();
      var parent = trigger.closest(".nav-item-dropdown");
      var isOpen = parent.classList.toggle("open");
      trigger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  });
  document.addEventListener("click", function () {
    document.querySelectorAll(".nav-item-dropdown.open").forEach(function (el) {
      el.classList.remove("open");
      el.querySelector(".nav-dropdown-trigger").setAttribute("aria-expanded", "false");
    });
  });

  var lightboxItems = Array.prototype.slice.call(document.querySelectorAll(".gallery-item.has-photo"));
  if (lightboxItems.length) {
    var lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.innerHTML =
      '<button class="lb-close" aria-label="Close">&#10005;</button>' +
      '<button class="lb-nav prev" aria-label="Previous">&#8592;</button>' +
      '<button class="lb-nav next" aria-label="Next">&#8594;</button>' +
      '<figure><img alt=""><figcaption></figcaption></figure>';
    document.body.appendChild(lightbox);

    var lbImg = lightbox.querySelector("img");
    var lbCaption = lightbox.querySelector("figcaption");
    var current = 0;

    function showItem(index) {
      current = (index + lightboxItems.length) % lightboxItems.length;
      var item = lightboxItems[current];
      var img = item.querySelector("img");
      lbImg.src = img.getAttribute("src");
      lbCaption.innerHTML = "<b>" + item.dataset.client + "</b>" + item.dataset.caption;
    }

    lightboxItems.forEach(function (item, index) {
      item.addEventListener("click", function (event) {
        event.preventDefault();
        showItem(index);
        lightbox.classList.add("open");
      });
    });

    lightbox.querySelector(".lb-close").addEventListener("click", function () {
      lightbox.classList.remove("open");
    });
    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) lightbox.classList.remove("open");
    });
    lightbox.querySelector(".next").addEventListener("click", function () { showItem(current + 1); });
    lightbox.querySelector(".prev").addEventListener("click", function () { showItem(current - 1); });
    document.addEventListener("keydown", function (event) {
      if (!lightbox.classList.contains("open")) return;
      if (event.key === "Escape") lightbox.classList.remove("open");
      if (event.key === "ArrowRight") showItem(current + 1);
      if (event.key === "ArrowLeft") showItem(current - 1);
    });
  }

  var form = document.getElementById("contact-form");
  var status = document.getElementById("form-status");
  if (form && status) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var data = new FormData(form);
      var lines = [];
      form.querySelectorAll("[name]").forEach(function (field) {
        var label = field.getAttribute("data-label") || field.name;
        lines.push(label + ": " + (data.get(field.name) || ""));
      });
      var subject = encodeURIComponent("New enquiry from hayatstage.in");
      var body = encodeURIComponent(lines.join("\n"));
      window.location.href = "mailto:hello@hayatstage.in?subject=" + subject + "&body=" + body;
      status.hidden = false;
    });
  }
});
