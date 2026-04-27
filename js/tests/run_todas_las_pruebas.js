// ============================================================
//  RUNNER MAESTRO — Raíces Ancestrales
//  Archivo : js/tests/run_todas_las_pruebas.js
//  Ejecutar: node js/tests/run_todas_las_pruebas.js
//           ó: npm test
//
//  Corre todos los módulos en secuencia usando require().
//  Cada módulo importa sus propias funciones desde js/script.js
//  o js/register.js — no hay código duplicado.
//  ISO/IEC 25010
// ============================================================

console.log("╔══════════════════════════════════════════════════════════════╗");
console.log("║  🌿 RAÍCES ANCESTRALES — SUITE COMPLETA DE PRUEBAS          ║");
console.log("║     Modelo de Calidad: ISO/IEC 25010                         ║");
console.log("╚══════════════════════════════════════════════════════════════╝");
console.log("");

// ── Contadores globales ──────────────────────────────────────
let GRAN_TOTAL = 0;
let GRAN_OK    = 0;
let GRAN_FALLO = 0;

const utils = require("./test-utils");
const _resumenOriginal = utils.resumenModulo;
utils.resumenModulo = function (nombreModulo) {
    const r = _resumenOriginal(nombreModulo);
    GRAN_TOTAL += r.totalCasos;
    GRAN_OK    += r.casosOK;
    GRAN_FALLO += r.casosFallidos;
    return r;
};

// ── Ejecutar módulos en el NUEVO ORDEN DE CALIDAD ────────────
console.log(""); require("./tests_M1_Inicio_Navegacion");
console.log(""); require("./tests_M2_Login");               // Nuevo M2
console.log(""); require("./tests_M3_Formulario_Registro");  // Nuevo M3
console.log(""); require("./tests_M4_Listado_Plantas");      // Ajustado
console.log(""); require("./tests_M5_Buscador");             // Ajustado
console.log(""); require("./tests_M6_M7_Disclaimer_Rendimiento");

// ── Resumen general ──────────────────────────────────────────
const pct = GRAN_TOTAL > 0 ? ((GRAN_OK / GRAN_TOTAL) * 100).toFixed(1) : "0.0";

console.log("");
console.log("╔══════════════════════════════════════════════════════════════╗");
console.log("║  📊 RESUMEN GENERAL — RAÍCES ANCESTRALES                    ║");
console.log("╠══════════════════════════════════════════════════════════════╣");
console.log(`║  Total de casos ejecutados : ${String(GRAN_TOTAL).padEnd(4)}                         ║`);
console.log(`║  ✅ Casos OK               : ${String(GRAN_OK).padEnd(4)}                         ║`);
console.log(`║  ❌ Casos FALLIDOS         : ${String(GRAN_FALLO).padEnd(4)}                         ║`);
console.log(`║  📈 Porcentaje de éxito    : ${pct.padEnd(6)} %                    ║`);
console.log("╠══════════════════════════════════════════════════════════════╣");
console.log("║  🐛 BUG-01 (Media) : Inicio/Sobre nosotros/Servicios        ║");
console.log("║                      tienen href='#', no navegan.           ║");
console.log("║  🐛 BUG-02 (Alta)  : 'Ver Detalles' sin funcionalidad —     ║");
console.log("║                      vista de detalle no implementada.      ║");
console.log("╚══════════════════════════════════════════════════════════════╝");