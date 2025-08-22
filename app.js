// Lista en memoria
const amigos = [];

// Referencias a elementos del DOM (una sola vez)
const input = document.getElementById("amigo");
const listaAmigos = document.getElementById("listaAmigos");
const resultado = document.getElementById("resultado");

/**
 * Renderiza la lista de amigos en el <ul id="listaAmigos">
 */
function renderLista() {
  // Limpiar contenido actual
  listaAmigos.innerHTML = "";

  // Crear cada <li> de forma segura (textContent evita HTML raro)
  amigos.forEach((nombre, i) => {
    const li = document.createElement("li");
    li.textContent = `${i + 1}. ${nombre}`;
    listaAmigos.appendChild(li);
  });
}

/**
 * Muestra un único mensaje en el <ul id="resultado">
 * @param {string} texto - Mensaje a mostrar
 * @param {"ok"|"error"} tipo - Estilo semántico básico
 */
function mostrarMensaje(texto, tipo = "ok") {
  resultado.innerHTML = "";
  const li = document.createElement("li");
  li.textContent = texto;
  // Verde para ok, rojo discreto para error (sin tocar tu CSS base)
  li.style.color = tipo === "ok" ? "#05DF05" : "#B00020";
  resultado.appendChild(li);
}

/**
 * Limpia el resultado anterior (útil al agregar nombres)
 */
function limpiarResultado() {
  resultado.innerHTML = "";
}

/**
 * Normaliza un nombre: recorta espacios y colapsa dobles
 */
function normalizarNombre(nombre) {
  return nombre.trim().replace(/\s+/g, " ");
}

/**
 * Valida nombre simple: letras, acentos y espacios (flexible pero razonable)
 */
function esNombreValido(nombre) {
  return /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+$/.test(nombre);
}

/**
 * Agrega un amigo desde el input al arreglo y re-renderiza la lista
 * Vinculada al onclick del botón "Añadir" en el HTML
 */
function agregarAmigo() {
  limpiarResultado();

  const bruto = input.value;
  const nombre = normalizarNombre(bruto);

  if (nombre.length === 0) {
    mostrarMensaje("Primero escribe un nombre, sensei.", "error");
    input.focus();
    return;
  }

  if (!esNombreValido(nombre)) {
    mostrarMensaje("Solo letras y espacios, por favor. Nada de jeroglíficos.", "error");
    input.focus();
    return;
  }

  // Evitar duplicados (case-insensitive)
  const existe = amigos.some(n => n.toLowerCase() === nombre.toLowerCase());
  if (existe) {
    mostrarMensaje(`"${nombre}" ya está en la lista. No clones.`, "error");
    input.focus();
    input.select();
    return;
  }

  amigos.push(nombre);
  renderLista();

  // Reset input
  input.value = "";
  input.focus();
}

/**
 * Sortea un nombre al azar de la lista actual
 * Vinculada al onclick del botón "Sortear amigo"
 */
function sortearAmigo() {
  limpiarResultado();

  if (amigos.length < 2) {
    mostrarMensaje("Necesitas al menos 2 nombres para sortear. Matemáticas básicas.", "error");
    return;
  }

  const index = Math.floor(Math.random() * amigos.length);
  const elegido = amigos[index];

  mostrarMensaje(`🎉 Tu amigo secreto es: ${elegido} 🎁`, "ok");
}

// UX: permitir Enter para agregar rápidamente
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    agregarAmigo();
  }
});

// Exponer funciones al scope global porque las invocas desde el HTML inline
window.agregarAmigo = agregarAmigo;
window.sortearAmigo = sortearAmigo;
