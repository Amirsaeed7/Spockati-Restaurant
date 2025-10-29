// js/cart.js
document.addEventListener("DOMContentLoaded", () => {
  const main = document.getElementById("main"); // cart page main
  if (!main) return;

  // --- localStorage helpers ---
  function loadSelectedBranch() {
    try {
      const raw = localStorage.getItem("selectedBranch");
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  }
  function loadCart() {
    try {
      const raw = localStorage.getItem("cartItems");
      return raw ? JSON.parse(raw) : [];
    } catch (e) { return []; }
  }
  function saveCart(cart) {
    try { localStorage.setItem("cartItems", JSON.stringify(cart)); } catch(e) {}
  }

  // --- remove items for current branch (used after submit) ---
  function clearCartForBranch(branchId) {
    const cart = loadCart().filter(i => i.branchId !== branchId);
    saveCart(cart);
  }

  // --- render helpers ---
  function formatPrice(n) {
    return `${n} هزار تومان`;
  }

  // create a toast and show it (message string)
  function showToast(message = "عملیات انجام شد") {
    const existing = document.getElementById("cart-toast");
    if (existing) existing.remove();

    const toastWrap = document.createElement("div");
    toastWrap.id = "cart-toast";
    toastWrap.className = "fixed top-6 inset-x-0 flex justify-center z-50 pointer-events-none";
    toastWrap.innerHTML = `
      <div class="pointer-events-auto bg-white bg-opacity-95 text-gray-900 shadow-lg rounded-xl px-4 py-3 flex items-center gap-3">
        <i data-lucide="check-circle" class="w-6 h-6 text-green-600"></i>
        <div class="text-sm font-medium">${escapeHtml(message)}</div>
      </div>
    `;
    document.body.appendChild(toastWrap);

    if (window.lucide) window.lucide.createIcons();

    setTimeout(() => {
      try { toastWrap.remove(); } catch(e) {}
    }, 2500);
  }

  function escapeHtml(str) {
    if (!str) return "";
    return String(str).replace(/[&<>"']/g, (s) => ({
      "&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"
    }[s]));
  }

  // --- main render --- (items LEFT, summary RIGHT)
  function renderCart() {
    const branch = loadSelectedBranch();
    const cart = loadCart();
    const forBranch = branch ? cart.filter(i => i.branchId === branch.id) : cart;

    const container = document.createElement("div");
    container.className = "max-w-6xl mx-auto p-6";

    // Outer card that wraps header + both columns (single gray background)
    const outerCard = document.createElement("div");
    outerCard.className = "bg-gray-100 bg-opacity-90 rounded-xl p-4 shadow-xl";

    const header = document.createElement("div");
    header.className = "mb-6";
    header.innerHTML = `
      <h2 class="text-2xl font-bold mb-1">${branch ? escapeHtml(branch.name) : "سبد خرید"}</h2>
      <p class="text-sm text-gray-600">${branch ? (escapeHtml(branch.desc || "") ) : ""}</p>
    `;
    outerCard.appendChild(header);

    const layout = document.createElement("div");
    // Normal order: items on left, summary on right
    layout.className = "flex flex-col lg:flex-row gap-6";

    // LEFT: items column (grow) — no separate gray background now (outerCard provides it)
    const itemsCol = document.createElement("div");
    itemsCol.className = "flex-1 rounded-xl p-0";

    if (forBranch.length === 0) {
      itemsCol.innerHTML = `<div class="text-gray-700 p-6">سبد خرید خالی است.</div>`;
    } else {
      const list = document.createElement("div");
      list.className = "space-y-4";
      forBranch.forEach((item) => {
        const row = document.createElement("div");
        row.className = "bg-white bg-opacity-90 rounded-lg p-4 flex justify-between items-center";

        row.innerHTML = `
          <div>
            <div class="font-bold">${escapeHtml(item.name)}</div>
            <div class="text-sm text-gray-600">${formatPrice(item.price)}</div>
            <div class="text-xs text-gray-500 mt-1">از شعبه: ${escapeHtml(item.branchName || "")}</div>
          </div>
          <div class="flex items-center gap-2">
            <button class="cart-decrease bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center" data-name="${escapeHtml(item.name)}">-</button>
            <div class="px-3">${item.quantity}</div>
            <button class="cart-increase bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center" data-name="${escapeHtml(item.name)}">+</button>
          </div>
        `;
        list.appendChild(row);
      });
      itemsCol.appendChild(list);
    }

    // RIGHT: summary column (now inside same outer card)
    const summaryCol = document.createElement("aside");
    summaryCol.className = "lg:w-80 w-full flex-shrink-0 rounded-xl p-0";

    // compute totals
    let subtotal = 0;
    let itemCount = 0;
    forBranch.forEach(i => {
      subtotal += i.price * i.quantity;
      itemCount += i.quantity;
    });

    // build summary inner box (white card inside outer gray)
    const summaryInner = document.createElement("div");
    summaryInner.className = "bg-white bg-opacity-90 rounded-lg p-4 shadow-sm";

    summaryInner.innerHTML = `
      <h3 class="text-lg font-bold mb-4">خلاصه سفارش</h3>
      <div class="flex justify-between mb-2"><div class="text-sm text-gray-600">اقلام</div><div class="font-medium">${itemCount}</div></div>
      <div class="flex justify-between mb-4"><div class="text-sm text-gray-600">جمع جزء</div><div class="font-medium">${formatPrice(subtotal)}</div></div>
      <div class="border-t border-gray-200 pt-4">
        <button id="submitOrder" class="w-full bg-[#16a34a] hover:bg-[#159644] text-white px-4 py-2 rounded-lg font-bold ${itemCount === 0 ? 'opacity-60 cursor-not-allowed' : ''}" ${itemCount === 0 ? 'disabled' : ''}>
          ثبت سفارش
        </button>
      </div>
    `;

    const clearLinkWrap = document.createElement("div");
    clearLinkWrap.className = "mt-3 text-center";
    clearLinkWrap.innerHTML = `<button id="clearBranchCart" class="text-sm text-red-600 underline">پاک کردن سبد این شعبه</button>`;

    summaryCol.appendChild(summaryInner);
    summaryCol.appendChild(clearLinkWrap);

    layout.appendChild(itemsCol);   // left
    layout.appendChild(summaryCol); // right
    outerCard.appendChild(layout);

    container.appendChild(outerCard);
    main.innerHTML = "";
    main.appendChild(container);

    // attach listeners for +/- in items column
    container.querySelectorAll(".cart-increase").forEach((btn) => {
      btn.addEventListener("click", () => {
        const name = btn.getAttribute("data-name");
        modifyCartItem(name, +1);
      });
    });
    container.querySelectorAll(".cart-decrease").forEach((btn) => {
      btn.addEventListener("click", () => {
        const name = btn.getAttribute("data-name");
        modifyCartItem(name, -1);
      });
    });

    // submit handler
    const submitBtn = container.querySelector("#submitOrder");
    if (submitBtn) {
      submitBtn.addEventListener("click", () => {
        if (itemCount === 0) return;
        const branchObj = loadSelectedBranch();
        if (branchObj && branchObj.id) {
          clearCartForBranch(branchObj.id);
        } else {
          saveCart([]);
        }
        showToast("سفارش با موفقیت ثبت شد.");
        setTimeout(renderCart, 100);
      });
    }

    const clearBtn = container.querySelector("#clearBranchCart");
    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        const branchObj = loadSelectedBranch();
        if (branchObj && branchObj.id) {
          clearCartForBranch(branchObj.id);
        } else {
          saveCart([]);
        }
        showToast("سبد خرید خالی شد.");
        setTimeout(renderCart, 100);
      });
    }
  }

  // modify cart by name for current branch (used by UI)
  function modifyCartItem(name, delta) {
    const cart = loadCart();
    const branch = loadSelectedBranch();
    const branchId = branch ? branch.id : null;
    const idx = cart.findIndex(i => i.name === name && i.branchId === branchId);

    if (idx === -1 && delta > 0) {
      let price = 0;
      if (window.menuModule && window.menuModule._allFoods) {
        const f = window.menuModule._allFoods.find(x => x.name === name);
        if (f) price = f.price;
      }
      cart.push({
        name,
        price,
        quantity: delta,
        branchId,
        branchName: branch ? branch.name : ""
      });
    } else if (idx !== -1) {
      cart[idx].quantity += delta;
      if (cart[idx].quantity <= 0) cart.splice(idx, 1);
    }
    saveCart(cart);

    try {
      window.dispatchEvent(new CustomEvent("cartUpdated", { detail: { branchId } }));
    } catch(e) {}
    renderCart();
  }

  if (window) {
    window.addEventListener("cartUpdated", () => {
      renderCart();
    });
  }

  // initial render
  renderCart();
});
