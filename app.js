// app.js — versión simple y didáctica

// Estado (la lista de amigos)
const amigos = [];

// Referencias al DOM
const input = document.getElementById("amigo");
const lista = document.getElementById("listaAmigos");
const resultado = document.getElementById("resultado");

// Pinta la lista de nombres debajo del input
function actualizarLista() {
  lista.innerHTML = "";
  for (const nombre of amigos) {
    const li = document.createElement("li");
    li.textContent = "• " + nombre;
    lista.appendChild(li);
  }
}

// Limpia el resultado del sorteo
function limpiarResultado() {
  resultado.innerHTML = "";
}

// Agrega un nombre validando que no venga vacío
function agregarAmigo() {
  const nombre = input.value.trim();

  if (nombre === "") {
    alert("Por favor, ingresa un nombre válido.");
    input.focus();
    return;
  }

  amigos.push(nombre);
  input.value = "";
  limpiarResultado();
  actualizarLista();
  input.focus();
}

// Sortea un nombre al azar y lo muestra en pantalla
function sortearAmigo() {
  if (amigos.length === 0) {
    alert("Primero agrega al menos un nombre.");
    input.focus();
    return;
  }

  const indice = Math.floor(Math.random() * amigos.length);
  const elegido = amigos[indice];

  resultado.innerHTML = "";
  const li = document.createElement("li");
  li.textContent = "🎉 Tu amigo secreto es: " + elegido;
  resultado.appendChild(li);
}

// Atajo: Enter en el input agrega directo
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") agregarAmigo();
});
