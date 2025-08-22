// Estado
const amigos = [];

// Referencias al DOM
const input = document.getElementById("amigo");
const lista = document.getElementById("listaAmigos");
const resultado = document.getElementById("resultado");
const btnSortear = document.querySelector(".button-draw");

// Utilidades
const normaliza = (s) => s.trim().toLowerCase();

function actualizarUI() {
  // Render de la lista
  lista.innerHTML = "";
  amigos.forEach((nombre, idx) => {
    const li = document.createElement("li");
    li.textContent = nombre;

    // Botón eliminar
    const del = document.createElement("button");
    del.textContent = "✕";
    del.setAttribute("aria-label", `Eliminar ${nombre}`);
    del.style.marginLeft = "8px";
    del.style.padding = "4px 10px";
    del.style.fontSize = "14px";
    del.onclick = () => eliminarAmigo(idx);

    li.appendChild(del);
    lista.appendChild(li);
  });

  // Controlar botón sortear
  btnSortear.disabled = amigos.length < 2;
  btnSortear.setAttribute(
    "aria-disabled",
    btnSortear.disabled ? "true" : "false"
  );
}

function mostrarMensaje(mensaje) {
  resultado.innerHTML = "";
  const li = document.createElement("li");
  li.textContent = mensaje;
  resultado.appendChild(li);
}

function limpiarResultado() {
  resultado.innerHTML = "";
}

function limpiarInput() {
  input.value = "";
  input.focus();
}

// API pública (llamada desde HTML)
function agregarAmigo() {
  limpiarResultado();
  const nombre = input.value;

  // Validaciones
  if (!nombre || !nombre.trim()) {
    mostrarMensaje("⚠️ Ingresa un nombre válido.");
    return;
  }
  const existe = amigos.some((n) => normaliza(n) === normaliza(nombre));
  if (existe) {
    mostrarMensaje("⚠️ Ese nombre ya está en la lista.");
    return;
  }

  amigos.push(nombre.trim());
  limpiarInput();
  actualizarUI();
}

function eliminarAmigo(idx) {
  amigos.splice(idx, 1);
  actualizarUI();
}

function sortearAmigo() {
  limpiarResultado();
  if (amigos.length < 2) {
    mostrarMensaje("⚠️ Agrega al menos 2 amigos para sortear.");
    return;
  }
  const indice = Math.floor(Math.random() * amigos.length);
  const ganador = amigos[indice];
  mostrarMensaje(`🎉 El amigo secreto es: ${ganador}`);
}

// Eventos
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") agregarAmigo();
});

// Inicial
actualizarUI();

// Exponer funciones globales para que funcionen los onclick del HTML
window.agregarAmigo = agregarAmigo;
window.sortearAmigo = sortearAmigo;
