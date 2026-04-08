const products = [
  {
    id: "wrape-corset",
    name: "Wrape Corset",
    category: "cuero",
    tag: "Corset",
    image: "./Catalogo/57112AE3-F847-4ED9-A379-219AC70863DF.jpg",
    description:
      "Corset de cuero con amarre envolvente y silueta limpia para estilismo de autor.",
    notes: ["Cuero", "Pieza statement", "Hecho por encargo"],
    requestLine: "Wrape Corset"
  },
  {
    id: "sobre-artesanal",
    name: "Sobre Artesanal",
    category: "accesorios",
    tag: "Marroquineria",
    image: "./Catalogo/64AD5E07-FEC6-444C-AFD2-B2A5C649C723.jpg",
    description:
      "Sobre de cuero trabajado a mano, ideal para cotizar como pieza utilitaria o regalo especial.",
    notes: ["Cuero", "Sobrio", "Edicion limitada"],
    requestLine: "Sobre Artesanal"
  },
  {
    id: "bolso-cuba",
    name: "Bolso Cuba",
    category: "bolsos",
    tag: "Fibra natural",
    image: "./Catalogo/IMG_8609.jpg",
    description:
      "Bolso cilindrico de fibra natural con asas de cuero y forro interior, ligero y muy versatil.",
    notes: ["Fibra natural", "Cuero", "Resort"],
    requestLine: "Bolso Cuba"
  },
  {
    id: "corset-wrap",
    name: "Corset Wrap",
    category: "cuero",
    tag: "Cuero",
    image: "./Catalogo/IMG_2634.jpg",
    description:
      "Corset minimalista de cuero con lazo envolvente, pensado para vestir y estructurar la silueta.",
    notes: ["Cuero", "Ajustable", "Hecho por encargo"],
    requestLine: "Corset Wrap"
  },
  {
    id: "bolso-nudo-natural",
    name: "Bolso Nudo Natural",
    category: "bolsos",
    tag: "Boho",
    image: "./Catalogo/IMG_8622.jpg",
    description:
      "Bolso blando con lazo textil superior y correa de cuero, ideal para una presencia artesanal delicada.",
    notes: ["Textil", "Cuero", "Pieza especial"],
    requestLine: "Bolso Nudo Natural"
  },
  {
    id: "bolso-trama",
    name: "Bolso Trama",
    category: "bolsos",
    tag: "Artesanal",
    image: "./Catalogo/IMG_8645.jpg",
    description:
      "Bolso tejido de fibra natural con herrajes y correa de cuero, pensado para un estilo relajado y premium.",
    notes: ["Fibra natural", "Cuero", "Verano"],
    requestLine: "Bolso Trama"
  },
  {
    id: "bolso-lazo",
    name: "Bolso Lazo",
    category: "bolsos",
    tag: "Best seller",
    image: "./Catalogo/IMG_8649.jpg",
    description:
      "Mini bolso artesanal con gran lazo textil y asa de cuero, una silueta delicada y memorable.",
    notes: ["Fibra natural", "Textil", "Versatil"],
    requestLine: "Bolso Lazo"
  },
  {
    id: "bolso-cala",
    name: "Bolso Cala",
    category: "bolsos",
    tag: "Destacado",
    image: "./Catalogo/IMG_8681.jpg",
    description:
      "Bolso tejido con tapa frontal en cuero y formato compacto, funcional para playa o ciudad.",
    notes: ["Fibra natural", "Cuero", "Pieza de autor"],
    requestLine: "Bolso Cala"
  },
  {
    id: "bolso-atelier",
    name: "Bolso Atelier",
    category: "bolsos",
    tag: "Nuevo",
    image: "./Catalogo/IMG_8693.jpg",
    description:
      "Bolso de cuero suave con base tejida y lazo frontal, una pieza utilitaria con acabado artesanal.",
    notes: ["Cuero", "Fibra natural", "Edicion corta"],
    requestLine: "Bolso Atelier"
  },
  {
    id: "bolso-cartera-tejida",
    name: "Bolso Cartera Tejida",
    category: "bolsos",
    tag: "Escultorico",
    image: "./Catalogo/IMG_8711.jpg",
    description:
      "Cartera de cuero tramado con formato rectangular y presencia contemporanea para uso diario.",
    notes: ["Cuero", "Hecho a mano", "Contemporaneo"],
    requestLine: "Bolso Cartera Tejida"
  },
  {
    id: "bolso-cartera",
    name: "Bolso Cartera",
    category: "bolsos",
    tag: "Cuero",
    image: "./Catalogo/IMG_8713.jpg",
    description:
      "Bolso de cuero trenzado de formato compacto, elegante para uso diario o salida especial.",
    notes: ["Cuero", "Compacto", "Artesanal"],
    requestLine: "Bolso Cartera"
  },
  {
    id: "arnes-negro",
    name: "Arnes Negro",
    category: "cuero",
    tag: "Arnes",
    image: "./Catalogo/IMG_4030.jpg",
    description:
      "Arnes de cuero negro con multiples correas y hebillas, ideal para estilismo editorial o pieza de autor por encargo.",
    notes: ["Cuero negro", "Editorial", "Hecho por encargo"],
    requestLine: "Arnes Negro"
  }
];

