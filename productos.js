let currentCategory = "Todos";
let currentPage = 1;
const itemsPerPage = 16;

document.addEventListener("DOMContentLoaded", () => {
  renderCategories();
  applyFilters();
});

function renderCategories() {
  const container = document.getElementById("categories-list");
  if (!container) return;

  container.innerHTML = CATEGORIES.map(cat => `
    <button 
      class="list-group-item list-group-item-action d-flex justify-content-between align-items-center border-0 px-3 py-2 rounded-3 mb-1 ${currentCategory === cat.name ? 'active bg-light-pink text-brand fw-bold' : 'text-secondary'}"
      onclick="filterByCategory('${cat.name}')">
      <span>${cat.name}</span>
      <span class="badge ${currentCategory === cat.name ? 'bg-brand' : 'bg-light text-muted'} rounded-pill">${cat.count}</span>
    </button>
  `).join('');
}

function filterByCategory(categoryName) {
  currentCategory = categoryName;
  currentPage = 1;
  renderCategories();
  applyFilters();
}

function applyFilters() {
  const searchInput = document.getElementById("search-input");
  const query = searchInput ? searchInput.value.toLowerCase().trim() : "";

  let filtered = CATALOG.filter(p => {
    const matchCategory = currentCategory === "Todos" || p.category === currentCategory;
    const matchSearch = p.name.toLowerCase().includes(query);
    return matchCategory && matchSearch;
  });

  renderGrid(filtered);
  renderPagination(filtered.length);
}

function renderGrid(products) {
  const container = document.getElementById("catalog-container");
  if (!container) return;

  const start = (currentPage - 1) * itemsPerPage;
  const pageProducts = products.slice(start, start + itemsPerPage);

  if (pageProducts.length === 0) {
    container.innerHTML = `
      <div class="col-12 text-center py-5">
        <p class="text-muted fs-5">No se encontraron productos en esta categoría.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = pageProducts.map(p => `
    <div class="col-6 col-md-4 col-lg-3">
      <div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden product-card d-flex flex-column justify-content-between">
        <img src="${p.image}" class="card-img-top" alt="${p.name}">
        <div class="card-body p-3 d-flex flex-column justify-content-between">
          <div>
            <span class="text-uppercase tracking-wider text-muted small d-block mb-1">${p.category}</span>
            <h6 class="fw-bold text-dark mb-2">${p.name}</h6>
          </div>
          <div>
            <div class="fw-bold text-brand fs-5 mb-3">$${p.price.toLocaleString('es-MX', {minimumFractionDigits: 2})} MXN</div>
            <button class="btn btn-soft-pink w-100 py-2 rounded-pill fw-semibold btn-sm" onclick="addToCart('${p.id}')">
              <i class="bi bi-bag-plus me-1"></i> Agregar al Carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

function renderPagination(totalItems) {
  const container = document.getElementById("pagination-container");
  if (!container) return;

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  if (totalPages <= 1) {
    container.innerHTML = "";
    return;
  }

  let html = `<ul class="pagination pagination-sm justify-content-center m-0">`;
  for (let i = 1; i <= totalPages; i++) {
    html += `
      <li class="page-item ${i === currentPage ? 'active' : ''}">
        <button class="page-link border-0 ${i === currentPage ? 'bg-brand text-white' : 'text-dark'}" onclick="goToPage(${i})">${i}</button>
      </li>
    `;
  }
  html += `</ul>`;
  container.innerHTML = html;
}

function goToPage(page) {
  currentPage = page;
  applyFilters();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}