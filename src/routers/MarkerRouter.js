import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { startChecking } from '../components/actions/auth';
import { SpinnerR } from '../components/ui/SpinnerR';
import { LoginScreen } from '../login/LoginScreen';
import { DashBoardRoutes } from './DashBoardRoutes';
import { DashBoardSellerRoutes } from './DashBoardSellerRoutes';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const MarketRouter = () => {
  const { checking, position, uid } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startChecking());

    //
    /**
     * Tengo que verificar si tengo uid y la posición
     * a fin de cargar todo en el store inicial
     */
  }, [dispatch]);
  if (checking) {
    return (
      <Container
        style={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 'auto',
        }}
      >
        <SpinnerR />
      </Container>
    );
  }
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
};
