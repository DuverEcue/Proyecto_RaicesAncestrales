// ============================================================
//  test-utils.js — Utilidades compartidas para todas las pruebas
//  Proyecto : Raíces Ancestrales  |  ISO/IEC 25010
//
//  Uso: require('./test-utils') en cada módulo de prueba.
// ============================================================

let totalCasos    = 0;
let casosOK       = 0;
let casosFallidos = 0;

// ── assert con condición booleana explícita ──────────────────
//    Usado por: M1, M3, M5, M6
function assert(id, descripcion, condicion, obtenido, esperado) {
    totalCasos++;
    if (condicion) casosOK++; else casosFallidos++;
    const estado = condicion ? "✅ OK" : "❌ FALLÓ";
    console.log(`ID: ${id}`);
    console.log(`Descripción: ${descripcion}`);
    console.log(`Resultado esperado: ${esperado}`);
    console.log(`Resultado obtenido: ${obtenido}`);
    console.log(`Estado: ${estado}`);
    console.log("---");
}

// ── assertIgual — compara obtenido === esperado ──────────────
//    Usado por: M2, M4
function assertIgual(id, descripcion, obtenido, esperado) {
    assert(id, descripcion, obtenido === esperado, obtenido, esperado);
}

// ── Reiniciar contadores (útil si se corren módulos en secuencia)
function resetContadores() {
    totalCasos    = 0;
    casosOK       = 0;
    casosFallidos = 0;
}

// ── Resumen del módulo ───────────────────────────────────────
function resumenModulo(nombreModulo) {
    console.log(`=== RESUMEN ${nombreModulo} — Total: ${totalCasos} | ✅ OK: ${casosOK} | ❌ Falló: ${casosFallidos} ===`);
    return { totalCasos, casosOK, casosFallidos };
}

module.exports = { assert, assertIgual, resetContadores, resumenModulo };
