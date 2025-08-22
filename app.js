const amigos = [];
const $input = document.getElementById("amigo");
const $lista = document.getElementById("listaAmigos");
const $resultado = document.getElementById("resultado");
const $avisos = document.getElementById("avisos");

// util: compara sin acentos/mayúsculas
const llave = (s) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLowerCase();

// toasts
function aviso(texto, tipo = "info", ms = 2600) {
  const div = document.createElement("div");
  div.className = `toast toast--${tipo}`;
  div.setAttribute("role", "alert");
  div.textContent = texto;
  $avisos.appendChild(div);
  setTimeout(() => div.remove(), ms);
}

// UI
function limpiarResultado() { $resultado.innerHTML = ""; }

function pintarLista() {
  $lista.innerHTML = "";
  if (amigos.length === 0) return; // chips ya muestran vacío con CSS

  amigos.forEach((nombre, i) => {
    const li = document.createElement("li");
    li.textContent = "• " + nombre;
    li.title = "Clic para eliminar";
    li.addEventListener("click", () => {
      amigos.splice(i, 1);
      limpiarResultado();
      pintarLista();
      aviso(`Quitaste "${nombre}"`, "info");
    });
    $lista.appendChild(li);
  });
}

// acciones
window.agregarAmigo = function () {
  const texto = $input.value.trim();

  if (!texto) {
    $input.classList.add("is-error");
    aviso("Escribe un nombre válido.", "error");
    setTimeout(() => $input.classList.remove("is-error"), 900);
    $input.focus();
    return;
  }

  const existe = amigos.some((n) => llave(n) === llave(texto));
  if (existe) {
    aviso(`"${texto}" ya está en la lista.`, "info");
    $input.select();
    return;
  }

  amigos.push(texto);
  $input.value = "";
  limpiarResultado();
  pintarLista();
  aviso(`Agregado: "${texto}"`, "ok");
  $input.focus();
};

window.sortearAmigo = function () {
  if (amigos.length === 0) {
    $input.classList.add("is-error");
    aviso("Primero agrega al menos un nombre.", "error");
    setTimeout(() => $input.classList.remove("is-error"), 900);
    $input.focus();
    return;
  }
  const i = Math.floor(Math.random() * amigos.length);
  const elegido = amigos[i];

  $resultado.innerHTML = "";
  const li = document.createElement("li");
  li.textContent = "🎉  Tu amigo secreto es: " + elegido;
  $resultado.appendChild(li);
  aviso("¡Sorteo realizado!", "ok", 1800);
};

// Enter para agregar
$input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    agregarAmigo();
  }
});

// arranque
pintarLista();
