// Mobile Navigation
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileNavClose = document.getElementById("mobileNavClose");
const mobileNav = document.getElementById("mobileNav");
const mobileNavOverlay = document.getElementById("mobileNavOverlay");
const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

function openMobileNav() {
  mobileNav.classList.add("active");
  mobileNavOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeMobileNav() {
  mobileNav.classList.remove("active");
  mobileNavOverlay.classList.remove("active");
  document.body.style.overflow = "auto";
}

mobileMenuBtn.addEventListener("click", openMobileNav);
mobileNavClose.addEventListener("click", closeMobileNav);
mobileNavOverlay.addEventListener("click", closeMobileNav);

mobileNavLinks.forEach((link) => {
  link.addEventListener("click", closeMobileNav);
});

// Close mobile nav on window resize (for desktop)
window.addEventListener("resize", function () {
  if (window.innerWidth >= 1024) {
    closeMobileNav();
  }
});

// Initialize - ensure mobile menu is hidden on load
document.addEventListener("DOMContentLoaded", function () {
  mobileNav.classList.remove("active");
  mobileNavOverlay.classList.remove("active");
  document.body.style.overflow = "auto";
});

// Back to Top Button
const backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    backToTopBtn.classList.add("visible");
  } else {
    backToTopBtn.classList.remove("visible");
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Header scroll effect
// window.addEventListener('scroll', function() {
//     const header = document.querySelector('.nav');
//     if (window.scrollY > 100) {
//         header.style.background = 'rgba(30, 30, 42, 0.95)';
//         header.style.backdropFilter = 'blur(10px)';
//     } else {
//         header.style.backgroundColor = 'red';
//         header.style.backdropFilter = 'none';
//     }
// });

// Contact Form Validation
// const contactForm = document.getElementById('contactForm');
// const successMessage = document.getElementById('successMessage');

const contactForm = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");

contactForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  // Show loading state
  const originalBtnText = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

  try {
    const formData = new FormData(this);

    // Add timestamp to prevent duplicate submissions
    formData.append("_timestamp", Date.now());

    const response = await fetch(this.action, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      // Success
      showSuccessMessage();
      contactForm.reset();
    } else {
      throw new Error("Submission failed");
    }
  } catch (error) {
    // Error
    alert(
      "Sorry, there was an error sending your message. Please try again later.",
    );
    console.error("Form submission error:", error);
  } finally {
    // Reset button
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnText;
  }
});

function validateForm() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  let isValid = true;

  // Clear previous errors
  clearErrors();

  // Name validation (min 8 characters)
  if (name.length < 8) {
    showError("name", "Name must be at least 8 characters");
    isValid = false;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showError("email", "Please enter a valid email address");
    isValid = false;
  }

  // Subject validation (min 5 characters)
  if (subject.length < 5) {
    showError("subject", "Subject must be at least 5 characters");
    isValid = false;
  }

  // Message validation (min 10 characters)
  if (message.length < 10) {
    showError("message", "Message must be at least 10 characters");
    isValid = false;
  }

  return isValid;
}

function showError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const errorElement = document.getElementById(`${fieldId}Error`);

  field.classList.add("error");
  errorElement.textContent = message;
  errorElement.style.display = "block";
}

function clearErrors() {
  const errorElements = document.querySelectorAll(".error-message");
  const fields = document.querySelectorAll(".form-control");

  errorElements.forEach((el) => {
    el.style.display = "none";
  });

  fields.forEach((field) => {
    field.classList.remove("error");
  });
}

function showSuccessMessage() {
  const successMessage = document.getElementById("successMessage");
  successMessage.style.display = "flex";

  // Auto-hide after 5 seconds
  setTimeout(() => {
    successMessage.style.display = "none";
  }, 5000);
}

