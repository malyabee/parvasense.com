/* ================= NAVBAR ELEMENTS ================= */

const menu = document.querySelector(".js-menu-items");
const openBtn = document.querySelector(".dashicon");
const closeBtn = document.querySelector(".xIcon");
const navLinks = document.querySelectorAll(".js-menu-items a"); // ✅ fixed
const header = document.querySelector(".js-navbar");

if (menu && openBtn && closeBtn) {

  function openMenu() {
    menu.classList.add("active");
    openBtn.style.display = "none";
    closeBtn.style.display = "block";
  }

  function closeMenu() {
    menu.classList.remove("active");
    if (window.innerWidth <= 768) {
      openBtn.style.display = "block";
      closeBtn.style.display = "none";
    } else {
      openBtn.style.display = "";
      closeBtn.style.display = "";
    }
  }

  openBtn.addEventListener("click", openMenu);
  closeBtn.addEventListener("click", closeMenu);

  navLinks.forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  function handleResize() {
    if (window.innerWidth > 768) {
      menu.classList.remove("active");
      openBtn.style.display = "";
      closeBtn.style.display = "";
    } else {
      openBtn.style.display = "block";
      closeBtn.style.display = "none";
    }
  }

  window.addEventListener("resize", handleResize);
  window.addEventListener("load", handleResize);

} // end safety check

/* ================= SCROLL SPY + STICKY NAV ================= */

const sections = document.querySelectorAll("section[id]");

function handleScroll() {
  let current = "";
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const top = section.offsetTop - 80;
    if (scrollY >= top) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {          // ✅ navLinks not links
    link.classList.remove("active");
    const href = link.getAttribute("href");
    if (!href.startsWith("#")) return;
    if (current && href === "#" + current) {
      link.classList.add("active");
    }
  });

  if (header) {
    header.classList.toggle("sticky", scrollY > 100);
  }
}

let ticking = false;

window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      handleScroll();
      ticking = false;
    });
    ticking = true;
  }
});

/* ================= SCROLL REVEAL ================= */

ScrollReveal({
  distance: '80px',
  duration: 2000,
  delay: 200,
  reset: false
});

ScrollReveal().reveal('.heading, .heading-4', { origin: 'top' });
ScrollReveal().reveal('.home-img, .solutions-container, .products-container', { origin: 'bottom' });
ScrollReveal().reveal('.about-img', { origin: 'left' });
ScrollReveal().reveal('.about-content', { origin: 'right' });

/* ================= FORM VALIDATION ================= */

const form = document.getElementById('form');

if (form) {
  form.addEventListener('submit', (e) => {

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');

    const name_error = document.getElementById('name_error');
    const email_error = document.getElementById('email_error');
    const number_error = document.getElementById('number_error');
    const subject_error = document.getElementById('subject_error');
    const message_error = document.getElementById('message_error');

    let isValid = true;

    /* NAME */
    if (!name.value.trim()) {
      name_error.innerHTML = "Full Name can't be blank";
      isValid = false;
    } else {
      name_error.innerHTML = "";
    }

    /* EMAIL */
    if (!email.value.trim()) {
      email_error.innerHTML = "Email can't be blank";
      isValid = false;
    } else if (!email.value.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
      email_error.innerHTML = "Invalid Email Address";
      isValid = false;
    } else {
      email_error.innerHTML = "";
    }

    /* PHONE */
    if (!phone.value.trim()) {
      number_error.innerHTML = "Mobile Number can't be blank";
      isValid = false;
    } else if (!phone.value.match(/^\d{10}$/)) {
      number_error.innerHTML = "Enter valid 10-digit number";
      isValid = false;
    } else {
      number_error.innerHTML = "";
    }

    /* SUBJECT */
    if (!subject.value.trim()) {
      subject_error.innerHTML = "Subject can't be blank";
      isValid = false;
    } else {
      subject_error.innerHTML = "";
    }

    /* MESSAGE */
    if (!message.value.trim()) {
      message_error.innerHTML = "Message can't be blank";
      isValid = false;
    } else {
      message_error.innerHTML = "";
    }

    if (!isValid) {
      e.preventDefault();
    }
  });
}