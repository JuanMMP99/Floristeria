// Estado del Carrito respaldado en LocalStorage
let cart = JSON.parse(localStorage.getItem('natura_cart')) || [];
let orderModalObj = null;

document.addEventListener("DOMContentLoaded", () => {
  const modalElem = document.getElementById('orderModal');
  if (modalElem) {
    orderModalObj = new bootstrap.Modal(modalElem);
  }

  // Renderizar Vistas
  if (document.getElementById("featured-products-container")) renderFeaturedProducts();
  // Nota: la inicialización del catálogo (applyFilters) la maneja productos.js
  // en productos.html, para evitar doble renderizado.

  updateCartUI();
  setupWhatsAppWidget();
  setupFormHandler();
});

// FUNCIONES DEL CARRITO
function addToCart(productId) {
  const product = CATALOG.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart();
  updateCartUI();

  // Abrir Offcanvas automáticox
  const cartOffcanvas = new bootstrap.Offcanvas(document.getElementById('cartOffcanvas'));
  cartOffcanvas.show();
}

function updateQuantity(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    cart = cart.filter(i => i.id !== productId);
  }

  saveCart();
  updateCartUI();
}

function removeFromCart(productId) {
  cart = cart.filter(i => i.id !== productId);
  saveCart();
  updateCartUI();
}

function clearCart() {
  cart = [];
  saveCart();
  updateCartUI();
}

function saveCart() {
  localStorage.setItem('natura_cart', JSON.stringify(cart));
}

function updateCartUI() {
  const container = document.getElementById("cart-items-container");
  const badge = document.getElementById("cart-badge");
  const totalDisplay = document.getElementById("cart-total-price");
  const pointsDisplay = document.getElementById("cart-points-earned");
  const checkoutBtn = document.getElementById("btn-proceed-checkout");

  // Conteo total
  const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  if (badge) badge.innerText = totalCount;

  // Total en MXN
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  if (totalDisplay) totalDisplay.innerText = `$${subtotal.toLocaleString()} MXN`;

  // Puntos calculados ($100 MXN = 1 Punto)
  const points = Math.floor(subtotal / 100);
  if (pointsDisplay) pointsDisplay.innerText = `+${points} Puntos Natura`;

  if (checkoutBtn) {
    checkoutBtn.disabled = cart.length === 0;
  }

  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="text-center py-5 text-muted">
        <i class="bi bi-bag-x display-3 mb-2 d-block opacity-50"></i>
        <p class="mb-0">Tu carrito está vacío</p>
        <small>Agrega arreglos florales para comenzar</small>
      </div>
    `;
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="cart-item-card d-flex align-items-center justify-content-between gap-3">
      <img src="${item.image}" class="cart-item-img" alt="${item.name}">
      <div class="flex-grow-1">
        <h6 class="fw-bold mb-0 text-dark small">${item.name}</h6>
        <span class="text-brand fw-bold small">$${item.price} MXN</span>
        <div class="d-flex align-items-center gap-2 mt-1">
          <button class="btn btn-sm btn-outline-secondary py-0 px-2" onclick="updateQuantity('${item.id}', -1)">-</button>
          <span class="small fw-bold">${item.quantity}</span>
          <button class="btn btn-sm btn-outline-secondary py-0 px-2" onclick="updateQuantity('${item.id}', 1)">+</button>
        </div>
      </div>
      <button class="btn btn-link text-danger p-0 border-0" onclick="removeFromCart('${item.id}')">
        <i class="bi bi-trash fs-5"></i>
      </button>
    </div>
  `).join('');
}

