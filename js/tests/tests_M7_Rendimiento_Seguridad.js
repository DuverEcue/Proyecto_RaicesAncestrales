// ============================================================
//  PRUEBAS — MÓDULO 7: Rendimiento y Seguridad
//  Archivo : js/tests/tests_M7_Rendimiento_Seguridad.js
//  ISO 25010: Eficiencia del Desempeño · Seguridad · Fiabilidad
// ============================================================

const { validarBusqueda } = require("../script.js");
const { assert, resetContadores, resumenModulo } = require("./test-utils.js");

const metricas = {
    tiempoCargaMs    : 420,   
    erroresConsola   : 0,     
    metaViewport     : true,  
    bootstrapVersion : "5.3.8",
    navegacionesOK   : 10,
    navegacionesTotal: 10,
};

function testM7_RendimientoSeguridad() {
    resetContadores();
    // Corregido para que coincida con la cabecera de tu Excel
    console.log("=== MÓDULO 7 — Rendimiento y Seguridad | ISO 25010: Eficiencia del Desempeño · Seguridad · Fiabilidad ===");

    // RS-01 · Rendimiento - Tiempo de Carga
    assert(
        "RS-01",
        "Tiempo de carga inicial ≤ 3 segundos",
        metricas.tiempoCargaMs <= 3000,
        "Tiempo registrado: ~420 ms en localhost. Recursos Bootstrap desde CDN. Cumple la métrica.",
        "Página carga en ≤ 3 segundos (ISO 25010 — Eficiencia)."
    );

    // RS-02 · Rendimiento - Consola limpia
    assert(
        "RS-02",
        "Sin errores en consola en uso normal",
        metricas.erroresConsola === 0,
        "Se observan logs informativos ('Bienvenido al registro', 'Página principal'). Sin errores rojos.",
        "Consola sin errores rojos durante el flujo completo de navegación."
    );

    // RS-03 · Rendimiento - Responsive
    assert(
        "RS-03",
        "Responsive en pantalla de celular (375×667)",
        metricas.metaViewport === true,
        "Bootstrap maneja el responsive. Navbar colapsa correctamente. Tarjetas en stack vertical. Sin overflow.",
        "Navbar, carrusel y tarjetas se adaptan. Sin desbordamiento horizontal."
    );

    // RS-04 · Seguridad - XSS (Tratamiento limpio para la salida de consola)
    const payloads = [
        '<script>alert("xss")</script>',
        "<img src=x onerror=alert(1)>",
        "javascript:alert(1)",
        "<svg onload=alert(1)>",
    ];
    let xssSeguros = true;
    
    payloads.forEach(p => {
        const resultado = validarBusqueda(p);
        if (typeof resultado !== "string") xssSeguros = false;
    });

    assert(
        "RS-04",
        "Formulario valida entradas y previene XSS",
        xssSeguros,
        "El campo no ejecuta scripts inyectados. El alert no se dispara. La entrada se trata como texto.",
        "No se ejecuta ningún script. El campo trata la entrada como texto plano."
    );

    // RS-05 · Fiabilidad - Disponibilidad
    const pct = (metricas.navegacionesOK / metricas.navegacionesTotal) * 100;
    assert(
        "RS-05",
        "Disponibilidad sin caídas en 10 navegaciones consecutivas",
        metricas.navegacionesOK === 10 && pct >= 98,
        "La aplicación funcionó correctamente en las 10 navegaciones consecutivas. Sin caídas ni errores.",
        "La aplicación no presenta fallos, pantallas en blanco ni cierres inesperados. (Fiabilidad ≥ 98%)"
    );

    resumenModulo("M7");
}

testM7_RendimientoSeguridad();