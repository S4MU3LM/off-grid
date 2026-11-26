/* =========================================================
   OFF-GRID STREETWEAR - SCRIPT.JS
   Configuración centralizada de productos, packs y WhatsApp
   ========================================================= */

const STORE_CONFIG = {
  brandName: "OFF-GRID",
  whatsappNumber: "51931940079", // +51 931 940 079 sin signos
  availableSizes: ["M", "L"],    // Agrega "S" o "XL" aquí cuando amplíes tallas
  defaultColors: ["Negro", "Blanco"]
};

/**
 * PACKS PROMOCIONALES
 * Edita precios, etiquetas o condiciones aquí sin tocar el HTML.
 */
const PROMO_PACKS = [
  {
    id: "pack-trio-100",
    badge: "MÁS PEDIDO",
    title: "PACK TRÍO",
    price: "S/ 100.00",
    description: "3 polos Off-Grid (cualquier diseño estándar/pecho o A4/A3).",
    note: "Envío pago en destino (Shalom/Olva). *Recargo aplicable si incluye Full Print XL.",
    featured: true
  },
  {
    id: "pack-cuarteto",
    badge: "AHORRO MÁXIMO",
    title: "PACK CUARTETO",
    price: "S/ 129.90",
    description: "4 polos Off-Grid combinables en tallas M o L.",
    note: "Envío pago en destino (Shalom/Olva). *Recargo aplicable si incluye Full Print XL.",
    featured: false
  },
  {
    id: "pack-duo-envio",
    badge: "ENVÍO GRATIS",
    title: "2 × S/ 100.00",
    price: "S/ 100.00",
    description: "2 polos edición seleccionada + Envío Gratis a agencia Shalom.",
    note: "Válido para diseños participantes en cortes disponibles.",
    featured: false
  },
  {
    id: "pack-trio-xl",
    badge: "EDICIÓN FULL PRINT",
    title: "3 × S/ 135.00",
    price: "S/ 135.00",
    description: "3 polos incluyendo estampados grandes DTF A3 / Full Print XL.",
    note: "Ideal para diseños de alto impacto visual. Envío vía Shalom u Olva.",
    featured: false
  }
];

/**
 * CATÁLOGO DE PRODUCTOS
 * Para agregar o editar un polo, solo duplica un objeto en este array.
 * image: "32.png"
 */
const PRODUCTS = [
  {
    id: "og-001",
    name: "MARTIN GARRIX • ONE TWO THREE",
    category: "Música / Electrónica",
    price: 42.90,
    oldPrice: 55.00,
    dtfType: "DTF Full Print XL",
    colors: ["Blanco", "Negro"],
    sizes: ["M", "L"],
    emoji: "🎧",
    image: "MartinC..jpeg" 
  },
  {
    id: "og-002",
    name: "AMERICAS TOUR 2026",
    category: "Música / Electrónica",
    price: 47.90,
    oldPrice: 55.00,
    dtfType: "DTF Full Print XL",
    colors: ["Negro"],
    sizes: ["M", "L"],
    emoji: "🌎",
    image: "TU_IMAGEN.png"
  },
  {
    id: "og-003",
    name: "CYBER RONIN ARCHIVE",
    category: "Anime / Pop",
    price: 49.90,
    oldPrice: 59.90,
    dtfType: "DTF Full Print XL",
    colors: ["Negro"],
    sizes: ["M", "L"],
    emoji: "⚔️",
    image: "" // TODO: reemplazar con ruta de imagen en /assets/polo-ronin.webp
  },
  {
    id: "og-004",
    name: "OFF-GRID CORE LOGO",
    category: "Streetwear",
    price: 35.90,
    oldPrice: 45.00,
    dtfType: "DTF Minimal Pecho",
    colors: ["Negro", "Blanco"],
    sizes: ["M", "L"],
    emoji: "★",
    image: "" // TODO: reemplazar con ruta de imagen en /assets/polo-core.webp
  },
  {
    id: "og-005",
    name: "ACID RAVE SYSTEM",
    category: "Música / Electrónica",
    price: 47.90,
    oldPrice: 55.00,
    dtfType: "DTF Estándar A3",
    colors: ["Negro", "Blanco"],
    sizes: ["M", "L"],
    emoji: "👽",
    image: "" // TODO: reemplazar con ruta de imagen en /assets/polo-acid.webp
  },
  {
    id: "og-006",
    name: "FINAL BOSS GLITCH",
    category: "Anime / Pop",
    price: 44.90,
    oldPrice: 55.00,
    dtfType: "DTF Estándar A4/A3",
    colors: ["Negro", "Blanco"],
    sizes: ["M", "L"],
    emoji: "👾",
    image: "" // TODO: reemplazar con ruta de imagen en /assets/polo-glitch.webp
  }
];

