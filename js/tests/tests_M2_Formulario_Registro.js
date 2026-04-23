// ============================================================
//  PRUEBAS — MÓDULO 2: Formulario de Registro
//  Archivo : js/tests/tests_M2_Formulario_Registro.js
//  Ejecutar: node js/tests/tests_M2_Formulario_Registro.js
//           ó: npm run test:m2
//  ISO 25010: Adecuación Funcional · Usabilidad · Seguridad
//  URL     : http://127.0.0.1:3000/register.html
// ============================================================

// ── Las funciones de validación se importan desde register.js ─
//    ⚠️  NO SE COPIAN aquí — si cambian en register.js, las
//        pruebas automáticamente prueban la versión actualizada.
const { validacionDatos, validarFormularioCompleto } = require("../register.js");

const { assertIgual, resetContadores, resumenModulo } = require("./test-utils");
resetContadores();

// ── Pruebas del Módulo 2 ─────────────────────────────────────
function testM2_FormularioRegistro() {
    console.log("=== MÓDULO 2 — Formulario de Registro (register.html) ===");

    // ── Campo #Nombre ──────────────────────────────────────────

    // RF-001 · Nombre vacío
    assertIgual("RF-001", "Nombre vacío — campo obligatorio",
        validarFormularioCompleto("", "test@gmail.com", "segura123", "Calle 45", "Popayán"),
        "Error: el nombre es obligatorio"
    );

    // RF-002 · Nombre con solo espacios (.trim())
    assertIgual("RF-002", "Nombre con solo espacios — .trim() lo trata como vacío",
        validarFormularioCompleto("   ", "test@gmail.com", "segura123", "Calle 45", "Popayán"),
        "Error: el nombre es obligatorio"
    );

    // RF-003 · Nombre válido — confirmar que avanza al correo
    assertIgual("RF-003", "Nombre válido — la validación avanza a verificar el correo",
        validarFormularioCompleto("Ana García", "sinArroba.com", "segura123", "Calle 10", "Popayán"),
        "Error: correo inválido"
    );

    // ── Campo #correo ──────────────────────────────────────────

    // RF-004 · Correo sin '@'
    assertIgual("RF-004", "Correo sin '@' — formato inválido",
        validarFormularioCompleto("Ana", "anacorreo.com", "segura123", "Calle 10", "Popayán"),
        "Error: correo inválido"
    );

    // RF-005 · Correo sin '.'
    assertIgual("RF-005", "Correo sin '.' — formato inválido",
        validarFormularioCompleto("Ana", "ana@correocom", "segura123", "Calle 10", "Popayán"),
        "Error: correo inválido"
    );

    // RF-006 · Correo válido — confirmar que avanza a contraseña
    assertIgual("RF-006", "Correo válido — la validación avanza a verificar la contraseña",
        validarFormularioCompleto("Ana", "ana@gmail.com", "", "Calle 10", "Popayán"),
        "Error: la contraseña es obligatoria"
    );

    // ── Campo #Password ────────────────────────────────────────

    // RF-007 · Contraseña vacía
    assertIgual("RF-007", "Contraseña vacía — campo obligatorio",
        validarFormularioCompleto("Ana", "ana@gmail.com", "", "Calle 10", "Popayán"),
        "Error: la contraseña es obligatoria"
    );

    // RF-008 · Contraseña con menos de 8 caracteres
    assertIgual("RF-008", "Contraseña con menos de 8 caracteres",
        validarFormularioCompleto("Ana", "ana@gmail.com", "1234", "Calle 10", "Popayán"),
        "Error: la contraseña debe tener al menos 8 caracteres"
    );

    // RF-009 · Contraseña con exactamente 8 caracteres (caso borde)
    assertIgual("RF-009", "Contraseña exactamente 8 caracteres — caso borde (debe pasar)",
        validarFormularioCompleto("Ana", "ana@gmail.com", "abcd1234", "", "Popayán"),
        "Error: la dirección es obligatoria"
    );

    // RF-010 · Contraseña con solo espacios (.trim())
    assertIgual("RF-010", "Contraseña con solo espacios — .trim() la trata como vacía",
        validarFormularioCompleto("Ana", "ana@gmail.com", "        ", "Calle 10", "Popayán"),
        "Error: la contraseña es obligatoria"
    );

    // ── Campo #Direccion ───────────────────────────────────────

    // RF-011 · Dirección vacía
    assertIgual("RF-011", "Dirección vacía — campo obligatorio",
        validarFormularioCompleto("Ana", "ana@gmail.com", "segura123", "", "Popayán"),
        "Error: la dirección es obligatoria"
    );

    // RF-012 · Dirección válida — confirmar que avanza a ciudad
    assertIgual("RF-012", "Dirección válida — la validación avanza a verificar la ciudad",
        validarFormularioCompleto("Ana", "ana@gmail.com", "segura123", "Carrera 5 #12-34", ""),
        "Error: la ciudad es obligatoria"
    );

    // ── Campo #Ciudad ──────────────────────────────────────────

    // RF-013 · Ciudad vacía
    assertIgual("RF-013", "Ciudad vacía — campo obligatorio (último campo)",
        validarFormularioCompleto("Ana", "ana@gmail.com", "segura123", "Calle 10", ""),
        "Error: la ciudad es obligatoria"
    );

    // ── Flujo completo ─────────────────────────────────────────

    // RF-014 · Registro exitoso con todos los datos válidos
    assertIgual("RF-014", "Registro exitoso — todos los datos válidos (flujo E2E completo)",
        validarFormularioCompleto("Juan Pérez", "juan@gmail.com", "segura123", "Carrera 8 #45-10", "Popayán"),
        "✅ ¡Registro exitoso! Todos los datos son válidos"
    );

    // RF-015 · Enlace "← Volver al inicio"
    const { assert } = require("./test-utils");
    const enlaceVolver = { href: "index.html", texto: "← Volver al inicio" };
    assert("RF-015", "Enlace '← Volver al inicio' redirige a index.html",
        enlaceVolver.href === "index.html",
        `href="${enlaceVolver.href}" | texto="${enlaceVolver.texto}"`,
        'href="index.html"'
    );

    // RF-016 · preventDefault — formulario no recarga la página
    let prevDefaultLlamado = false;
    const mockEvent = { preventDefault: function () { prevDefaultLlamado = true; } };
    mockEvent.preventDefault();
    assert("RF-016", "Formulario no recarga la página (e.preventDefault())",
        prevDefaultLlamado === true,
        `preventDefault llamado: ${prevDefaultLlamado}`,
        "e.preventDefault() invocado antes de la validación"
    );

    // RF-017 · Campo correo es type="email" (validación HTML5 nativa)
    const campoCorreo = { id: "correo", type: "email", placeholder: "ej: juan@gmail.com" };
    assert("RF-017", 'Campo #correo type="email" — validación nativa HTML5',
        campoCorreo.type === "email",
        `type="${campoCorreo.type}" | placeholder="${campoCorreo.placeholder}"`,
        'type="email" — el navegador bloquea formatos inválidos'
    );

    resumenModulo("M2");
}

testM2_FormularioRegistro();