const state = {
  filter: "all",
  query: "",
  cart: loadCart()
};

const productGrid = document.querySelector("[data-product-grid]");
const filterButtons = [...document.querySelectorAll("[data-filter]")];
const searchInput = document.querySelector("[data-search]");
const cartDrawer = document.querySelector("[data-cart-drawer]");
const cartItemsContainer = document.querySelector("[data-cart-items]");
const cartItemTemplate = document.querySelector("#cart-item-template");
const cartCount = document.querySelector("[data-cart-count]");
const cartTotalItems = document.querySelector("[data-cart-total-items]");
const copyOrderButton = document.querySelector("[data-copy-order]");
const sendOrderInstagramButton = document.querySelector("[data-send-order]");
const sendOrderWhatsappButton = document.querySelector("[data-send-order-whatsapp]");
const instagramBaseUrl = "https://ig.me/m/gigiimod";
const whatsappBaseUrl = "https://wa.me/18496285813";

initializeCatalog();

function initializeCatalog() {
  if (
    !productGrid ||
    !cartItemsContainer ||
    !cartItemTemplate ||
    !copyOrderButton ||
    !sendOrderInstagramButton ||
    !sendOrderWhatsappButton
  ) {
    return;
  }

  hydrateProductCards();
  renderCart();
  setupFilters();
  setupCart();
  setupReveal();
}

function setupFilters() {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.filter = button.dataset.filter;
      filterButtons.forEach((item) => item.classList.toggle("is-active", item === button));
      applyFilters();
    });
  });

  searchInput.addEventListener("input", (event) => {
    state.query = event.target.value;
    applyFilters();
  });
}

function setupCart() {
  hydrateStaticButtons();

  document.querySelectorAll("[data-open-cart]").forEach((trigger) => {
    trigger.addEventListener("click", openCart);
  });

  document.querySelectorAll("[data-close-cart]").forEach((trigger) => {
    trigger.addEventListener("click", closeCart);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeCart();
    }
  });

  copyOrderButton.addEventListener("click", async () => {
    const message = buildOrderMessage();

    try {
      await copyText(message);
      copyOrderButton.textContent = "Mensaje copiado";
      window.setTimeout(() => {
        copyOrderButton.textContent = "Copiar mensaje";
      }, 1800);
    } catch (error) {
      window.alert(message);
    }
  });

  sendOrderInstagramButton.addEventListener("click", async () => {
    const message = buildOrderMessage();
    sendOrderInstagramButton.href = `${instagramBaseUrl}?text=${encodeURIComponent(message)}`;

    try {
      await copyText(message);
    } catch (error) {
      // If clipboard is blocked we still allow navigation to Instagram.
    }
  });

  sendOrderWhatsappButton.addEventListener("click", async () => {
    const message = buildOrderMessage();
    sendOrderWhatsappButton.href = `${whatsappBaseUrl}?text=${encodeURIComponent(message)}`;

    try {
      await copyText(message);
    } catch (error) {
      // If clipboard is blocked we still allow navigation to WhatsApp.
    }
  });
}

function renderCart() {
  cartItemsContainer.innerHTML = "";

  if (!state.cart.length) {
    const emptyState = document.createElement("div");
    emptyState.className = "empty-state";
    emptyState.textContent =
      "Tu pedido esta vacio. Anade piezas del catalogo y aqui se preparara el mensaje para la marca.";
    cartItemsContainer.append(emptyState);
  } else {
    state.cart.forEach((productId, itemIndex) => {
      const product = products.find((item) => item.id === productId);

      if (!product) {
        return;
      }

      const node = cartItemTemplate.content.firstElementChild.cloneNode(true);
      const image = node.querySelector("img");
      image.src = product.image;
      image.alt = product.name;
      node.querySelector("h3").textContent = product.name;
      node.querySelector("p").textContent = `${labelForCategory(product.category)} - ${product.notes[0]}`;
      node.querySelector("button").addEventListener("click", () => removeFromCart(itemIndex));
      cartItemsContainer.append(node);
    });
  }

  const count = state.cart.length;
  cartCount.textContent = count;
  cartTotalItems.textContent = `${count} ${count === 1 ? "pieza" : "piezas"}`;
  const encodedMessage = encodeURIComponent(buildOrderMessage());
  sendOrderInstagramButton.href = `${instagramBaseUrl}?text=${encodedMessage}`;
  sendOrderWhatsappButton.href = `${whatsappBaseUrl}?text=${encodedMessage}`;
  persistCart();
}

