const productsURL = 'https://fakestoreapi.com/products';
const dolar = 893;

fetch(productsURL)
    .then((respuesta) => respuesta.json())

    .then((respuestaFINAL) => {
        console.log(respuestaFINAL)
        // Pintar esos elementos en nuestro html
        pintarProductos(respuestaFINAL)
    })
    .catch((error) => {
        console.log("Error fetch", error)
    })


function pintarProductos(productos) {
    // Obtener el DIV product-wrapper del DOM
    // Iterar el array de productos obtenidos asincronamente en mi peticion al servidor fakeapi
    // Por cada producto, crear un div con la clase product-card
    const productWrapperHTML = document.querySelector('#product-wrapper');
    productWrapperHTML.innerHTML = ""

    productos.forEach((producto) => {
        productWrapperHTML.innerHTML +=
            `<div class="col-12 col-md-6 col-lg-4 col-xl-3">
                <div class="card shadow w-100">
                <img
                    class="card-img-top card-image"
                    src="${producto.image}"
                    alt="${producto.title}"
                />

                <div class="card-body">
                    <h5 class="card-title card-main-title" title="${producto.title}">
                        ${producto.title}
                    </h5>

                    <p class="card-text">${producto.description}</p>

                    <h5 class="text-primary text-center">$ ${ parseInt(producto.price * dolar) }</h5>
                    
                    <a href="" class="btn btn-primary">Ver detalles</a>
                </div>
                </div>
            </div>`
    });



}
