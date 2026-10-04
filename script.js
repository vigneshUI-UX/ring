// Exactly 7 items total
const items = [
  { id: 0, title: "PHANTOM EDITION", price: "₹20,749", img: "images/ring1.png" },
  { id: 1, title: "EMERALD HEAVEN", price: "₹35,200", img: "images/necklace1.png" },
  { id: 2, title: "ROYAL HERITAGE", price: "₹48,900", img: "images/necklace2.png" },
  { id: 3, title: "NOVA CRYSTAL", price: "₹14,849", img: "images/earrings1.png" },
  { id: 4, title: "ZENITH DARK", price: "₹21,549", img: "images/bangles1.png" },
  { id: 5, title: "LUMINA GOLD", price: "₹24,949", img: "images/bracelet1.png" },
  { id: 6, title: "STELLAR ULTRA", price: "₹26,549", img: "images/ring2.png" }
];

const gallery = document.getElementById("gallery");
const backBtn = document.getElementById("back-btn");
const detailPanel = document.getElementById("detail-panel");
const itemTitle = document.getElementById("item-title");
const itemPrice = document.getElementById("item-price");
const cartBtn = document.getElementById("cart-btn");
const footerHint = document.getElementById("footer-hint");

let isDetailView = false;
let activeIndex = null;

function getSpacing() {
  const width = window.innerWidth;
  if (width < 480) return 60;
  if (width < 820) return 100;
  return 150;
}

function getStackOffset() {
  const width = window.innerWidth;
  if (width < 820) return 0;
  return -160;
}

// Build Cards
function renderCards() {
  gallery.innerHTML = "";

  items.forEach((item, index) => {
    const card = document.createElement("div");
    card.classList.add("card", "first-page-transparent");

    const img = document.createElement("img");
    img.src = item.img;
    img.alt = item.title;

    card.appendChild(img);
    gallery.appendChild(card);

    card.addEventListener("click", () => handleCardClick(index));
  });

  arrangeGrid();
}

// FIRST PAGE: Transparent Cards Spread Across Screen
function arrangeGrid() {
  const cards = document.querySelectorAll(".card");
  const total = cards.length;
  const spacing = getSpacing();

  cards.forEach((card, index) => {
    // Set class for FIRST PAGE (Transparent)
    card.classList.add("first-page-transparent");
    card.classList.remove("next-page-white");

    const offset = index - (total - 1) / 2; // -3 to +3
    card.style.transform = `translateX(${offset * spacing}px) rotate(${offset * 2.5}deg)`;
    card.style.zIndex = total - Math.abs(Math.round(offset));
    card.style.opacity = "1";
  });
}

// NEXT PAGE: White Background Cards Stacked on Left
function updateStackLayout() {
  const cards = document.querySelectorAll(".card");
  const total = cards.length;
  const stackOffset = getStackOffset();

  cards.forEach((card, index) => {
    // Set class for NEXT PAGE (Solid White)
    card.classList.remove("first-page-transparent");
    card.classList.add("next-page-white");

    const relativeIndex = (index - activeIndex + total) % total;

    if (relativeIndex < 4) {
      const translateX = stackOffset + relativeIndex * 12;
      const translateY = relativeIndex * 4;
      const rotate = relativeIndex * -3;

      card.style.transform = `translateX(${translateX}px) translateY(${translateY}px) rotate(${rotate}deg)`;
      card.style.zIndex = 30 - relativeIndex;
      card.style.opacity = "1";
    } else {
      card.style.transform = `translateX(${stackOffset}px) scale(0.8)`;
      card.style.zIndex = 0;
      card.style.opacity = "0";
    }
  });

  const activeItem = items[activeIndex];
  itemTitle.textContent = activeItem.title;
  itemPrice.textContent = activeItem.price;

  cartBtn.textContent = "Add to Cart";
  cartBtn.classList.remove("added");
}

// Card Click Event Handler
function handleCardClick(index) {
  if (isDetailView) {
    activeIndex = (activeIndex + 1) % items.length;
    updateStackLayout();
    return;
  }

  isDetailView = true;
  activeIndex = index;

  backBtn.classList.remove("hidden");
  detailPanel.classList.remove("hidden");
  footerHint.classList.add("hidden");

  updateStackLayout();
}

// Back Button Event
backBtn.addEventListener("click", () => {
  isDetailView = false;
  activeIndex = null;

  backBtn.classList.add("hidden");
  detailPanel.classList.add("hidden");
  footerHint.classList.remove("hidden");

  arrangeGrid();
});

// Window Resize Handler
window.addEventListener("resize", () => {
  if (isDetailView) {
    updateStackLayout();
  } else {
    arrangeGrid();
  }
});

// Cart Button Handler
cartBtn.addEventListener("click", () => {
  if (cartBtn.classList.contains("added")) {
    cartBtn.textContent = "Add to Cart";
    cartBtn.classList.remove("added");
  } else {
    cartBtn.textContent = "✓ Added to Cart";
    cartBtn.classList.add("added");
  }
});

// Initialize Gallery
renderCards();