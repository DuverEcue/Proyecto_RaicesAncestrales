// ============================================================
//  register.js — Lógica del formulario de registro
//  Proyecto : Raíces Ancestrales
//  Bootstrap : 5.3.8  (cargado vía CDN en register.html)
// ============================================================

// ── Funciones de validación ──────────────────────────────────
//    Definidas como globales para que los tests las importen.

function validacionDatos(nombre, correo) {
    if (!nombre || nombre.trim() === "") {
        return "Error: el nombre es obligatorio";
    }
    if (!correo.includes("@") || !correo.includes(".")) {
        return "Error: correo inválido";
    }
    return "validacion de datos correctos";
}

function validarFormularioCompleto(nombreVal, correoVal, passwordVal, direccionVal, ciudadVal) {
    const resultadoNombre = validacionDatos(nombreVal, correoVal);
    if (resultadoNombre !== "validacion de datos correctos") {
        return resultadoNombre;
    }
    if (!passwordVal || passwordVal.trim() === "") {
        return "Error: la contraseña es obligatoria";
    }
    if (passwordVal.length < 8) {
        return "Error: la contraseña debe tener al menos 8 caracteres";
    }
    if (!direccionVal || direccionVal.trim() === "") {
        return "Error: la dirección es obligatoria";
    }
    if (!ciudadVal || ciudadVal.trim() === "") {
        return "Error: la ciudad es obligatoria";
    }
    return "✅ ¡Registro exitoso! Todos los datos son válidos";
}

// ── Código DOM — solo se ejecuta en el navegador ─────────────
if (typeof window !== "undefined") {

    const formRegistro = document.getElementById("formRegistro");
    const nombre       = document.getElementById("Nombre");
    const correo       = document.getElementById("correo");
    const password     = document.getElementById("Password");
    const direccion    = document.getElementById("Direccion");
    const ciudad       = document.getElementById("Ciudad");

    formRegistro.addEventListener("submit", function (e) {
        e.preventDefault();

        const nombreVal    = nombre.value;
        const correoVal    = correo.value;
        const passwordVal  = password.value;
        const direccionVal = direccion.value;
        const ciudadVal    = ciudad.value;

        const resultado = validarFormularioCompleto(nombreVal, correoVal, passwordVal, direccionVal, ciudadVal);

        console.log("📋 Resultado de validación:", resultado);
        alert(resultado);
    });
}

// ── Exportar para pruebas con Node.js ────────────────────────
if (typeof module !== "undefined") {
    module.exports = { validacionDatos, validarFormularioCompleto };
}
