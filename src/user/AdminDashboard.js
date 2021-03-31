import React from 'react';
import Layout from "../core/Layout";
import { isAuthenticate } from "../auth";
import { Link } from "react-router-dom";

const Dashboard = () => {

    const {user: {_id, name, email, role}} = isAuthenticate();

    const adminLinks = () => (
        <div className='card'>
            <h4 className='card-header'>User Links</h4>
            <ul className='list-group'>
                <li className='list-group-item'>
                    <Link className='nav-link' to='create/category'>Create Category</Link>
                </li>
                <li className='list-group-item'>
                    <Link className='nav-link' to='create/product'>Create Product</Link>
                </li>
            </ul>
        </div>
    )

    const adminInfo = () => (
        <div className='card mb-5'>
            <h3 className='card-header'>User Information</h3>
            <ul className='list-group'>
                <li className='list-group-item'>Name : {name}</li>
                <li className='list-group-item'>Email : {email}</li>
                <li className='list-group-item'>Type : {role === 1 ? 'admin' : 'Registered User'}</li>
            </ul>
        </div>
    )

    return (
        <Layout title='DashBoard' description={`Hello Admin -  ${name}`} className='container'>
            <h1 className='mb-5'>Welcome to User Dashboard</h1>

            <div className='row'>
                <div className='col-3'>
                    {adminLinks()}
                </div>
                <div className='col-9'>
                    {adminInfo()}
                </div>
            </div>

        </Layout>
    )}

export default Dashboard;