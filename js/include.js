// js/include.js
document.addEventListener("DOMContentLoaded", () => {
  // Load header
  fetch("components/header.html")
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("header-placeholder").innerHTML = data;
      if (window.lucide) window.lucide.createIcons();
    });

  // Load footer
  fetch("components/footer.html")
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("footer-placeholder").innerHTML = data;
      if (window.lucide) window.lucide.createIcons();
    });

  // Load menu component
  fetch("components/menu.html")
    .then((res) => res.text())
    .then((html) => {
      document.getElementById("menu-placeholder").innerHTML = html;

      // After menu HTML inserted, load menu.js
      const script = document.createElement("script");
      script.src = "js/menu.js";
      script.onload = () => {
        console.log("menu.js loaded.");
        // After menu.js loaded, load branches.js so it can call menuModule.setBranch
        const bscript = document.createElement("script");
        bscript.src = "js/branches.js";
        bscript.onload = () => console.log("branches.js loaded and executed.");
        document.body.appendChild(bscript);
      };
      document.body.appendChild(script);
    })
    .catch((err) => console.error("Error loading menu:", err));
});

function toPersianDigits(str) {
  return str.toString().replace(/\d/g, d => "۰۱۲۳۴۵۶۷۸۹"[d]);
}
