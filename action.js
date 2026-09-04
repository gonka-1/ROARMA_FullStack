var productos = [
    { id: "FR001", nombre: "Manzana Fuji", precio: 1200, stock: 150, Unidad: "KG" },
    { id: "FR002", nombre: "Naranja Valencia", precio: 1000, stock: 200, Unidad: "KG" },
    { id: "FR003", nombre: "Plátanos Cavendish", precio: 800, stock: 250, Unidad: "KG" },
    { id: "VR001", nombre: "Zanahoria Orgánica", precio: 900, stock: 100, Unidad: "KG" },
    { id: "VR002", nombre: "Espinacas Frescas", precio: 700, stock: 800, Unidad: "Bolsas" },
    { id: "VR003", nombre: "Pimientos Tricolores", precio: 1500, stock: 120, Unidad: "KG" },
    { id: "PO001", nombre: "Miel Orgánica", precio: 5000, stock: 50, Unidad: "Frasco" },
    { id: "PL001", nombre: "Leche Entera", precio: 1100, stock: 100, Unidad: "Lt" },
    { id: "PO003", nombre: "Quinoa", precio: 5000, stock: 200, Unidad: "KG" }
];

const llave = "carrito"; 

// 1. OBTENER PRODUCTO ACTUAL PRIMERO
var nombreArchivo = window.location.pathname.split("/").pop();

var mapaProductos = {
    "VistaManzana.html": "FR001",
    "VistaNaranja.html": "FR002",
    "VistaPlatano.html": "FR003",
    "VistaZanahoria.html": "VR001",
    "VistaEspinaca.html": "VR002",
    "VistaPimiento.html": "VR003",
    "VistaMiel.html": "PO001",
    "VistaLeche.html": "PL001",
    "VistaQuinoa.html": "PO003"
};

var idActual = mapaProductos[nombreArchivo] || "FR001";

var productoActual = productos.find(function(p) {
    return p.id === idActual;
});

// 2. FUNCIONES DE LÓGICA
function guardar(producto) {
    var storageActual = localStorage.getItem(llave);
    var lista = storageActual != null ? JSON.parse(storageActual) : [];

    var indiceExistente = lista.findIndex(function(item) {
        return item.id === producto.id;
    });

    if (indiceExistente !== -1) {
        lista[indiceExistente].cantidad += producto.cantidad;
    } else {
        lista.push(producto);
    }

    localStorage.setItem(llave, JSON.stringify(lista));
}

function agregarAlCarrito() {
    var select = document.getElementById("selectCantidad");
    var cantidadAComprar = parseInt(select.value);

   if (productoActual.stock <= 0 || cantidadAComprar <= 0 || cantidadAComprar > productoActual.stock) {
    alert("SIN STOCK DISPONIBLE!!\n\nNo hay suficiente stock disponible");
    return;
  }

    var producto = {
        id: productoActual.id,
        nombre: productoActual.nombre,
        precio: productoActual.precio,
        cantidad: cantidadAComprar,
        unidad: productoActual.Unidad
    };

    guardar(producto);
    productoActual.stock -= cantidadAComprar;
    actualizarInterfazStock();

    alert(`Agregaste ${cantidadAComprar} ${productoActual.Unidad} al carrito. Quedan ${productoActual.stock} ${productoActual.Unidad} en stock`);
}

function actualizarInterfazStock() {
    var select = document.getElementById("selectCantidad");
    var texto = document.getElementById("textoStock");

    texto.textContent = `(+${productoActual.stock} ${productoActual.Unidad} disponibles)`;

    var maxOpciones = productoActual.stock;

    select.innerHTML = "";

    if (maxOpciones <= 0) {
        select.innerHTML = '<option value="0">Sin stock</option>';
        select.disabled = true;
    } else {
        select.disabled = false;
        for (var i = 1; i <= maxOpciones; i++) {
            select.innerHTML += `<option value="${i}">${i} ${productoActual.Unidad}</option>`;
        }
    }
}

actualizarInterfazStock();