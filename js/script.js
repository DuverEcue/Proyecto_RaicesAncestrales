
// ============================================================
//  script.js — Lógica principal de la página de inicio
//  Proyecto : Raíces Ancestrales
// ============================================================

// ── Función de validación del buscador ──────────────────────
function validarBusqueda(query) {
    // Si está vacío, es válido (muestra todas las plantas)
    if (!query || query.trim() === "") {
        return "Búsqueda válida";
    }
    // Bloquear caracteres especiales >, <, @, #
    if (/[><@#]/.test(query)) {
        return "Error: Caracteres no permitidos.";
    }
    return "Búsqueda válida";
}

// ── Función auxiliar: quitar tildes/acentos ─────────────────
function quitarAcentos(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// ── Código DOM — solo se ejecuta en el navegador ─────────────
if (typeof window !== "undefined") {

    document.addEventListener("DOMContentLoaded", function () {
        console.log("✅ Sitio de Plantas Medicinales listo");

        // Buscador dinámico
        const searchInput = document.getElementById('buscadorPlantas');
        const mensajeSinResultados = document.getElementById('mensajeSinResultados');
        const cardsContainer = document.querySelector('.container .row');
        
        // Prevenir que el formulario recargue la página al dar Enter
        const searchForm = document.getElementById('formBusqueda');
        if (searchForm) {
            searchForm.addEventListener("submit", function (e) {
                e.preventDefault();
            });
        }

        if (searchInput && cardsContainer) {
            const todasLasCards = Array.from(cardsContainer.querySelectorAll('.col-md-3'));
            
            searchInput.addEventListener("input", function () {
                const queryRaw = this.value.trim().toLowerCase();
                const query = quitarAcentos(queryRaw);
                const resultadoValidacion = validarBusqueda(this.value);
                
                if (resultadoValidacion !== "Búsqueda válida") {
                    // Caracteres especiales: ocultar todas y mostrar mensaje
                    todasLasCards.forEach(card => card.style.display = "none");
                    if (mensajeSinResultados) {
                        mensajeSinResultados.textContent = "No se encontraron resultados para tu búsqueda";
                        mensajeSinResultados.classList.remove("d-none");
                    }
                    return;
                }
                
                if (query === "") {
                    // Mostrar todas las plantas
                    todasLasCards.forEach(card => card.style.display = "");
                    if (mensajeSinResultados) mensajeSinResultados.classList.add("d-none");
                    return;
                }
                
                let hayCoincidencias = false;
                todasLasCards.forEach(card => {
                    const tituloRaw = card.querySelector('.card-title').textContent.toLowerCase();
                    const titulo = quitarAcentos(tituloRaw);
                    if (titulo.includes(query)) {
                        card.style.display = "";
                        hayCoincidencias = true;
                    } else {
                        card.style.display = "none";
                    }
                });
                
                if (mensajeSinResultados) {
                    if (hayCoincidencias) {
                        mensajeSinResultados.classList.add("d-none");
                    } else {
                        mensajeSinResultados.textContent = "No se encontraron resultados para tu búsqueda";
                        mensajeSinResultados.classList.remove("d-none");
                    }
                }
            });
        }
    });

    setTimeout(() => {
        console.log("🌱 Explora nuestras plantas medicinales");
    }, 1000);
}

// ── Función Disclaimer (modal Bootstrap) ──
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
                        <p class="text-muted small">Ley 1751 de 2015 - Derecho fundamental a la salud</p>
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