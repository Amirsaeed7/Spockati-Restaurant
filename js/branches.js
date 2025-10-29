// js/branches.js
(() => {
  const branches = [
    {
      id: "lakani",
      name: "شعبه لاکانی",
      desc: "رشت، میدان لاکانی، ابتدای خیابان لاکانی",
      image: "assets/images/branches/branch1.jpeg",
      score: 4.5,
      menuNames: [
        "اسپاگتی گوشت",
        "اسپاگتی سویا",
        "اسپاگتی تن ماهی",
        "مک اند چیز",
        "مک بلونیز",
        "لازانیا",
        "فتوچینی بلونیز"
      ],
    },
    {
      id: "stadium",
      name: "شعبه استادیوم",
      desc: "رشت، نامجو، روبروی درب استادیوم",
      image: "assets/images/branches/branch2.jpeg",
      score: 4.7,
      menuNames: [
        "اسپاگتی گوشت",
        "پنه آلفردو",
        "پنه استروگانف",
        "مک آلفردو",
        "فتوچینی آلفردو",
        "مک اند چیز"
      ],
    },
    {
      id: "golsar",
      name: "شعبه گلسار",
      desc: "رشت، گلسار، نبش خیابان 123",
      image: "assets/images/branches/branch3.jpeg",
      score: 4.8,
      menuNames: [
        "اسپاگتی سویا",
        "پنه پستو",
        "مک گوشت",
        "فتوچینی پستو",
        "لازانیا"
      ],
    },
    {
      id: "lahijan",
      name: "شعبه لاهیجان",
      desc: "لاهیجان، شیشه‌گران، روبروی شیرینی مادر",
      image: "assets/images/branches/branch4.jpg",
      score: 4.6,
      menuNames: [
        "اسپاگتی گوشت",
        "پنه آلفردو",
        "مک استروگانف",
        "فتوچینی گوشت"
      ],
    },
  ];

  const branchesList = document.getElementById("branchesList");

  function createBranchCard(branch) {
    const li = document.createElement("li");
    li.className = "card";
    li.innerHTML = `
      <div class="visual">
        <img class="img" width="384" height="192" src="${branch.image}" alt="${branch.name}">
      </div>
      <div class="content">
        <div class="content-wrapper">
          <h3 class="title">${branch.name}</h3>
          <p class="desc">${branch.desc || ""}</p>
        </div>
        <div class="flex flex-row justify-between items-center">
          <a href="#" class="card-link view-menu" data-branch-id="${branch.id}">مشاهده منو <i data-lucide="utensils" class="w-4 h-4"></i></a>
          <div class="flex items-center gap-1 text-[#F6AE28] font-black text-lg">
            <i data-lucide="star" class="w-4 h-4"></i><span>${branch.score}</span>
          </div>
        </div>
      </div>
    `;
    return li;
  }

  function renderBranches() {
    if (!branchesList) return;
    branchesList.innerHTML = "";
    branches.forEach((b) => {
      branchesList.appendChild(createBranchCard(b));
    });

    if (window.lucide) window.lucide.createIcons();

    branchesList.querySelectorAll(".view-menu").forEach((el) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        const branchId = el.getAttribute("data-branch-id");
        const branch = branches.find((x) => x.id === branchId);
        if (!branch) return;

        if (window.menuModule && typeof window.menuModule.setBranch === "function") {
          window.menuModule.setBranch({
            id: branch.id,
            name: branch.name,
            menuNames: branch.menuNames,
          });

          const menuPlaceholder = document.getElementById("menu-placeholder");
          if (menuPlaceholder) {
            menuPlaceholder.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        } else {
          console.warn("menuModule not ready yet. Make sure menu.js is loaded.");
        }
      });
    });

    // default select first branch
    const first = branchesList.querySelector(".view-menu");
    if (first) first.click();
  }

  window.branchesModule = { renderBranches };

  setTimeout(() => {
    if (document.getElementById("branchesList")) renderBranches();
  }, 50);
})();
