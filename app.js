// ===== SAVORA APP.JS =====

// ── CONFIG (replace with real numbers) ──────────────────────────────────────
const WHATSAPP_NUMBER_1 = "+917082819336";   // ← replace with your number
const WHATSAPP_NUMBER_2 = "+233YYYYYYYYY";   // ← replace with your 2nd number
const ORDER_EMAIL       = "orders@savora.com"; // ← replace with your email

// ── MENU DATA ────────────────────────────────────────────────────────────────
const menuItems = [
  // --- Rice & Stews ---
  { id: 1, name: "Jollof Rice + Chicken", category: "rice", price: 45, badge: "Best Seller",
    desc: "Classic party jollof with smoky flavour, served with grilled chicken and fried plantain.",
    img: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=500&q=80" },
  { id: 2, name: "Fried Rice + Beef", category: "rice", price: 42,
    desc: "Savoury fried rice loaded with vegetables and tender beef strips.",
    img: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500&q=80" },
  { id: 3, name: "Waakye + Egg + Wele", category: "rice", price: 38, badge: "Popular",
    desc: "Traditional Ghanaian waakye with boiled egg, wele, fried fish and shito sauce.",
    img: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500&q=80" },
  { id: 4, name: "Banku + Tilapia", category: "local", price: 55, badge: "Favourite",
    desc: "Smooth banku served with whole grilled tilapia, pepper sauce and garden eggs.",
    img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80" },
  { id: 5, name: "Fufu + Light Soup", category: "local", price: 48,
    desc: "Soft pounded fufu in a rich light soup with assorted meat — homemade comfort.",
    img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&q=80" },
  { id: 6, name: "Kenkey + Fried Fish", category: "local", price: 32,
    desc: "Ga kenkey served with crispy fried fish, fresh pepper sauce and onion salad.",
    img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&q=80" },
  // --- Grills ---
  { id: 7, name: "Grilled Chicken Platter", category: "grills", price: 68, badge: "Chef's Pick",
    desc: "Half grilled chicken marinated in our signature spice blend with coleslaw and fries.",
    img: "https://images.unsplash.com/photo-1598103442097-8b74394b95c8?w=500&q=80" },
  { id: 8, name: "BBQ Beef Skewers", category: "grills", price: 55,
    desc: "Juicy beef skewers grilled over charcoal with suya spices and peanut dip.",
    img: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=500&q=80" },
  { id: 9, name: "Grilled Prawns", category: "grills", price: 75,
    desc: "Large tiger prawns grilled with garlic butter and lemon, served with garlic bread.",
    img: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=500&q=80" },
  // --- Snacks ---
  { id: 10, name: "Kelewele", category: "snacks", price: 18,
    desc: "Spicy fried ripe plantain cubes seasoned with ginger, pepper and spices.",
    img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&q=80" },
  { id: 11, name: "Spring Rolls (6 pcs)", category: "snacks", price: 28,
    desc: "Crispy vegetable and chicken spring rolls served with sweet chili dipping sauce.",
    img: "https://images.unsplash.com/photo-1606756790138-261d2b21cd75?w=500&q=80" },
  { id: 12, name: "Meat Pie (2 pcs)", category: "snacks", price: 22,
    desc: "Flaky golden pastry filled with seasoned minced meat and vegetables.",
    img: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=500&q=80" },
  // --- Drinks ---
  { id: 13, name: "Fresh Sobolo (500ml)", category: "drinks", price: 15,
    desc: "Chilled hibiscus flower drink with ginger and lemon — natural and refreshing.",
    img: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=500&q=80" },
  { id: 14, name: "Pineapple Juice (500ml)", category: "drinks", price: 18,
    desc: "Fresh-pressed Ghanaian pineapple juice, no added sugar, served chilled.",
    img: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=500&q=80" },
  { id: 15, name: "Smoothie Combo", category: "drinks", price: 30, badge: "New",
    desc: "Choose from mango, watermelon or avocado smoothies — thick, chilled and nutritious.",
    img: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=500&q=80" },
];

const categoryLabels = {
  all: "All Items",
  rice: "Rice & Stews",
  local: "Local Dishes",
  grills: "Grills",
  snacks: "Snacks & Sides",
  drinks: "Drinks",
};

// ── CART MANAGEMENT ──────────────────────────────────────────────────────────
function getCart() {
  try { return JSON.parse(localStorage.getItem("savora_cart") || "[]"); }
  catch { return []; }
}
function saveCart(cart) {
  localStorage.setItem("savora_cart", JSON.stringify(cart));
  updateCartBadge();
}
function updateCartBadge() {
  const cart = getCart();
  const total = cart.reduce((s, i) => s + i.qty, 0);
  document.querySelectorAll("#cartBadge").forEach(el => el.textContent = total);
}
function addToCart(id) {
  const item = menuItems.find(m => m.id === id);
  if (!item) return;
  const cart = getCart();
  const existing = cart.find(c => c.id === id);
  if (existing) { existing.qty++; }
  else { cart.push({ id: item.id, name: item.name, price: item.price, img: item.img, qty: 1 }); }
  saveCart(cart);
  showToast(`<i class="fas fa-check-circle"></i> ${item.name} added to cart!`);
}

// ── FOOD CARD BUILDER ────────────────────────────────────────────────────────
function buildFoodCard(item) {
  return `
    <div class="food-card">
      <div class="food-card-img-wrap">
        <img src="${item.img}" alt="${item.name}" class="food-card-img" loading="lazy"/>
        ${item.badge ? `<span class="food-card-badge">${item.badge}</span>` : ""}
      </div>
      <div class="food-card-body">
        <div class="food-card-title">${item.name}</div>
        <p class="food-card-desc">${item.desc}</p>
        <div class="food-card-footer">
          <span class="food-price">₵${item.price.toFixed(2)}</span>
          <button class="add-to-cart-btn" onclick="addToCart(${item.id})">
            <i class="fas fa-plus"></i> Add
          </button>
        </div>
      </div>
    </div>`;
}

// ── TOAST ─────────────────────────────────────────────────────────────────────
function showToast(msg) {
  let t = document.getElementById("globalToast");
  if (!t) {
    t = document.createElement("div");
    t.id = "globalToast";
    t.className = "toast";
    document.body.appendChild(t);
  }
  t.innerHTML = msg;
  t.classList.add("show");
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove("show"), 3000);
}

// ── NAVBAR SCROLL / HAMBURGER ─────────────────────────────────────────────────
window.addEventListener("scroll", () => {
  const nav = document.getElementById("navbar");
  if (nav) nav.classList.toggle("scrolled", window.scrollY > 60);
  const st = document.getElementById("scrollTop");
  if (st) st.classList.toggle("visible", window.scrollY > 400);
});

document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();

  // Hamburger
  const hb = document.getElementById("hamburger");
  const nl = document.getElementById("navLinks");
  if (hb && nl) {
    hb.addEventListener("click", () => nl.classList.toggle("open"));
  }

  // Scroll-to-top btn
  const scrollBtn = document.createElement("button");
  scrollBtn.className = "scroll-top";
  scrollBtn.id = "scrollTop";
  scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  scrollBtn.setAttribute("aria-label", "Scroll to top");
  scrollBtn.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });
  document.body.appendChild(scrollBtn);
});

// ── WHATSAPP ORDER MESSAGE BUILDER ───────────────────────────────────────────
function buildWhatsAppMessage(cart, customerName, address, notes) {
  const itemList = cart.map(i => `• ${i.name} x${i.qty} = ₵${(i.price * i.qty).toFixed(2)}`).join("\n");
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const delivery = 15;
  const total = subtotal + delivery;
  return encodeURIComponent(
    `🍽️ *NEW ORDER — SAVORA*\n\n` +
    `👤 Name: ${customerName || "Not provided"}\n` +
    `📍 Address: ${address || "Not provided"}\n\n` +
    `🛒 *Order Details:*\n${itemList}\n\n` +
    `💰 Subtotal: ₵${subtotal.toFixed(2)}\n` +
    `🚚 Delivery: ₵${delivery.toFixed(2)}\n` +
    `✅ *Total: ₵${total.toFixed(2)}*\n\n` +
    `📝 Notes: ${notes || "None"}\n\n` +
    `Thank you for choosing Savora! 🙏`
  );
}
