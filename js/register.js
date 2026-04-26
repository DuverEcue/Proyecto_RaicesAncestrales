// ============================================================
//  register.js — Lógica del formulario de registro
//  Proyecto : Raíces Ancestrales
// ============================================================

// ── Funciones de validación (Lógica pura) ─────────────────────

function validacionDatos(correo) {
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
    if (!regexCorreo.test(correo)) {
        return "Error: correo inválido";
    }
    return "validacion de datos correctos";
}

function validarPassword(password) {
    if (!password || password.trim() === "") {
        return "Error: la contraseña es obligatoria";
    }
    const passwordTrim = password.trim();
    if (passwordTrim.length < 8) {
        return "Error: la contraseña debe tener al menos 8 caracteres";
    }

    const tieneMayuscula = /[A-Z]/.test(passwordTrim);
    const tieneMinuscula = /[a-z]/.test(passwordTrim);
    const tieneNumero    = /[0-9]/.test(passwordTrim);
    const tieneEspecial  = /[!@#$%^&*()\-_=+\[\]{};:'",.<>/?\\|`~]/.test(passwordTrim);

    if (!tieneMayuscula) return "Error: la contraseña debe contener al menos una mayúscula";
    if (!tieneMinuscula) return "Error: la contraseña debe contener al menos una minúscula";
    if (!tieneNumero)    return "Error: la contraseña debe contener al menos un número";
    if (!tieneEspecial)  return "Error: la contraseña debe contener al menos un carácter especial";

    return "password valida";
}

function validarFormularioCompleto(nombre, correo, password, direccion, ciudad) {
    if (!nombre || nombre.trim() === "") return "Error: el nombre es obligatorio";
    
    const resCorreo = validacionDatos(correo);
    if (resCorreo !== "validacion de datos correctos") return resCorreo;

    const resPass = validarPassword(password);
    if (resPass !== "password valida") return resPass;

    if (!direccion || direccion.trim() === "") return "Error: la dirección es obligatoria";
    if (!ciudad || ciudad.trim() === "") return "Error: la ciudad es obligatoria";

    return "EXITO";
}

// ── Código DOM — Registro y Almacenamiento ───────────────────
if (typeof window !== "undefined") {
    document.addEventListener("DOMContentLoaded", function() {
        const form = document.getElementById("formRegistro");
        
        if (form) {
            form.addEventListener("submit", function(e) {
                e.preventDefault();

                // Capturar valores
                const nombreVal = document.getElementById("Nombre").value;
                const correoVal = document.getElementById("correo").value.toLowerCase();
                const passVal   = document.getElementById("Password").value;
                const dirVal    = document.getElementById("Direccion").value;
                const ciuVal    = document.getElementById("Ciudad").value;

                const resultado = validarFormularioCompleto(nombreVal, correoVal, passVal, dirVal, ciuVal);

                if (resultado === "EXITO") {
                    // --- PROCESO DE GUARDADO ---
                    
                    // 1. Obtener lista actual de usuarios o crear una nueva
                    const usuarios = JSON.parse(localStorage.getItem("usuarios_raices")) || [];

                    // 2. Verificar si el correo ya existe para evitar duplicados
                    const existe = usuarios.some(u => u.correo === correoVal);
                    if (existe) {
                        alert("❌ Error: Este correo ya está registrado.");
                        return;
                    }

                    // 3. Crear el nuevo objeto de usuario
                    const nuevoUsuario = {
                        id: Date.now(), // Genera un ID único basado en tiempo
                        nombre: nombreVal,
                        correo: correoVal,
                        password: passVal, // Nota: En producción esto debería ir encriptado
                        direccion: dirVal,
                        ciudad: ciuVal
                    };

                    // 4. Guardar en la lista y actualizar localStorage
                    usuarios.push(nuevoUsuario);
                    localStorage.setItem("usuarios_raices", JSON.stringify(usuarios));

                    // 5. Notificar y redirigir al login
                    alert("✅ ¡Registro exitoso! Ahora puedes iniciar sesión.");
                    window.location.href = "login.html"; 

                } else {
                    alert(resultado);
                }
            });
        }
    });
}

// Exportar para Node.js
if (typeof module !== "undefined" && module.exports) {
    module.exports = { validacionDatos, validarPassword, validarFormularioCompleto };
}