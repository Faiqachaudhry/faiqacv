/* =========================================================
   Faiqa Abbas Portfolio: script.js
   ========================================================= */

/* ---------------------------------------------------------
   1. YOUR PROJECTS: edit this list to add your own work
   ---------------------------------------------------------
   category : "reels", "social" or "other"
   video    : path to your video, e.g. "videos/my-reel.mp4"
              (leave "" to show the placeholder message)
   poster   : optional thumbnail image, e.g. "images/my-reel.jpg"
   Copy a block, paste it below, and change the text. */
const projects = [
  { title: "Golden Hour Reel",     category: "reels",  video: "", poster: "", description: "A fast, rhythmic reel cut to the beat." },
  { title: "Behind the Brand",     category: "social", video: "", poster: "", description: "A short brand story made for social media." },
  { title: "Voice-Over Showcase",  category: "other",  video: "", poster: "", description: "Narration paired with cinematic visuals." },
  { title: "Transition Studies",   category: "reels",  video: "", poster: "", description: "Smooth, creative transitions in vertical format." },
  { title: "Product Spotlight",    category: "social", video: "", poster: "", description: "Clean promotional edit with captions and sound design." },
  { title: "Short Film Teaser",    category: "other",  video: "", poster: "", description: "A moody teaser with colour grading and score." }
];

const categoryNames = { reels: "Reels", social: "Social media video", other: "Other editing project" };
const tints = [
  "linear-gradient(135deg,#3a2c14,#0d0b08)",
  "linear-gradient(135deg,#2a2218,#15120e 60%,#4a3a1c)",
  "linear-gradient(160deg,#1c1710,#3b2f18)"
];

/* ---------------------------------------------------------
   2. PORTFOLIO GALLERY + FILTERS + VIDEO MODAL
   --------------------------------------------------------- */
const gallery = document.getElementById("gallery");
const modal = document.getElementById("modal");
const modalMedia = document.getElementById("modalMedia");
let lastFocus = null;

function renderGallery(filter) {
  gallery.innerHTML = "";
  projects.forEach((p, i) => {
    if (filter !== "all" && p.category !== filter) return;
    const card = document.createElement("button");
    card.className = "project glass";
    card.type = "button";
    card.setAttribute("aria-label", "Play " + p.title);
    card.innerHTML =
      '<div class="thumb" style="--tint:' + tints[i % tints.length] + '">' +
        (p.poster ? '<img src="' + p.poster + '" alt="" loading="lazy">' : "") +
        '<span class="play"><svg viewBox="0 0 24 24"><path d="M5 3l15 9-15 9z"/></svg></span>' +
      "</div>" +
      '<div class="project-info"><p class="tag">' + categoryNames[p.category] + "</p>" +
      "<h3></h3><p></p></div>";
    // textContent keeps text safe if it contains special characters
    card.querySelector("h3").textContent = p.title;
    card.querySelector(".project-info p:last-child").textContent = p.description;
    card.addEventListener("click", () => openModal(p));
    gallery.appendChild(card);
  });
}

function openModal(p) {
  lastFocus = document.activeElement;
  modalMedia.innerHTML = "";
  if (p.video) {
    const v = document.createElement("video");
    v.src = p.video; v.controls = true; v.autoplay = true; v.playsInline = true;
    if (p.poster) v.poster = p.poster;
    modalMedia.appendChild(v);
  } else {
    const msg = document.createElement("p");
    msg.textContent = "This is a placeholder. Add your video path in script.js to play your own work here.";
    modalMedia.appendChild(msg);
  }
  document.getElementById("modalTitle").textContent = p.title;
  document.getElementById("modalDesc").textContent = p.description;
  modal.hidden = false;
  document.getElementById("modalClose").focus();
}

function closeModal() {
  modal.hidden = true;
  modalMedia.innerHTML = ""; // stops the video
  if (lastFocus) lastFocus.focus();
}

document.getElementById("modalClose").addEventListener("click", closeModal);
modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
document.addEventListener("keydown", e => { if (e.key === "Escape" && !modal.hidden) closeModal(); });

document.querySelectorAll(".filter").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderGallery(btn.dataset.filter);
  });
});
renderGallery("all");

/* ---------------------------------------------------------
   3. MOBILE NAVIGATION
   --------------------------------------------------------- */
const nav = document.getElementById("nav");
const toggle = document.getElementById("navToggle");

function setMenu(open) {
  nav.classList.toggle("open", open);
  toggle.setAttribute("aria-expanded", open);
  toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  document.body.style.overflow = open ? "hidden" : "";
}
toggle.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => setMenu(false)));

/* ---------------------------------------------------------
   4. HEADER STYLE + BACK-TO-TOP BUTTON
   --------------------------------------------------------- */
const header = document.getElementById("header");
const toTop = document.getElementById("toTop");
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 40);
  toTop.classList.toggle("show", window.scrollY > 600);
}, { passive: true });
toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

/* ---------------------------------------------------------
   5. HERO: TYPING TEXT (change the phrases here)
   --------------------------------------------------------- */
const phrases = ["engaging reels.", "cinematic edits.", "stories with my voice.", "content that connects."];
const typed = document.getElementById("typed");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reduceMotion) {
  typed.textContent = phrases[0];
} else {
  let pi = 0, ci = 0, deleting = false;
  (function type() {
    const word = phrases[pi];
    ci += deleting ? -1 : 1;
    typed.textContent = word.slice(0, ci);
    let delay = deleting ? 40 : 85;
    if (!deleting && ci === word.length) { deleting = true; delay = 1600; }
    else if (deleting && ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; delay = 400; }
    setTimeout(type, delay);
  })();
}

/* ---------------------------------------------------------
   6. HERO: VOICE WAVEFORM (decorative)
   --------------------------------------------------------- */
const wave = document.getElementById("wave");
for (let i = 0; i < 90; i++) {
  const bar = document.createElement("b");
  const h = 15 + Math.abs(Math.sin(i * 0.5) * Math.cos(i * 0.13)) * 85;
  bar.style.height = h + "%";
  bar.style.animation = "pulse " + (1.2 + (i % 7) * 0.25) + "s ease-in-out " + (i % 5) * 0.12 + "s infinite";
  wave.appendChild(bar);
}

/* ---------------------------------------------------------
   7. SCROLL REVEAL + SKILL BARS
   --------------------------------------------------------- */
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !reduceMotion) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("in");
      const bar = entry.target.querySelector(".bar b");
      if (bar) bar.style.width = bar.dataset.level + "%";
      io.unobserve(entry.target);
    });
  }, { threshold: 0.15 });
  revealItems.forEach((el, i) => { el.style.transitionDelay = (i % 3) * 0.1 + "s"; io.observe(el); });
} else {
  // Fallback: show everything immediately
  revealItems.forEach(el => el.classList.add("in"));
  document.querySelectorAll(".bar b").forEach(b => b.style.width = b.dataset.level + "%");
}

/* ---------------------------------------------------------
   8. FOOTER YEAR
   --------------------------------------------------------- */
document.getElementById("year").textContent = new Date().getFullYear();
