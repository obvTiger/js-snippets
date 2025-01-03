let cursor = document.getElementById("custom-cursor");
let links = document.querySelectorAll(
  ".contact-link, .nav-link, [href], .titleElement, .arrow-button"
); // enter the selectors where the cursor should snap to
let isMobile = window.innerWidth <= 500;

function setupCursor() {
  if (!isMobile) {
    cursor.style.display = "block";

    document.addEventListener("mousemove", (e) => {
      if (!cursor.classList.contains("expanded")) {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
      }
    });

    links.forEach((link) => {
      let currentTransform = { x: 0, y: 0 };

      link.addEventListener("mouseenter", (e) => {
        const rect = link.getBoundingClientRect();
        cursor.classList.add("expanded");
        cursor.style.width = rect.width + "px";
        cursor.style.height = rect.height + "px";
        cursor.style.left = rect.left + rect.width / 2 + "px";
        cursor.style.top = rect.top + rect.height / 2 + "px";
        cursor.style.borderRadius = getComputedStyle(link).borderRadius;
        cursor.style.transform = `translate(-50%, -50%) translate(${currentTransform.x}px, ${currentTransform.y}px)`;
      });

      link.addEventListener("mouseleave", () => {
        cursor.classList.remove("expanded");
        cursor.style.width = "20px";
        cursor.style.height = "20px";
        cursor.style.borderRadius = "32px";
        cursor.style.transform = "translate(-50%, -50%)";
        currentTransform = { x: 0, y: 0 };
      });

      if (!link.classList.contains("nomove")) {
        link.addEventListener("mousemove", (e) => {
          const rect = link.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;

          const deltaX = e.clientX - centerX;
          const deltaY = e.clientY - centerY;

          const maxDistance = Math.min(rect.width, rect.height) / 2;
          const distance = Math.min(
            Math.sqrt(deltaX * deltaX + deltaY * deltaY),
            maxDistance
          );
          const movePercent = (distance / maxDistance) * 0.4;

          const moveX = deltaX * movePercent;
          const moveY = deltaY * movePercent;

          currentTransform = { x: moveX, y: moveY };
          link.style.transform = `translate(${moveX}px, ${moveY}px)`;
          cursor.style.transform = `translate(-50%, -50%) translate(${moveX}px, ${moveY}px)`;
        });

        link.addEventListener("mouseleave", () => {
          link.style.transform = "translate(0, 0)";
          cursor.style.transform = "translate(-50%, -50%)";
          currentTransform = { x: 0, y: 0 };
        });
      }
    });
  } else {
    cursor.style.display = "none";
  }
}

setupCursor();

window.addEventListener("resize", () => {
  isMobile = window.innerWidth <= 500;
  setupCursor();
});
