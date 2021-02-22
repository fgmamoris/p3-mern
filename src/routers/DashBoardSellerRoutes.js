import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ProductDetail } from '../components/product/ProductDetail';
import { ProductsList } from '../components/product/ProductsList';
import { NavBarBoot } from '../components/ui/NavBarBoot';
import { RegisterProduct } from '../components/product/RegisterProduct';
import { ShopCart } from '../components/shop/ShopCart';
import { CheckOut } from '../components/checkout/CheckOut';

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