// Function to animate counting
// Function to animate counting
function animateCounter(element, target, duration = 1500) {
  return new Promise((resolve) => {
    let start = 0;
    const increment = target / (duration / 16);

    // Clear any existing animation
    if (element.timer) {
      clearInterval(element.timer);
    }

    element.timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        if (element.classList.contains("num")) {
          element.innerHTML =
            target + '<span class="exp">Years Of<br>Experience</span>';
        } else {
          element.textContent = target + "%";
        }
        clearInterval(element.timer);
        element.timer = null;
        resolve();
      } else {
        if (element.classList.contains("num")) {
          element.innerHTML =
            Math.floor(start) +
            '<span class="exp">Years Of<br>Experience</span>';
        } else {
          element.textContent = Math.floor(start) + "%";
        }
      }
    }, 16);
  });
}

function resetCounters(section) {
  const experienceElement = section.querySelector(".num");
  const percentageElements = section.querySelectorAll(".per");

  if (experienceElement) {
    experienceElement.innerHTML =
      '0<span class="exp">Years Of<br>Experience</span>';
  }

  percentageElements.forEach((element) => {
    element.textContent = "0%";
  });
}

// Track animation state
let isAnimating = false;
let lastAnimationTime = 0;

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const currentTime = Date.now();
      const timeSinceLastAnimation = currentTime - lastAnimationTime;

      // Only animate if not currently animating and at least 2 seconds have passed
      if (
        entry.isIntersecting &&
        !isAnimating &&
        timeSinceLastAnimation > 2000
      ) {
        isAnimating = true;
        console.log("Starting animation for skills section");

        // Reset counters first
        resetCounters(entry.target);

        // Small delay before starting animation
        setTimeout(() => {
          // Animate experience counter
          const experienceElement = entry.target.querySelector(".num");
          const experiencePromise = experienceElement
            ? animateCounter(
                experienceElement,
                parseInt(experienceElement.getAttribute("data-target") || "5"),
              )
            : Promise.resolve();

          // Animate skill percentages
          const percentageElements = entry.target.querySelectorAll(".per");
          const skillPromises = Array.from(percentageElements).map(
            (element, index) => {
              return new Promise((resolve) => {
                setTimeout(async () => {
                  await animateCounter(
                    element,
                    parseInt(element.getAttribute("data-target") || "0"),
                  );
                  resolve();
                }, index * 300);
              });
            },
          );

          // Wait for all animations to complete
          Promise.all([experiencePromise, ...skillPromises]).then(() => {
            isAnimating = false;
            lastAnimationTime = Date.now();
            console.log("All animations completed");
          });
        }, 300);
      } else if (!entry.isIntersecting) {
        // Reset when leaving view (after a delay)
        setTimeout(() => {
          if (!entry.isIntersecting) {
            resetCounters(entry.target);
          }
        }, 500);
      }
    });
  },
  {
    threshold: 0.3,
    rootMargin: "0px 0px -100px 0px",
  },
);

// Observe skills section
const skillsSection = document.getElementById("skills");
if (skillsSection) {
  observer.observe(skillsSection);
}

// Initialize
document.addEventListener("DOMContentLoaded", function () {
  resetCounters(document);
});

