const nav = document.getElementById("nav");
const openMenuBtn = document.getElementById("openMenu");
const closeMenuBtn = document.getElementById("closeMenu");

openMenuBtn.addEventListener("click", () => nav.classList.add("nav-active"));
closeMenuBtn.addEventListener("click", () => nav.classList.remove("nav-active"));