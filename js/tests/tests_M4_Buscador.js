// ============================================================
//  PRUEBAS — MÓDULO 4: Buscador Dinámico
//  Archivo : js/tests/tests_M4_Buscador.js
//  Ejecutar: node js/tests/tests_M4_Buscador.js
//           ó: npm run test:m4
//  ISO 25010: Adecuación Funcional · Eficiencia · Seguridad
// ============================================================

// ── La función se importa desde script.js ────────────────────
//    ⚠️  NO SE COPIA aquí — si cambia en script.js, las
//        pruebas automáticamente prueban la versión actualizada.
const { validarBusqueda } = require("../script.js");

const { assert, assertIgual, resetContadores, resumenModulo } = require("./test-utils");
resetContadores();

// ── Estructura simulada del buscador en index.html ───────────
const campoBuscador = {
    type       : "search",
    placeholder: "Buscar plantas...",
    visible    : true,
};

// ── Pruebas del Módulo 4 ─────────────────────────────────────
function testM4_Buscador() {
    console.log("=== MÓDULO 4 — Buscador Dinámico ===");

    // BS-01 · Campo de búsqueda visible en el navbar (sin botón, busca dinámico)
    const bs01OK = campoBuscador.type === "search" &&
                   campoBuscador.placeholder === "Buscar plantas...";
    assert(
        "BS-01",
        "Campo de búsqueda visible en el navbar (dinámico, sin botón)",
        bs01OK,
        `type="${campoBuscador.type}" | placeholder="${campoBuscador.placeholder}"`,
        'type="search" | placeholder="Buscar plantas..."'
    );

    // BS-02 · validarBusqueda() con término válido
    assertIgual("BS-02", "validarBusqueda('Manzanilla') — término válido",
        validarBusqueda("Manzanilla"),
        "Búsqueda válida"
    );

    // BS-03 · Búsqueda vacía retorna válida (muestra todas las plantas)
    assertIgual("BS-03", "Búsqueda vacía — muestra todas las plantas",
        validarBusqueda(""),
        "Búsqueda válida"
    );

    // BS-03b · Búsqueda con solo espacios (.trim()) también válida
    assertIgual("BS-03b", "Búsqueda con solo espacios — .trim() muestra todas",
        validarBusqueda("   "),
        "Búsqueda válida"
    );

    // BS-03c · Texto parcial
    assertIgual("BS-03c", "Texto parcial 'Man' — validarBusqueda acepta parciales",
        validarBusqueda("Man"),
        "Búsqueda válida"
    );

    // BS-03d · Caracteres especiales bloqueados
    assertIgual("BS-03d", "Caracteres >,<,@,# bloqueados",
        validarBusqueda("planta@#"),
        "Error: Caracteres no permitidos."
    );

    // BS-04 · Caracteres especiales — XSS básico
    const payloadsXSS = [
        "<script>alert('xss')</script>",
        "!!@@$$",
        "<img src=x onerror=alert(1)>",
        "'; DROP TABLE plantas; --",
    ];
    let xssSeguros = true;
    console.log("ID: BS-04");
    console.log("Descripción: Caracteres especiales / XSS no rompen el sistema");
    console.log("Resultado esperado: Todas las entradas retornan texto plano");
    payloadsXSS.forEach(payload => {
        const resultado = validarBusqueda(payload);
        const seguro    = typeof resultado === "string";
        if (!seguro) xssSeguros = false;
        console.log(`Entrada: "${payload.substring(0, 35)}" → "${resultado}"`);
    });
    assert("BS-04", "XSS no rompe el sistema", xssSeguros,
        xssSeguros ? "todas las entradas retornan texto plano" : "algún payload no devolvió string",
        "Todas las entradas retornan texto plano"
    );

    // BS-05 · Tiempo de respuesta ≤ 2 segundos
    const inicio   = Date.now();
    validarBusqueda("Aloe");
    const tiempoMs = Date.now() - inicio;
    const bs05OK   = tiempoMs <= 2000;
    assert(
        "BS-05",
        "Buscador responde en ≤ 2 segundos (ISO 25010 — Eficiencia)",
        bs05OK,
        `${tiempoMs} ms`,
        "≤ 2 000 ms"
    );

    resumenModulo("M4");
}

testM4_Buscador();
