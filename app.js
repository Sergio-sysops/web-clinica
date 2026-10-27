// Web de la clínica. Todo el contenido está en datos.js
const DIAS = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const $ = (s) => document.querySelector(s);
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const aMin = (h) => { const [a, b] = h.split(":").map(Number); return a * 60 + b; };
const enlaceWA = (m) => `https://wa.me/${CLINICA.whatsapp}?text=${encodeURIComponent(m)}`;
const tratamiento = (id) => TRATAMIENTOS.find((t) => t.id === id);
const iniciales = (n) => n.split(" ").map((p) => p[0]).join("").slice(0, 2);

function pintarEstado() {
  const ahora = new Date(), min = ahora.getHours() * 60 + ahora.getMinutes();
  const tramos = CLINICA.horario.filter((t) => t.dias.includes(ahora.getDay()));
  const abierto = tramos.find((t) => min >= aMin(t.abre) && min < aMin(t.cierra));
  const luego = tramos.find((t) => min < aMin(t.abre));
  $("#estado").className = "estado " + (abierto ? "abierto" : "cerrado");
  $("#estado").textContent = abierto ? `● Abierto ahora · hasta las ${abierto.cierra}`
    : luego ? `● Cerrado · abrimos hoy a las ${luego.abre}` : "● Cerrado ahora · escríbenos y te respondemos al abrir";
}

function pintarSintomas() {
  $("#sintomas").innerHTML = SINTOMAS.map((s) =>
    `<button class="sintoma" data-s="${esc(s.id)}"><span>${s.icono}</span>${esc(s.nombre)}</button>`).join("");
}

function elegirSintoma(id) {
  const s = SINTOMAS.find((x) => x.id === id);
  document.querySelectorAll(".sintoma").forEach((b) => b.classList.toggle("activo", b.dataset.s === id));
  const recs = s.recomienda.map(tratamiento);
  const caja = $("#recomendacion");
  caja.hidden = false;
  caja.innerHTML = `
    <p class="rec-texto">${esc(s.texto)}</p>
    <p class="rec-titulo">Te recomendamos:</p>
    <div class="rec-lista">${recs.map((t) => `
      <div class="rec"><span class="rec-ico">${t.icono}</span>
        <div><strong>${esc(t.nombre)}</strong><small>${t.min} min · ${t.precio} €${t.nota ? " " + esc(t.nota) : ""}</small></div>
        <a href="#cita" class="boton boton-peq" data-pedir="${esc(t.id)}">Pedir cita</a></div>`).join("")}</div>`;
  caja.classList.remove("aparece"); void caja.offsetWidth; caja.classList.add("aparece");
}

function pintarTratamientos() {
  $("#tratamientos-lista").innerHTML = TRATAMIENTOS.map((t) => `
    <article class="tratamiento">
      <span class="t-ico">${t.icono}</span>
      <h3>${esc(t.nombre)}</h3>
      <p>${esc(t.desc)}</p>
      <div class="t-pie"><span>⏱ ${t.min} min</span><strong>${t.precio} €${t.nota ? ` <small>${esc(t.nota)}</small>` : ""}</strong></div>
      <a href="#cita" class="enlace" data-pedir="${esc(t.id)}">Pedir cita →</a>
    </article>`).join("");
}

function pintarEquipo() {
  $("#equipo-lista").innerHTML = EQUIPO.map((p) => `
    <article class="persona">
      <div class="avatar" style="--c:${esc(p.color)}">${esc(iniciales(p.nombre))}</div>
      <h3>${esc(p.nombre)}</h3><p class="puesto">${esc(p.puesto)}</p><p>${esc(p.especialidad)}</p>
    </article>`).join("");
}

function pintarFormulario() {
  $("#c-tratamiento").innerHTML = TRATAMIENTOS.map((t) => `<option value="${esc(t.id)}">${esc(t.nombre)} (${t.min} min · ${t.precio} €)</option>`).join("")
    + `<option value="valorar">No lo sé, quiero que me valoréis</option>`;
  const abiertos = [1, 2, 3, 4, 5, 6, 0].filter((d) => CLINICA.horario.some((t) => t.dias.includes(d)));
  $("#c-dias").innerHTML = abiertos.map((d) =>
    `<label class="chip"><input type="checkbox" name="dias" value="${DIAS[d]}"><span>${DIAS[d]}</span></label>`).join("");
}

function pintarDudas() {
  $("#dudas-lista").innerHTML = PREGUNTAS.map(([p, r]) => `<details><summary>${esc(p)}</summary><p>${esc(r)}</p></details>`).join("");
}

function pintarDonde() {
  const hoy = new Date().getDay();
  $("#horario").innerHTML = [1, 2, 3, 4, 5, 6, 0].map((d) => {
    const t = CLINICA.horario.filter((x) => x.dias.includes(d)).map((x) => `${x.abre}–${x.cierra}`);
    return `<tr class="${d === hoy ? "hoy" : ""}"><td>${DIAS[d]}</td><td>${t.join(" · ") || "Cerrado"}</td></tr>`;
  }).join("");
  $("#mapa").href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CLINICA.direccion + ", " + CLINICA.ciudad)}`;
  $("#tel").href = `tel:+${CLINICA.telefono}`;
  $("#wa-flotante").href = enlaceWA("");
}

document.addEventListener("click", (e) => {
  const s = e.target.closest(".sintoma"); if (s) elegirSintoma(s.dataset.s);
  const p = e.target.closest("[data-pedir]"); if (p) $("#c-tratamiento").value = p.dataset.pedir;
});

$("#form-cita").addEventListener("submit", (e) => {
  e.preventDefault();
  const f = new FormData(e.target);
  if (f.get("web")) return;   // campo trampa para bots
  const dias = f.getAll("dias");
  const lineas = [`¡Hola! Quiero pedir cita en ${CLINICA.nombre}:`,
    `• Tratamiento: ${$("#c-tratamiento").selectedOptions[0].textContent}`,
    `• Días: ${dias.length ? dias.join(", ") : "cualquiera"}`, `• Preferencia: ${f.get("franja")}`,
    `• Nombre: ${f.get("nombre")}`, `• ${f.get("primera")}`];
  window.open(enlaceWA(lineas.join("\n")), "_blank", "noopener");
});

document.querySelectorAll("[data-c]").forEach((el) => { el.textContent = CLINICA[el.dataset.c]; });
pintarEstado(); pintarSintomas(); pintarTratamientos(); pintarEquipo(); pintarFormulario(); pintarDudas(); pintarDonde();
setInterval(pintarEstado, 60000);
