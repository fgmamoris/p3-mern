
# Referencia - Super Market API


### Contenido
1. [Informe del Sistema :pencil:](#informe-del-sistema-pencil)
2. [Super Market API :bookmark_tabs:](#super-market-api-bookmark_tabs).
    
    2.1 [Auth](#auth)
    
    2.2 [Usuarios](#usuarios)
    
    2.3 [Productos](#productos)
    
    2.4 [Orden](#orden)
    
    2.5 [Ventas](#ventas)
    
    2.6 [Imagen](#imagen)

3. [Instalación :factory:](#instalación-factory).
4. [Despliegue :rocket:](#despliegue-rocket).
5. [Datos a tener en cuenta :warning:](#datos-a-tener-en-cuenta-warning).
6. [Anexo Front-end](#anexo-front-end)
7. [Autor :black_nib:](#autor-black_nib)

## Informe de sistema :pencil:

Es el sistema Back-End que complementa el desarrollo y funcionamiento del [Super Market](https://github.com/fgmamoris/p3-mern.git). Desarrollado bajo NodeJS y ExpressJS. 
Para el desarrollo del Back-End se utilizaron las siguientes de pendencias: 
* Mongoose - ODM para base de datos.
* Jsonwebtoken - Creación de token para usuarios
* bcryptjs - Encrpitación de contraseñas
* express-validator - Permite la validación de campos en el body de la petición
* base-64 - Para poder realizar la petición a servidor Cloudinary con sus repectivas claves de accesso.

El sistema cuenta como protección de los end point en base al rol del usuario("gerente", "vendedor"), para proteger las rutas se utilizo un middleware el cual valida el rol del usuario, y permite o deniega la realización de la acción al end point(employeePositionValidator).


Ademas cuenta con un middleware para validar los campos del body, como se menciono mas arriba, para esto se utilizo express-validator(fieldsValidator). 
```bash
router.put(
  '/:id',
  [ //middelwares
    check('firstName', 'FirstName is required').not().isEmpty(),
    check('lastName', 'LastName is required').not().isEmpty(),
    check('password', 'Password must be at least 6 characters').isLength({min: 6,}),
    check('employeePosition','Employee Position is required and must be valid position').isIn(['gerente', 'vendedor']),
    check('email', 'Email is required').isEmail(),
    fieldsValidator,
    tokenValidator,
    employeePositionValidator,
  ],
  updateUser
);
```

Todas las peticiones al back-end estan protegidas por un middleware tokenValidator, el cual verifica el estado de validez del token del usuario que solicita la petición, el cual esta configurado con un tiempo de duración de 4 horas. 
Cuando el Front-End (Cient), solicite algun tipo de acción al Back-End(Server), este va a verificar si el token es válido, en caso de se válido, realiza una renovación del mismo y lo retorna, a fin de actualizar el token y retornarlo al Front. 
En caso que no se envie el token, la respuesta va a ser _JSON_STATUS_OK__(_401)_ cuyo cuerpo va acontener la siguiente información: 

```JSON
{
    "ok": false,
    "msg": "Token must be provided"
}
```
En caso que el token sea inválido, la respuesta va a ser _JSON_STATUS_OK__(_501)_ cuyo body contiene la siguiente información: 
```JSON
{
    "ok": false,
    "msg": "Token invalid"
}
```
En caso que el usuario el cual genero un token, no este autorizado para realizar algun tipo de petición, la respuesta va a ser _JSON_STATUS_OK__(_401)_ cuyo body contiene la siguiente información:
```JSON
{
    "ok": false,
    "msg": "Unauthorized"
}
```
En caso que se solicite algun objeto a la base de datos y el mismo no sea encontrado, la respuesta del servidor siempre sera la misma _JSON_STATUS_OK__(_404)_
```JSON
{
    "ok": false,
    "msg": "[Objecto a buscar] not found"
}```
```
## Super Market API :bookmark_tabs:

#### Auth
#### `HOST/API/AUTH`
* [ ] `POST /NEW`
* [ ]  `GET /RENEW`

#### POST (Create) 
##### Crear nuevo token para usuario:
* `POST http://localhost:4000/api/auth/new`

Todos los campos son obligatorios

| Campo | Tipo | Descripción |
|:---|:---:| --- |
| email | String | Email del usuario |
| password | String | Password del usuario |

JSON de ejemplo (Cuerpo del body):
  
```JSON
{
    "email": "gerencia@market.com",
    "password": "123456"
}
```

Respuesta del metodo POST, es un _JSON_STATUS_OK__(_200)_, con la información de la usuario  validado, además de retornar una variable del tipo "ok", la cual va a indicar si la acción se realizo correctamente (true) o no (false)
```JSON
{
    "ok": true,
    "uid": "6014636450bd9446f4fbabd6",
    "firstName": "Gerencia",
    "lastName": "General",
    "employeePosition": "gerente",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MDE0NjM2NDUwYmQ5NDQ2ZjRmYmFiZDYiLCJmaXJzdE5hbWUiOiJHZXJlbmNpYSIsImxhc3ROYW1lIjoiR2VuZXJhbCIsImVtcGxveWVlUG9zaXRpb24iOiJnZXJlbnRlIiwiaWF0IjoxNjEzNjcyNzc1LCJleHAiOjE2MTM2ODcxNzV9.KHvF7osgjsIGUXnQ51VD8wwqiTV9AGiTdomi3g2UYy4"
}
```
#### GET (Read)
##### Renovar Token
* `GET http://localhost:4000/api/auth/renew`

Solo hay que enviar en los headers la key: "x-access-token", y el value, debe ser el token generado anteriormente.
La respuesta es un Array de _JSON_STATUS_OK__(_200)_ con los datos del usuario ingresado via token.
```JSON
{
    "ok": true,
    "uid": "6014636450bd9446f4fbabd6",
    "firstName": "Gerencia",
    "lastName": "General",
    "employeePosition": "gerente",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MDE0NjM2NDUwYmQ5NDQ2ZjRmYmFiZDYiLCJmaXJzdE5hbWUiOiJHZXJlbmNpYSIsImxhc3ROYW1lIjoiR2VuZXJhbCIsImVtcGxveWVlUG9zaXRpb24iOiJnZXJlbnRlIiwiaWF0IjoxNjEzNjcyOTQ2LCJleHAiOjE2MTM2ODczNDZ9.2QJSCfgHiHDkHmIQMGW-PskBHV_l_Z5_UOcU93SlmkM"
}
```
En caso que no se envie el token, la respuesta va a ser _JSON_STATUS_OK__(_401)_ cuyo cuerpo va acontener la siguiente información: 
```JSON
{
    "ok": false,
    "msg": "Token must be provided"
}
```
#### Usuarios
#### `HOST/API/USER`
 * [ ]  `GET /`
 * [ ]  `GET /:ID`
 * [ ]  `POST /NEW`
 * [ ]  `PUT /:ID`
 * [ ]  `DELETE /:ID`
 * [ ]  `DELETE /IMAGE/:ID`
 
 #### GET (Read)
* `GET http://localhost:4000/api/user`

La respuesta _JSON_STATUS_OK__(_200)_ con todas los usuarios en el sistema.
```JSON
{
    "ok": true,
    "msg": "Get users",
    "users": [
        {
            "_id": "6014636450bd9446f4fbabd6",
            "code": 1,
            "firstName": "Gerencia",
            "lastName": "General",
            "email": "gerencia@market.com",
            "password": "$2a$10$vxONiRnJGbNYYY1Vd5x9Mek7rzXVGkW9dVsegdfCmi5fuAS/KSpE.",
            "employeePosition": "gerente",
            "__v": 0,
            "mediaUrl": "https://res.cloudinary.com/dcqudzsce/image/upload/v1613417488/super_market/no-image.png"
        }
    ]
}
```

#### GET BY ID(Read)
* `GET http://localhost:4000/api/user/:ID`

Se envia el parametro "ID" del usuario a obtener.
 `http://localhost:4000/api/user/600db40ad4e70c74d0d58a77`
Si el usuario es encontrado en la base de datos, la respuesta _JSON_STATUS_OK__(_200)_ con los datos del usuario.
```JSON
{
    "ok": true,
    "msg": "Get users",
    "users": [
        {
            "_id": "6014636450bd9446f4fbabd6",
            "code": 1,
            "firstName": "Gerencia",
            "lastName": "General",
            "email": "gerencia@market.com",
            "password": "$2a$10$vxONiRnJGbNYYY1Vd5x9Mek7rzXVGkW9dVsegdfCmi5fuAS/KSpE.",
            "employeePosition": "gerente",
            "__v": 0,
            "mediaUrl": "https://res.cloudinary.com/dcqudzsce/image/upload/v1613417488/super_market/no-image.png"
        }
    ]
}
```
#### POST (Create) - Usuario 
##### Crear nuevo usuario:

* `POST http://localhost:3000/api/user/new`

No todos los campos son obligatorios

| Campo | Tipo | Descripción |--- |
|:---|:---:| --- |--- |
| firstName | String | Nombre del usuario |
| lastName | String | Apellido del usuario |
| email | String | Email del usuario |
| password | String | Password del usuario |
| employeePosition | String | Posición (gerente o vendedor)del usuario |
| mediaUrl | String | Path de la imagen del usuario |**No es obligatorio**

JSON de ejemplo (Cuerpo del body):

```JSON
{
    "firstName": "Ventas",
    "lastName": "Sucursal 1",
    "email": "vsucursal1@market.com",
    "password": "123456",
    "employeePosition": "vendedor",
    "mediaUrl":"https://res.cloudinary.com/dcqudzsce/image/upload/v1613577771/super_market/jho34bqfrbycib7b3z61.jpg"
}
```

Respuesta es un _JSON_STATUS_OK_ 201, con la información parcial del usuario creado
```JSON
{
    "ok": true,
    "uid": "602eb9db3a549c61d8d9736f",
    "name": "Ventas",
    "employeePosition": "vendedor"
}
```
#### PUT (Update) 
##### Actualizar usuario:
* `PUT http://localhost:4000/api/user/:id`

Se envia el parametro "ID" del usuario que se desea actualizar y dentro del body los datos.
 `http://localhost:4000/api/user/600db40ad4e70c74d0d58a77`
 
No todos los campos son obligatorios

| Campo | Tipo | Descripción |--- |
|:---|:---:| --- |--- |
| firstName | String | Nombre del usuario |
| lastName | String | Apellido del usuario |
| email | String | Email del usuario |
| password | String | Password del usuario |
| employeePosition | String | Posición (gerente o vendedor)del usuario |
| mediaUrl | String | Path de la imagen del usuario |**No es obligatorio**

JSON de ejemplo (Cuerpo del body):
```JSON
{
    "firstName": "Ventas",
    "lastName": "Sucursal 1",
    "email": "vsucursal1@market.com",
    "password": "123456",
    "employeePosition": "vendedor",
    "mediaUrl":"https://res.cloudinary.com/dcqudzsce/image/upload/v1613577771/super_market/jho34bqfrbycib7b3z61.jpg"
}
```

Respuesta del metodo PUT, es un _JSON_STATUS_OK_ 200, con la información del usuario actualizado

#### DELETE (Delete)
##### Borrar un usuario:
* `DELETE http://localhost:4000/api/user/:id`

Se envia el parametro "ID" del usuario que se desea eliminar.
 `http://localhost:4000/api/user/600db40ad4e70c74d0d58a77`

La respuesta es un _JSON_STATUS_OK_ (200)
```JSON
{
    "ok": true,
    "msg": "Delete",
    "proccess": "ok"
}
```
#### Productos
#### `HOST/API/PRODUCT`
 * [ ]  `GET /`
 * [ ]  `GET /:ID`
 * [ ]  `POST /NEW`
 * [ ]  `PUT /:ID`
 * [ ]  `DELETE /:ID`

#### GET (Read)
* `GET http://localhost:4000/api/product`

La respuesta _JSON_STATUS_OK__(_200)_ con todas los productos en el sistema.
```JSON
{
    "ok": true,
    "msg": "Get Products",
    "products": [
        {
            "code": 2,
            "_id": "602d36f9a92af646088739b3",
            "name": "Señuelo prof-media",
            "tradeMark": "Cucu",
            "description": "Modelo\tMOJARRA-BANANA-GLOBITO\nCantidad de ganchos\t2\nLargo\t15 cm\nPeso\t40 g\nUnidades por envase\t1\nProfundidad máxima de inmersión\t0 m\n",
            "price": 119,
            "qty": 110,
            "mediaUrl": "https://res.cloudinary.com/dcqudzsce/image/upload/v1613575929/super_market/he8xjmcbzyouqckqe0wy.jpg",
            "__v": 0
        },
        {
            "code": 3,
            "_id": "602d3abea92af646088739b4",
            "name": "Señuelo Banana Mediana                                           ",
            "tradeMark": "Skull",
            "description": "Modelo\tBANANA MEDIANA\nCantidad de ganchos\t2\nLargo\t11 cm\nPeso\t35 g\nUnidades por envase\t1\nProfundidad máxima de inmersión\t0.25 m",
            "price": 604,
            "qty": 120,
            "mediaUrl": "https://res.cloudinary.com/dcqudzsce/image/upload/v1613577211/super_market/reaq7udmsdxdc8ok6ddg.jpg",
            "__v": 0
        }
    ]
}
```
#### GET BY ID(Read)
* `GET http://localhost:4000/api/product/:ID`

Se envia el parametro "ID" del producto a obtener.
 `http://localhost:4000/api/product/600db40ad4e70c74d0d58a77`
Si el producto es encontrado en la base de datos, la respuesta _JSON_STATUS_OK__(_200)_ con los datos del producto encontrado.
```JSON
{
    "ok": true,
    "msg": "Get product by ID",
    "product": {
        "code": 3,
        "_id": "602d3abea92af646088739b4",
        "name": "Señuelo Banana Mediana                                           ",
        "tradeMark": "Skull",
        "description": "Modelo\tBANANA MEDIANA\nCantidad de ganchos\t2\nLargo\t11 cm\nPeso\t35 g\nUnidades por envase\t1\nProfundidad máxima de inmersión\t0.25 m",
        "price": 604,
        "qty": 120,
        "mediaUrl": "https://res.cloudinary.com/dcqudzsce/image/upload/v1613577211/super_market/reaq7udmsdxdc8ok6ddg.jpg",
        "__v": 0
    }
}
```
#### POST (Create) - Producto 
##### Crear nuevo producto:

* `POST http://localhost:3000/api/product/new`

No todos los campos son obligatorios

| Campo | Tipo | Descripción |--- |
|:---|:---:| --- |--- |
| name | String | Nombre del producto |
| tradeMark | String | Marca del producto |
| description | String | Descripción del producto|
| price | String | Precio del producto |
| qty | String | Cantidad ingresada al sistema del producto|
| mediaUrl | String | Path de la imagen del producto |**No es obligatorio**

JSON de ejemplo (Cuerpo del body):

```JSON
{
    "name": "Anzuelos",
    "tradeMark": "Shimano",
    "description": "Anzuelos para mar, antioxido, corvinero 4/0",
    "price": "150",
    "qty": "150"
}
```
Respuesta es un _JSON_STATUS_OK_ 201, con la información del producto creado
```JSON
{
    "ok": true,
    "product": {
        "code": 4,
        "_id": "602ebd593a549c61d8d97370",
        "name": "Anzuelos",
        "tradeMark": "Shimano",
        "description": "Anzuelos para mar, antioxido, corvinero 4/0",
        "price": 150,
        "qty": 150,
        "__v": 0
    }
}
```
#### PUT (Update) 
##### Actualizar producto:
* `PUT http://localhost:4000/api/product/:id`

Se envia el parametro "ID" del producto que se desea actualizar y dentro del body los datos.
* `http://localhost:4000/api/product/602ebd593a549c61d8d97370`
 
No todos los campos son obligatorios

| Campo | Tipo | Descripción |--- |
|:---|:---:| --- |--- |
| name | String | Nombre del producto |
| tradeMark | String | Marca del producto |
| description | String | Descripción del producto|
| price | String | Precio del producto |
| qty | String | Cantidad ingresada al sistema del producto|
| mediaUrl | String | Path de la imagen del producto |**No es obligatorio**

JSON de ejemplo (Cuerpo del body):
```JSON
{
    "name": "Anzuelos",
    "tradeMark": "Shimano",
    "description": "Anzuelos para mar, antioxido, corvinero 4/0",
    "price": "150",
    "qty": "150",
    "mediaUrl": "https://res.cloudinary.com/dcqudzsce/image/upload/v1613577211/super_market/reaq7udmsdxdc8ok6ddg.jpg"
}
```
Respuesta del metodo PUT, es un _JSON_STATUS_OK_ 200, con la información del producto actualizado
#### DELETE (Delete)
##### Borrar un producto:
* `DELETE http://localhost:4000/api/product/:id`

Se envia el parametro "ID" del producto que se desea eliminar.
 `http://localhost:4000/api/product/600db40ad4e70c74d0d58a77`

La respuesta es un _JSON_STATUS_OK_ (200)
```JSON
{
    "ok": true,
    "msg": "Delete",
    "proccess": "ok"
}
```
 
#### Orden
#### `HOST/API/CART`
 * [ ]  `GET /`
 * [ ]  `POST /NEW`
 * [ ]  `PUT /:ID`
 * [ ]  `DELETE /:ID`

#### GET (Read)
* `GET http://localhost:4000/api/cart`

Solo hay que enviar en los headers la key: "x-access-token", y el value, debe ser el token generado para el usuario que se desea consultar.

La respuesta _JSON_STATUS_OK__(_200)_ con la orden del vendedor en el sistema.
```JSON
{
    "ok": true,
    "msg": "Get cart",
    "cart": [
        {
            "_id": "602ebf3c3a549c61d8d97371",
            "user": "602eb9db3a549c61d8d9736f",
            "products": [
                {
                    "_id": "602ebf3c3a549c61d8d97372",
                    "product": "602d36f9a92af646088739b3",
                    "qtyOrder": 10
                }
            ],
            "__v": 0
        }
    ]
}
```
#### POST (Create) - Orden 
##### Crear nueva orden:

* `POST http://localhost:3000/api/cart/new`

Todos los campos son obligatorios

| Campo | Tipo | Descripción |
|:---|:---:| --- |
| user | String | User ObjectId   |
| product | String | Product ObjectId |
| qty | String | Cantidad del producto indicado |

JSON de ejemplo (Cuerpo del body):
```JSON
{
    "user": "60197fc846c1ab500ce8526b",
    "products": {
        "product": "601ad7fa060eb5639491cd01",
        "qtyOrder": "1"
    }
}
```
En caso que el usuario ya posea una orden, no se puede generar una nueva, deberá eliminarla. 
Respuesta es un _JSON_STATUS_OK_ 412
```JSON
{
    "ok": false,
    "msg": "this user already owns a cart, cannot create a new one"
}
```
En caso que se pueda generar la orden la respuesta es un _JSON_STATUS_OK_ 201, con la información del orden creada
```JSON
{
    "ok": true,
    "cart": {
        "_id": "602ec1573a549c61d8d97373",
        "user": "60197fc846c1ab500ce8526b",
        "products": [
            {
                "_id": "602ec1573a549c61d8d97374",
                "product": "601ad7fa060eb5639491cd01",
                "qtyOrder": 1
            }
        ],
        "__v": 0
    }
}
```
#### PUT (Update) 
##### Actualizar producto:
* `PUT http://localhost:4000/api/cart/:id`

Se envia el parametro "ID" del **usuario** que se desea actualizar la orden y dentro del body los datos.
 `http://localhost:4000/api/cart/602eb9db3a549c61d8d9736f`

Todos los campos son obligatorios

| Campo | Tipo | Descripción |
|:---|:---:| --- |
| user | String | User ObjectId   |
| products | Array | Arreglo de productos |
| products.product | String | Product ObjectId |
| products.qty | Int | Cantidad del producto indicado |

JSON de ejemplo (Cuerpo del body):
```JSON
{
    "user": "60197fc846c1ab500ce8526b",
    "products": [
        {
            "product": "601ad7fa060eb5639491cd01",
            "qtyOrder": 6
        },
        {
            "product": "601ad7ef060eb5639491cd00",
            "qtyOrder": 7
        },
        {
            "product": "601c6dc4c188ec632cbc1bec",
            "qtyOrder": 1
        }
    ]
}
```


Respuesta del metodo PUT, es un _JSON_STATUS_OK_ 200, con la información de la orden actualizada actualizado
```JSON
{
    "ok": true,
    "msg": "Update cart",
    "cart": {
        "_id": "602ec3fc3a549c61d8d97375",
        "user": "60197fc846c1ab500ce8526b",
        "products": [
            {
                "_id": "602ec56f03d74c4d50a66bd8",
                "product": "601ad7fa060eb5639491cd01",
                "qtyOrder": 6
            },
            {
                "_id": "602ec56f03d74c4d50a66bd9",
                "product": "601ad7ef060eb5639491cd00",
                "qtyOrder": 7
            },
            {
                "_id": "602ec56f03d74c4d50a66bda",
                "product": "601c6dc4c188ec632cbc1bec",
                "qtyOrder": 1
            }
        ],
        "__v": 0
    }
}
```

#### DELETE (Delete)
##### Borrar una orden:
* `DELETE http://localhost:4000/api/cart/:id`

Se envia el parametro "ID" de la orden que se desea eliminar.
 `http://localhost:4000/api/cart/602ec3fc3a549c61d8d97375`

La respuesta es un _JSON_STATUS_OK_ (200)
```JSON
{
    "ok": true,
    "msg": "Delete",
    "proccess": "ok"
}
```

#### Ventas
#### `HOST/API/SALE`
 * [ ]  `GET /`
 * [ ]  `GET /:ID`
 * [ ]  `POST /NEW`
 * [ ]  `PUT /:ID`
 * [ ]  `DELETE /:ID`
#### GET (Read)
* `GET http://localhost:4000/api/sales`
Solo hay que enviar en los headers la key: "x-access-token", y el value, debe ser el token generado para el usuario que se desea consultar, teniendo en cuenta que este end point esta validado solo para usuarios con el rol gerente

La respuesta _JSON_STATUS_OK__(_200)_ con todas las ventas que se encuentren registradas en el sistema.
```JSON
{
    "ok": true,
    "msg": "Get Sales",
    "sales": [
        {
            "client": {
                "fullName": "Cliente",
                "address": "Direccion",
                "email": "corre@electronico.com.ar"
            },
            "paymentBreakdown": {
                "paidDate": "2021-02-09T19:08:51.069Z",
                "paymentMethod": "cash",
                "card": 0
            },
            "code": 1,
            "_id": "6022ddc3a920c03594d2f0e9",
            "products": [
                {
                    "_id": "6022ddc3a920c03594d2f0ea",
                    "amountProduct": 250,
                    "name": "Anzuelos",
                    "price": 25,
                    "qty": 10,
                    "tradeMark": "Mustad"
                }
            ],
            "totalAmount": 250,
            "state": "inactive",
            "__v": 0,
            "seller": "Ventas Sucursal 1"
        }
    ]
}
```

#### GET BY ID(Read)
* `GET http://localhost:4000/api/sale/:ID`

Se envia el parametro "ID" de la venta a obtener.
 * `http://localhost:4000/api/sale/600db40ad4e70c74d0d58a77`

Si el usuario es encontrado en la base de datos, la respuesta _JSON_STATUS_OK__(_200)_ con los datos del producto encontrado. teniendo en cuenta que este end point esta validado solo para usuarios con el rol gerente
```JSON
{
    "ok": true,
    "msg": "Get sale by ID",
    "sale": {
        "client": {
            "fullName": "Cliente",
            "address": "Direccion",
            "email": "corre@electronico.com"
        },
        "paymentBreakdown": {
            "paidDate": "2021-02-11T16:41:34.350Z",
            "paymentMethod": "cash",
            "card": 0
        },
        "code": 3,
        "_id": "60255e401068f56f50be9b5b",
        "seller": "Ventas Sucursal 2",
        "products": [
            {
                "_id": "60255e401068f56f50be9b5c",
                "name": "Anzuelos",
                "tradeMark": "Shimano",
                "qty": 50,
                "price": 150,
                "amountProduct": 7500
            }
        ],
        "totalAmount": 7500,
        "state": "inactive",
        "__v": 0
    }
}
```

#### POST (Create) - Venta 
##### Crear nueva venta:

* `POST http://localhost:3000/api/venta/new`

NO Todos los campos son obligatorios

| Campo | Tipo | Descripción |--- |
|:---|:---:| --- |--- |
| user | String | User ObjectId   |
| products | Array | Arreglo de productos |
| products.name | String | Nombre del producto |
| products.qty | Number | Cantidad del producto indicado |
| products.amountProduct | Number | Importe total del producto indicado |
| products.price | Double | Precio del producto por unidad |
| products.tradeMark | String | Cantidad del producto indicado |
| products.code | Number | Código del producto indicado |
| seller | String | Vendedor  |
| client | Object | Object del cliente |
| client.fullName | String | Nombre completo del cliente |
| client.email | String | Email del cliente |
| client.address | String | Direccion del cliente |
| paymentBreakdown | Object | Desglose de pago pago |
| paymentBreakdown.paymentMethod | String | Medio de pago _['cash', 'creditCard', 'debitCard']_|
| paymentBreakdown.totalAmount | Number | Total de importe de la venta |
| paymentBreakdown.card | Number | Número tarjeta |**No es obligatorio**


JSON de ejemplo (Cuerpo del body):

```JSON
{
    "seller": "Ventas sucursal 1",
    "products": [
        {
            "amountProduct": 1050,
            "name": "Anzuelos",
            "price": 150,
            "qty": 7,
            "tradeMark": "Shimano,"
        },
        {
            "amountProduct": 145348,
            "name": "Reel",
            "price":"1",
            "qty": 116,
            "tradeMark": "Marine Sport"
        }
    ],
    "client": {
        "address": "Direccion",
        "email": "correo@electronico.com",
        "fullName": "Cliente"
    },
    "paymentBreakdown": {
        "card": " ",
        "paymentMethod": "cash"
    },
    "totalAmount": 14678,
    
}
```

En caso que se pueda generar la orden la respuesta es un _JSON_STATUS_OK_ 201, con la información del orden creada
```JSON
{
    "seller": "60197fc846c1ab500ce8526b",
    "products": [
        {"code":1,
            "amountProduct": 1050,
            "name": "Anzuelos",
            "price": 150,
            "qty": 7,
            "tradeMark": "Shimano,"
        }


        
    ],
    "state":"active",
    "client": {
        "address": "Direccion",
        "email": "correo@electronico.com",
        "fullName": "Federico Mamoris"
    },
    "paymentBreakdown": {
        "card": " ",
        
        "paymentMethod": "cash"
    },
    "totalAmount": 14678
    
}
```


#### Imagen 
#### `HOST/API/IMAGEN`
 * [ ]  `DELETE /:ID`

#### DELETE (Delete)
##### Borrar una imagen del servidor Cloudinary:
* `DELETE http://localhost:4000/api/user/image/:id`

Se envia el parametro "ID" de la imagen que se desea eliminar del servidor de cloudinary.
 * `http://localhost:4000/api/user/image/descarga_eard7v`

La respuesta es un _JSON_STATUS_OK_ (200)
```JSON
{
    "ok": true,
    "msg": {
        "deleted": {
            "super_market/descarga_eard7v": "deleted"
        },
        "deleted_counts": {
            "super_market/descarga_eard7v": {
                "original": 1,
                "derived": 0
            }
        },
        "partial": false
    }
}
```


#### PUT (Update) 
##### Actualizar una venta:
* `PUT http://localhost:4000/api/sale/:id`

Se envia el parametro "ID" de la venta que se desea actualizar y cambiar el estado a inactive.
*  `http://localhost:4000/api/sale/602eb9db3a549c61d8d9736f`
 
Respuesta del metodo PUT, es un _JSON_STATUS_OK_ 200, con la información de la venta actualiza y el valor de state="inactive". Dado que es la función implementada dentro del end point.


## Instalación :factory:

1. Clonar repositorio

```bash
git clone https://github.com/
```

2. Configurar archivo .env con sus propias variables de entorno

```bash
NODE_ENV = 
MONGO_URI = (En caso de trabajar localmente)
MONGO_URI:Atlas = (En caso de trabajar con BD en la nube)
SECRETKEYJWT = ;
CLOUDINARY_API_KEY= (Generar una clave en cloudinary)
CLOUDINARY_API_SK=
HOST=(Indicar ruta donde se quiere levantar el server)
USER_DB=
PASSWORD_DB =
```

3. Install dependencies

```bash
npm install
```

4. Script para iniciar app con nodemon

```bash
npm run dev
```

🌟 Listo! Se puede utilizar los endpoint!


## Despliegue :rocket:

Si bien no era requisito el despliegue del sistema en servidores web, se busco dicho despliegue a fin de dar una mejor y completa impletación de dicho sistema.

_Front-End desplegado en: [React dev tools Chrome](https://www.google.com/intl/es-419/chrome/)_

_Back-End desplegado en: [Heroku](https://www.heroku.com/)_

_Base de datos alojada en: [Mongo Atlas](https://www.mongodb.com/cloud/atlas)_

_Imagenes alojadas en: [React dev tools Chrome](https://www.cloudinary.com/)_

## Datos a tener en cuenta :warning:

_El sistema debe contener al menos un usuario Gerente, dado que si se eliminan todos los usuarios de la base de datos, no se va a poder realizar la creación de nuevos usuarios, ya que el metodo POST para la creación de usuarios esta validado por rol de usuario, y token._

_Si bien las peticiones a Cloudinary deberian ser realizadas por el servido Back-End, la petición para realizar el upload de la imagen es realizada por el Front-End, ya que no que no se pudo implementar en el Back-End, por diferentes errores encontrados durante el desarrollo, los cuales no fueron resueltos ni con la documentación oficial de Cloudinary._

_En caso de querer correr un servidor d edesarrollo, deberá realizar la configuración de las variables de entorno._

## Anexo Front-End 
[Front-End - Client](https://github.com/fgmamoris/p3-mern.git)

## Autor :black_nib:

**Federico Mamoris** 

