// Sample products
const products = [
  {
    id: 1,
    name: "Classic White Shirt",
    category: "shirts",
    desc: "Premium cotton blend with modern fit",
    price: 59.99,
    img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
  },
  {
    id: 2,
    name: "Denim Jacket",
    category: "jackets",
    desc: "Vintage-style denim with distressed details",
    price: 89.99,
    img: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
  },
  {
    id: 3,
    name: "Black Skinny Jeans",
    category: "jeans",
    desc: "High-waisted with stretch fabric",
    price: 79.99,
    img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
  },
  {
    id: 4,
    name: "Knit Sweater",
    category: "sweaters",
    desc: "Cozy merino wool blend",
    price: 69.99,
    img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
  },
];

let cart = [];

function renderProducts() {
  const productsDiv = document.getElementById("products");
  const search = document.getElementById("search").value.toLowerCase();
  const category = document.getElementById("category-filter").value;
  productsDiv.innerHTML = "";
  let filtered = products.filter(
    (p) =>
      (category === "all" || p.category === category) &&
      (p.name.toLowerCase().includes(search) ||
        p.desc.toLowerCase().includes(search))
  );
  filtered.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
        <img src="${product.img}" alt="${product.name}">
        <div style="color:#888;font-size:0.9em;text-transform:uppercase;">${
          product.category
        }</div>
        <h3>${product.name}</h3>
        <p>${product.desc}</p>
        <div class="price">$${product.price.toFixed(2)}</div>
        <button onclick="addToCart(${product.id})">Add</button>
      `;
    productsDiv.appendChild(card);
  });
}

function addToCart(id) {
  const item = cart.find((i) => i.id === id);
  if (item) {
    item.qty += 1;
  } else {
    const product = products.find((p) => p.id === id);
    cart.push({ ...product, qty: 1 });
  }
  updateCartCount();
}

function updateCartCount() {
  document.getElementById("cart-count").innerText = cart.reduce(
    (a, b) => a + b.qty,
    0
  );
}

function openCart() {
  document.getElementById("cart-modal").style.display = "flex";
  renderCart();
}

function closeCart() {
  document.getElementById("cart-modal").style.display = "none";
}

function renderCart() {
  const cartItemsDiv = document.getElementById("cart-items");
  cartItemsDiv.innerHTML = "";
  let subtotal = 0;
  cart.forEach((item) => {
    subtotal += item.price * item.qty;
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
        <img src="${item.img}" alt="${item.name}">
        <div class="item-info">
          <div><strong>${item.name}</strong></div>
          <div>$${item.price.toFixed(2)} each</div>
        </div>
        <div class="qty-controls">
          <button onclick="changeQty(${item.id}, -1)">-</button>
          <span>${item.qty}</span>
          <button onclick="changeQty(${item.id}, 1)">+</button>
        </div>
        <span class="remove" onclick="removeFromCart(${item.id})">&times;</span>
        <div style="width:60px;text-align:right;">$${(
          item.price * item.qty
        ).toFixed(2)}</div>
      `;
    cartItemsDiv.appendChild(div);
  });
  document.getElementById("cart-items-count").innerText = cart.length;
  document.getElementById("subtotal").innerText = subtotal.toFixed(2);
  document.getElementById("tax").innerText = (subtotal * 0.1).toFixed(2);
  document.getElementById("total").innerText = (subtotal * 1.1).toFixed(2);
}

function changeQty(id, delta) {
  const item = cart.find((i) => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter((i) => i.id !== id);
  }
  updateCartCount();
  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter((i) => i.id !== id);
  updateCartCount();
  renderCart();
}

function generateInvoice() {
  closeCart();
  document.getElementById("invoice-modal").style.display = "flex";
  document.getElementById("invoice-number").innerText =
    "INV-" + Math.floor(Math.random() * 1000000);
  document.getElementById("invoice-date").innerText =
    new Date().toLocaleDateString();
  const tbody = document.querySelector("#invoice-table tbody");
  tbody.innerHTML = "";
  let subtotal = 0;
  cart.forEach((item) => {
    subtotal += item.price * item.qty;
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${item.name}</td>
        <td>${item.qty}</td>
        <td>$${item.price.toFixed(2)}</td>
        <td>$${(item.price * item.qty).toFixed(2)}</td>
      `;
    tbody.appendChild(tr);
  });
  document.getElementById("invoice-subtotal").innerText = subtotal.toFixed(2);
  document.getElementById("invoice-tax").innerText = (subtotal * 0.1).toFixed(
    2
  );
  document.getElementById("invoice-total").innerText = (subtotal * 1.1).toFixed(
    2
  );
}

function closeInvoice() {
  document.getElementById("invoice-modal").style.display = "none";
}

document.getElementById("search").addEventListener("input", renderProducts);
document
  .getElementById("category-filter")
  .addEventListener("change", renderProducts);

window.onload = () => {
  renderProducts();
  updateCartCount();
};
// ...existing code...

function openCart() {
  document.getElementById("cart-modal").style.display = "flex";
  document.body.style.overflow = "hidden";
  renderCart();
}

function closeCart() {
  document.getElementById("cart-modal").style.display = "none";
  document.body.style.overflow = "";
}

function generateInvoice() {
  closeCart();
  document.getElementById("invoice-modal").style.display = "flex";
  document.body.style.overflow = "hidden";
  document.getElementById("invoice-number").innerText =
    "INV-" + Math.floor(Math.random() * 1000000);
  document.getElementById("invoice-date").innerText =
    new Date().toLocaleDateString();
  const tbody = document.querySelector("#invoice-table tbody");
  tbody.innerHTML = "";
  let subtotal = 0;
  cart.forEach((item) => {
    subtotal += item.price * item.qty;
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${item.name}</td>
        <td>${item.qty}</td>
        <td>$${item.price.toFixed(2)}</td>
        <td>$${(item.price * item.qty).toFixed(2)}</td>
      `;
    tbody.appendChild(tr);
  });
  document.getElementById("invoice-subtotal").innerText = subtotal.toFixed(2);
  document.getElementById("invoice-tax").innerText = (subtotal * 0.1).toFixed(
    2
  );
  document.getElementById("invoice-total").innerText = (subtotal * 1.1).toFixed(
    2
  );
}

function closeInvoice() {
  document.getElementById("invoice-modal").style.display = "none";
  document.body.style.overflow = "";
}

// ...existing code...

// Animation for product cards
function renderProducts() {
  const productsDiv = document.getElementById("products");
  const search = document.getElementById("search").value.toLowerCase();
  const category = document.getElementById("category-filter").value;
  productsDiv.innerHTML = "";
  let filtered = products.filter(
    (p) =>
      (category === "all" || p.category === category) &&
      (p.name.toLowerCase().includes(search) ||
        p.desc.toLowerCase().includes(search))
  );
  filtered.forEach((product, idx) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.style.animationDelay = idx * 0.08 + "s";
    card.innerHTML = `
        <img src="${product.img}" alt="${product.name}">
        <div style="color:#888;font-size:0.9em;text-transform:uppercase;">${
          product.category
        }</div>
        <h3>${product.name}</h3>
        <p>${product.desc}</p>
        <div class="price">$${product.price.toFixed(2)}</div>
        <button onclick="addToCart(${product.id})">Add</button>
      `;
    productsDiv.appendChild(card);
  });
}

// ...existing code...
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeCart();
    closeInvoice();
  }
});
