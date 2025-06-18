  document.addEventListener("DOMContentLoaded", function () {
    const arrow = document.querySelector(".dropdown-toggle-arrow");
    const dropdown = document.querySelector(".canvas-dropdown");

    arrow.addEventListener("click", function (e) {
      e.stopPropagation(); // Prevent closing from global click
      dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
    });

    // Optional: hide dropdown when clicking outside
    document.addEventListener("click", function (e) {
      if (!dropdown.contains(e.target) && !arrow.contains(e.target)) {
        dropdown.style.display = "none";
      }
    });
  });


  function startSlider(container) {
    const images = container.querySelectorAll("img");
    const bars = container.querySelectorAll(".slider-progress span .fill");
    let index = 0;

    container._timers = [];

    const show = (i) => {
      images.forEach((img, idx) => img.classList.toggle("active", idx === i));
      bars.forEach((fill, idx) => {
        fill.style.width = "0%";
        if (idx === i) {
          // trigger fill animation
          setTimeout(() => fill.style.width = "100%", 10);
        }
      });
    };

    show(index);

    function next() {
      index++;
      if (index < images.length) {
        show(index);
        const t = setTimeout(next, 1000);
        container._timers.push(t);
      }
    }

    const t = setTimeout(next, 1000);
    container._timers.push(t);
  }

  function stopSlider(container) {
    const images = container.querySelectorAll("img");
    const bars = container.querySelectorAll(".slider-progress span .fill");

    images.forEach((img, i) => img.classList.toggle("active", i === 0));
    bars.forEach(fill => fill.style.width = "0%");

    if (container._timers) {
      container._timers.forEach(t => clearTimeout(t));
      container._timers = [];
    }
  }



   const images = {
    steel: document.getElementById('img-steel'),
    aluminum: document.getElementById('img-aluminum'),
    spring: document.getElementById('img-spring'),
    carbon: document.getElementById('img-carbon'),
  };

  document.querySelectorAll('#materialTabs .nav-link').forEach(tab => {
    tab.addEventListener('shown.bs.tab', function () {
      const targetId = this.getAttribute('data-bs-target').substring(1); // remove '#' from id
      // Hide all images
      Object.values(images).forEach(img => img.classList.add('d-none'));
      // Show the corresponding image
      images[targetId].classList.remove('d-none');
    });
  });