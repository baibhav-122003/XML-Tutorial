const sections = Array.from(document.querySelectorAll(".content-section"));
const sidebarLinks = Array.from(document.querySelectorAll("aside a"));
let currentIndex = 0;

document.addEventListener("DOMContentLoaded", function () {
  // Initialize first view with the first section and highlight
  showContent(sections[currentIndex].id);
  updateNavigationButtons();
});

function showContent(sectionId) {
  // Hide all sections and show the selected section
  sections.forEach((section) => section.classList.add("hidden"));
  const activeSection = document.getElementById(sectionId);
  if (activeSection) {
    activeSection.classList.remove("hidden");
  }

  // Update the current index based on the visible section
  currentIndex = sections.findIndex((section) => section.id === sectionId);

  // Update sidebar link highlighting
  sidebarLinks.forEach((link) => link.classList.remove("active"));
  if (sidebarLinks[currentIndex]) {
    sidebarLinks[currentIndex].classList.add("active");
  }

  updateNavigationButtons();
}

function updateNavigationButtons() {
  const prevButton = document.getElementById("prevButton");
  const nextButton = document.getElementById("nextButton");

  // Show or hide the "Previous" button
  if (currentIndex > 0) {
    prevButton.classList.remove("hidden-button");
  } else {
    prevButton.classList.add("hidden-button");
  }

  // Show or hide the "Next" button
  if (currentIndex < sections.length - 1) {
    nextButton.classList.remove("hidden-button");
  } else {
    nextButton.classList.add("hidden-button");
  }
}

function navigateSection(direction) {
  if (direction === "next" && currentIndex < sections.length - 1) {
    currentIndex++;
  } else if (direction === "prev" && currentIndex > 0) {
    currentIndex--;
  }

  // Get the ID of the new section and display it
  const sectionId = sections[currentIndex].id;
  showContent(sectionId);
}
function toggleSidebar() {
  const sidebar = document.querySelector("aside");
  sidebar.classList.toggle("active");
}

// Adjust navigation logic to close the sidebar on selection (for mobile view)
sidebarLinks.forEach((link) => {
  link.addEventListener("click", function () {
    showContent(this.getAttribute("href").substring(1));

    // Close sidebar after selection on smaller screens
    if (window.innerWidth <= 768) {
      document.querySelector("aside").classList.remove("active");
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // Find all code blocks
  const codeBlocks = document.querySelectorAll(".w3-example");

  codeBlocks.forEach((block) => {
    // Create header div
    const header = document.createElement("div");
    header.className = "code-header";

    // Add language label (optional)
    const label = document.createElement("span");
    label.textContent = "XML"; // You can make this dynamic based on the code type
    header.appendChild(label);

    // Create copy button
    const copyButton = document.createElement("button");
    copyButton.className = "copy-btn";
    copyButton.innerHTML = `
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2z"/>
        <path d="M2 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4z"/>
      </svg>
      Copy
    `;

    // Add click handler
    copyButton.addEventListener("click", async () => {
      const code = block.querySelector(".w3-code").textContent;
      await navigator.clipboard.writeText(code);

      copyButton.classList.add("copied");
      copyButton.innerHTML = `
        <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
        </svg>
        Copied!
      `;

      setTimeout(() => {
        copyButton.classList.remove("copied");
        copyButton.innerHTML = `
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2z"/>
            <path d="M2 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4z"/>
          </svg>
          Copy
        `;
      }, 2000);
    });

    header.appendChild(copyButton);

    // Insert header before the code block
    const codeElement = block.querySelector(".w3-code");
    block.insertBefore(header, codeElement);
  });
});

// Theme Toggle Functionality
document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.querySelector(".theme-toggle");

  // Check for saved theme preference or default to light
  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);

  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);

    // Optional: Add smooth transition
    document.documentElement.style.transition =
      "background-color 0.3s ease, color 0.3s ease";
  });
});

// Update code block colors for dark mode
document.querySelectorAll(".w3-code").forEach((block) => {
  block.style.backgroundColor = "var(--code-bg)";
  block.style.color = "var(--text-primary)";
  block.style.borderColor = "var(--border-color)";
});
