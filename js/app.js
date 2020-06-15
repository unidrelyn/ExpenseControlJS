const presupuestoTotal = prompt('ingrese el valor total');
const formulario = document.getElementById('agregar-gasto');
let cantidad;

class Presupuesto {
	constructor(presupuesto) {
		this.presupuesto = Number(presupuesto);
		this.restante = Number(presupuesto);
	}

	PresupuestoRestante(cantidad = 0) {
		return (this.restante -= Number(cantidad));
	}
}

class Interfaz {
	insertarPresupuesto({ presupuesto, restante }) {
		const presuSpan = document.querySelector('span#total');
		const restSpan = document.querySelector('span#restante');

		presuSpan.innerHTML = `${presupuesto}`;
		restSpan.innerHTML = `${restante}`;
	}

	mensaje(msn, tipo) {
		const divMensaje = document.createElement('div');
		divMensaje.classList.add('text-center', 'alert');

		tipo === 'error'
			? divMensaje.classList.add('alert-danger')
			: divMensaje.classList.add('alert-success');

		divMensaje.appendChild(document.createTextNode(msn));

		document.querySelector('.primario').insertBefore(divMensaje, formulario);

		setTimeout(() => {
			document.querySelector('.primario .alert').remove();
			formulario.reset();
		}, 3000);
	}

	agregarGastoLista(nombre, cantidad) {
		const listaGastos = document.querySelector('#gastos ul');

		const li = document.createElement('li');
		li.className =
			'list-group-item d-flex justify-content-between align-items-center';

		li.innerHTML = `
		${nombre}
		<span class="badge badge-primary badge-pill"> $${cantidad} </span>`;

		listaGastos.appendChild(li);
	}

	presupuestoRestanteUsuario(cantidadGasto) {
		const restSpan = document.querySelector('span#restante');

		let cantidadNew = cantidad.PresupuestoRestante(cantidadGasto);

		restSpan.innerHTML = `${cantidadNew}`;

		this.comprobrarPresupuesto();
	}

	comprobrarPresupuesto() {
		const preTotal = cantidad.presupuesto;
		const resTotal = cantidad.restante;

		const restSpan = document.querySelector('.restante');

		if (preTotal / 4 > resTotal) {
			restSpan.classList.remove('alert-sucess alert-warning');
			restSpan.classList.add('alert-danger');
		} else if (preTotal / 2 > resTotal) {
			restSpan.classList.remove('alert-sucess');
			restSpan.classList.add('alert-warning');
		}
	}
}

document.addEventListener('DOMContentLoaded', function () {
	if (presupuestoTotal === null || presupuestoTotal === '') {
		window.location.reload();
	} else {
		cantidad = new Presupuesto(presupuestoTotal);
		const userInterfaz = new Interfaz();
		userInterfaz.insertarPresupuesto(cantidad);
	}
});

formulario.addEventListener('submit', function (e) {
	e.preventDefault();
	const nombreGasto = document.getElementById('gasto').value;
	const cantidadGasto = document.getElementById('cantidad').value;

	const userInterfaz = new Interfaz();

	if (nombreGasto === '' || cantidadGasto === '') {
		userInterfaz.mensaje('faltan datos', 'error');
	} else {
		userInterfaz.mensaje('Datos completos', 'correcto');
		userInterfaz.agregarGastoLista(nombreGasto, cantidadGasto);
		userInterfaz.presupuestoRestanteUsuario(cantidadGasto);
	}
});
