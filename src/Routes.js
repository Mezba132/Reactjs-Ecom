import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from "./core/Home";
import SignUp from "./user/Signup";
import SignIn from "./user/Signin";
import PrivateRoute from "./auth/PrivateRoutes";
import UserDashboard from "./user/UserDashboard";
import AdminRoute from "./auth/AdminRoute";
import AdminDashboard from "./user/AdminDashboard";

const routes = () => (
    <BrowserRouter>
        <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/signup' exact component={SignUp} />
            <Route path='/signin' exact component={SignIn} />
            <PrivateRoute path='/user/dashboard' exact component={UserDashboard} />
            <AdminRoute path='/admin/dashboard' exact component={AdminDashboard} />
        </Switch>
    </BrowserRouter>
)

export default routes;