/* =========================================================
   UTILIDADES Y REGLAS DE NEGOCIO
   ========================================================= */

/**
 * Regla obligatoria:
 * En color Blanco, Boxy Fit está AGOTADO -> solo Oversize.
 * En otros colores (ej. Negro), ambos cortes están disponibles.
 */
function getAvailableCutsForColor(color) {
  if (color.toLowerCase() === "blanco") {
    return ["Oversize"];
  }
  return ["Boxy Fit", "Oversize"];
}

function formatPrice(value) {
  return `S/ ${Number(value).toFixed(2)}`;
}

function openWhatsApp(message) {
  const encoded = encodeURIComponent(message);
  const url = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encoded}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

/* =========================================================
   RENDERIZADO DE PACKS Y CATÁLOGO
   ========================================================= */

function renderPacks() {
  const container = document.getElementById("packsContainer");
  if (!container) return;

  container.innerHTML = PROMO_PACKS.map((pack) => `
    <article class="pack-card ${pack.featured ? "featured" : ""}">
      <div>
        <span class="pill ${pack.featured ? "pill-yellow" : "pill-cobalt"} pack-badge">${pack.badge}</span>
        <h3 class="pack-title">${pack.title}</h3>
        <div class="pack-price">${pack.price}</div>
        <p class="pack-desc">${pack.description}</p>
      </div>
      <div>
        <p class="pack-note">${pack.note}</p>
        <button 
          type="button" 
          class="btn ${pack.featured ? "btn-yellow" : "btn-dark"} full-width"
          onclick="requestPackWhatsApp('${pack.id}')"
        >
          📲 Pedir ${pack.title}
        </button>
      </div>
    </article>
  `).join("");
}

window.requestPackWhatsApp = function(packId) {
  const pack = PROMO_PACKS.find((p) => p.id === packId);
  if (!pack) return;

  const msg = [
    `Hola *OFF-GRID* 👋, quiero armar el *${pack.title} (${pack.price})*.`,
    `• Detalle: ${pack.description}`,
    `• ¿Me envían el *Catálogo PDF* para elegir los diseños y tallas (M/L)?`,
    `• Coordinamos adelanto por Yape/Plin y envío.`
  ].join("\n");

  openWhatsApp(msg);
};

/* Filtros activos */
let activeCategory = "Todos";
let activeCut = "all";
let searchQuery = "";

function renderCategoryButtons() {
  const container = document.getElementById("categoryFilters");
  if (!container) return;

  const categories = ["Todos", ...new Set(PRODUCTS.map((p) => p.category))];
  container.innerHTML = categories.map((cat) => `
    <button 
      type="button" 
      class="filter-btn ${cat === activeCategory ? "active" : ""}" 
      data-category="${cat}"
    >
      ${cat}
    </button>
  `).join("");

  container.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      activeCategory = btn.dataset.category;
      renderCategoryButtons();
      renderProducts();
    });
  });
}

