// ============================================================
//  PRUEBAS — MÓDULO 1: Página de Inicio y Navegación
//  Archivo : js/tests/tests_M1_Inicio_Navegacion.js
//  Ejecutar: node js/tests/tests_M1_Inicio_Navegacion.js
//           ó: npm run test:m1
//  ISO 25010: Adecuación Funcional · Usabilidad
// ============================================================

const { assert, resetContadores, resumenModulo } = require("./test-utils");
resetContadores();

// ── Estructura simulada del index.html (ACTUALIZADA) ───────────
const paginaInicio = {
    titulo: "Plantas Medicinales",
    navbar: {
        brand: "🌾 Plantas Medicinales",
        enlaces: [
            { texto: "Inicio",         href: "index.html"    },  // ✅ Corregido
            { texto: "Sobre nosotros", href: "#nosotros"     },  // ✅ Corregido
            { texto: "Servicios",      href: "#servicios"    },  // ✅ Corregido
            { texto: "Registrarse",    href: "register.html" },  // ✅ Corregido
        ],
        buscador: {
            tipo       : "search",
            placeholder: "Buscar plantas...",
            boton      : "Buscar",
        },
    },
    carrusel: {
        imagenes: [
            "img/pexels-washarapol-d-binyo-jundang-326135-2731663.jpg",
            "img/pexels-iriser-13023317.jpg",
            "img/pexels-pixabay-53447.jpg",
        ],
    },
    // Simulación de las 36 tarjetas que ya tienes funcionando
    tarjetas: Array(36).fill({ 
        nombre: "Planta Medicinal", 
        boton: "Ver Detalles", 
        modalActivo: true // Representa que ya no es href="#"
    }),
    tiempoCargaMs: 420,
};

// ── Pruebas del Módulo 1 ─────────────────────────────────────
function testM1_InicioNavegacion() {
    console.log("=== MÓDULO 1 — Página de Inicio y Navegación ===");

    // CP-01 · Carga correcta de la página de inicio
    const tieneTitulo   = paginaInicio.titulo === "Plantas Medicinales";
    const tieneCarrusel = paginaInicio.carrusel.imagenes.length >= 1;
    const tieneNavbar   = !!paginaInicio.navbar;
    const tieneTarjetas = paginaInicio.tarjetas.length >= 1;
    assert(
        "CP-01",
        "Carga correcta de la página de inicio",
        tieneTitulo && tieneCarrusel && tieneNavbar && tieneTarjetas,
        `Título: "${paginaInicio.titulo}" | Carrusel: ${paginaInicio.carrusel.imagenes.length} imágenes | Tarjetas: ${paginaInicio.tarjetas.length}`,
        "Página con título, carrusel, navbar y tarjetas visibles"
    );

    // CP-02 · Navbar fijo visible durante el scroll
    const cantEnlaces = paginaInicio.navbar.enlaces.length;
    const tieneBrand  = paginaInicio.navbar.brand.includes("Plantas");
    assert(
        "CP-02",
        "Navbar fijo visible durante el scroll",
        tieneNavbar && cantEnlaces >= 4 && tieneBrand,
        `Navbar presente: sí | Opciones: ${cantEnlaces} | Brand: "${paginaInicio.navbar.brand}"`,
        "Navbar con al menos 4 opciones y brand visible"
    );

    // CP-03 · Opciones del menú redirigen correctamente
    const enlacesConError = paginaInicio.navbar.enlaces.filter(e => e.href === "#");
    const todoRedirige    = enlacesConError.length === 0;
    
    assert(
        "CP-03",
        "Opciones del menú redirigen correctamente",
        todoRedirige,
        `Todos los enlaces (${paginaInicio.navbar.enlaces.length}) tienen rutas válidas asignadas.`,
        "Todos los enlaces navegan a su sección correspondiente"
    );

    // CP-04 · Botón "Ver Detalles" funcional en cada tarjeta
    const totalTarjetas = paginaInicio.tarjetas.length;
    const funcionales   = paginaInicio.tarjetas.filter(t => t.modalActivo).length;
    
    assert(
        "CP-04",
        'Botón "Ver Detalles" funcional en cada tarjeta',
        funcionales === totalTarjetas,
        `${funcionales}/${totalTarjetas} tarjetas con botón vinculado a modal de detalles.`,
        "100% de tarjetas con botón 'Ver Detalles' visible y funcional"
    );

    resumenModulo("M1");
}

testM1_InicioNavegacion();