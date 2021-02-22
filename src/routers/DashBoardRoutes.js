import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ProductDetail } from '../components/product/ProductDetail';
import { ProductsList } from '../components/product/ProductsList';
import { NavBarBoot } from '../components/ui/NavBarBoot';
import { UsersList } from '../components/user/UsersList';
import { RegisterUser } from '../components/user/RegisterUser';
import { RegisterProduct } from '../components/product/RegisterProduct';
import { SalesList } from '../components/sales/SalesList';
import { SaleDetail } from '../components/sales/detail/SaleDetail';

export const DashBoardRoutes = () => {
  return (
    <>
      <NavBarBoot />

      <Switch>
        <Route exact path="/users" component={UsersList} />
        <Route exact path="/user/:id" component={RegisterUser} />
        <Route exact path="/user" component={RegisterUser} />
        {/*El siguiente componenete recibe un parametro en la url */}
        <Route exact path="/products" component={ProductsList} />
        <Route exact path="/product/detail/:id" component={ProductDetail} />
        <Route exact path="/product/:id" component={RegisterProduct} />
        <Route exact path="/product/" component={RegisterProduct} />
        <Route exact path="/sales" component={SalesList} />
        <Route exact path="/sales/:id" component={SaleDetail} />
        <Redirect to="/users" />
      </Switch>
    </>
  );
};
