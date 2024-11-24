const baseHtml = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Product List</title>
    
</head>
<body>
`;

//function para generar HTML base
const generateHtml = (content) => {
    return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Dashboard</title>
    </head>
    <body>
        ${content}

        <script>
            // Definir deleteFunction directamente en el frontend
            async function deleteFunction(productId) {
                const confirmation = confirm('¿Estás seguro de que quieres eliminar este producto?');
                if (confirmation) {
                    try {
                        const response = await fetch(\`/dashboard/\${productId}/delete\`, {
                            method: 'DELETE',
                        });
                        if (response.ok) {
                            alert('Producto eliminado correctamente');
                            location.reload(); // Recargar la página para actualizar la lista de productos
                        } else {
                            alert('Error al eliminar el producto');
                        }
                    } catch (error) {
                        console.error('Error:', error);
                        alert('Error al eliminar el producto');
                    }
                }
            }
        </script>
    </body>
    </html>
    `;
};

const generateHtmlNew = (content) => {
    return `<!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Crear Nuevo Producto</title>
    </head>
    <body>
        <h1>Crear Nuevo Producto</h1>
        ${content} 
    </body>
    </html>
    `;
};

const getProductCards = (products, isDashboard = false) => {
    return products.map(product => `
        <div class="product-card" style="border: 2px solid #ddd; padding: 80px; margin: 10px; border-radius: 6px; width: 250px; height: 350px; display: flex; flex-direction: column; justify-content: space-between; align-items: center; text-align: center;">
            <h3>${product.name}</h3>
            <img src="${product.image}" alt="${product.name}" style="max-width: 100%; height: auto; margin-bottom: 10px;"/>
            <br>
            <a href="/products/${product._id}" style="text-decoration: none;">
                <button style="padding: 5px 40px; background-color: #007BFF; color: white; border: none; border-radius: 5px; cursor: pointer;">
                    Ver
                </button>
            </a>
            <br>
            ${isDashboard ? showButtons(true, product._id) : ''}
        </div>
    `).join('');
};


//funcion que maneja el barra de navegacion
const getNavBar = (isAuthenticated) => {
    return `
        <nav>
            <a href="/">Home</a>
            <a href="/category/T-shirts">Camisetas</a>
            <a href="/category/Sweters">Suéteres</a>
            <a href="/category/Accessories">Accesorios</a>
            <a href="/category/Snack">Snacks</a>
            <a href="/dashboard">Perfil</a>
            ${isAuthenticated   //si est autenticado
                ? ` 
                    <a href="/dashboard/new">Crear Producto</a>
                    <a href="/">Logout</a>
                ` 
                : `
                    <a href="/Register">Registrarse</a>
                ` // Mostrar Register y Login si no está autenticado
            }
        </nav>
    `;
};

//function para el formulario de editar/crear productos
const renderProductForm = (product = {}) => {
    return `
        <form action="${product._id ? `/dashboard/${product._id}?_method=PUT` : '/dashboard/new'}" method="POST">
            <div style="margin-bottom: 10px;">
                <!-- Indicaciones o esquemas de ejemplo -->
                <p><strong>Esquema de Producto:</strong></p>
                <p><strong>Nombre:</strong> Nombre del producto</p>
                <p><strong>Descripción:</strong> Descripción del producto</p>
                <p><strong>Categoría:</strong> Categoría del producto</p>
            </div>
            <!-- Campos del formulario -->
            <label for="name">Nombre:</label>
            <input type="text" name="name" value="${product.name || ''}" placeholder="Nombre del producto" style="width: 100px;" required>
            <br>
            <label for="description">Descripción:</label>
            <input type="text" name="description" value="${product.description || ''}" placeholder="Descripción" style="width: 800px;" required>
            <br>
            <label for="category">Categoría:</label>
            <input type="text" name="category" value="${product.category || ''}" placeholder="Categoría" style="width: 100px;" required>
            <br>
            <label for="image">URL de la imagen:</label>
            <input type="text" name="image" value="${product.image || ''}" placeholder="URL de la imagen" style="width: 100px;" required>
            <br>
            <label for="size">Talla:</label>
            <input type="text" name="size" value="${product.size || ''}" placeholder="Talla" required>
            <br>
            <label for="price">Precio:</label>
            <input type="number" name="price" value="${product.price || ''}" placeholder="Precio" required>
            <br>
            <button type="submit" style="background-color: #007BFF; color: black; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;">${product._id ? 'Actualizar/Volver' : 'Crear'} Producto</button>
        </form>
    `;
};

// Crear el HTML para mostrar los detalles del producto
const productDetailsHtml = (product = {}) => {
    return `
        <div>
            <h1>${product.name}</h1>
            <img src="${product.image}" alt="${product.name}" style="max-width:200px">
            <p><strong>Description:</strong> ${product.description}</p>
            <p><strong>Category:</strong> ${product.category}</p>
            <p><strong>Size:</strong> ${product.size}</p>
            <p><strong>Price:</strong> $${product.price}</p>
            <!--boton que funciona cn la propiedad de JS para volver atrás -->
            <button onclick="goBack()" style="background-color: #007BFF; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;">Volver atrás</button>
        </div>
        <!-- Script para la funcionalidad del botón -->
        <script>
            function goBack() {
                window.history.back();
            }
        </script>
    `;
};

