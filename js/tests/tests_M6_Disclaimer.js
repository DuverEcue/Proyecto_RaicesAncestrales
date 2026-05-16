// ============================================================
//  PRUEBAS — MÓDULO 6: Disclaimer / Aviso Legal
//  Archivo : js/tests/tests_M6_Disclaimer.js
//  Ejecutar: node js/tests/tests_M6_Disclaimer.js
//  ISO 25010: Adecuación Funcional · Usabilidad
// ============================================================

const { assert, resetContadores, resumenModulo } = require("./test-utils.js");

// ── Datos simulados del proyecto ─────────────────────────────
const disclaimer = {
    accesoDesdeMenu: true,
    enlaceMenu     : "Disclaimer",
    texto          : "Esta plataforma no reemplaza la consulta médica profesional. " +
                     "La información es de carácter educativo e informativo. " +
                     "Consulte siempre a un profesional de la salud.",
};

// ════════════════════════════════════════════════════════════
function testM6_Disclaimer() {
    resetContadores();
    console.log("=== MÓDULO 6 — Disclaimer / Aviso Legal ===");

    // DL-01 · Disclaimer accesible desde el menú
    assert(
        "DL-01",
        "Sección Disclaimer accesible desde el menú de navegación",
        disclaimer.accesoDesdeMenu && disclaimer.enlaceMenu === "Disclaimer",
        `Acceso desde menú: ${disclaimer.accesoDesdeMenu} | Enlace: "${disclaimer.enlaceMenu}"`,
        'Enlace "Disclaimer" presente y accesible en el navbar'
    );

    // DL-02 · Texto del disclaimer es legible y claro
    const textoLower  = disclaimer.texto.toLowerCase();
    const frasesClave = ["no reemplaza", "consulta médica", "educativo"];
    const todasOK     = frasesClave.every(f => textoLower.includes(f.toLowerCase()));
    assert(
        "DL-02",
        'Texto del disclaimer menciona que no reemplaza consulta médica',
        todasOK,
        `Frases encontradas: ${frasesClave.filter(f => textoLower.includes(f)).join(", ")}`,
        '"no reemplaza", "consulta médica", "educativo" presentes'
    );

    resumenModulo("M6");
}

// Ejecución automática de las pruebas del módulo
testM6_Disclaimer();