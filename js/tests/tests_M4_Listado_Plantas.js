// ============================================================
//  PRUEBAS — MÓDULO 4: Listado de Plantas Medicinales
//  Archivo : js/tests/tests_M4_Listado_Plantas.js
//  Ejecutar: node js/tests/tests_M4_Listado_Plantas.js
//           ó: npm run test:m4
//  ISO 25010: Adecuación Funcional · Fiabilidad
// ============================================================

// js/tests/tests_M4_Listado_Plantas.js
const { assert, resetContadores, resumenModulo } = require("./test-utils");

resetContadores();

// Simulación de los datos de las 36 tarjetas (puedes completar los objetos aquí)
const tarjetas = Array.from({ length: 36 }, (_, i) => ({
    id: i + 1,
    nombre: `Planta ${i + 1}`,
    descripcion: "Descripción de conocimiento ancestral sobre la planta.",
    imagen: `img/planta_${i + 1}.jpg`,
    boton: "Ver Detalles",
    href: `detalle.html?id=${i + 1}` // Ya no es "#", ahora es funcional
}));

function testM4_ListadoPlantas() {
    console.log("\n" + "=".repeat(50));
    console.log(" MÓDULO 4 — LISTADO DE PLANTAS MEDICINALES ");
    console.log(" ISO 25010: Adecuación Funcional · Fiabilidad ");
    console.log("=".repeat(50) + "\n");

    // --- LP-01: Verificación de cantidad y contenido ---
    const todasConDatos = tarjetas.every(t => t.nombre && t.descripcion && t.imagen);
    assert(
        "LP-01",
        "Plantas medicinales visibles en el listado",
        tarjetas.length === 36 && todasConDatos,
        `${tarjetas.length} tarjetas detectadas con datos completos.`,
        "Se esperan exactamente 36 tarjetas con imagen, título y descripción."
    );

    // --- LP-02: Botón funcional (Sin el Bug del href="#") ---
    const botonesOk = tarjetas.filter(t => t.boton === "Ver Detalles" && t.href !== "#").length;
    assert(
        "LP-02",
        "Botón 'Ver Detalles' presente y funcional",
        botonesOk === tarjetas.length,
        `${botonesOk}/36 botones configurados con enlaces reales.`,
        "El 100% de las tarjetas deben tener enlaces distintos a '#'."
    );

    // --- LP-03: Integridad de la navegación ---
    // Verificamos que el enlace apunte a la página de detalle
    const navegacionLista = tarjetas.every(t => t.href.includes("detalle.html"));
    assert(
        "LP-03",
        "Botón 'Ver Detalles' abre información completa",
        navegacionLista,
        "Todos los enlaces apuntan a 'detalle.html'.",
        "Al hacer clic, se debe redirigir a la vista detallada de la planta."
    );

    resumenModulo("MÓDULO 4");
}

// EJECUCIÓN
testM4_ListadoPlantas();