//botones editar y borrar.
// Función para generar los botones de Editar y Borrar
const showButtons = (dashboard, _id) => {
    if (!dashboard) {
        return '';
    }
    return `
        <a href="/dashboard/${_id}/edit">
            <button type="button" style="padding: 5px 40px; background-color: #007BFF; color: white; border: none; border-radius: 5px; cursor: pointer;">Editar</button>
        </a>
        <br>
        <button type="button" onClick="deleteFunction('${_id}')" class="secundary-button" style="padding: 5px 40px; background-color: #007BFF; color: white; border: none; border-radius: 5px; margin-left: 10px; cursor: pointer;">Borrar</button>

    `;
};

//funcion de brrar que ejecuta con onclick que invoca functon de JS:DeleteFunction); 
async function deleteFunction(productId) {
    const confirmation = confirm('¿Estás seguro de que quieres eliminar este producto?');
    if (confirmation) {
        try {
            const response = await fetch(`/dashboard/${productId}/delete`, {
                method: 'DELETE',
            });
            if (response.ok) {
                alert('Producto eliminado correctamente');
                location.reload(); // Recargar la página para actualizar la lista de productos
            } else {
                alert('Error al eliminar el producto');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al eliminar el producto');
        }
    }
};

//funtion para agrupar productos por categoria
const groupByCategory = (products) => {
    return products.reduce((acc, product) => {
        const category = product.category || 'Sin Categoría'; // En caso de que el producto no tenga categoría
        if (!acc[category]) {
            acc[category] = []; // Si no existe la categoría, se inicializa con un array vacío
        }
        acc[category].push(product); // Agrega el producto a la categoría correspondiente
        return acc;
    }, {});
};


module.exports = {
    baseHtml,
    generateHtml,
    generateHtmlNew,
    getProductCards,
    getNavBar,
    renderProductForm,
    productDetailsHtml,
    showButtons,
    deleteFunction,
    groupByCategory,
};

/*
//funcion para mostrar todos los productos con los detalls SIN agrupar por CATEGORIA
// const getProductCards = (products) => {
//     let html = '';
//     products.forEach(product => {
//         html += `
//             <div class="product-card">
//                 <h3>${product.name}</h3>
//                 <p>Categoría: ${product.category}</p>
//                 <img src="${product.image}" alt="${product.name}" />
//                 <p>Precio: ${product.price}</p>
//             </div>
//         `;
//     });
//     return html;
// };

// //PRODUCTOS agrupados por CATEGORIA SIN detalles
// const getProductCardsHome = (products = false) => {
//     return products.map(product => {
//         return `
//             <div class="product-card" style="border: 1px solid #ddd; padding: 20px; margin: 10px; border-radius: 5px;">
//                 <h3>${product.name}</h3>
//                 <img src="${product.image}" alt="${product.name}" style="max-width: 100px;" />
               
//             </div>
//         `;
//     }).join(''); //une todas las tarjetas en un solo string
// };

// //muestra los PRODUCTOS con detalle AGRUPADOS por CATEGORIA 
// const getProductCards = (products, dashboard = false) => {
//     return products.map(product => {
//         return `
//             <div class="product-card" style="border: 1px solid #ddd; padding: 20px; margin: 10px; border-radius: 5px;">
//                 <h3>${product.name}</h3>
//                 <img src="${product.image}" alt="${product.name}" style="max-width: 100px;" />
//                 <p><strong>Description:</strong> ${product.description}</p>
//                 <p><strong>Category:</strong> ${product.category}</p>
//                 <p><strong>Price:</strong> $${product.price}</p>
//                 <p><strong>Size:</strong> ${product.size}</p>
                
//                 ${showProductButtons(dashboard, product._id)}
//             </div>
//         `;
//     }).join(''); //une todas las tarjetas en un solo string
// };

// Función para generar el formulario de productos (editar/eliminar)
// const renderProductForm = (product = {}) => {
//     return `
//         <form action="${product._id ? `/dashboard/${product._id}?_method=PUT` : '/dashboard/create'}" method="POST">
//             <input type="text" name="name" value="${product.name || ''}" placeholder="Nombre del producto" required>
//             <input type="text" name="description" value="${product.description || ''}" placeholder="Descripción" required>
//             <input type="text" name="image" value="${product.image || ''}" placeholder="URL de la imagen" required>
//             <input type="text" name="category" value="${product.category || ''}" placeholder="Categoría" required>
//             <input type="text" name="size" value="${product.size || ''}" placeholder="Talla" required>
//             <input type="number" name="price" value="${product.price || ''}" placeholder="Precio" required>
//             <button type="submit">${product._id ? 'Actualizar/Volver' : 'Crear'} Producto</button>
//             <br>
//         </form>
//     `;
// };
 */