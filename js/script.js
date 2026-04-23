// ============================================================
//  script.js — Lógica principal de la página de inicio
//  Proyecto : Raíces Ancestrales
//  Bootstrap : 5.3.8  (cargado vía CDN en index.html)
// ============================================================

// ── Función de validación del buscador ──────────────────────
//    Exportada como global para que los tests la puedan usar.
function validarBusqueda(query) {
    if (!query || query.trim() === "") {
        return "Error: Por favor, ingresa un término de búsqueda.";
    }
    return "Búsqueda válida";
}

// ── Código DOM — solo se ejecuta en el navegador ─────────────
if (typeof window !== "undefined") {

    document.addEventListener("DOMContentLoaded", function () {
        console.log("✅ Sitio de Plantas Medicinales listo");

        // Validación del formulario de búsqueda
        const searchForm = document.querySelector('form[role="search"]');
        if (searchForm) {
            searchForm.addEventListener("submit", function (e) {
                const searchInput = searchForm.querySelector('input[type="search"]');
                const query = searchInput ? searchInput.value.trim() : "";

                const resultado = validarBusqueda(query);
                if (resultado !== "Búsqueda válida") {
                    e.preventDefault();
                    alert(resultado);
                    return;
                }

                console.log("🔍 Buscando:", query);
            });
        }
    });

    setTimeout(() => {
        console.log("🌱 Explora nuestras plantas medicinales");
    }, 1000);
}

// ── Función Disclaimer (modal Bootstrap) ────────────────────
function mostrarDisclaimer() {
    const modalHTML = `
        <div class="modal fade" id="disclaimerModal" tabindex="-1" aria-labelledby="disclaimerModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header" style="background-color: #f8d7da; border-bottom: 2px solid #f5c6cb;">
                        <h5 class="modal-title" id="disclaimerModalLabel" style="color: #721c24;">
                            ⚠️ AVISO LEGAL - Disclaimer
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p><strong>Raíces Ancestrales Web</strong> es una plataforma educativa y cultural.</p>
                        <hr>
                        <p>📌 <strong>La información aquí presentada:</strong></p>
                        <ul>
                            <li>✅ Tiene fines <strong>educativos e informativos</strong></li>
                            <li>✅ Busca preservar el <strong>conocimiento ancestral</strong></li>
                            <li>❌ <strong>NO reemplaza</strong> la consulta médica profesional</li>
                            <li>⚠️ Consulte siempre a un <strong>médico o especialista</strong> antes de usar cualquier planta medicinal</li>
                            <li>📋 El uso de esta información es <strong>bajo su propia responsabilidad</strong></li>
                        </ul>
                        <hr>
                        <p class="text-muted small">Ley 1751 de 2015 - Derecho fundamental a la salud | Respeto al conocimiento tradicional</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Acepto y entiendo</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    if (!document.getElementById("disclaimerModal")) {
        document.body.insertAdjacentHTML("beforeend", modalHTML);
    }

    const modal = new bootstrap.Modal(document.getElementById("disclaimerModal"));
    modal.show();

    return false;
}

// ── Exportar para pruebas con Node.js ────────────────────────
if (typeof module !== "undefined") {
    module.exports = { validarBusqueda };
}