function renderProducts() {
  const container = document.getElementById("productsContainer");
  if (!container) return;

  const filtered = PRODUCTS.filter((item) => {
    const matchesCat = activeCategory === "Todos" || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());

    // Verificar si el producto tiene al menos un color que permita el corte filtrado
    const allItemCuts = new Set();
    item.colors.forEach((c) => getAvailableCutsForColor(c).forEach((cut) => allItemCuts.add(cut)));
    const matchesCut = activeCut === "all" || allItemCuts.has(activeCut);

    return matchesCat && matchesSearch && matchesCut;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 2.5rem; border: 1px dashed #3f3f46; border-radius: 12px;">
        <p style="font-size: 1.1rem; margin-bottom: 0.75rem;">No encontramos polos con ese filtro, pero hacemos <strong>diseños personalizados</strong>.</p>
        <button type="button" class="btn btn-yellow" onclick="requestCustomDesign()">📲 Cotizar Diseño Personalizado</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map((item) => {
    const hasWhite = item.colors.some((c) => c.toLowerCase() === "blanco");
    const mediaHtml = item.image
      ? `<img src="${item.image}" alt="Polo ${item.name} Off-Grid" loading="lazy" />`
      : `<div class="mockup-placeholder">
           <span class="mockup-icon">${item.emoji}</span>
           <p>${item.name}<br /><small>ALGODÓN 20/1</small></p>
         </div>`;

    return `
      <article class="product-card">
        <div class="product-media">
          <span class="product-cat-badge">${item.category}</span>
          ${mediaHtml}
          <span class="product-dtf-badge">${item.dtfType}</span>
        </div>
        <div class="product-body">
          <h3 class="product-title">${item.name}</h3>
          <div class="product-meta-tags">
            <span class="mini-tag">Tallas: ${item.sizes.join(" / ")}</span>
            <span class="mini-tag">Negro: Boxy & Oversize</span>
            ${hasWhite ? `<span class="mini-tag">Blanco: Solo Oversize</span>` : ""}
            ${hasWhite ? `<span class="mini-tag sold-out">Blanco Boxy Agotado</span>` : ""}
          </div>
          <div class="product-footer">
            <div>
              <span class="old-price">${formatPrice(item.oldPrice)}</span>
              <span class="current-price">${formatPrice(item.price)}</span>
            </div>
            <button type="button" class="btn btn-yellow btn-sm" onclick="openOrderModal('${item.id}')">
              Elegir
            </button>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

window.requestCustomDesign = function() {
  const msg = [
    `Hola *OFF-GRID* 👋, quiero consultar por un *polo con diseño personalizado* (algodón 20/1 + estampado DTF).`,
    `• Me gustaría ver el *Catálogo PDF* y coordinar la idea.`
  ].join("\n");
  openWhatsApp(msg);
};

/* =========================================================
   MODAL DE PEDIDO RÁPIDO CON REGLA BLANCO = SOLO OVERSIZE
   ========================================================= */

let selectedProduct = null;
let selectedColor = "Negro";
let selectedCut = "Boxy Fit";
let selectedSize = "M";

window.openOrderModal = function(productId) {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return;

  selectedProduct = product;
  selectedColor = product.colors[0] || "Negro";
  const validCuts = getAvailableCutsForColor(selectedColor);
  selectedCut = validCuts[0];
  selectedSize = product.sizes[0] || "M";

  document.getElementById("modalCategory").textContent = product.category;
  document.getElementById("modalTitle").textContent = product.name;
  document.getElementById("modalOldPrice").textContent = formatPrice(product.oldPrice);
  document.getElementById("modalPrice").textContent = formatPrice(product.price);
  document.getElementById("modalDtf").textContent = product.dtfType;

  // Llenar selector de packs en el modal
  const promoSelect = document.getElementById("modalPromoSelect");
  promoSelect.innerHTML = `
    <option value="Precio unitario (${formatPrice(product.price)})">Solo esta prenda — ${formatPrice(product.price)}</option>
    ${PROMO_PACKS.map((p) => `<option value="${p.title} (${p.price})">Incluir en ${p.title} — ${p.price}</option>`).join("")}
  `;

  renderModalOptions();

  const modal = document.getElementById("orderModal");
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
};

function closeOrderModal() {
  const modal = document.getElementById("orderModal");
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

function renderModalOptions() {
  if (!selectedProduct) return;

  // 1. Colores
  const colorsBox = document.getElementById("modalColors");
  colorsBox.innerHTML = selectedProduct.colors.map((color) => `
    <button 
      type="button" 
      class="opt-btn ${color === selectedColor ? "selected" : ""}" 
      data-color="${color}"
    >
      ${color}
    </button>
  `).join("");

  colorsBox.querySelectorAll(".opt-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      selectedColor = btn.dataset.color;
      const allowedCuts = getAvailableCutsForColor(selectedColor);
      if (!allowedCuts.includes(selectedCut)) {
        selectedCut = allowedCuts[0];
      }
      renderModalOptions();
    });
  });

  // 2. Cortes (aplicando regla de blanco agotado en Boxy Fit)
  const cutsBox = document.getElementById("modalCuts");
  const allCuts = ["Boxy Fit", "Oversize"];
  const allowedCuts = getAvailableCutsForColor(selectedColor);
  const hintEl = document.getElementById("cutRuleHint");

  cutsBox.innerHTML = allCuts.map((cut) => {
    const isAllowed = allowedCuts.includes(cut);
    return `
      <button 
        type="button" 
        class="opt-btn ${cut === selectedCut && isAllowed ? "selected" : ""}" 
        data-cut="${cut}"
        ${!isAllowed ? "disabled" : ""}
      >
        ${cut} ${!isAllowed ? "(Agotado en Blanco)" : ""}
      </button>
    `;
  }).join("");

  hintEl.textContent = selectedColor.toLowerCase() === "blanco"
    ? "⚠️ En color Blanco solo está disponible el corte Oversize (Boxy Fit agotado)."
    : "✓ Disponible en corte Boxy Fit y Oversize (Algodón 20/1).";

  cutsBox.querySelectorAll(".opt-btn:not([disabled])").forEach((btn) => {
    btn.addEventListener("click", () => {
      selectedCut = btn.dataset.cut;
      renderModalOptions();
    });
  });

  // 3. Tallas
  const sizesBox = document.getElementById("modalSizes");
  sizesBox.innerHTML = selectedProduct.sizes.map((size) => `
    <button 
      type="button" 
      class="opt-btn ${size === selectedSize ? "selected" : ""}" 
      data-size="${size}"
    >
      Talla ${size}
    </button>
  `).join("");

  sizesBox.querySelectorAll(".opt-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      selectedSize = btn.dataset.size;
      renderModalOptions();
    });
  });
}

/* =========================================================
   INICIALIZACIÓN DE EVENTOS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  renderPacks();
  renderCategoryButtons();
  renderProducts();

  // Filtro por corte
  document.getElementById("cutFilter")?.addEventListener("change", (e) => {
    activeCut = e.target.value;
    renderProducts();
  });

  // Buscador
  document.getElementById("searchInput")?.addEventListener("input", (e) => {
    searchQuery = e.target.value;
    renderProducts();
  });

  // Botones directos para pedir Catálogo PDF
  const pdfMessage = [
    "Hola *OFF-GRID* 👋, vengo de su web.",
    "Me gustaría recibir el *Catálogo PDF* actualizado y consultar disponibilidad de polos (Boxy Fit / Oversize)."
  ].join("\n");

  ["btnPdfHeader", "btnWhatsappHero", "btnWhatsappFooter", "whatsappFloatBtn"].forEach((id) => {
    document.getElementById(id)?.addEventListener("click", () => openWhatsApp(pdfMessage));
  });

  // Cerrar modal
  document.getElementById("closeModalBtn")?.addEventListener("click", closeOrderModal);
  document.getElementById("orderModal")?.addEventListener("click", (e) => {
    if (e.target.id === "orderModal") closeOrderModal();
  });

  // Envío del formulario del modal hacia WhatsApp
  document.getElementById("quickOrderForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!selectedProduct) return;

    const promoChoice = document.getElementById("modalPromoSelect").value;
    const courierChoice = document.getElementById("modalCourier").value;

    const message = [
      `Hola *OFF-GRID* 👋, quiero hacer un pedido desde la web:`,
      `• *Diseño:* ${selectedProduct.name} (${selectedProduct.dtfType})`,
      `• *Color:* ${selectedColor}`,
      `• *Corte:* ${selectedCut} (Algodón 20/1)`,
      `• *Talla:* ${selectedSize}`,
      `• *Modalidad / Pack:* ${promoChoice}`,
      `• *Envío:* ${courierChoice}`,
      ``,
      `Quedo atento para confirmar disponibilidad, recibir el Catálogo PDF si deseo sumar más prendas y coordinar el adelanto por *Yape / Plin* (50% o 100%).`
    ].join("\n");

    openWhatsApp(message);
    closeOrderModal();
  });
});
