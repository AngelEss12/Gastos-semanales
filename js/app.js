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
    console.log(presupuesto);

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

    console.log('Agregando Gasto');
}