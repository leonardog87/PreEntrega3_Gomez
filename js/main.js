//moveArrows
const indexgalleryContainers = document.querySelectorAll('.index-carousel');

const nxtBtn = document.querySelectorAll('.nxt-btn');
const preBtn = document.querySelectorAll('.pre-btn');

//arrows and scroll carousel
indexgalleryContainers.forEach((item, i) => {
    let containerDimensions = item.getBoundingClientRect();
    let containerWidth = containerDimensions.width;
    let containerFinalWidth = containerWidth / 2;

    nxtBtn[i].addEventListener('click', () => {
        item.scrollLeft += containerFinalWidth;
    })

    preBtn[i].addEventListener('click', () => {
        item.scrollLeft -= containerFinalWidth;
    })

    indexgalleryContainers[i].addEventListener('wheel', (e) => {
        e.preventDefault();
        e.deltaY > 0 ? item.scrollLeft += containerFinalWidth : item.scrollLeft -= containerFinalWidth;
    })
});

//carrito-side-effect
function mostrar() {
    carrito = JSON.parse(localStorage.getItem('carrito'))
    document.getElementById('carritoContainer').style.display = 'block';
    showInHTML()
}

function ocultar() {
    document.getElementById('carritoContainer').style.display = 'none';
}

//carrito
//identifico de donde extraigo la data y donde se inserta en el HTML
const carritoProductWeb = document.getElementById('carritoProductWeb'); //ubicacion donde meto la data en el HTML
const productCard = document.getElementById('productCard'); //estructura que voy a meter (product-card)
const productCardList = document.getElementById('indexCarousel'); //contenedor de donde saco la data para las product-card
let carrito = [];
// carrito = JSON.parse(localStorage.getItem('carrito'))

let carritoTotal = document.getElementById('carritoTotal');

productCardList.addEventListener('click', (e) => {
    if (e.target.classList.contains('product-card-button')) {

        const product = e.target.parentElement;

        const productInfo = {
            imageId: product.querySelector('.product-card-img img').id,
            imageSrc: product.querySelector('.product-card-img img').src,
            imageAlt: product.querySelector('.product-card-img img').alt,
            title: product.querySelector('.product-card-title').textContent,
            price: product.querySelector('.product-card-price').textContent,
            quanty: 1
        }

        const ifExistProduct = carrito.some(product => product.imageId === productInfo.imageId)

        if (ifExistProduct) {
            const products = carrito.map(product => {
                return product.imageId === productInfo.imageId ? product.quanty++ && product : product;
            })

            carrito = [...products];
        }

        else {
            carrito = [...carrito, productInfo]
        }
        showInHTML();
    }
})

//eliminar elemento
carritoProductWeb.addEventListener('click', (e) => {
    if (e.target.classList.contains('tacho')) {
        const product = e.target.parentElement.parentElement.parentElement;
        const imageId = product.querySelector('.product-card-img img').id;

        carrito = carrito.filter(
            product => product.imageId !== imageId
        );
        showInHTML();
    };
});

//mostrar productos carrito html
const showInHTML = () => {
    carritoProductWeb.innerHTML = [];
    let total = 0; 

    carrito.forEach(product => {
        const containerProduct = document.createElement('div');
        containerProduct.classList.add('product-card');

        containerProduct.innerHTML = `
        <div class="product-card-img">
                        <img id=${product.imageId} src=${product.imageSrc} alt=${product.imageAlt}>
                    </div>
                    <div class="product-card-text">
                        <div class="product-card-text-component_tittle">
                            <p>${product.title}</p>
                        </div>
                        <div class="product-card-text-component_description">
                            <p>Lorem ipsum dolor sit amet consectetur</p>
                        </div>
                        <div class="product-card-text-component_price">
                            <p class="product-card-price">${product.price}</p>
                        </div>
                    </div>
                    <div class="product-card-buttons">
                        <div class="#!">
                            <img class="tacho" src="assets/icons/delete_16.png" alt="img-list1">
                        </div>
                        <div class="cantidad" id="quantyBox">
                        <img src="assets/icons/minus-16.png" alt="icon-minus16" id="icon-minus" class="icon-minus">
                            <input class="cantidadCarrito" type="number" value="${product.quanty}">
                        <img src="assets/icons/plus-16.png" alt="icon-plus16" id="icon-plus" class="icon-plus">
                        </div>
                    </div>
        `
        carritoProductWeb.append(containerProduct);
        total = total + parseFloat(product.quanty * product.price.slice(1));
    });
    carritoTotal.innerHTML = `$${total.toFixed(3)}`;
    saveLocalstorage()
};

//sumar producto
carritoProductWeb.addEventListener('click', (e) => {
    if (e.target.classList.contains('icon-plus')) {

        const product = e.target.parentElement.parentElement.parentElement;

        const productInfo = {
            imageId: product.querySelector('.product-card-img img').id,
            quanty: product.querySelector('.cantidadCarrito').value,
        }

        const ifRepeatProduct = carrito.some(product => product.imageId === productInfo.imageId)

        if (ifRepeatProduct) {
            const products = carrito.map(product => {

                if (product.imageId === productInfo.imageId) {
                    product.quanty++
                    return product
                }
                else {
                    return product;
                }
            })
            carrito = [...products];
        }
        else {
            carrito = [...carrito, productInfo]
        }

        showInHTML()

    }
});

// restar producto
carritoProductWeb.addEventListener('click', (e) => {
    if (e.target.classList.contains('icon-minus')) {

        const product = e.target.parentElement.parentElement.parentElement;

        const productInfo = {
            imageId: product.querySelector('.product-card-img img').id,
            quanty: product.querySelector('.cantidadCarrito').value,
        }

        const ifRepeatProduct = carrito.some(product => product.imageId === productInfo.imageId)

        if (ifRepeatProduct) {
            const products = carrito.map(product => {
                if (product.imageId === productInfo.imageId) {
                    if (product.quanty === 1) {
                        return product;
                    }
                    else {
                        product.quanty--;
                        return product;
                    }
                }
                else {
                    return product;
                }
            })
            carrito = [...products];
        }
        else {
            carrito = [...carrito, productInfo]
        }
        showInHTML()
    }
});


//localstorage set
const saveLocalstorage = () => {
    localStorage.setItem('carrito', JSON.stringify(carrito))
};
//localstorage get
// const recuperar = () => {
//     JSON.parse(localStorage.getItem('carrito'))
// }
// recuperar()

console.log(JSON.parse(localStorage.getItem('carrito')))

