// app.js
document.addEventListener("DOMContentLoaded", () => {
  renderNavbar();
  renderHero();
  renderHurrySection();
  renderProducts();
  renderCustomBouquet();
  renderHowItWorks();
  renderSplitSection();
  renderFAQs();
  renderWhatsAppPromo(); // Renderizado de la nueva sección de invitación
  renderFooter();
  setupWhatsAppWidget(); // Inicialización del widget tipo SleekFlow
});

// Generar enlace dinámico
function getWhatsAppUrl(customMessage = "") {
  const baseText = customMessage || `Hola ${CONFIG.business.name}, me gustaría solicitar información de sus diseños florales.`;
  return `https://wa.me/${CONFIG.business.phone}?text=${encodeURIComponent(baseText)}`;
}

// 1. WIDGET INTERACTIVO DE WHATSAPP (Tipo SleekFlow)
function setupWhatsAppWidget() {
  const widgetTrigger = document.getElementById("wa-main-trigger");
  const waPopup = document.getElementById("wa-popup");
  const closePopup = document.getElementById("close-popup");
  const waWidgetBtn = document.getElementById("wa-widget-btn");

  // Al dar clic al disparador flotante abre/cierra la ventana
  widgetTrigger.addEventListener("click", (e) => {
    e.stopPropagation();
    waPopup.classList.toggle("show");
  });

  // Botón cerrar popup
  closePopup.addEventListener("click", (e) => {
    e.stopPropagation();
    waPopup.classList.remove("show");
  });

  // Evitar que se cierre al hacer clic adentro de la ventanita
  waPopup.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  // Cerrar si se da clic en cualquier parte fuera de la ventanita
  document.addEventListener("click", () => {
    waPopup.classList.remove("show");
  });

  // Configurar enlace del botón final "Iniciar Chat" del widget
  waWidgetBtn.href = getWhatsAppUrl("Hola, vi el asistente en su página web y me gustaría hacer una consulta de flores.");

  // APARICIÓN AUTOMÁTICA DESPUÉS DE 5 SEGUNDOS (Excelente para captar atención en frío)
  setTimeout(() => {
    // Solo se abre si el usuario no la ha cerrado previamente de forma manual
    if (!waPopup.classList.contains("show")) {
      waPopup.classList.add("show");
    }
  }, 5000);
}

// 2. Navbar y TopAlert
function renderNavbar() {
  document.getElementById("top-alert").innerText = CONFIG.topAlert.text;
  document.getElementById("brand-logo").innerText = CONFIG.business.name;
  
  const navContainer = document.getElementById("navbar-links");
  navContainer.innerHTML = CONFIG.navbar.links.map(link => `
    <li class="nav-item">
      <a class="nav-link px-3" href="${link.url}">${link.name}</a>
    </li>
  `).join('');

  const navCta = document.getElementById("nav-cta");
  navCta.innerText = CONFIG.navbar.ctaText;
  navCta.href = getWhatsAppUrl(`Hola ${CONFIG.business.name}, me gustaría enviar flores. ¿Qué opciones tienen hoy?`);
}

// 3. Hero Section
function renderHero() {
  document.getElementById("hero-title").innerText = CONFIG.hero.title;
  document.getElementById("hero-subtitle").innerText = CONFIG.hero.subtitle;
  
  const heroCta = document.getElementById("hero-cta");
  heroCta.innerText = CONFIG.hero.ctaText;
  heroCta.href = getWhatsAppUrl(`Hola ${CONFIG.business.name}, vi su sitio web y quiero realizar un pedido de flores.`);
  document.getElementById("hero-bg").style.backgroundImage = `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1)), url('${CONFIG.hero.image}')`;
}

// 4. In a Hurry Section
function renderHurrySection() {
  document.getElementById("hurry-title").innerText = CONFIG.inAHurry.title;
  document.getElementById("hurry-text").innerText = CONFIG.inAHurry.text;
  
  const hurryCta = document.getElementById("hurry-cta");
  hurryCta.innerText = CONFIG.inAHurry.ctaText;
  hurryCta.href = getWhatsAppUrl(`Hola ${CONFIG.business.name}, ¡tengo prisa! Necesito enviar un arreglo express hoy mismo.`);
}

