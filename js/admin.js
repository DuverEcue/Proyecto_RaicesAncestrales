// ============================================================
//  admin.js — Lógica de Administración (Mantenibilidad)
//  Proyecto : Raíces Ancestrales
// ============================================================


document.addEventListener("DOMContentLoaded", function () {
    
    const usuarioActivo = JSON.parse(localStorage.getItem("usuario_activo"));
    
    // ── CONFIGURACIÓN DE LOS 4 INTEGRANTES ──
    const correosAutorizados = [
        "admin@raices.com",           // Correo genérico de admin
        "correo_integrante2@gmail.com", // Reemplaza con el correo de tu compañero 2
        "correo_integrante3@gmail.com", // Reemplaza con el correo de tu compañero 3
        "correo_integrante4@gmail.com"  // Reemplaza con el correo de tu compañero 4
    ];

    // VALIDACIÓN DE SEGURIDAD
    // Si no hay nadie logueado O el correo no está en la lista de los 4
    if (!usuarioActivo || !correosAutorizados.includes(usuarioActivo.correo)) {
        alert("⛔ Acceso Denegado: Solo los integrantes del proyecto pueden administrar.");
        window.location.href = "login.html"; 
        return;
    }

    // Si pasa la validación, ejecuta la función para mostrar la tabla
    cargarUsuarios();
});

function cargarUsuarios() {
    const tablaBody = document.getElementById("tablaUsuarios");
    const tablaHTML = document.getElementById("tablaPrincipal");
    const estadoVacio = document.getElementById("estadoVacio");
    const contador = document.getElementById("contadorUsuarios");

    if (!tablaBody) return; // Seguridad contra errores de carga del DOM

    // ── 2. FIABILIDAD: Tolerancia a errores ──
    let usuarios = [];
    try {
        usuarios = JSON.parse(localStorage.getItem("usuarios_raices")) || [];
    } catch (e) {
        console.error("Error al leer LocalStorage", e);
        usuarios = [];
    }

    // Actualizar el contador visual (Usabilidad)
    contador.textContent = usuarios.length;

    // Verificar si hay datos para mostrar
    if (!Array.isArray(usuarios) || usuarios.length === 0) {
        if (tablaHTML) tablaHTML.classList.add("d-none");
        if (estadoVacio) estadoVacio.classList.remove("d-none");
        return;
    } else {
        if (tablaHTML) tablaHTML.classList.remove("d-none");
        if (estadoVacio) estadoVacio.classList.add("d-none");
    }

    // Limpiar tabla antes de llenar para evitar duplicados
    tablaBody.innerHTML = "";

    // ── 3. USABILIDAD: Operabilidad (Acciones de Gestión) ──
    usuarios.forEach(function (u) {
        const fila = document.createElement("tr");
        
        // Usamos template literals para construir la fila con botones de acción
        fila.innerHTML = `
            <td><span class="id-badge">${u.id || "N/A"}</span></td>
            <td>${u.nombre || "—"}</td>
            <td>${u.correo || "—"}</td>
            <td>${u.ciudad || "No registra"}</td>
            <td class="text-center">
                <div class="btn-group" role="group">
                    <button class="btn btn-sm btn-outline-primary" onclick="editarUsuario(${u.id})">
                        Editar
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="eliminarUsuario(${u.id})">
                        Eliminar
                    </button>
                </div>
            </td>
        `;
        tablaBody.appendChild(fila);
    });
}

// ── 4. FUNCIONES DE MANTENIBILIDAD ──

function eliminarUsuario(id) {
    // Confirmación para evitar borrados accidentales (Usabilidad/Seguridad)
    if (confirm("¿Estás seguro de eliminar este registro? Esta acción es irreversible.")) {
        let usuarios = JSON.parse(localStorage.getItem("usuarios_raices")) || [];
        
        // Filtramos el array para quitar al usuario con el ID seleccionado
        usuarios = usuarios.filter(user => user.id !== id);
        
        // Guardamos la nueva lista y refrescamos la vista
        localStorage.setItem("usuarios_raices", JSON.stringify(usuarios));
        cargarUsuarios();
    }
}

function editarUsuario(id) {
    // Placeholder para futura escalabilidad del software
    alert("Módulo de edición seleccionado para el ID: " + id + "\nPróximamente disponible.");
}