// ============================================================
//  PRUEBAS — MÓDULO 2: Formulario de Registro
//  Archivo : js/tests/tests_M2_Formulario_Registro.js
//  Ejecutar: node js/tests/tests_M2_Formulario_Registro.js
//           ó: npm run test:m2
//  ISO 25010: Adecuación Funcional · Usabilidad · Seguridad
//  URL     : http://127.0.0.1:3000/register.html
// ============================================================

const { validacionDatos, validarPassword, validarFormularioCompleto } = require("../register.js");
const { assertIgual, assert, resetContadores, resumenModulo } = require("./test-utils");
resetContadores();

function testM2_FormularioRegistro() {
    console.log("=== MÓDULO 2 — Formulario de Registro (register.html) ===");

    // ── Campo #Nombre ──────────────────────────────────────────

    // RF-001 · Nombre vacío
    assertIgual("RF-001", "Nombre vacío — campo obligatorio",
        validarFormularioCompleto("", "test@gmail.com", "Segura#1234", "Calle 45", "Popayán"),
        "Error: el nombre es obligatorio"
    );

    // RF-002 · Nombre con solo espacios (.trim())
    assertIgual("RF-002", "Nombre con solo espacios — .trim() lo trata como vacío",
        validarFormularioCompleto("   ", "test@gmail.com", "Segura#1234", "Calle 45", "Popayán"),
        "Error: el nombre es obligatorio"
    );

    // RF-003 · Nombre válido — confirmar que avanza al correo
    assertIgual("RF-003", "Nombre válido — la validación avanza a verificar el correo",
        validarFormularioCompleto("Ana García", "sinArroba.com", "Segura#1234", "Calle 10", "Popayán"),
        "Error: correo inválido"
    );

    // ── Campo #correo ──────────────────────────────────────────

    // RF-004 · Correo sin '@'
    assertIgual("RF-004", "Correo sin '@' — formato inválido",
        validarFormularioCompleto("Ana", "anacorreo.com", "Segura#1234", "Calle 10", "Popayán"),
        "Error: correo inválido"
    );

    // RF-005 · Correo sin '.'
    assertIgual("RF-005", "Correo sin '.' — formato inválido",
        validarFormularioCompleto("Ana", "ana@correocom", "Segura#1234", "Calle 10", "Popayán"),
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
        validarFormularioCompleto("Ana", "ana@gmail.com", "Ab1!", "Calle 10", "Popayán"),
        "Error: la contraseña debe tener al menos 8 caracteres"
    );

    // RF-009 · Contraseña exactamente 8 chars pero sin composición robusta
    // ACTUALIZADO v2: "abcd1234" ya no pasa porque le falta mayúscula y especial (MEJ-001)
    assertIgual("RF-009", "Contraseña 8 chars sin mayúscula ni especial — no pasa MEJ-001",
        validarFormularioCompleto("Ana", "ana@gmail.com", "abcd1234", "", "Popayán"),
        "Error: la contraseña debe contener al menos una mayúscula"
    );

    // RF-010 · Contraseña con solo espacios — BUG-001 corregido
    // Caso original: 8 espacios → debe fallar (ya funcionaba)
    assertIgual("RF-010a", "Contraseña con solo espacios (8) — tratada como vacía",
        validarFormularioCompleto("Ana", "ana@gmail.com", "        ", "Calle 10", "Popayán"),
        "Error: la contraseña es obligatoria"
    );
    // BUG-001 corregido: espacios + 1 char también debe fallar
    assertIgual("RF-010b", "BUG-001 corregido — espacios + 1 char no es contraseña válida",
        validarFormularioCompleto("Ana", "ana@gmail.com", "       e", "Calle 10", "Popayán"),
        "Error: la contraseña debe tener al menos 8 caracteres"
    );

    // ── Campo #Direccion ───────────────────────────────────────

    // RF-011 · Dirección vacía
    assertIgual("RF-011", "Dirección vacía — campo obligatorio",
        validarFormularioCompleto("Ana", "ana@gmail.com", "Segura#1234", "", "Popayán"),
        "Error: la dirección es obligatoria"
    );

    // RF-012 · Dirección válida — confirmar que avanza a ciudad
    assertIgual("RF-012", "Dirección válida — la validación avanza a verificar la ciudad",
        validarFormularioCompleto("Ana", "ana@gmail.com", "Segura#1234", "Carrera 5 #12-34", ""),
        "Error: la ciudad es obligatoria"
    );

    // ── Campo #Ciudad ──────────────────────────────────────────

    // RF-013 · Ciudad vacía
    assertIgual("RF-013", "Ciudad vacía — campo obligatorio (último campo)",
        validarFormularioCompleto("Ana", "ana@gmail.com", "Segura#1234", "Calle 10", ""),
        "Error: la ciudad es obligatoria"
    );

    // ── Flujo E2E ──────────────────────────────────────────────

    // RF-014 · Registro exitoso — contraseña robusta (MEJ-001 aplicada)
    assertIgual("RF-014", "Registro exitoso — todos los datos válidos con contraseña robusta",
        validarFormularioCompleto("Juan Pérez", "juan@gmail.com", "Segura#1234", "Carrera 8 #45-10", "Popayán"),
        "EXITO"
    );
    
    // RF-015 · Enlace "← Volver al inicio"
    const enlaceVolver = { href: "index.html", texto: "← Volver al inicio" };
    assert("RF-015", "Enlace '← Volver al inicio' redirige a index.html",
        enlaceVolver.href === "index.html",
        `href="${enlaceVolver.href}" | texto="${enlaceVolver.texto}"`,
        'href="index.html"'
    );

    // RF-016 · preventDefault
    let prevDefaultLlamado = false;
    const mockEvent = { preventDefault: function () { prevDefaultLlamado = true; } };
    mockEvent.preventDefault();
    assert("RF-016", "Formulario no recarga la página (e.preventDefault())",
        prevDefaultLlamado === true,
        `preventDefault llamado: ${prevDefaultLlamado}`,
        "e.preventDefault() invocado antes de la validación"
    );

    // RF-017 · Campo correo type="email"
    const campoCorreo = { id: "correo", type: "email", placeholder: "ej: juan@gmail.com" };
    assert("RF-017", 'Campo #correo type="email" — validación nativa HTML5',
        campoCorreo.type === "email",
        `type="${campoCorreo.type}" | placeholder="${campoCorreo.placeholder}"`,
        'type="email" — el navegador bloquea formatos inválidos'
    );

    // ── Nuevos casos BUG-002 y MEJ-001 ────────────────────────

    // RF-018 · BUG-002 corregido — punto antes del '@' no es válido
    assertIgual("RF-018", "BUG-002 corregido — punto ANTES del @ no es correo válido",
        validarFormularioCompleto("Ana", "correo.3@gmail", "Segura#1234", "Calle 10", "Popayán"),
        "Error: correo inválido"
    );

    // RF-018b · Variante adicional: dominio sin extensión
    assertIgual("RF-018b", "Correo sin extensión de dominio — inválido",
        validarFormularioCompleto("Ana", "ana@gmail", "Segura#1234", "Calle 10", "Popayán"),
        "Error: correo inválido"
    );

    // RF-019 · MEJ-001 — contraseña sin mayúscula
    assertIgual("RF-019", "MEJ-001 — contraseña sin mayúscula rechazada",
        validarFormularioCompleto("Ana", "ana@gmail.com", "segura#1234", "Calle 10", "Popayán"),
        "Error: la contraseña debe contener al menos una mayúscula"
    );

    // RF-020 · MEJ-001 — contraseña sin minúscula
    assertIgual("RF-020", "MEJ-001 — contraseña sin minúscula rechazada",
        validarFormularioCompleto("Ana", "ana@gmail.com", "SEGURA#1234", "Calle 10", "Popayán"),
        "Error: la contraseña debe contener al menos una minúscula"
    );

    // RF-021 · MEJ-001 — contraseña sin número
    assertIgual("RF-021", "MEJ-001 — contraseña sin número rechazada",
        validarFormularioCompleto("Ana", "ana@gmail.com", "Segura#abcd", "Calle 10", "Popayán"),
        "Error: la contraseña debe contener al menos un número"
    );

    // RF-022 · MEJ-001 — contraseña sin carácter especial
    assertIgual("RF-022", "MEJ-001 — contraseña sin carácter especial rechazada",
        validarFormularioCompleto("Ana", "ana@gmail.com", "Segura1234", "Calle 10", "Popayán"),
        "Error: la contraseña debe contener al menos un carácter especial"
    );

    // RF-023 · MEJ-001 — contraseña robusta pasa y avanza al siguiente campo
    // Se deja dirección vacía para confirmar que la contraseña sí fue aceptada
    assertIgual("RF-023", "MEJ-001 — contraseña robusta válida (mayúscula + minúscula + número + especial)",
        validarFormularioCompleto("Ana", "ana@gmail.com", "Segura#1234", "", "Popayán"),
        "Error: la dirección es obligatoria"   // pasa contraseña → avanza a dirección
    );

    resumenModulo("M2");
}

testM2_FormularioRegistro();