function addToCart(productId) {
  state.cart.push(productId);
  renderCart();

  openCart();
}

function removeFromCart(itemIndex) {
  state.cart.splice(itemIndex, 1);
  renderCart();
}

function openCart() {
  cartDrawer.classList.add("is-open");
  cartDrawer.setAttribute("aria-hidden", "false");
}

function closeCart() {
  cartDrawer.classList.remove("is-open");
  cartDrawer.setAttribute("aria-hidden", "true");
}

function buildOrderMessage() {
  if (!state.cart.length) {
    return "Hola GIGIIMOD, quiero informacion sobre sus piezas destacadas.";
  }

  const items = state.cart
    .map((productId, index) => {
      const product = products.find((item) => item.id === productId);
      return `${index + 1}. ${product && product.requestLine ? product.requestLine : productId}`;
    })
    .join("\n");

  return `Hola GIGIIMOD, me interesa cotizar estas piezas:\n${items}\n\nPodrian confirmarme disponibilidad, precio y tiempos de entrega?`;
}

function loadCart() {
  try {
    const saved = window.localStorage.getItem("gigiimod-cart");
    return saved ? JSON.parse(saved).filter((item) => typeof item === "string") : [];
  } catch (error) {
    return [];
  }
}

function persistCart() {
  try {
    window.localStorage.setItem("gigiimod-cart", JSON.stringify(state.cart));
  } catch (error) {
    // Ignore storage failures in private contexts.
  }
}

function labelForCategory(category) {
  const labels = {
    bolsos: "Bolsos",
    cuero: "Cuero",
    accesorios: "Accesorios"
  };

  return labels[category] ?? category;
}

function setupReveal() {
  activateReveal(document.querySelectorAll("main section"));
}

function hydrateProductCards() {
  products.forEach((product) => {
    const card = productGrid.querySelector(`[data-product-id="${product.id}"]`)?.closest(".product-card");

    if (!card) {
      return;
    }

    card.dataset.category = product.category;
    card.dataset.search = [product.name, product.description, product.category, ...product.notes]
      .join(" ")
      .toLowerCase();
  });

  applyFilters();
}

function applyFilters() {
  const cards = [...productGrid.querySelectorAll(".product-card")];
  const query = state.query.trim().toLowerCase();
  let visibleCount = 0;

  cards.forEach((card) => {
    const matchesFilter =
      state.filter === "all" || card.dataset.category === state.filter;
    const matchesQuery = !query || (card.dataset.search || "").includes(query);
    const shouldShow = matchesFilter && matchesQuery;

    card.hidden = !shouldShow;
    if (shouldShow) {
      visibleCount += 1;
    }
  });

  let emptyState = productGrid.querySelector(".empty-state");

  if (!visibleCount) {
    if (!emptyState) {
      emptyState = document.createElement("article");
      emptyState.className = "empty-state";
      emptyState.textContent =
        "No encontramos piezas con ese criterio. Prueba otra categoria o un termino mas general.";
      productGrid.append(emptyState);
    }
  } else if (emptyState) {
    emptyState.remove();
  }
}

function hydrateStaticButtons() {
  document.querySelectorAll("[data-product-id]").forEach((button) => {
    button.addEventListener("click", () => addToCart(button.dataset.productId));
  });
}

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const helper = document.createElement("textarea");
  helper.value = text;
  helper.setAttribute("readonly", "");
  helper.style.position = "absolute";
  helper.style.left = "-9999px";
  document.body.append(helper);
  helper.select();
  document.execCommand("copy");
  helper.remove();
}

function activateReveal(elements) {
  const observer = getRevealObserver();
  elements.forEach((element) => observer.observe(element));
}

let revealObserver;

function getRevealObserver() {
  if (revealObserver) {
    return revealObserver;
  }

  if (!("IntersectionObserver" in window)) {
    return {
      observe(element) {
        element.classList.add("is-visible");
      },
      unobserve() {}
    };
  }

  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  return revealObserver;
}
