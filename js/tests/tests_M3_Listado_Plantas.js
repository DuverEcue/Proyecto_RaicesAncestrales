// ============================================================
//  PRUEBAS — MÓDULO 3: Listado de Plantas Medicinales
//  Archivo : js/tests/tests_M3_Listado_Plantas.js
//  Ejecutar: node js/tests/tests_M3_Listado_Plantas.js
//           ó: npm run test:m3
//  ISO 25010: Adecuación Funcional · Fiabilidad
// ============================================================

const { assert, resetContadores, resumenModulo } = require("./test-utils");
resetContadores();

// ── Estructura de tarjetas tal como están en index.html ──────
const tarjetas = [
    {
        nombre     : "Caléndula",
        descripcion: "Se caracteriza por sus flores de colores intensos, que van del amarillo al naranja.",
        imagen     : "img/Calendula.jpg",
        boton      : "Ver Detalles",
        href       : "#",   // BUG-02: no abre vista de detalle
    },
    {
        nombre     : "Manzanilla",
        descripcion: "Ayuda para problemas digestivos y relajación.",
        imagen     : "img/pexels-pixabay-53447.jpg",
        boton      : "Ver Detalles",
        href       : "#",
    },
    {
        nombre     : "Hierbabuena",
        descripcion: "Muy usada para el estómago y bebidas naturales.",
        imagen     : "img/hierbabuena_62088.webp",
        boton      : "Ver Detalles",
        href       : "#",
    },
    {
        nombre     : "Sábila",
        descripcion: "Conocida por sus propiedades cicatrizantes.",
        imagen     : "img/sabila.jpg",
        boton      : "Ver Detalles",
        href       : "#",
    },
];

// ── Pruebas del Módulo 3 ─────────────────────────────────────
function testM3_ListadoPlantas() {
    console.log("=== MÓDULO 3 — Listado de Plantas Medicinales ===");

    // LP-01 · Plantas medicinales visibles en el listado
    const todasConNombre = tarjetas.every(t => t.nombre && t.nombre.trim() !== "");
    const todasConDesc   = tarjetas.every(t => t.descripcion && t.descripcion.trim() !== "");
    const todasConImg    = tarjetas.every(t => t.imagen && t.imagen.trim() !== "");
    assert(
        "LP-01",
        "Plantas medicinales visibles en el listado",
        tarjetas.length >= 1 && todasConNombre && todasConDesc && todasConImg,
        `${tarjetas.length} tarjetas: ${tarjetas.map(t => t.nombre).join(", ")}`,
        "Al menos 1 tarjeta con nombre, descripción e imagen presentes"
    );
    console.log(`ℹ️  NOTA: El proyecto tiene ${tarjetas.length} plantas. La meta del plan maestro es ≥ 30.`);
    console.log("---");

    // LP-02 · Botón "Ver Detalles" presente en cada tarjeta
    const conBoton         = tarjetas.filter(t => t.boton === "Ver Detalles").length;
    const sinFuncionalidad = tarjetas.filter(t => t.href === "#").length;
    assert(
        "LP-02",
        'Botón "Ver Detalles" presente en cada tarjeta',
        conBoton === tarjetas.length,
        `${conBoton}/${tarjetas.length} tarjetas con botón | ⚠️ BUG-02: ${sinFuncionalidad} botones con href="#"`,
        `${tarjetas.length}/${tarjetas.length} botones visibles y clicables`
    );
    if (sinFuncionalidad > 0) {
        console.log(`⚠️  BUG-02 (Severidad: Alta): ${sinFuncionalidad} botón(es) con href="#" — no abren detalle`);
        console.log("---");
    }

    // LP-03 · Botón "Ver Detalles" abre información completa
    const conHrefReal = tarjetas.filter(t => t.href !== "#" && t.href.trim() !== "").length;
    assert(
        "LP-03",
        'Botón "Ver Detalles" abre vista de detalle completa',
        conHrefReal === tarjetas.length,
        `Tarjetas con href real: ${conHrefReal}/${tarjetas.length} — todas tienen href="#" sin funcionalidad`,
        "Clic abre vista con nombre, beneficios, preparación y contraindicaciones"
    );
    console.log("❌ BUG-02 ACTIVO: La vista de detalle no está implementada.");
    console.log("   Acción: crear detalle.html y enlazar cada tarjeta con su ID de planta.");
    console.log("---");

    resumenModulo("M3");
}

testM3_ListadoPlantas();
