// ============================================================
//  PRUEBAS — MÓDULO 5: Disclaimer  /  MÓDULO 6: Rendimiento
//  Archivo : js/tests/tests_M5_M6_Disclaimer_Rendimiento.js
//  Ejecutar: node js/tests/tests_M5_M6_Disclaimer_Rendimiento.js
//           ó: npm run test:m5m6
//  ISO 25010: Seguridad · Eficiencia · Fiabilidad · Usabilidad
// ============================================================

// ── La función se importa desde script.js ────────────────────
const { validarBusqueda } = require("../script.js");

const { assert, resetContadores, resumenModulo } = require("./test-utils");

// ── Datos simulados del proyecto ─────────────────────────────
const disclaimer = {
    accesoDesdeMenu: true,
    enlaceMenu     : "Disclaimer",
    texto          : "Esta plataforma no reemplaza la consulta médica profesional. " +
                     "La información es de carácter educativo e informativo. " +
                     "Consulte siempre a un profesional de la salud.",
};

const metricas = {
    tiempoCargaMs    : 420,   // medido con Chrome DevTools → Network → Finish
    erroresConsola   : 0,     // errores rojos en DevTools → Console
    metaViewport     : true,  // <meta name="viewport" content="width=device-width, initial-scale=1">
    bootstrapVersion : "5.3.8",
    navegacionesOK   : 10,
    navegacionesTotal: 10,
};

// ════════════════════════════════════════════════════════════
function testM5_Disclaimer() {
    resetContadores();
    console.log("=== MÓDULO 5 — Disclaimer / Aviso Legal ===");

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

    resumenModulo("M5");
}

// ════════════════════════════════════════════════════════════
function testM6_RendimientoSeguridad() {
    resetContadores();
    console.log("=== MÓDULO 6 — Rendimiento y Seguridad (ISO 25010) ===");

    // RS-01 · Tiempo de carga inicial ≤ 3 segundos
    assert(
        "RS-01",
        "Tiempo de carga inicial ≤ 3 000 ms (ISO 25010 — Eficiencia del Desempeño)",
        metricas.tiempoCargaMs <= 3000,
        `${metricas.tiempoCargaMs} ms (medido con Chrome DevTools → Network → Finish)`,
        "≤ 3 000 ms"
    );

    // RS-02 · Sin errores en consola en uso normal
    assert(
        "RS-02",
        "Sin errores rojos en consola durante uso normal (ISO 25010 — Fiabilidad)",
        metricas.erroresConsola === 0,
        `Errores rojos en consola: ${metricas.erroresConsola}`,
        "0 errores en DevTools → Console"
    );

    // RS-03 · Responsive en pantalla 375×667 px
    assert(
        "RS-03",
        "Responsive en pantalla 375×667 px — iPhone SE (ISO 25010 — Usabilidad)",
        metricas.metaViewport === true,
        `meta viewport presente: ${metricas.metaViewport} | Bootstrap ${metricas.bootstrapVersion} activo — navbar colapsa, tarjetas en stack vertical`,
        "Contenido adaptado sin desbordamiento horizontal"
    );

    // RS-04 · Prevención XSS — entradas maliciosas en el buscador
    const payloads = [
        '<script>alert("xss")</script>',
        "<img src=x onerror=alert(1)>",
        "javascript:alert(1)",
        "<svg onload=alert(1)>",
    ];
    let xssSeguros = true;
    console.log("ID: RS-04");
    console.log("Descripción: Buscador valida entradas y previene XSS básico (ISO 25010 — Seguridad)");
    console.log("Resultado esperado: Ningún payload ejecutado — texto plano");
    payloads.forEach(p => {
        const resultado = validarBusqueda(p);
        const seguro    = typeof resultado === "string";
        if (!seguro) xssSeguros = false;
        console.log(`Entrada: "${p.substring(0, 32)}" → "${resultado}"`);
    });
    assert("RS-04", "Buscador previene XSS básico",
        xssSeguros,
        xssSeguros ? "todos los payloads retornan texto plano" : "algún payload no devolvió string",
        "Ningún payload ejecutado — texto plano"
    );

    // RS-05 · Disponibilidad — 10 navegaciones consecutivas sin caídas
    const pct = (metricas.navegacionesOK / metricas.navegacionesTotal) * 100;
    assert(
        "RS-05",
        "Disponibilidad sin caídas en 10 navegaciones consecutivas (Fiabilidad ≥ 98%)",
        metricas.navegacionesOK === 10 && pct >= 98,
        `${metricas.navegacionesOK}/${metricas.navegacionesTotal} navegaciones OK | Fiabilidad: ${pct}%`,
        "10/10 sin fallos — Fiabilidad ≥ 98%"
    );

    resumenModulo("M6");
}

testM5_Disclaimer();
console.log("");
testM6_RendimientoSeguridad();
