import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from "./core/Home";
import Shop from "./core/Shop";
import SignUp from "./user/Signup";
import SignIn from "./user/Signin";
import PrivateRoute from "./auth/PrivateRoutes";
import UserDashboard from "./user/UserDashboard";
import AdminRoute from "./auth/AdminRoute";
import AdminDashboard from "./user/AdminDashboard";
import AddCategory from './admin/AddCategory';
import AddProduct from './admin/AddProduct';
import Product from './core/product';
import Cart from './core/Cart';
import Order from './admin/order';

const routes = () => (
    <BrowserRouter>
        <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/shop' exact component={Shop} />
            <Route path='/signup' exact component={SignUp} />
            <Route path='/signin' exact component={SignIn} />
            <PrivateRoute path='/user/dashboard' exact component={UserDashboard} />
            <AdminRoute path='/admin/dashboard' exact component={AdminDashboard} />
            <AdminRoute path='/admin/create/category' exact component={AddCategory} />
            <AdminRoute path='/admin/create/product' exact component={AddProduct} />
            <AdminRoute path='/admin/orders' exact component={Order} />
            <Route path='/product/:productId' exact component={Product} />
            <Route path='/cart' exact component={Cart} />
        </Switch>
    </BrowserRouter>
)

export default routes;