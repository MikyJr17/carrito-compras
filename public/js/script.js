$(document).ready(function () {
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Productos
    var products = [
        {
            name: 'Hamburguesa con queso',
            category: 'Comidas rápidas',
            price: 100.00,
            image: 'https://th.bing.com/th/id/OSK.a66b44ebc0e4c4849cad43579acf8ec9?w=474&h=316&o=6&rs=1&pid=ImgDetMain'
        },
        {
            name: 'Pizza de pepperoni',
            category: 'Pizzas',
            price: 150.00,
            image: 'https://th.bing.com/th/id/OIP.K-Md0TMqYugfMTRfoGy2UwHaE8?rs=1&pid=ImgDetMain'
        },
        {
            name: 'Ensalada César',
            category: 'Ensaladas',
            price: 80.00,
            image: 'https://recetasdepollo.online/wp-content/uploads/2017/09/ensalada-cesar-con-pollo.jpg'
        },
        {
            name: 'Sushi variado',
            category: 'Comida asiática',
            price: 200.00,
            image: 'https://th.bing.com/th/id/OIP.3qHetrdW-F6AbkN5V1oYgAHaE8?rs=1&pid=ImgDetMain'
        },
        {
            name: 'Pasta Alfredo',
            category: 'Pastas',
            price: 120.00,
            image: 'https://res.cloudinary.com/norgesgruppen/images/c_scale,dpr_auto,f_auto,q_auto:eco,w_1600/tulcxcntmwnys5ndgqvk/pasta-alfredo'
        },
        {
            name: 'Tacos de carne asada',
            category: 'Comida mexicana',
            price: 90.00,
            image: 'https://lasrecetasdelchef.net/wp-content/uploads/2016/11/Tacos-de-Carne-Asada.jpg'
        },
        {
            name: 'Sopa de pollo',
            category: 'Sopas',
            price: 60.00,
            image: 'https://www.hola.com/imagenes/cocina/recetas/20171013100547/receta-sopa-pollo/0-741-140/sopa-pollo-t.jpg'
        },
        {
            name: 'Sándwich de pollo a la parrilla',
            category: 'Sándwiches',
            price: 70.00,
            image: 'https://th.bing.com/th/id/R.3a878ade7c4f8b05d6800be40d1cdfed?rik=3XceGecAKFy9XQ&riu=http%3a%2f%2fst.depositphotos.com%2f1692343%2f4854%2fi%2f950%2fdepositphotos_48549569-stock-photo-healthy-grilled-chicken-sandwich.jpg&ehk=r6FIYL%2bTcLl0Aop8NlfHF13xPEi93HSoG3Y%2b45xSjfI%3d&risl=&pid=ImgRaw&r=0'
        },
        {
            name: 'Postre de chocolate',
            category: 'Postres',
            price: 40.00,
            image: 'https://www.cucinare.tv/wp-content/uploads/2020/01/Volc%C3%A1n-de-chocolate.jpg'
        },
        {
            name: 'Café americano',
            category: 'Bebidas calientes',
            price: 30.00,
            image: 'https://www.cubaneandoconmario.com/wp-content/uploads/2017/01/Caf%C3%A9-americano.jpg'
        }
    ];

    // Función para renderizar las tarjetas de productos
    function renderProductCards(productsToShow) {
        var productsContainer = $('.products-container');
        productsContainer.empty();
        productsToShow.forEach(function (product) {
            var cardHtml =
                '<div class="col-md-4 mb-3">' +
                '<div class="card" style="width: 18rem;">' +
                '<img src="' + product.image + '" class="card-img-top img-fluid product-image" alt="' + product.name + '">' +
                '<div class="card-body">' +
                '<h5 class="card-title">' + product.name + '</h5>' +
                '<p class="card-text">Categoría: ' + product.category + '</p>' +
                '<p class="card-text">Precio: ' + product.price.toFixed(2) + ' Bs. </p>' +
                '<button class="btn btn-primary addToCartBtn" data-product="' + product.name + '" data-category="' + product.category + '" data-price="' + product.price.toFixed(2) + '">Agregar al Carrito</button>' +
                '</div>' +
                '</div>' +
                '</div>';
            productsContainer.append(cardHtml);
        });
    }

    // Función para agregar un nuevo producto al carrito
    function addToCart(productName, category, price) {
        var existingItemIndex = cartItems.findIndex(function (item) {
            return item.name === productName;
        });

        if (existingItemIndex !== -1) {
            cartItems[existingItemIndex].quantity++;
            toastr.info('Se ha agregado una unidad de ' + productName + ' al carrito.', '', { positionClass: 'toast-bottom-right' });
        } else {
            var newItem = {
                name: productName,
                category: category,
                price: price,
                quantity: 1
            };
            cartItems.push(newItem);
            toastr.info('Se ha agregado ' + productName + ' al carrito.', '', { positionClass: 'toast-bottom-right' });
        }

        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        updateCartItemCount();
    }

    // Función para actualizar el contador de ítems en el carrito
    function updateCartItemCount() {
        var totalCount = cartItems.reduce(function (acc, item) {
            return acc + item.quantity;
        }, 0);

        // Actualiza el contador solo si hay productos en el carrito
        if (totalCount > 0) {
            $('#cartItemCount').text(totalCount).show();
            $('#proceedToPaymentBtn').show(); // Muestra el botón "Proceder al Pago" si hay productos en el carrito
        } else {
            $('#cartItemCount').hide();
            $('#proceedToPaymentBtn').hide(); // Oculta el botón "Proceder al Pago" si no hay productos en el carrito
        }

        // Control de visibilidad del botón Vaciar Carrito y el mensaje de "0 productos en el carrito"
        if (totalCount === 0) {
            $('#clearCartBtn').hide();
            $('#cartItemList').html('<tr><td colspan="4">No hay productos en el carrito.</td></tr>');
        } else {
            $('#clearCartBtn').show();
        }
    }


    // Función para renderizar los ítems del carrito
    function renderCartItems() {
        $('#cartItemList').empty();
        if (cartItems.length === 0) {
            $('#cartItemList').html('<tr><td colspan="4">No hay productos en el carrito.</td></tr>');
            $('#clearCartBtn').hide();
            return;
        }
        var total = 0;
        cartItems.forEach(function (item, index) {
            var subtotal = item.price * item.quantity;
            total += subtotal;
            var listItem =
                '<tr class="text-center">' +
                '<td>' + item.name + '</td>' +
                '<td>' +
                '<div class="input-group">' +
                '<div class="input-group-prepend">' +
                '<button type="button" class="btn btn-sm btn-secondary decreaseQuantityBtn" data-index="' + index + '"><i class="fas fa-minus"></i></button>' +
                '</div>' +
                '<span class="quantity form-control">' + item.quantity + '</span>' +
                '<div class="input-group-append">' +
                '<button type="button" class="btn btn-sm btn-secondary increaseQuantityBtn" data-index="' + index + '"><i class="fas fa-plus"></i></button>' +
                '</div>' +
                '</div>' +
                '</td>' +
                '<td>' + parseFloat(item.price).toFixed(2) + ' Bs.</td>' +
                '<td>' + subtotal.toFixed(2) + ' Bs.</td>' +
                '<td><button type="button" class="btn btn-sm btn-danger removeCartItemBtn" data-index="' + index + '"><i class="fas fa-trash"></i></button></td>' +
                '</tr>';
            $('#cartItemList').append(listItem);
        });
        $('#cartItemList').append('<tr class="text-center"><td colspan="3"><strong>Total:</strong></td><td>' + total.toFixed(2) + ' Bs.  </td></tr>');
    }

    // Evento click para agregar al carrito
    $(document).on('click', '.addToCartBtn', function () {
        var productName = $(this).data('product');
        var category = $(this).data('category');
        var price = $(this).data('price');
        addToCart(productName, category, price);
    });

    // Evento click para mostrar el carrito
    $('#cartLink').click(function () {
        renderCartItems();
    });

    // Evento click para vaciar el carrito
    $('#clearCartBtn').click(function () {
        if (cartItems.length > 0) {
            toastr.warning('El carrito se ha vaciado.', '', { positionClass: 'toast-bottom-right' });
        }
        cartItems = [];
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        renderCartItems();
        updateCartItemCount();
    });

    // Evento click para remover un ítem del carrito
    $(document).on('click', '.removeCartItemBtn', function () {
        var index = $(this).data('index');
        var removedProductName = cartItems[index].name;
        cartItems.splice(index, 1);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        renderCartItems();
        updateCartItemCount();
        toastr.warning('Se ha quitado ' + removedProductName + ' del carrito.', '', { positionClass: 'toast-bottom-right' });
    });

    // Evento click para aumentar la cantidad del producto
    $(document).on('click', '.increaseQuantityBtn', function () {
        var index = $(this).data('index');
        cartItems[index].quantity++;
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        renderCartItems();
        updateCartItemCount();
    });

    // Evento click para disminuir la cantidad del producto
    $(document).on('click', '.decreaseQuantityBtn', function () {
        var index = $(this).data('index');
        if (cartItems[index].quantity > 1) {
            cartItems[index].quantity--;
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            renderCartItems();
            updateCartItemCount();
        }
    });

    // Función para actualizar el estado del navbar
    function updateNavbarPosition() {
        var navbar = $('.navbar');
        var distance = $(window).scrollTop(); // Obtener la posición de desplazamiento vertical

        if (distance > 0) {
            navbar.addClass('fixed'); // Agregar la clase "fixed" al navbar cuando se desplaza hacia abajo
        } else {
            navbar.removeClass('fixed'); // Quitar la clase "fixed" cuando está en la posición inicial
        }
    }

    // Evento scroll para actualizar la posición del navbar
    $(window).scroll(function () {
        updateNavbarPosition();
    });

    // Renderizar los productos y actualizar el contador del carrito al cargar la página
    renderProductCards(products);
    updateCartItemCount();

    // Función para simular el proceso de pago
    function pay() {
        toastr.success('¡Gracias por su compra! El pago se ha realizado con éxito.', '', { positionClass: 'toast-bottom-right' });

        // Vaciar el carrito después de realizar el pago
        cartItems = [];
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        renderCartItems();
        updateCartItemCount();
    }

    // Evento click para proceder al pago
    $('#proceedToPaymentBtn').click(function () {
        pay();
    });
});
