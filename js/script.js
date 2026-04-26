// ============================================================
//  script.js — Lógica principal de la página de inicio
//  Proyecto : Raíces Ancestrales
// ============================================================

// ── Función de validación del buscador ──────────────────────
function validarBusqueda(query) {
    if (!query || query.trim() === "") { return "Búsqueda válida"; }
    if (/[><@#]/.test(query)) { return "Error: Caracteres no permitidos."; }
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

        const searchInput          = document.getElementById("buscadorPlantas");
        const mensajeSinResultados = document.getElementById("mensajeSinResultados");
        const cardsContainer       = document.querySelector(".container .row");

        // ── Filtrar cards según el query ─────────────────────
        function filtrarCards(valorRaw) {
            if (!cardsContainer) return;
            const todasLasCards = Array.from(cardsContainer.querySelectorAll(".col-md-3"));
            const queryRaw      = valorRaw.trim().toLowerCase();
            const query         = quitarAcentos(queryRaw);
            const resultadoVal  = validarBusqueda(valorRaw);

            if (resultadoVal !== "Búsqueda válida") {
                todasLasCards.forEach(card => card.style.display = "none");
                if (mensajeSinResultados) {
                    mensajeSinResultados.textContent = "No se encontraron resultados para tu búsqueda";
                    mensajeSinResultados.classList.remove("d-none");
                }
                return;
            }

            if (query === "") {
                todasLasCards.forEach(card => card.style.display = "");
                if (mensajeSinResultados) mensajeSinResultados.classList.add("d-none");
                return;
            }

            let hayCoincidencias = false;
            todasLasCards.forEach(card => {
                const titulo = quitarAcentos(card.querySelector(".card-title").textContent.toLowerCase());
                if (titulo.includes(query)) {
                    card.style.display = "";
                    hayCoincidencias   = true;
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
        }

        // ── Scroll suave + resaltado de la primera coincidencia ─
        function scrollAPrimeraCoincidencia() {
            if (!cardsContainer) return;
            const primera = Array.from(
                cardsContainer.querySelectorAll(".col-md-3")
            ).find(c => c.style.display !== "none");

            if (primera) {
                primera.scrollIntoView({ behavior: "smooth", block: "center" });
                const cardInner = primera.querySelector(".card");
                if (cardInner) {
                    cardInner.style.transition = "box-shadow .3s, transform .3s";
                    cardInner.style.boxShadow  = "0 0 0 3px #4a7c40, 0 6px 20px rgba(74,124,64,.4)";
                    cardInner.style.transform  = "scale(1.03)";
                    setTimeout(() => {
                        cardInner.style.boxShadow = "";
                        cardInner.style.transform = "";
                    }, 1800);
                }
            }
        }

        // ── Filtrado en tiempo real mientras escribe ─────────
        if (searchInput) {
            searchInput.addEventListener("input", function () {
                filtrarCards(this.value);
            });
        }

        // ── Botón Buscar / Enter → filtrar + scroll ──────────
        const searchForm = document.getElementById("formBusqueda");
        if (searchForm) {
            searchForm.addEventListener("submit", function (e) {
                e.preventDefault();
                if (searchInput) filtrarCards(searchInput.value);
                scrollAPrimeraCoincidencia();
            });
        }
    });

    setTimeout(() => { console.log("🌱 Explora nuestras plantas medicinales"); }, 1000);
}

// ── Función Disclaimer (modal Bootstrap) ────────────────────
function mostrarDisclaimer() {
    const modalHTML = `
        <div class="modal fade" id="disclaimerModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header" style="background-color:#f8d7da;border-bottom:2px solid #f5c6cb;">
                        <h5 class="modal-title" style="color:#721c24;">⚠️ AVISO LEGAL - Disclaimer</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <p><strong>Raíces Ancestrales Web</strong> es una plataforma educativa y cultural.</p>
                        <hr>
                        <ul>
                            <li>✅ Tiene fines <strong>educativos e informativos</strong></li>
                            <li>✅ Busca preservar el <strong>conocimiento ancestral</strong></li>
                            <li>❌ <strong>NO reemplaza</strong> la consulta médica profesional</li>
                            <li>⚠️ Consulte siempre a un <strong>médico o especialista</strong></li>
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
        </div>`;

    if (!document.getElementById("disclaimerModal")) {
        document.body.insertAdjacentHTML("beforeend", modalHTML);
    }
    new bootstrap.Modal(document.getElementById("disclaimerModal")).show();
    return false;
}

// ── Exportar para pruebas con Node.js ────────────────────────
if (typeof module !== "undefined") {
    module.exports = { validarBusqueda };
}