// SMOOTH SCROLL NAVIGATION FOR ALL DEVICES
document.addEventListener("DOMContentLoaded", function () {
  // ===== MOBILE MENU FUNCTIONS =====
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileNavClose = document.getElementById("mobileNavClose");
  const mobileNav = document.getElementById("mobileNav");
  const mobileNavOverlay = document.getElementById("mobileNavOverlay");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

  function openMobileNav() {
    mobileNav.classList.add("active");
    mobileNavOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeMobileNav() {
    mobileNav.classList.remove("active");
    mobileNavOverlay.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", openMobileNav);
  }

  if (mobileNavClose) {
    mobileNavClose.addEventListener("click", closeMobileNav);
  }

  if (mobileNavOverlay) {
    mobileNavOverlay.addEventListener("click", closeMobileNav);
  }

  // ===== SMOOTH SCROLLING FOR ALL NAV LINKS =====
  // document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  //     anchor.addEventListener('click', function(e) {
  //         e.preventDefault();
  //         const targetId = this.getAttribute('href');

  //         if (targetId === '#') return;

  //         const targetElement = document.querySelector(targetId);
  //         if (targetElement) {
  //             // Calculate offset based on screen size
  //             let offset;
  //             if (window.innerWidth <= 767) {
  //                 // Mobile: account for mobile header
  //                 offset = 70;
  //             } else {
  //                 // Desktop/tablet: account for fixed header
  //                 offset = 90;
  //             }

  //             const targetPosition = targetElement.offsetTop - offset;

  //             // Smooth scroll to target
  //             window.scrollTo({
  //                 top: targetPosition,
  //                 behavior: 'smooth'
  //             });

  //             // Close mobile menu if open
  //             if (window.innerWidth <= 767) {
  //                 closeMobileNav();
  //             }

  //             // Update URL
  //             history.pushState(null, null, targetId);
  //         }
  //     });
  // });

  // ===== BACK TO TOP BUTTON =====
  const backToTopBtn = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // ===== HEADER SCROLL EFFECT =====
  // window.addEventListener('scroll', function() {
  //     const header = document.querySelector('nav');
  //     if (header) {
  //         if (window.scrollY > 100) {
  //             header.style.backgroundColor = 'rgba(30, 30, 42, 0.95)';
  //             header.style.backdropFilter = 'blur(10px)';
  //         } else {
  //             header.style.backgroundColor = '';
  //             header.style.backdropFilter = 'none';
  //         }
  //     }
  // });

  // Ensure header 'scrolled' state reflects current section immediately
  function updateHeaderState() {
    const nav = document.querySelector("nav");
    if (!nav) return;

    const homeSection = document.getElementById("home");
    if (homeSection) {
      const homeBottom = homeSection.getBoundingClientRect().bottom;
      // If the bottom of the home section has moved above the header threshold,
      // enable scrolled state. Adjust threshold (60) as needed.
      if (homeBottom <= 60) {
        nav.classList.add("scrolled");
      } else {
        nav.classList.remove("scrolled");
      }
    } else {
      // Fallback to previous behavior
      if (window.scrollY > 50) nav.classList.add("scrolled");
      else nav.classList.remove("scrolled");
    }
  }

  // ===== ACTIVE NAV LINK ON SCROLL =====
  function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll("section[id]");
    const scrollPosition = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        // Remove active class from all links
        document.querySelectorAll('a[href^="#"]').forEach((link) => {
          link.classList.remove("active");
        });

        // Add active class to corresponding link
        const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
        if (activeLink) {
          activeLink.classList.add("active");
        }
      }
    });
  }

  // Update active nav on scroll
  window.addEventListener("scroll", updateActiveNavOnScroll);

  // Initial update
  updateActiveNavOnScroll();

  // ===== AOS ANIMATION INIT =====
  // if (typeof AOS !== 'undefined') {
  //     AOS.init({
  //         duration: 800,
  //         once: true,
  //         offset: 100
  //     });
  // }

  // ===== SKILLS ANIMATION =====
  // (Keep your existing skills animation code here)
  // Make sure it triggers when skills section comes into view
  // rgba(30, 30, 42, 0.95)
  // Add this to your existing JavaScript
  window.addEventListener("scroll", function () {
    updateHeaderState();

    // 2. ACTIVE NAV LINK DETECTION (your working code)
    const sections = document.querySelectorAll("section[id]");
    let activeSection = "home";

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const sectionId = section.id;

      // Check if section is in viewport
      if (rect.top <= 150 && rect.bottom >= 150) {
        activeSection = sectionId;
      }
    });

    // Update desktop navigation
    document.querySelectorAll(".nav-link a, .links a").forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${activeSection}`) {
        link.classList.add("active");
      }
    });

    // Update mobile navigation
    document.querySelectorAll(".mobile-nav-link").forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${activeSection}`) {
        link.classList.add("active");
      }
    });
  });

  // Also trigger on page load
  document.addEventListener("DOMContentLoaded", function () {
    // Set initial header/nav state immediately
    updateHeaderState();
    // Also trigger a scroll event shortly after load to ensure all listeners sync
    setTimeout(() => {
      window.dispatchEvent(new Event("scroll"));
    }, 50);
  });
});
