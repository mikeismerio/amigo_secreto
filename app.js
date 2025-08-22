// Estado
const amigos = [];

// Elementos
const $input = document.getElementById("amigo");
const $lista = document.getElementById("listaAmigos");
const $resultado = document.getElementById("resultado");

// Normaliza para comparar sin acentos ni mayúsculas
const llave = (s) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLowerCase();

// Dibuja la lista debajo del input
function pintarLista() {
  $lista.innerHTML = "";
  for (let i = 0; i < amigos.length; i++) {
    const li = document.createElement("li");
    li.textContent = "• " + amigos[i];
    li.title = "Clic para eliminar";
    li.style.cursor = "pointer";
    li.onclick = () => {
      amigos.splice(i, 1);         // elimina
      limpiarResultado();
      pintarLista();
    };
    $lista.appendChild(li);
  }
}

// Limpia el resultado del sorteo
function limpiarResultado() {
  $resultado.innerHTML = "";
}

// ---- Funciones que llama tu HTML ----
function agregarAmigo() {
  const nombre = $input.value.trim();

  if (!nombre) {
    alert("Por favor, ingresa un nombre válido.");
    $input.focus();
    return;
  }

  // Evita duplicados (ej. "José" y "jose" cuentan igual)
  const yaExiste = amigos.some((n) => llave(n) === llave(nombre));
  if (yaExiste) {
    alert(`"${nombre}" ya está en la lista.`);
    $input.select();
    return;
  }

  amigos.push(nombre);
  $input.value = "";
  limpiarResultado();
  pintarLista();
  $input.focus();
}

function sortearAmigo() {
  if (amigos.length === 0) {
    alert("Primero agrega al menos un nombre.");
    $input.focus();
    return;
  }
  const i = Math.floor(Math.random() * amigos.length);
  const elegido = amigos[i];

  $resultado.innerHTML = ""; // muestra el ganador
  const li = document.createElement("li");
  li.textContent = "🎉 Tu amigo secreto es: " + elegido;
  $resultado.appendChild(li);
}

// Atajo: Enter agrega directo
$input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") agregarAmigo();
});

// Pinta estado inicial (lista vacía)
pintarLista();

// Expone funciones al HTML (por los onclick del index)
window.agregarAmigo = agregarAmigo;
window.sortearAmigo = sortearAmigo;
