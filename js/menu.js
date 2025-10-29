// js/menu.js
(() => {
  // === full foods list ===
  const allFoods = [
    // 🟥 اسپاگتی
    { name: "اسپاگتی گوشت", desc: "اسپاگتی + سس گوشت چرخ کرده + پنیر", price: 120, category: "اسپاگتی", is_new: false, image: "" },
    { name: "اسپاگتی سویا", desc: "اسپاگتی + سس سویا + پنیر", price: 100, category: "اسپاگتی", is_new: false, image: "" },
    { name: "اسپاگتی تن ماهی", desc: "اسپاگتی + پوره گوجه + سیر + روغن زیتون + تن ماهی + پنیر", price: 110, category: "اسپاگتی", is_new: true, image: "" },

    // 🟩 پنه
    { name: "پنه آلفردو", desc: "پنه + سس قارچ + خامه + مرغ + پنیر", price: 180, category: "پنه", is_new: false, image: "assets/images/Spockati_Images1/Penne Alfredo.jpg" },
    { name: "پنه پستو", desc: "پنه + سس ریحان + گردو + روغن زیتون + مرغ + پنیر", price: 150, category: "پنه", is_new: false, image: "assets/images/Spockati_Images1/Penne Arrabbiata.jpg" },
    { name: "پنه استروگانف", desc: "پنه + سس قارچ + خامه + گوشت گوساله + پنیر", price: 190, category: "پنه", is_new: false, image: "assets/images/Spockati_Images1/Penne Stroganoff.jpg" },
    { name: "پنه تن ماهی", desc: "پنه + سس خامه + تن ماهی + ادویه مخصوص", price: 160, category: "پنه", is_new: true, image: "assets/images/Spockati_Images1/Penne Tuna.jpg" },

    // 🟨 مک
    { name: "مک اند چیز", desc: "ماکارونی + سس پنیر + پودر چیپس + پنیر", price: 105, category: "مک", is_new: false, image: "" },
    { name: "مک گوشت", desc: "ماکارونی + سس پنیر + سس گوشت چرخ کرده + پنیر", price: 145, category: "مک", is_new: false, image: "" },
    { name: "مک سویا", desc: "ماکارونی + سس پنیر + سس سویا + پنیر", price: 125, category: "مک", is_new: false, image: "" },
    { name: "مک بلونیز", desc: "ماکارونی + سس گوشت چرخ کرده + پنیر", price: 150, category: "مک", is_new: false, image: "assets/images/Spockati_Images1/Mac Bolognese.jpg" },
    { name: "مک آلفردو", desc: "ماکارونی + سس قارچ + خامه + مرغ + پنیر", price: 190, category: "مک", is_new: false, image: "assets/images/Spockati_Images1/Mac Alfredo.jpg" },
    { name: "مک استروگانف", desc: "ماکارونی + سس قارچ + خامه + گوشت گوساله + پنیر", price: 210, category: "مک", is_new: false, image: "assets/images/Spockati_Images1/Mac Stroganoff.jpg" },

    // 🟪 فتوچینی
    { name: "فتوچینی گوشت", desc: "فتوچینی + سس گوشت چرخ کرده + پنیر", price: 135, category: "فتوچینی", is_new: false, image: "" },
    { name: "فتوچینی سویا", desc: "فتوچینی + سس سویا + پنیر", price: 115, category: "فتوچینی", is_new: false, image: "" },
    { name: "فتوچینی آلفردو", desc: "فتوچینی + سس قارچ + خامه + مرغ + پنیر", price: 180, category: "فتوچینی", is_new: false, image: "assets/images/Spockati_Images1/Fettuccine Alfredo.jpg" },
    { name: "فتوچینی پستو", desc: "فتوچینی + سس ریحان + گردو + مرغ + پنیر", price: 150, category: "فتوچینی", is_new: false, image: "assets/images/Spockati_Images1/Fettuccine Arrabbiata.jpg" },
    { name: "فتوچینی بلونیز", desc: "فتوچینی + سس گوشت چرخ کرده + پنیر", price: 150, category: "فتوچینی", is_new: false, image: "assets/images/Spockati_Images1/Fettuccine Bolognese.jpg" },

    // 🟦 لازانیا
    { name: "لازانیا", desc: "لازانیا + سس گوشت چرخ کرده + پنیر شامل", price: 180, category: "لازانیا", is_new: false, image: "" },

    // 🧀 افزودنی‌ها
    { name: "پودر چیپس", desc: "پودر چیپس تازه و خوشمزه", price: 15, category: "افزودنی‌ها", is_new: false, image: "assets/images/Spockati_Images1/chips.jpg" },
    { name: "پنیر گودا", desc: "پنیر گودا برای افزودن به غذا", price: 15, category: "افزودنی‌ها", is_new: false, image: "assets/images/Spockati_Images1/cheese.jpg" },
    { name: "زیتون", desc: "زیتون تازه", price: 15, category: "افزودنی‌ها", is_new: false, image: "assets/images/Spockati_Images1/olive.jpg" },
  ];

  // DOM refs
  const menuContainer = document.getElementById("menuContainer");
  const categoryList = document.getElementById("categoryList");
  const branchTitleEl = document.getElementById("branchTitle");

  // state
  let currentFoods = allFoods.slice();
  const defaultImage = "assets/images/default.jpg";
  let currentBranch = loadSelectedBranch() || { id: null, name: "پیش‌فرض" };

  // --- localStorage helpers ---
  function loadSelectedBranch() {
    try {
      const raw = localStorage.getItem("selectedBranch");
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function saveSelectedBranch(branchObj) {
    try {
      localStorage.setItem("selectedBranch", JSON.stringify(branchObj));
    } catch (e) { /* ignore */ }
  }

  function getCart() {
    try {
      const raw = localStorage.getItem("cartItems");
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function saveCart(cart) {
    try {
      localStorage.setItem("cartItems", JSON.stringify(cart));
    } catch (e) { /* ignore */ }
  }

  function findFoodByName(name) {
    return allFoods.find((f) => f.name === name);
  }

  function getQtyForCurrentBranch(name) {
    const cart = getCart();
    const item = cart.find((i) => i.name === name && i.branchId === currentBranch.id);
    return item ? item.quantity : 0;
  }

  function changeQuantity(name, delta) {
    const food = findFoodByName(name);
    if (!food) return;

    const cart = getCart();
    const idx = cart.findIndex((i) => i.name === name && i.branchId === currentBranch.id);

    if (idx === -1) {
      if (delta > 0) {
        cart.push({
          name: food.name,
          price: food.price,
          quantity: delta,
          branchId: currentBranch.id,
          branchName: currentBranch.name,
        });
      }
    } else {
      cart[idx].quantity += delta;
      if (cart[idx].quantity <= 0) {
        cart.splice(idx, 1);
      }
    }

    saveCart(cart);
    // notify any listeners that the cart changed
    try {
      window.dispatchEvent(new CustomEvent("cartUpdated", { detail: { branchId: currentBranch.id } }));
    } catch (e) { /* ignore */ }

    // update UI counters
    updateQtyUI(name);
  }

  // --- Utility: get categories from foods ---
  function getCategories(foods) {
    const cats = new Set(foods.map((f) => f.category));
    return ["همه", ...Array.from(cats)];
  }

  // --- Render categories (JS-generated buttons) ---
  function renderCategories(foods) {
    if (!categoryList) return;
    categoryList.innerHTML = "";

    const categories = getCategories(foods);
    const categoryStyles = {
      "همه": { bg: "#AF398D", hover: "#C754A6", icon: `<i data-lucide="utensils" class="w-8 h-8 text-black"></i>` },
      "اسپاگتی": { bg: "#F73A4E", hover: "#FF5E70", img: "assets/images/foods/Spagetti.png" },
      "مک": { bg: "#F6AE28", hover: "#FFC048", img: "assets/images/foods/Mac.png" },
      "پنه": { bg: "#49A078", hover: "#5FBC90", img: "assets/images/foods/Penne.png" },
      "لازانیا": { bg: "#4138DB", hover: "#5A54E8", img: "assets/images/foods/lasagna.png" },
      "فتوچینی": { bg: "#9839A3", hover: "#B356BE", img: "assets/images/foods/Fettucine.png" },
      "افزودنی‌ها": { bg: "#FF7F50", hover: "#FFA273", img: "assets/images/foods/AddOn.png" },
    };

    categories.forEach((cat, idx) => {
      const li = document.createElement("li");
      li.className = `
        category-btn w-48 rounded-2xl cursor-pointer flex items-center justify-center
        gap-2 px-4 py-2 shadow-md text-black hover:scale-105 transition-transform duration-300
      `;

      const style = categoryStyles[cat] || { bg: "#777", hover: "#999" };
      li.style.backgroundColor = style.bg;
      li.addEventListener("mouseenter", () => (li.style.backgroundColor = style.hover));
      li.addEventListener("mouseleave", () => (li.style.backgroundColor = style.bg));

      li.innerHTML = style.icon
        ? `${style.icon}<span>${cat}</span>`
        : style.img
        ? `<img src="${style.img}" alt="${cat}" class="w-10 h-10 rounded-full"/><span>${cat}</span>`
        : `<span>${cat}</span>`;

      li.setAttribute("data-category", cat);

      if (idx === 0) li.classList.add("ring-4", "ring-black");

      li.addEventListener("click", () => {
        categoryList.querySelectorAll(".category-btn").forEach((b) => b.classList.remove("ring-4", "ring-black"));
        li.classList.add("ring-4", "ring-black");
        renderMenu(cat);
      });

      categoryList.appendChild(li);
    });

    if (window.lucide) window.lucide.createIcons();
  }

  // --- Render menu cards (with + / - / qty) ---
  function renderMenu(category = "همه") {
    if (!menuContainer) return;
    menuContainer.innerHTML = "";

    const filtered = category === "همه" ? currentFoods : currentFoods.filter((f) => f.category === category);

    filtered.forEach((food) => {
      const imageSrc = food.image && food.image.trim() !== "" ? food.image : defaultImage;
      const card = document.createElement("div");
      card.className =
        "bg-white bg-opacity-90 text-gray-900 rounded-2xl shadow-md hover:shadow-xl transition flex flex-col justify-between w-72 overflow-hidden";

      card.innerHTML = `
        <img src="${imageSrc}" alt="${food.name}" class="w-full h-40 object-cover rounded-t-2xl" />
        <div class="px-4 pb-4 flex flex-col justify-between flex-grow">
          <div>
            <div class="flex justify-between items-start mb-2">
              <h3 class="text-lg font-bold text-[#283845]">${food.name}</h3>
              ${food.is_new ? `<span class="text-xs bg-[#49A078] text-white px-2 py-0.5 rounded-full">جدید</span>` : ""}
            </div>
            <p class="text-sm text-gray-700 mb-4">${food.desc || ""}</p>
          </div>
          <div class="flex justify-between items-center">
            <div class="text-right font-bold text-[#F6AE28]">${food.price} هزار تومان</div>
            <div class="flex items-center gap-2">
              <button class="decrease-btn bg-gray-200 hover:bg-gray-300 text-black rounded-full w-8 h-8 flex items-center justify-center" data-name="${food.name}">
                <i data-lucide="minus" class="w-4 h-4"></i>
              </button>
              <div class="qty-badge text-sm font-bold" data-name="${food.name}">${getQtyForCurrentBranch(food.name)}</div>
              <button class="increase-btn bg-[#F73A4E] hover:bg-[#F6AE28] text-white rounded-full w-8 h-8 flex items-center justify-center" data-name="${food.name}">
                <i data-lucide="plus" class="w-4 h-4"></i>
              </button>
            </div>
          </div>
        </div>
      `;

      menuContainer.appendChild(card);
    });

    // attach listeners to new buttons
    menuContainer.querySelectorAll(".increase-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const name = btn.getAttribute("data-name");
        changeQuantity(name, 1);
      });
    });
    menuContainer.querySelectorAll(".decrease-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const name = btn.getAttribute("data-name");
        changeQuantity(name, -1);
      });
    });

    // create icons and ensure qty badges updated
    if (window.lucide) window.lucide.createIcons();
    updateAllQtyUI();
  }

  function updateQtyUI(name) {
    const el = menuContainer.querySelector(`.qty-badge[data-name="${CSS.escape(name)}"]`);
    if (el) el.textContent = getQtyForCurrentBranch(name);
  }

  function updateAllQtyUI() {
    menuContainer.querySelectorAll(".qty-badge").forEach((el) => {
      const name = el.getAttribute("data-name");
      el.textContent = getQtyForCurrentBranch(name);
    });
  }

  // --- Branch handling ---
  function setBranch(branch) {
    if (!branch) return;

    // normalize branch object -> ensure id & name exist
    const branchObj = {
      id: branch.id ?? branch.name ?? branchIdFromName(branch.name),
      name: branch.name ?? "شعبه",
    };
    currentBranch = branchObj;
    saveSelectedBranch(currentBranch);

    if (branchTitleEl) branchTitleEl.textContent = currentBranch.name || "شعبه";

    if (Array.isArray(branch.menuNames) && branch.menuNames.length) {
      const baseFoods = allFoods.filter((f) => branch.menuNames.includes(f.name));
      const addons = allFoods.filter((f) => f.category === "افزودنی‌ها");
      currentFoods = [...baseFoods, ...addons];
    } else {
      currentFoods = allFoods.slice();
    }

    renderCategories(currentFoods);
    renderMenu("همه");
  }

  function branchIdFromName(name) {
    // fallback stable id from name
    return name ? name.replace(/\s+/g, "_") : null;
  }

  // expose (small safe API)
  window.menuModule = {
    setBranch,
    renderMenu,
    // expose the full data for other modules (cart.js uses this)
    _allFoods: allFoods,
  };

  // initial load: if menuContainer exists initialize with default branch (all foods)
  setTimeout(() => {
    if (document.getElementById("menuContainer")) {
      setBranch({ id: currentBranch.id, name: currentBranch.name, menuNames: allFoods.map((f) => f.name) });
    }
  }, 50);
})();
