import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from "./core/Home";
import SignUp from "./user/Signup";
import SignIn from "./user/Signin";
import PrivateRoute from "./auth/PrivateRoutes";
import UserDashboard from "./user/UserDashboard";
import AdminRoute from "./auth/AdminRoute";
import AdminDashboard from "./user/AdminDashboard";
import AddCategory from './admin/AddCategory';
import AddProduct from './admin/AddProduct';

const routes = () => (
    <BrowserRouter>
        <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/signup' exact component={SignUp} />
            <Route path='/signin' exact component={SignIn} />
            <PrivateRoute path='/user/dashboard' exact component={UserDashboard} />
            <AdminRoute path='/admin/dashboard' exact component={AdminDashboard} />
            <AdminRoute path='/admin/create/category' exact component={AddCategory} />
            <AdminRoute path='/admin/create/product' exact component={AddProduct} />
        </Switch>
    </BrowserRouter>
)

export default routes;