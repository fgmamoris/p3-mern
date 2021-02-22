
# Super Market


### Contenido
1. [Casos de uso](#casos-de-uso-📋)
    
    1.1 [Caso de uso Usuarios](#caso-de-uso-usuarios)
    
    1.2 [Caso de uso Productos](#caso-de-uso-productos)
    
    1.3 [Caso de uso Orden de venta](#caso-de-uso-orden-de-venta)
    
    1.4 [Caso de uso Ventas](#caso-de-uso-ventas)
    
2. [Informe del Sistema](#informe-del-sistema-📝)
    
    2.1 [Screenshot del sistema](#screenshot-del-sistema-📷)

3. [Pre-requisitos](#pre-requisitos)
4. [Instalación](#instalación-🛠️)
5. [Despliegue](#despliegue-📦)
6. [Tecnologías](#tecnologías-💻)
7. [Datos a tener en cuenta](#datos-a-tener-en-cuenta-⚠️)
8. [Anexo Back-End](#anexo-back-end)
9. [Autor](#autor-✒️)

El sistema esta creado a fin de dar cumplimiento a la solicitud de la materia Programación 3 del INSPT-UTN, el mismo consta de los siguientes requisitos:

## Casos de uso 📋

### Caso de uso Usuarios 
* Alta de usuario
* Modificar usuario
* Eliminar usuario
* Listar usuarios
### Caso de uso Productos 
* Alta de producto
* Modificar producto
* Eliminar producto
* Listar producto
### Caso de uso Orden de venta 
* Crear nueva orden de venta
* Eliminar orden de venta
* Agregar nuevo producto a la orden
* Agregar mas cantidad de producto a la orden
* Eliminar producto de orden de venta
### Caso de uso Ventas 
* Crear nueva venta
* Cambiar de estado venta

## Informe del sistema 📝

Si bien presenta una UI similar a un e-commerce, a diferencia de este, el sistema permite administración de productos, y usuarios, las ventas, como así también la visualización de las ventas realziadas y permitir la cancelación de las mismas. El sistema fue desarrolla bajo el stack MERN, y en el siguiente archivo se puede ver la información correspondiente al sevidor Back-End: link readme backend

Para el desarrollo se busco utilizar Redux, a fin de evitar estar haciendo peticiónes constantes o redundante al backend, y solo realizarlas en caso de confirmar alguna acción, ya sea crear, modificar o eliminar.
El store se creo de la siguiente manera:
```bash
const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

```
Donde el reducer central, va a contener todos los reducer
```bash
export const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  products: productReducer,
  action: actionReducer,
  cart: cartReducer,
  sales: salesReducer,
});
```
De esta manera, una vez validado el usuario, se realiza la carga en el store de todos los datos requeridos, en base al grado de acceso del usuario. Esto permite que si un usuario no realiza ninguna petición/acción dentro del sistema, y solo navega por el mismo, el Front-End, no va a realizar petición alguna al Back-End evitando así sobrecarga de tareas asincronas.
Para logar esto, la validación se realiza una vez logeado el usuario, siempre y cuando el logeo sea válido, y en base al rol del usuario dentro del sistema, se va a realizar las peticiones que correspondan al state en el store, lo mismo se puede ver a continuación como se realiza la carga de dichos datos:
```bash
export const startLogin = (email, password) => {
  return async (dispatch) => {
    const resp = await fetchSinToken('auth/new', { email, password }, 'POST');
    const body = await resp.json();
    if (body.ok) {
      localStorage.setItem('token', body.token);
      localStorage.setItem('token-init-date', new Date().getTime());
      dispatch(
        login({
          uid: body.uid,
          firstName: body.firstName,
          lastName: body.lastName,
          position: body.employeePosition,
        })
      );
      if (body.employeePosition === 'gerente') {
        dispatch(userStartCheckingList());
        dispatch(startSaleCheckingList());
      } else if (body.employeePosition === 'vendedor') {
        dispatch(startCartCheking());
      }
      dispatch(startCheckingListProducts());
    } else {
      Swal.fire('Error', body.msg, 'error');
    }
  };
};
```

```bash
export const userStartCheckingList = () => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken('user', {});
      const body = await resp.json();
      const users = body.users.map((u) => u);
      dispatch(userCheckingList(users));
    } catch (error) {
      console.log(error);
    }
  };
};
```
La función userCheckingList, es la encargada de indicar que tipo de acción y cual es el payload, con el cual el reducer va a trabajar
```bash
export const userCheckingList = (users) => ({
  type: types.userCheckingList,
  payload: users,
});
```
El reducer es no es mas que una simple función, la cual esta compuesta, por el estado y la acción, el estado es la información con la que voy a trabajar en base a la petición que se le envia, y el tipo (type) de acción a realizar.
```bash
export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.userCheckingList:
      return {
        ...state,
        users: action.payload,
      };
    case types.userAddNew:
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case types.userUpdated:
      return {
        ...state,
        users: state.users.map((user) =>
          user._id === action.payload._id ? action.payload : user
        ),
      };
    case types.userDeleted:
      return {
        ...state,
        users: state.users.filter((user) => user._id !== action.payload),
      };
    default:
      return state;
  }
};
```

_Se utilizaron los sisguiente hooks_
lista de hooks:
* useEffect, se utilizo para la acutalizacion de los Funtional Component, cuando se produce el cambio en algún estado o variable del componente.
```bash
useEffect(() => {
    if (action) {
      dispatch(removeAction());
    }
  }, [products, action, dispatch]);
```
* useState, se utilizó para la creación de constantes, y su repectivo metodo para setear la misma, es un hooks recomendado y propio el mismo react, en lugar de crear variables del tipo let/var
```bash
  const [validated, setValidated] = useState(false);
  const [formValues, handleInputChange] = useForm({
    inputEmail: '',
    inputPassword: '',
  });
```

Como el sistema consta de varios formularios, para evitar un uso excesivo del useState para cada input del los formularios mencionados, se utilizo un hook personlaizado, el mismo fue creado por Fernando Herrera y compartido a la comunidad mediante el curso [React: De cero a experto ( Hooks y MERN )](https://www.udemy.com/course/react-cero-experto/)

```bash
export const useForm = (initialState = {}) => {
  const [values, setValues] = useState(initialState);
  const reset = () => {
    setValues(initialState);
  };
  const handleInputChange = ({ target }) => {
      setValues({
      ...values,
      [target.name]: target.value,
    });
  };
  return [values, handleInputChange, reset];
```

Además del mimso curso se puedo extraer y utilizar la función fetch, la cual permite realizar las peticiones al servidor back end, sin la necesidad de utilizar una libreria de tercero como puede ser Axios.

```bash
const fetchConToken = (endpoint, data, method = 'GET') => {
  const url = `${baseUrl}/${endpoint}`; //localhost:4000/api/...
  const token = localStorage.getItem('token') || ''; // por si retorna un null
  if (method === 'GET') {
    return fetch(url, {
      method,
      headers: {
        'x-access-token': token,
      },
    });
  } else {
    return fetch(url, {
      method,
      headers: {
        'Content-type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify(data),
    });
  }
};
```

Para la validación del email, si bien bootstrap viene con una validación implicita, esto trae errores, como por ejemplo, la validación por defecto, reconoce como válida una dirección que contenga la siguiente infomación x@x sin verificar que el dominio sea un dominio valido, para evitar este error se implemento el emailValidation, el cual retorna un booleado en base a una RegEx, en caso de ser una dirección valida o invalida.
```bash
export const emailValidation = (inputData) => {
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
    inputData
  );
};
```

De la misma manera se crearon funciones para validar que el vencimiento de las tarjetas de pago validateCreditDateExpiration.
```bash
export const validateCreditDateExpiration = (inputExpireDate) => {
  if (
    parseInt(inputExpireDate[0] + inputExpireDate[1]) <= 0 ||
    parseInt(inputExpireDate[0] + inputExpireDate[1]) >= 13
  ) {
    return { msg: 'Debe ingresar un mes válido', valid: 'true' };
  } else if (
    parseInt(inputExpireDate[2] + inputExpireDate[3]) <
    new Date().getFullYear() - 2000
  ) {
    return { msg: 'Tarjeta vencida', valid: 'true' };
  } else if (
    parseInt(inputExpireDate[2] + inputExpireDate[3]) >
    new Date().getFullYear() - 2000
  ) {
    return { msg: 'Tarjeta válida', valid: 'false' };
  } else if (
    parseInt(inputExpireDate[2] + inputExpireDate[3]) ===
      new Date().getFullYear() - 2000 &&
    inputExpireDate[0] + inputExpireDate[1] < new Date().getMonth() + 1
  ) {
    return { msg: 'Tarjeta vencida', valid: 'true' };
  } else {
    return { msg: 'Tarjeta válida', valid: 'false' };
  }
};
```
Para la protección de rutas se realizo dos tipos de validaciónes, en primer lugar se valida mediante el reducer Auth, si el usuario es un usuario valido, y si el token no expiro, en segundo lugar se realizo una protección de rutas basada en el grado de acceso del usuario. si un usuario no es valido para la navegación se realiza una redirección impinendo así la navegación de usuarios con menor grado a acceso. Para luego proceder a la implementación de react-router-dom, a traves del componente BrowserRouter (renombrado como Router), el cual se encarga de la navegación entre componentes.
```bash
export const PrivateRoute = ({
  isAuthnticated,
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      component={(props) =>
        //histoy, location, params o search
        isAuthnticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    ></Route>
  );
};
PrivateRoute.prototypes = {
  isAuthnticated: PropTypes.bool.isRequired,
  Component: PropTypes.func.isRequired,
};
```
Componente MarkerRouter:
```bash
return (
    <Router>
      <Switch>
        <PublicRoute
          exact
          path="/login"
          component={LoginScreen}
          isAuthenticated={!!uid}
        />

        {/*<Route exact path="/login" component={LoginScreen} />*/}
        {/**Enmarca todas mis rutas privadas */}
        {position === 'vendedor' ? (
          <PrivateRoute
            path="/"
            component={DashBoardSellerRoutes}
            isAuthnticated={!!uid}
          />
        ) : (
          <PrivateRoute
            path="/"
            component={DashBoardRoutes}
            isAuthnticated={!!uid}
          />
        )}
        <Redirect to="/login" />
      </Switch>
    </Router>
  );
```
```bash
export const DashBoardSellerRoutes = () => {
  return (
    <>
      <NavBarBoot />

      <Switch>
        <Route exact path="/products" component={ProductsList} />
        <Route exact path="/product/detail/:id" component={ProductDetail} />
        <Route exact path="/product/:id" component={RegisterProduct} />
        <Route exact path="/shop" component={ShopCart} />
        <Route exact path="/checkout" component={CheckOut} />
        <Redirect to="/products" />
      </Switch>
    </>
  );
};
``` 

## ScreenShot del sistema 📷

#### Lista de Usuarios
![ListUsers](c:/users/user/desktop/images/users.png)
#### Lista de Productos
![ListProducts](c:/users/user/desktop/images/products.png)
#### Formulario nuevo usuario
![form](c:/users/user/desktop/images/formnewuser.png)
#### Mensaje de confirmación
![messegDelete](c:/users/user/desktop/images/messegeDelete.png)
#### Modal seleccionar cantidad de producto
![modaladdproduct](c:/users/user/desktop/images/modaladdproduct.png)
#### Orden de venta
![sale](c:/users/user/desktop/images/sale.png)
#### Checkout
![Checkout](c:/users/user/desktop/images/Checkout.png)

## Pre-requisitos 🔧

_Para la desarrollo y ejecución del proyecto se utilizó las siguientes tecnologías_

* [VSCODE](https://code.visualstudio.com/) - Versión 1.53.0

* [MONGODB COMPASS](https://www.mongodb.com/products/compass) - Versión 1.25.0 

* [POSTMAN](https://www.postman.com/)

* [GOOGLE CHROME](https://www.google.com/intl/es-419/chrome/) - Navegador web

* [REACT DEV TOOLS](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=es) - Herramienta web para desarrolladores

## Instalación 🛠️

1. Clonar repositorio

```bash
git clone https://github.com/.git
```

2. Configurar archivo .env con sus propias variables de entorno

```bash
REACT_APP_URI= http://localhost:4000/api
```

3. Install dependencies

```bash
npm install
```

4. Script para iniciar app

```bash
npm start
```

5. Inicar servidor Back-end


🌟 Listo! Se puede utilizar los endpoint!




## Despliegue 📦

Si bien no era requisito el despliegue del sistema en servidores web, se busco dicho despliegue a fin de dar una mejor y completa impletación de dicho sistema.

_Front-End desplegado en: [React dev tools Chrome](https://www.google.com/intl/es-419/chrome/)_

_Back-End desplegado en: [Heroku](https://www.heroku.com/)_

_Base de datos alojada en: [Mongo Atlas](https://www.mongodb.com/cloud/atlas)_

_Imagenes alojadas en: [Cloudinary](https://www.cloudinary.com/)_

## Tecnologías 💻

Para dar cumplimiento a los requisitos solicitados se utilizaron las siguientes herramientas para el desarrollo del sistema Front-End.

* MERN - Framework Core
    * [MONGO](https://www.mongodb.com/es) - Base de datos
    * [EXPRESS](https://expressjs.com/es/) – infraestructura de aplicaciones web Node.js
    * [REACT](https://spring.io/projects/spring-data) – Biblioteca js para interfaces de usuarios
    * [NODE](https://nodejs.org/es/) – Entorno de ejecución para JavaScript
* [React-Bootstrap](https://react-bootstrap.github.io/) - Motor de plantillas y componentes web
* [react-bootstrap-icons](https://www.npmjs.com/package/react-bootstrap-icons) - Iconos complementarios
* [Sweetalert2](https://sweetalert2.github.io/) - Manejador de alertas/popup boxes

## Datos a tener en cuenta ⚠️

_El sistema debe contener al menos un usuario Gerente, dado que si se eliminan todos los usuarios de la base de datos, no se va a poder realizar la creación de nuevos usuarios, ya que el metodo POST para la creación de usuarios esta validado por rol de usuario, y token._

_Si bien las peticiones a Cloudinary deberian ser realizadas por el servido Back-End, la petición para realizar el upload de la imagen es realizada por el Front-End, ya que no que no se pudo implementar en el Back-End, por diferentes errores encontrados durante el desarrollo, los cuales no fueron resueltos ni con la documentación oficial de Cloudinary._

_En caso de querer correr un servidor desarrollo, deberá realizar la configuración de las variables de entorno._

## Anexo Back-End 
[link](https://www.gituhub.com/)
## Autor ✒️

**Federico Mamoris** 

