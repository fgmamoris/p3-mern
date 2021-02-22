/* Trae obsarvable, creo el store, pero tengo que pasar los reducers, y
 * lo ideal es crear un funcion para combinar los reducers
 * Luego tengo que indicar a la app que tengo un store, en el punto mas alto de la app, es decir en la raiz
 */
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { rootReducer } from '../reducers/rootReducer';

/* Combina todos los reducers,ya que el store solo puede recibir un solo reducer
 *
 */
/**
 * Uso mi rootReducer y evito utilizar el combine aqui
 */
const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

// let preloadedState;
// const persistedUserString = sessionStorage.getItem("user");

// if (persistedUserString) {
//   preloadedState = { auth: JSON.parse(persistedUserString) };
// } else preloadedState = { auth: { logged: false } };

// const reducers = combineReducers({
//   auth: authReducer,
// });

// export const store = createStore(
//   rootReducer,
//   preloadedState,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
