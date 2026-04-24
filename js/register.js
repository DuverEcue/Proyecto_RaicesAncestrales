// ============================================================
//  register.js — Lógica completa de registro y persistencia
// ============================================================

// ── 1. Funciones de Validación ───────────────────────────────
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
    return "EXITO";
}

// ── 2. Lógica de Persistencia ───────────────────────────────
function guardarUsuarioLocal(usuario) {
    const usuarios = JSON.parse(localStorage.getItem("usuarios_raices")) || [];
    usuarios.push(usuario);
    localStorage.setItem("usuarios_raices", JSON.stringify(usuarios));
}

// ── 3. Manejo del DOM ───────────────────────────────────────
if (typeof window !== "undefined") {
    document.addEventListener("DOMContentLoaded", function() {
        const formRegistro = document.getElementById("formRegistro");
        
        if (formRegistro) {
            formRegistro.addEventListener("submit", function (e) {
                e.preventDefault();

                const nombreVal    = document.getElementById("Nombre").value;
                const correoVal    = document.getElementById("correo").value;
                const passwordVal  = document.getElementById("Password").value;
                const direccionVal = document.getElementById("Direccion").value;
                const ciudadVal    = document.getElementById("Ciudad").value;

                const resultado = validarFormularioCompleto(nombreVal, correoVal, passwordVal, direccionVal, ciudadVal);

                if (resultado === "EXITO") {
                    const nuevoUsuario = {
                        id: Date.now(),
                        nombre: nombreVal,
                        // Guardamos el correo siempre en minúsculas para evitar errores
                        correo: correoVal.trim().toLowerCase(), 
                        password: passwordVal, // Propiedad en minúscula
                        direccion: direccionVal,
                        ciudad: ciudadVal,
                        fechaRegistro: new Date().toLocaleString()
                    };

                    guardarUsuarioLocal(nuevoUsuario);
                    alert("✅ ¡Registro exitoso! Bienvenido a Raíces Ancestral.");
                    window.location.href = "login.html"; // Enviamos al login tras registrarse
                    
                } else {
                    alert(resultado);
                }
            });
        }
    });
}

if (typeof module !== "undefined") {
    module.exports = { validacionDatos, validarFormularioCompleto };
}