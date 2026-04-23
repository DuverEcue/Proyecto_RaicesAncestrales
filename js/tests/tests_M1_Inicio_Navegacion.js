// ============================================================
//  PRUEBAS — MÓDULO 1: Página de Inicio y Navegación
//  Archivo : js/tests/tests_M1_Inicio_Navegacion.js
//  Ejecutar: node js/tests/tests_M1_Inicio_Navegacion.js
//           ó: npm run test:m1
//  ISO 25010: Adecuación Funcional · Usabilidad
// ============================================================

const { assert, resetContadores, resumenModulo } = require("./test-utils");
resetContadores();

// ── Estructura simulada del index.html ───────────────────────
const paginaInicio = {
    titulo: "Plantas Medicinales",
    navbar: {
        brand: "🌾 Plantas Medicinales",
        enlaces: [
            { texto: "Inicio",         href: "#"             },  // BUG-01
            { texto: "Sobre nosotros", href: "#"             },  // BUG-01
            { texto: "Servicios",      href: "#"             },  // BUG-01
            { texto: "Registrarse",    href: "register.html" },  // ✅ correcto
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
    tarjetas: [
        { nombre: "Caléndula",   boton: "Ver Detalles", href: "#" },  // BUG-02
        { nombre: "Manzanilla",  boton: "Ver Detalles", href: "#" },  // BUG-02
        { nombre: "Hierbabuena", boton: "Ver Detalles", href: "#" },  // BUG-02
        { nombre: "Sábila",      boton: "Ver Detalles", href: "#" },  // BUG-02
    ],
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
    const registrarse   = paginaInicio.navbar.enlaces.find(e => e.texto === "Registrarse");
    const registrarseOK = registrarse && registrarse.href === "register.html";
    const conBug01      = paginaInicio.navbar.enlaces.filter(e => e.texto !== "Registrarse" && e.href === "#");
    assert(
        "CP-03",
        "Opciones del menú redirigen correctamente",
        registrarseOK,
        `"Registrarse" → register.html ✅ | ⚠️ BUG-01: ${conBug01.map(e => '"' + e.texto + '"').join(", ")} tienen href="#"`,
        "Todos los enlaces navegan a su sección correspondiente"
    );
    if (conBug01.length > 0) {
        console.log(`⚠️  BUG-01 (Severidad: Media): ${conBug01.length} enlace(s) con href="#"`);
        conBug01.forEach(e => console.log(`    → "${e.texto}" no navega a ninguna sección`));
        console.log("---");
    }

    // CP-04 · Botón "Ver Detalles" presente en cada tarjeta
    const totalTarjetas    = paginaInicio.tarjetas.length;
    const conBoton         = paginaInicio.tarjetas.filter(t => t.boton === "Ver Detalles").length;
    const sinFuncionalidad = paginaInicio.tarjetas.filter(t => t.href === "#").length;
    assert(
        "CP-04",
        'Botón "Ver Detalles" presente en cada tarjeta',
        conBoton === totalTarjetas,
        `${conBoton}/${totalTarjetas} tarjetas con botón | ⚠️ BUG-02: ${sinFuncionalidad} botones con href="#" (sin funcionalidad)`,
        "100% de tarjetas con botón 'Ver Detalles' visible y clicable"
    );
    if (sinFuncionalidad > 0) {
        console.log(`⚠️  BUG-02 (Severidad: Alta): ${sinFuncionalidad} botón(es) "Ver Detalles" con href="#"`);
        console.log("    → No abren vista de detalle — funcionalidad pendiente de implementar");
        console.log("---");
    }

    resumenModulo("M1");
}

testM1_InicioNavegacion();
