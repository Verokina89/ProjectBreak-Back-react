# Tienda de ropa

Vamos a montar una tienda de ropa con un catálogo de productos y un dashboard para el administrador. Los productos se guardarán en una base de datos de mongo en Atlas. Podemos usar como referencia el pdf [web_ejemplo.pdf](web_ejemplo.pdf) que contiene un ejemplo de cómo podría ser la interfaz de la tienda y el dashboard.

## Índice

  - [Estructura de archivos](#estructura-de-archivos)
  - [Creación de base de datos](#creación-de-base-de-datos)
  - [Creación del servidor](#creación-del-servidor)
  - [Creación de modelos](#creación-de-modelos)
  - [Creación de rutas](#creación-de-rutas)
  - [Creación de controladores](#creación-de-controladores)
  - [Despliegue](#despliegue)
  - [Documentación](#documentación)
  - [Bonus 1 - Tests](#bonus-1---tests)
  - [Bonus 2 - Autenticación con Firebase](#bonus-2---autenticación-con-firebase)
  - [Bonus 3 - API y documentación con Swagger](#bonus-3---api-y-documentación-con-swagger)
  - [Recursos](#recursos)

## Estructura de archivos

Vamos a crear la estructura de archivos que vamos a necesitar para el proyecto. 

```
.
├── config
│   ├── db.js  ------>(ok)
│   └── firebase.js (BONUS)
├── controllers
│   ├── productController.js ------>(ok)
│   └── authController.js (BONUS) -------> OK
├── models
│   └── Product.js ------>(ok)
├── routes
│   └── productRoutes.js ------>(ok)
│   └── authRoutes.js (BONUS) --->OK
├── middlewares (BONUS)
│   └── authMiddleware.js
└── index.js
├── test (BONUS)
│   └── productController.test.js
├── public
│   ├── styles.css
│   └── images (OPCIONAL)
├── .env  (ok)
└── package.json

```

### Características de los archivos

- `config/db.js`: Archivo que contendrá la configuración de la base de datos. Deberá conectarse a la base de datos de mongo en Atlas.
- `controllers/productController.js`: Archivo que contendrá la lógica para manejar las solicitudes CRUD de los productos. Devolverá las respuestas en formato HTML.
- `models/Product.js`: Archivo que contendrá la definición del esquema del producto utilizando Mongoose.
- `routes/productRoutes.js`: Archivo que contendrá la definición de las rutas CRUD para los productos. Este llama a los métodos del controlador.
- `index.js`: Archivo principal que iniciará el servidor Express. Importa las rutas y las usa. También tiene que estar configurado para servir archivos estáticos y para leer el body de las peticiones de formularios.
- `public/styles.css`: Archivo que contendrá los estilos de la aplicación (recomendable).
- `public/images`: Carpeta que contendrá las imágenes de los productos (opcional).Se puede evitar si se usan urls externas para las imágenes.
- `.env`: Archivo que contendrá las variables de entorno. En este caso, la uri de la base de datos de Atlas o el puerto de la aplicación. Más adelante añadiremos más variables de entorno, como la palabra secreta para la sesión.
- `package.json`: Archivo que contendrá las dependencias del proyecto. Crearemos un script para iniciar el servidor con node ("start": "node --watch index.js") o si lo preferís con nodemon ("dev": "nodemon index.js"). Si elegís esta última opción tendréis que instalar la dependencia como dependencia de desarrollo.

**BONUS**
- `config/firebase.js`: Archivo que contendrá la configuración de firebase. Deberá inicializar la conexión con firebase.
- `controllers/authController.js`: Archivo que contendrá la lógica para manejar las solicitudes de autenticación. Devolverá las respuestas en formato HTML.
- `routes/authRoutes.js`: Archivo que contendrá la definición de las rutas para la autenticación. Este llama a los métodos del controlador.
- `middlewares/authMiddleware.js`: Archivo que contendrá el middleware para comprobar si el usuario está autenticado. Este buscará la sesión del usuario y, si no la encuentra, redirigirá al formulario de login.

## Creacíon de base de datos

Vamos a crear la base de datos en Atlas. Creamos un nuevo proyecto y lo desplegamos.

Una vez creada la base de datos, copiamos la uri y la guardamos en el archivo .env 
```
MONGO_URI=<uri_bd_atlas>
```

## Creación del servidor

Vamos a crear el servidor con express. El servidor devolverá las vistas usando template literals. También necesitaremos leer el body de las peticiones tipo post. Como trabajaremos con formularios html, necesitaremos el middleware `express.urlencoded` para leer el body de las peticiones.

Para interfaces más complejas, se podría usar un motor de plantillas como pug (Si queréis usarlo la documentación está más abajo). Recomendación... No os compliquéis la vida.

Para poder añadir estilos, imágenes, etc. necesitaremos el middleware `express.static` para servir archivos estáticos. En nuestro caso, serviremos los archivos estáticos desde la carpeta `public`.

El puerto en el que escuchará el servidor lo cargaremos desde el archivo .env usando `dotenv`.


Creamos el archivo `index.js` y añadimos el código necesario para crear el servidor. Es el punto de inicio de nuestra API. 

## Creación de modelo

Vamos a crear el modelo de producto. El modelo de producto tendrá los siguientes campos:

- Nombre
- Descripción
- Imagen
- Categoría
- Talla
- Precio

La categoría será un string que podrá ser "Camisetas", "Pantalones", "Zapatos", "Accesorios".

La talla será un string que podrá ser "XS", "S", "M", "L", "XL".


## Creación de rutas

Vamos a crear las rutas CRUD para los productos. Al usar formularios html, las rutas serán de tipo GET y POST.
 Las rutas deberían tener una estructura similar a esta:

-GET / : Home. Productos Agrupados por categoria.  -----> OK

- GET /products: Devuelve todos los productos. Cada producto tendrá un enlace a su página de detalle. -------> OK
- GET /products/:productId: Devuelve el detalle de un producto. -------> OK
- GET /dashboard: Devuelve el dashboard del administrador. En el dashboard aparecerán todos los artículos que se hayan subido. Si clickamos en uno de ellos nos llevará a su página para poder actualizarlo o eliminarlo. ----------> OK
- GET /dashboard/new: Devuelve el formulario para subir un artículo nuevo. ----------> OK
- POST /dashboard: Crea un nuevo producto. ----------> OK
- GET /dashboard/:productId: Devuelve el detalle de un producto en el dashboard.   ----------> OK
- PUT /dashboard/:productId: Actualiza un producto. ----------> OK
- GET /dashboard/:productId/edit: Devuelve el formulario para editar un producto.   ----------> OK
- DELETE /dashboard/:productId/delete: Elimina un producto.  ------------> OK

## Creación de controladores

A continuación crearemos el controlador de productos. Este controlador se dedicará a manejar las solicitudes CRUD de los productos. Devolverá las respuestas en formato HTML.
Para ello, crearemos algunas funciones auxiliares que nos ayudarán a devolver las vistas con SSR.

Las funciones principales del controlador serán:

- showProducts: Devuelve la vista con todos los productos.
- showProductById: Devuelve la vista con el detalle de un producto.
- showNewProduct: Devuelve la vista con el formulario para subir un artículo nuevo.
- createProduct: Crea un nuevo producto. Una vez creado, redirige a la vista de detalle del producto o a la vista de todos los productos del dashboard.
- showEditProduct: Devuelve la vista con el formulario para editar un producto.
- updateProduct: Actualiza un producto. Una vez actualizado, redirige a la vista de detalle del producto o a la vista de todos los productos del dashboard.
- deleteProduct: Elimina un producto. Una vez eliminado, redirige a la vista de todos los productos del dashboard.

Las funciones showProducts y showProductById pueden devolver respuestas ligeramente distintas si se llega desde el dashboard o desde la vista principal. Por ejemplo, si se llega desde el dashboard, se mostrará un enlace para editar o eliminar el producto. Para ello podemos utilizar la url de la petición o pasar al controlador un parámetro extra que indique si se llega desde el dashboard o no.

Para generar el html de forma más eficiente y sacarlo de la lógica, podemos crear funciones y variables auxiliares que generen el html de los productos y del formulario.
Por ejemplo:
- baseHtml: html común a todas las páginas. Puede contener elementos como la importación de estilos, etc.
- getNavBar: Genera la barra de navegación con las categorías. En caso de estar en el dashboard, también generará un enlace para subir un nuevo producto.
- getProductCards: Genera el html de los productos. Recibe un array de productos y devuelve el html de las tarjetas de los productos.
- ...

Un ejemplo de una función para generar el html de los productos podría ser:

```javascript
function getProductCards(products) {
  let html = '';
  for (let product of products) {
    html += `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}">
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <p>${product.price}€</p>
        <a href="/products/${product._id}">Ver detalle</a>
      </div>
    `;
  }
  return html;
}
```

Con estas funciones auxiliares, el controlador será más limpio y fácil de entender.
Ejemplo:

```javascript

const showProducts = async (req, res) => {
  const products = await Product.find();
  const productCards = getProductCards(products);
  const html = baseHtml + getNavBar() + productCards;
  res.send(html);
};
    
```

## Despliegue

Creamos un nuevo proyecto en render y desplegamos el proyecto desde github. Recordad añadir las variables de entorno en render. Si no aparece el repositorio en render, tendremos que modificar los permisos de render para que pueda acceder al repositorio.

## Documentación

Crearemos un archivo `README.md` que contenga la documentación del proyecto. En este readme explicaremos cómo poner en marcha la aplicación, las tecnologías que hemos usado, endpoints, etc. En definitiva, una documentación de nuestra API.

## Bonus 1 - Tests

Para poder comprobar que el controlador de productos funciona correctamente, vamos a crear tests para las funciones. Para ello, necesitaremos instalar el paquete `jest` y crear el archivo `productController.test.js` en la carpeta `test`. En este archivo, importaremos el controlador y crearemos los tests. Podemos hacer tests tanto para las funciones que devuelven html como para las funciones que crean, actualizan o eliminan productos.

## Bonus 2 - API y documentación con Swagger

Para poder usar la aplicación con un frontend en React, vamos a crear una API que haga las mismas operaciones que el controlador de productos, pero que devuelva los datos en formato JSON. Documentaremos la API con Swagger, para que sea más fácil de entender y usar.

## Bonus 3 - Autenticación con Firebase ------------> OK

Crearemos un usuario administrador para que pueda subir desde el dashboard más productos. Esas rutas deberán estar protegidas para que solo pueda entrar quien esté logado y pueda acceder a esos elementos para crearlos, verlos, actualizarlos y borrarlos. 
Podéis ver la manera de poder hacer esta autenticación con firebase aquí:

- `VIDEO`: https://drive.google.com/file/d/1LMYwYofSomhtgf63FhhOQNwyu6kVM24B/view 
- `REPO`: https://github.com/CarlosDiazGirol/firebase-example-log además de todo el código está el paso a paso desde firebase

Recordad que los datos del `serviceAccount`están protegidos y debes tenerlos en el archivo `.env` 

También en este repo hay un ejemplo de `views`de como acceder a la carpeta `public` para hacer accesible esos archivos estáticos `express.static`. 

## Recursos

- [Express](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [Atlas](https://www.mongodb.com/cloud/atlas)
- [Render](https://render.com/)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [express.urlencoded](https://expressjs.com/en/api.html#express.urlencoded)
- [express.static](https://expressjs.com/en/api.html#express.static)
- [Template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
- [Pug](https://pugjs.org/api/getting-started.html)
- [Guía de git en equipos](./git.md)
- [Firebase](https://firebase.google.com/)
  - [Firebase Auth](https://firebase.google.com/docs/auth)
  - [Get Started with Firebase Authentication on Websites](https://firebase.google.com/docs/auth/web/start)


