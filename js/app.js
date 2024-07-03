// Variables y selectores
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');

// Eventos

eventListener();
function eventListener() {
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);
    formulario.addEventListener('submit', agregarGasto);
}

// Clases
class Presupuesto {
    constructor(presupuesto) {
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];
    }

    nuevoGasto(gasto) {
        this.gastos = [...this.gastos, gasto];
        console.log(this.gastos);
        // const nombre = document.querySelector('#gasto').value;
        // const cantidad = Number(document.querySelector('#cantidad').value);
    }
}

class UI {
    insertarPresupuesto(cantidad) {
        // Extrayendo valores
        const { presupuesto, restante } = cantidad;

        //Agregar al HTML
        document.querySelector('#total').textContent = presupuesto;
        document.querySelector('#restante').textContent = restante;
    }

    imprimirAlerta(mensaje, tipo){
        // Crear elemento div
        const div = document.createElement('div');
        div.classList.add('text-center', 'alert');

        if (tipo === 'error') {
            div.classList.add('alert-danger');
        } else {
            div.classList.add('alert-success');
        }
        
        // Agregar mensaje
        div.textContent = mensaje;

        // Insertar en el HTML
        document.querySelector('.primario').insertBefore(div, formulario);

        // Eliminar despues de 3 segundos
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 3000);
    }

    agregarGastoLista(gastos) {
        // Iterrar sobre los gastos
        gastos.forEach(gasto => {
            console.log(gastos);
            // Crear elemento li
            // const li = document.createElement('li');
            // li.className = 'list-group-item d-flex justify-content-between align-items-center';
            // li.innerHTML = `
                // ${gasto.nombre}
                // <span class="badge badge-primary badge-pill">$${gasto.cantidad}</span>
            // `;  
    })
}

let presupuesto;

// Instanciar
const ui = new UI();

// Funciones
function preguntarPresupuesto() {
    const presupuestoUsuario = prompt('¿Cual es tu presupuesto?');

    Number(presupuestoUsuario);

    if (isNaN(presupuestoUsuario) || presupuestoUsuario <= 0) {
        window.location.reload();
    }

    presupuesto = new Presupuesto(presupuestoUsuario);

    ui.insertarPresupuesto(presupuesto);
};

function agregarGasto(e) {
    e.preventDefault();

    // Leer datos del formulario
    const nombreGasto = document.querySelector('#gasto').value;
    const cantidadGasto = Number(document.querySelector('#cantidad').value);

    // Validar datos
    if (nombreGasto === '' || cantidadGasto === 0) {
        ui.imprimirAlerta('Ambos campos son obligatorios', 'error');
        return;
    } else if (cantidadGasto <= 0 || isNaN(cantidadGasto)) {
        ui.imprimirAlerta('La cantidad no es valida', 'error');
        return;
    }
    
    // Generar un objeto con el gasto
    const gasto = {nombreGasto, cantidadGasto, id: Date.now()};
    presupuesto.nuevoGasto(gasto);
    
    // Mensaje correcto
    ui.imprimirAlerta('Gasto agregado correctamente');

    // Agregar el gasto a la lista
    const {gastos} = presupuesto;
    ui.agregarGastoLista(gastos);

    // Reinicia el formulario
    formulario.reset();
}