// RENDER DE PRODUCTOS CON BOTÓN AGREGAR AL CARRITO
function renderFeaturedProducts() {
  const container = document.getElementById("featured-products-container");
  if (!container) return;

  const featured = CATALOG.slice(0, 4);

  container.innerHTML = featured.map(product => `
    <div class="col-md-6 col-lg-3">
      <div class="card h-100 product-card d-flex flex-column justify-content-between">
        <img src="${product.image}" class="card-img-top" alt="${product.name}">
        <div class="card-body d-flex flex-column justify-content-between p-3">
          <div>
            <span class="badge bg-light text-brand border border-pink mb-2">${product.category}</span>
            <h5 class="fw-bold text-dark mb-1 fs-6">${product.name}</h5>
            <p class="text-muted small mb-2 text-truncate">${product.description}</p>
          </div>
          <div>
            <p class="fs-5 fw-bold text-brand font-serif mb-2">$${product.price} MXN</p>
            <button onclick="addToCart('${product.id}')" class="btn btn-brand w-100 py-2 text-uppercase fw-semibold btn-sm">
              <i class="bi bi-cart-plus me-1"></i> Agregar al Carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

// ABRIR MODAL CHECKOUT DESDE CARRITO
function openCheckoutModal() {
  if (cart.length === 0) return;

  const itemsList = document.getElementById("checkout-items-list");
  const totalPrice = document.getElementById("checkout-total-price");
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  itemsList.innerHTML = cart.map(i => `
    <li class="d-flex justify-content-between my-1">
      <span>${i.quantity}x ${i.name}</span>
      <span class="fw-bold">$${i.price * i.quantity} MXN</span>
    </li>
  `).join('');

  totalPrice.innerText = `$${subtotal.toLocaleString()} MXN`;

  // Ocultar Offcanvas y mostrar Modal
  const cartOffcanvas = bootstrap.Offcanvas.getInstance(document.getElementById('cartOffcanvas'));
  if (cartOffcanvas) cartOffcanvas.hide();

  if (orderModalObj) orderModalObj.show();
}

// ENVÍO DE FORMULARIO CON CARRITO A WHATSAPP
function setupFormHandler() {
  const form = document.getElementById("orderForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const buyerName = document.getElementById("buyerName").value;
    const buyerPhone = document.getElementById("buyerPhone").value;
    const deliveryType = document.getElementById("deliveryType").value;
    const paymentMethod = document.getElementById("paymentMethod").value;
    const date = document.getElementById("deliveryDate").value;
    const time = document.getElementById("deliveryTime").value;
    const cardMsg = document.getElementById("cardMessage").value || "Sin dedicatoria";

    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const pointsGained = Math.floor(subtotal / 100);

    let message = `🌸 *NUEVO PEDIDO - FLORERÍA NATURA*\n\n`;
    message += `*--- PRODUCTOS SOLICITADOS ---*\n`;
    cart.forEach(item => {
      message += `• ${item.quantity}x ${item.name} ($${item.price * item.quantity} MXN)\n`;
    });

    message += `\n*TOTAL:* $${subtotal.toLocaleString()} MXN`;
    message += `\n*Puntos Natura a Ganar:* +${pointsGained} pts\n\n`;
    message += `*Cliente:* ${buyerName} (${buyerPhone})\n`;
    message += `*Pago:* ${paymentMethod}\n`;
    message += `*Modalidad:* ${deliveryType === 'envio' ? 'Envío a Domicilio' : 'Recoger en Tienda'}\n`;
    message += `*Fecha de Entrega:* ${date} a las ${time} hrs\n`;

    if (deliveryType === "envio") {
      const recipientName = document.getElementById("recipientName").value;
      const recipientPhone = document.getElementById("recipientPhone").value;
      const address = document.getElementById("address").value;
      const addressRef = document.getElementById("addressRef").value || "Sin referencias";

      message += `\n*--- DATOS DE ENVÍO ---*\n`;
      message += `*Destinatario:* ${recipientName} (${recipientPhone})\n`;
      message += `*Dirección:* ${address}\n`;
      message += `*Referencias:* ${addressRef}\n`;
    }

    message += `\n*Dedicatoria:* "${cardMsg}"`;

    window.open(`https://wa.me/${CONFIG.business.phone}?text=${encodeURIComponent(message)}`, '_blank');
    
    clearCart();
    if (orderModalObj) orderModalObj.hide();
  });
}

function toggleDeliveryFields() {
  const type = document.getElementById("deliveryType").value;
  const deliverySection = document.getElementById("deliveryFieldsSection");
  const requiredInputs = document.querySelectorAll(".delivery-req");

  if (type === "tienda") {
    deliverySection.style.display = "none";
    requiredInputs.forEach(i => i.removeAttribute("required"));
  } else {
    deliverySection.style.display = "block";
    requiredInputs.forEach(i => i.setAttribute("required", "true"));
  }
}

function setupWhatsAppWidget() {
  const trigger = document.getElementById("wa-main-trigger");
  const popup = document.getElementById("wa-popup");
  const close = document.getElementById("close-popup");
  const btn = document.getElementById("wa-widget-btn");

  if (!trigger) return;

  trigger.addEventListener("click", () => popup.classList.toggle("show"));
  close.addEventListener("click", () => popup.classList.remove("show"));
  btn.href = `https://wa.me/${CONFIG.business.phone}?text=Hola%20Florer%C3%ADa%20Natura,%20quisiera%20consultar%20informaci%C3%B3n.`;
}