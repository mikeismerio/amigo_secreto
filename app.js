// app.js — Amigo Secreto
// Miguel-style: claro, corto y al grano.

const nombres = [];

const caja = document.getElementById("amigo");
const lista = document.getElementById("listaAmigos");
const resultado = document.getElementById("resultado");

// Quita acentos y homologa para evitar duplicados tipo "José" vs "jose"
function llave(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
}

function pintarLista() {
  lista.innerHTML = "";

  if (nombres.length === 0) {
    const li = document.createElement("li");
    li.textContent = "Aún no agregas nombres.";
    li.style.opacity = "0.7";
    lista.appendChild(li);
    return;
  }

  nombres.forEach((nombre, i) => {
    const li = document.createElement("li");
    li.textContent = `• ${nombre}`;
    li.title = "Clic para eliminar";
    li.style.cursor = "pointer";

    li.addEventListener("click", () => {
      nombres.splice(i, 1);
      resultado.innerHTML = "";
      pintarLista();
    });

    lista.appendChild(li);
  });
}

function agregarAmigo() {
  const valor = (caja.value || "").trim();
  if (!valor) {
    alert("Escribe un nombre válido.");
    caja.focus();
    return;
  }

  const k = llave(valor);
  if (nombres.some((n) => llave(n) === k)) {
    alert(`"${valor}" ya está en la lista.`);
    caja.select();
    return;
  }

  nombres.push(valor);
  caja.value = "";
  resultado.innerHTML = "";
  pintarLista();
  caja.focus();
}

function sortearAmigo() {
  if (nombres.length === 0) {
    alert("Primero agrega al menos un nombre.");
    caja.focus();
    return;
  }

  const i = Math.floor(Math.random() * nombres.length);
  const elegido = nombres[i];

  resultado.innerHTML = "";
  const li = document.createElement("li");
  li.textContent = `🎉 Tu amigo secreto es: ${elegido}`;
  resultado.appendChild(li);
}

// Soporte Enter para agregar
caja.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    agregarAmigo();
  }
});

// Exponer funciones porque se llaman desde el HTML
window.agregarAmigo = agregarAmigo;
window.sortearAmigo = sortearAmigo;

// Estado inicial
pintarLista();