// 5. Catálogo de Productos
function renderProducts() {
  const container = document.getElementById("products-container");
  container.innerHTML = CONFIG.products.map(product => {
    const textMessage = `Hola ${CONFIG.business.name}, me interesa comprar el diseño de temporada: *${product.name}* (Precio: $${product.price} MXN). ¿Me podrían confirmar disponibilidad de entrega?`;
    const productWaUrl = getWhatsAppUrl(textMessage);

    return `
      <div class="col-md-6 col-lg-3">
        <div class="card h-100 product-card d-flex flex-column justify-content-between">
          <img src="${product.image}" class="card-img-top" alt="${product.name}">
          <div class="card-body d-flex flex-column justify-content-between p-4">
            <div>
              <h5 class="fw-bold text-dark mb-2">${product.name}</h5>
              <p class="text-muted small mb-3">${product.description}</p>
            </div>
            <div>
              <p class="product-price text-brand mb-3">$${product.price} MXN</p>
              <a href="${productWaUrl}" target="_blank" class="btn btn-brand w-100 py-2.5 text-uppercase fw-semibold">
                Pedir por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// 6. Diseño Especial / Personalizado
function renderCustomBouquet() {
  document.getElementById("custom-title").innerText = CONFIG.customBouquet.title;
  document.getElementById("custom-subtitle").innerText = CONFIG.customBouquet.subtitle;
  
  const listContainer = document.getElementById("custom-options-list");
  listContainer.innerHTML = CONFIG.customBouquet.options.map(option => `
    <li class="mb-3 text-muted">
      <i class="bi bi-check-lg text-brand me-2 fs-5"></i> ${option}
    </li>
  `).join('');

  const customCta = document.getElementById("custom-cta");
  customCta.innerText = CONFIG.customBouquet.ctaText;
  customCta.href = getWhatsAppUrl(`Hola ${CONFIG.business.name}, quiero cotizar un diseño floral personalizado a mi medida y presupuesto.`);
}

// 7. How It Works Section
function renderHowItWorks() {
  document.getElementById("how-title").innerText = CONFIG.howItWorks.title;
  document.getElementById("how-subtitle").innerText = CONFIG.howItWorks.subtitle;
  
  const container = document.getElementById("steps-container");
  container.innerHTML = CONFIG.howItWorks.steps.map(step => `
    <div class="col-md-4">
      <div class="how-card text-center d-flex flex-column align-items-center">
        <div class="mb-4">
          <i class="bi ${step.icon}"></i>
        </div>
        <h4 class="fw-bold fs-5 mb-3">${step.title}</h4>
        <p class="text-muted small mb-4">${step.description}</p>
        <div class="card-number">${step.number}</div>
      </div>
    </div>
  `).join('');

  const howCta = document.getElementById("how-cta");
  howCta.innerText = CONFIG.howItWorks.ctaText;
  howCta.href = getWhatsAppUrl(`Hola ${CONFIG.business.name}, leí cómo funciona el pedido en su sitio y quiero comenzar mi orden.`);
}

// 8. Middle CTA Split Section
function renderSplitSection() {
  document.getElementById("mid-title").innerText = CONFIG.midCta.title;
  document.getElementById("mid-text").innerText = CONFIG.midCta.text;
  
  const midCtaBtn = document.getElementById("mid-cta-btn");
  midCtaBtn.innerText = CONFIG.midCta.ctaText;
  midCtaBtn.href = getWhatsAppUrl(`Hola ${CONFIG.business.name}, quiero celebrar un momento especial con un arreglo único.`);

  document.getElementById("mid-img").style.backgroundImage = `url('${CONFIG.midCta.image}')`;
}

// 9. Frequently Asked Questions
function renderFAQs() {
  const container = document.getElementById("faq-container");
  container.innerHTML = CONFIG.faqs.map((faq, index) => `
    <div class="col-md-6">
      <div class="faq-item-card d-flex flex-column justify-content-between">
        <div>
          <h4 class="faq-question d-flex justify-content-between align-items-center text-brand" data-bs-toggle="collapse" data-bs-target="#answer-${index}">
            <span>${faq.question}</span>
            <i class="bi bi-chevron-down fs-6 text-muted"></i>
          </h4>
          <div id="answer-${index}" class="collapse ${index === 0 ? 'show' : ''} mt-3">
            <p class="faq-answer text-muted mb-0">${faq.answer}</p>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

// 10. NUEVA SECCIÓN: Promoción de Catálogo de WhatsApp (En reemplazo de la newsletter)
function renderWhatsAppPromo() {
  document.getElementById("promo-title").innerText = CONFIG.whatsappPromo.title;
  document.getElementById("promo-subtitle").innerText = CONFIG.whatsappPromo.subtitle;
  
  const promoCta = document.getElementById("promo-cta");
  promoCta.innerText = CONFIG.whatsappPromo.ctaText;
  promoCta.href = getWhatsAppUrl(CONFIG.whatsappPromo.defaultMsg);
}

// 11. Footer
function renderFooter() {
  document.getElementById("footer-logo").innerText = CONFIG.business.name;
  document.getElementById("copyright-name").innerText = CONFIG.business.name;
  document.getElementById("year").innerText = new Date().getFullYear();

  const footerLinksContainer = document.getElementById("footer-links");
  footerLinksContainer.innerHTML = CONFIG.navbar.links.map(link => `
    <a href="${link.url}" class="text-decoration-none text-muted small text-uppercase fw-semibold">${link.name}</a>
  `).join('');

  const socialsContainer = document.getElementById("footer-socials");
  socialsContainer.innerHTML = `
    <a href="${CONFIG.business.socials.facebook}" target="_blank" class="me-3"><i class="bi bi-facebook"></i></a>
    <a href="${CONFIG.business.socials.instagram}" target="_blank" class="me-3"><i class="bi bi-instagram"></i></a>
    <a href="${CONFIG.business.socials.linkedin}" target="_blank" class="me-3"><i class="bi bi-linkedin"></i></a>
    <a href="${CONFIG.business.socials.youtube}" target="_blank"><i class="bi bi-youtube"></i></a>
  `;
}