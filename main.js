/* ======================
   CARRINHO
====================== */

let cart = [];

function toggleCart() {
  document.getElementById("cart").classList.toggle("active");
}

function addItem(name, price) {
  const item = cart.find(i => i.name === name);
  if (item) {
    item.qty++;
  } else {
    cart.push({ name, price, qty: 1, obs: "" });
  }
  updateCart();
}

function changeQty(index, value) {
  cart[index].qty += value;
  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }
  updateCart();
}

function updateCart() {
  const items = document.getElementById("cart-items");
  const totalEl = document.getElementById("total");
  const countEl = document.getElementById("cart-count");

  items.innerHTML = "";
  let total = 0;
  let count = 0;

  cart.forEach((item, i) => {
    total += item.price * item.qty;
    count += item.qty;

    items.innerHTML += `
      <div class="cart-item">
        <strong>${item.name}</strong>

        <div class="qty">
          <span onclick="changeQty(${i}, -1)">−</span>
          ${item.qty}
          <span onclick="changeQty(${i}, 1)">+</span>
        </div>

        <small>R$ ${(item.price * item.qty).toFixed(2)}</small>

        <textarea
          placeholder="Observação"
          onchange="cart[${i}].obs = this.value"
        ></textarea>
      </div>
    `;
  });

  totalEl.innerText = total.toFixed(2);
  countEl.innerText = count;
}

function finalizarPedido() {
  if (!cart.length) {
    alert("Seu carrinho está vazio.");
    return;
  }

  if (!pagamento.value) {
    alert("Selecione a forma de pagamento.");
    return;
  }

  let msg = "*🍔 PEDIDO — BURGER HOUSE*%0A%0A";

  cart.forEach(item => {
    msg += `• ${item.qty}x ${item.name} — R$ ${(item.qty * item.price).toFixed(2)}%0A`;
    if (item.obs) msg += `  Obs: ${item.obs}%0A`;
  });

  msg += `%0A💰 *Total:* R$ ${total.innerText}%0A`;
  msg += `💳 *Pagamento:* ${pagamento.value}%0A%0A`;

  msg += `📍 *Entrega*%0A`;
  msg += `${nome.value}%0A`;
  msg += `${rua.value}, ${numero.value}%0A`;
  msg += `${bairro.value}%0A`;
  if (complemento.value) msg += `Comp: ${complemento.value}%0A`;

  if (document.getElementById("obs-geral").value) {
    msg += `%0A📝 Obs gerais:%0A${document.getElementById("obs-geral").value}`;
  }

  window.open(
    `https://wa.me/5500000000000?text=${msg}`,
    "_blank"
  );
}

/* ======================
   MENU DINÂMICO
====================== */

const menu = [
  {
    categoria: "Lanches",
    itens: Array.from({ length: 20 }, (_, i) => ({
      nome: `Burger ${i + 1}`,
      preco: 28 + i,
      img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd"
    }))
  },
  {
    categoria: "Petiscos",
    itens: [
      { nome: "Batata Frita", preco: 18, img: "https://images.unsplash.com/photo-1606755962773-0c5a0e5b5c94" },
      { nome: "Onion Rings", preco: 20, img: "https://images.unsplash.com/photo-1599021456807-5bfa7b63f44b" },
      { nome: "Nachos", preco: 22, img: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90" }
    ]
  },
  {
    categoria: "Bebidas",
    itens: Array.from({ length: 8 }, (_, i) => ({
      nome: `Bebida ${i + 1}`,
      preco: 6,
      img: "https://images.unsplash.com/photo-1594007654729-407eedc4be65"
    }))
  },
  {
    categoria: "Milkshakes",
    itens: ["Chocolate", "Morango", "Baunilha"].map(sabor => ({
      nome: `Milkshake ${sabor}`,
      preco: 14,
      img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699"
    }))
  }
];

menu.forEach(sec => {
  const grid = document.querySelector(`[data-menu="${sec.categoria}"]`);
  if (!grid) return;

  sec.itens.forEach(item => {
    grid.innerHTML += `
      <div class="menu-item">
        <img src="${item.img}" alt="${item.nome}">
        <h4>${item.nome}</h4>
        <span>R$ ${item.preco.toFixed(2)}</span>
        <button onclick="addItem('${item.nome}', ${item.preco})">
          Adicionar
        </button>
      </div>
    `;
  });
});

/* ======================
   SCROLL NAVBAR
====================== */

document.querySelectorAll('.nav-links li').forEach(item => {
  item.addEventListener('click', () => {
    const target = item.getAttribute('data-target');

    if (target === 'contato') {
      window.open('https://wa.me/5599999999999', '_blank');
      return;
    }

    const section = document.getElementById(target);
    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});
// ANIMAÇÃO POR SESSÃO (Lanches, Bebidas, etc)
const sections = document.querySelectorAll('.menu');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // anima só uma vez (padrão gourmet)
    }
  });
}, {
  threshold: 0.25, // só anima quando a seção realmente entra
  rootMargin: "-80px 0px" // compensa navbar fixa
});

sections.forEach(section => observer.observe(section));

