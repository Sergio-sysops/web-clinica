// Datos de la clínica (FICTICIA, solo para la demo)
const CLINICA = {
  nombre: "Clínica Alba",
  subtitulo: "Fisioterapia y bienestar",
  ciudad: "Villanueva",
  direccion: "Calle Real, 15, 1.º",
  whatsapp: "34600000000",
  telefono: "34600000000",
  horario: [
    { dias: [1, 2, 3, 4], abre: "09:00", cierra: "14:00" },
    { dias: [1, 2, 3, 4], abre: "16:00", cierra: "21:00" },
    { dias: [5], abre: "09:00", cierra: "15:00" },
  ],
};

const TRATAMIENTOS = [
  { id: "fisio", icono: "🤲", nombre: "Fisioterapia general", min: 50, precio: 40,
    desc: "Valoración y tratamiento manual de dolores musculares y articulares." },
  { id: "deportiva", icono: "🏃", nombre: "Fisioterapia deportiva", min: 50, precio: 45,
    desc: "Lesiones, sobrecargas y vuelta al deporte con un plan a tu medida." },
  { id: "suelo", icono: "🌸", nombre: "Suelo pélvico", min: 50, precio: 45,
    desc: "Embarazo, posparto, pérdidas de orina y recuperación abdominal." },
  { id: "puncion", icono: "📍", nombre: "Punción seca", min: 30, precio: 35,
    desc: "Para puntos gatillo y contracturas que no se van con masaje." },
  { id: "pilates", icono: "🧘", nombre: "Pilates terapéutico", min: 55, precio: 15,
    desc: "Grupos reducidos de máximo 5 personas. Ideal para la espalda.", nota: "por sesión" },
  { id: "masaje", icono: "💆", nombre: "Masaje descontracturante", min: 45, precio: 35,
    desc: "Para soltar tensión acumulada en cuello, espalda o piernas." },
];

// "¿Qué te pasa?": cada síntoma recomienda tratamientos (por id) y da un consejo
const SINTOMAS = [
  { id: "espalda", icono: "🧍", nombre: "Dolor de espalda", recomienda: ["fisio", "pilates"],
    texto: "La mayoría de dolores de espalda mejoran mucho combinando tratamiento manual con ejercicio guiado." },
  { id: "cuello", icono: "💻", nombre: "Cuello y cervicales", recomienda: ["fisio", "puncion"],
    texto: "Las horas de ordenador y móvil cargan el cuello. Te enseñamos también ejercicios para casa." },
  { id: "deporte", icono: "⚽", nombre: "Lesión deportiva", recomienda: ["deportiva", "puncion"],
    texto: "Esguinces, roturas fibrilares, tendinitis… Cuanto antes se trate, antes vuelves a jugar." },
  { id: "embarazo", icono: "🤰", nombre: "Embarazo o posparto", recomienda: ["suelo", "pilates"],
    texto: "Una valoración del suelo pélvico tras el parto es recomendable para todas las mujeres." },
  { id: "estres", icono: "😮‍💨", nombre: "Tensión y estrés", recomienda: ["masaje", "pilates"],
    texto: "El estrés se acumula en el cuerpo. Un masaje y algo de movimiento suave ayudan mucho." },
  { id: "rodilla", icono: "🦵", nombre: "Rodilla o tobillo", recomienda: ["fisio", "deportiva"],
    texto: "Valoramos la articulación y diseñamos ejercicios para fortalecerla y que no vuelva a pasar." },
];

const EQUIPO = [
  { nombre: "Lucía Romero", puesto: "Fisioterapeuta · Directora", especialidad: "Suelo pélvico y embarazo", color: "#8fae9b" },
  { nombre: "Javier Ortega", puesto: "Fisioterapeuta", especialidad: "Deportiva y punción seca", color: "#c9a77c" },
  { nombre: "Nuria Campos", puesto: "Fisioterapeuta", especialidad: "Pilates terapéutico y espalda", color: "#a7a3c9" },
];

const PREGUNTAS = [
  ["¿Qué pasa en la primera visita?", "Te hacemos una valoración completa: hablamos de lo que te pasa, exploramos la zona y empezamos el tratamiento ese mismo día. Ven con ropa cómoda."],
  ["¿Necesito que me mande un médico?", "No. Puedes venir directamente. Si traes informes o pruebas (resonancias, radiografías), tráelos a la primera cita."],
  ["¿Trabajáis con mutuas o seguros?", "Te damos factura detallada para que puedas pedir el reembolso a tu seguro. Pregúntanos por los convenios vigentes."],
  ["¿Hay bonos?", "Sí: bono de 5 sesiones de fisioterapia con un 10 % de descuento y bono mensual de pilates."],
  ["¿Cómo cancelo una cita?", "Avísanos por WhatsApp o teléfono con al menos 24 horas para poder dar el hueco a otra persona."],
];
