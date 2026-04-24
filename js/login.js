document.addEventListener("DOMContentLoaded", function() {
    const formLogin = document.getElementById("formLogin");

    if (formLogin) {
        formLogin.addEventListener("submit", function(e) {
            e.preventDefault();

            const correo = document.getElementById("loginCorreo").value.trim().toLowerCase();
            const pass = document.getElementById("loginPassword").value;

            // Obtener usuarios de la base de datos local
            const usuarios = JSON.parse(localStorage.getItem("usuarios_raices")) || [];

            // Buscar coincidencia
            const usuarioEncontrado = usuarios.find(function(u) {
                return u.correo === correo && u.password === pass;
            });

            if (usuarioEncontrado) {
                // Guardamos el objeto completo para tener el nombre disponible
                localStorage.setItem("usuario_activo", JSON.stringify(usuarioEncontrado));
                alert("✅ ¡Bienvenido(a), " + usuarioEncontrado.nombre + "!");
                window.location.href = "index.html";
            } else {
                alert("❌ Error: Correo o contraseña incorrectos.");
            }
        });
    }
});