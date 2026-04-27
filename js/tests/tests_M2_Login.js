// ============================================================
//  PRUEBAS — MÓDULO 2: Página de Inicio y Navegación
//  Archivo : js/tests/tests_M2_Inicio_Navegacion.js
//  Ejecutar: node js/tests/tests_M2_Inicio_Navegacion.js
//           ó: npm run test:m2
//  ISO 25010: Adecuación Funcional · Usabilidad
// ===========================================================

// Simulación de entorno (Para que Node.js entienda localStorage)
if (typeof localStorage === "undefined" || localStorage === null) {
    global.localStorage = {
        data: {},
        getItem: function (key) { return this.data[key] || null; },
        setItem: function (key, value) { this.data[key] = value.toString(); },
        removeItem: function (key) { delete this.data[key]; }
    };
}

// Importar utilidades de aserción (ajusta la ruta si es necesario)
// Si no usas import, asegúrate de tener las funciones assertIgual y assert definidas arriba
function assertIgual(id, desc, obtenido, esperado) {
    const estado = obtenido === esperado ? "✅ OK" : "❌ FALLÓ";
    console.log(`ID: ${id}\nDescripción: ${desc}\nResultado esperado: ${esperado}\nResultado obtenido: ${obtenido}\nEstado: ${estado}\n---`);
}

/**
 * LÓGICA DE LOGIN A PROBAR (Espejo de login.js)
 */
function validarSesion(correo, password) {
    const usuarios = JSON.parse(localStorage.getItem("usuarios_raices")) || [];
    const encontrado = usuarios.find(u => u.correo === correo.toLowerCase().trim() && u.password === password);

    if (encontrado) {
        localStorage.setItem("usuario_activo", JSON.stringify(encontrado));
        return "ACCESO_CONCEDIDO";
    }
    return "CREDENCIALES_INVALIDAS";
}

// ── INICIO DE PRUEBAS MÓDULO M2: LOGIN ───────────────────────
console.log("=== MÓDULO 2 — Control de Acceso (Login) ===");

// PREPARACIÓN: Insertamos un usuario en la BD simulada para las pruebas
const usuariosBase = [{ nombre: "Darwin", correo: "darwin@gmail.com", password: "Segura#1234" }];
localStorage.setItem("usuarios_raices", JSON.stringify(usuariosBase));

// RF-L01 · Login exitoso
assertIgual("RF-L01", "Credenciales correctas permiten el ingreso",
    validarSesion("darwin@gmail.com", "Segura#1234"),
    "ACCESO_CONCEDIDO"
);

// RF-L02 · Contraseña errónea
assertIgual("RF-L02", "Contraseña incorrecta deniega el acceso",
    validarSesion("darwin@gmail.com", "12345"),
    "CREDENCIALES_INVALIDAS"
);

// RF-L03 · Correo inexistente
// Mantenemos esta prueba para validar que el sistema no revela si un correo existe o no
assertIgual("RF-L03", "Correo no registrado deniega el acceso",
    validarSesion("otro@gmail.com", "Segura#1234"),
    "CREDENCIALES_INVALIDAS"
);
// RF-L04 · Case Insensitivity
assertIgual("RF-L04", "El sistema acepta correos en MAYÚSCULAS",
    validarSesion("DARWIN@GMAIL.COM", "Segura#1234"),
    "ACCESO_CONCEDIDO"
);

// RF-L05 · Verificación de persistencia de sesión
const usuarioEnSesion = JSON.parse(localStorage.getItem("usuario_activo"));
const nombreGuardado = usuarioEnSesion ? usuarioEnSesion.nombre : "Vacio";
assertIgual("RF-L05", "El sistema guarda el nombre del usuario en 'usuario_activo'",
    nombreGuardado,
    "Darwin"
);

// RF-L06 · Cierre de sesión (Logout)
localStorage.removeItem("usuario_activo");
const trasLogout = localStorage.getItem("usuario_activo");
assertIgual("RF-L06", "El cierre de sesión elimina los datos de la memoria",
    trasLogout === null ? "SESION_ELIMINADA" : "ERROR",
    "SESION_ELIMINADA"
);

console.log("=== Fin de Pruebas M2 ===");