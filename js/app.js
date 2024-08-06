//variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
    //agregar un curso presionando "agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);

    // elimina cursos del carrito
    carrito.addEventListener('click' ,eliminarCurso)

    // Muestra los cursos de Local Storage
    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse( localStorage.getItem('carrito') ) || [];

        carritoHTML();
    })

    // vaciar el carrito 
    vaciarCarrito.addEventListener('click', () => {
        articulosCarrito = [];
        carritoHTML();
    })
}


//funciones
function agregarCurso (e) {
    e.preventDefault();
    
    if(e.target.classList.contains('agregar-carrito') ) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
        // console.log('agregando al carrito...');
        // console.log(e.target.parentElement.parentElement);
        //console.log(e.target.classList);
    }
}

function eliminarCurso (e) {
    if(e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');
        // elimina del arreglo por el data-id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId );
        carritoHTML();
       }
}

//leer el contenido del HTML al cual se le dio click extrayendo su info del curso
function leerDatosCurso (curso) {
    // console.log(curso);

    //crear un objeto
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //revisa si un elemento esta en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id );
    if (existe){
        // actualizar la cantidad
        const cursos = articulosCarrito.map( curso => {
            if ( curso.id === infoCurso.id ) {
                curso.cantidad++;
                return curso; // retorna objetos duplicados
            }  else {
                return curso; // retorna objetos no duplicados
            }
        } );
    }
    else {
        // agregar al carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    carritoHTML();
}

//muestra el carrito de compras en e HTML
function carritoHTML (){

    // Limpiar HTML
    LimpiarHTML();



    
    //recorrer el carrito
    articulosCarrito.forEach (  curso => {
        const {imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>  <img src="${imagen}" width="100">  </td>
        <td>  ${titulo}  </td>
        <td>  ${precio}  </td>
        <td>  ${cantidad}  </td>
        <td>  <a href="#" class="borrar-curso" data-id="${id}">  X  </a>  </td> `;

        // Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    })

    //Agregar el carrito de compras al localStorage
    sincronizarStorage();
}


function sincronizarStorage(){
    localStorage.setItem('carrito',JSON.stringify(articulosCarrito));
}

// Elemina los cursos del Tbody
function LimpiarHTML() {
    //forma lenta
    // contenedorCarrito.innerHTML = '';

    //forma rapida
    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}