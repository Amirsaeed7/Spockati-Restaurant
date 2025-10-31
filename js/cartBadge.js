// js/cartBadge.js
document.addEventListener("DOMContentLoaded", () => {
  function getCartItems() {
    try {
      const raw = localStorage.getItem("cartItems");
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function updateCartCount() {
    const cart = getCartItems();
    const totalCount = cart.reduce((sum, i) => sum + (i.quantity || 0), 0);
    const badge = document.getElementById("cartCount");
    if (!badge) return;

    if (totalCount > 0) {
      badge.textContent = toPersianDigits(totalCount);
      badge.classList.remove("hidden");
    } else {
      badge.classList.add("hidden");
    }
  }

  // Initialize on load
  updateCartCount();

  // Listen to global event
  window.addEventListener("cartUpdated", updateCartCount);
});
