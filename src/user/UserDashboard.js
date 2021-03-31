import React from 'react';
import Layout from "../core/Layout";
import { isAuthenticate } from "../auth";
import { Link } from "react-router-dom";

const Dashboard = () => {

    const {user: {_id, name, email, role}} = isAuthenticate();

    const userLinks = () => (
        <div className='card'>
            <h4 className='card-header'>User Links</h4>
            <ul className='list-group'>
                <li className='list-group-item'>
                    <Link className='nav-link' to='/cart'>My Cart</Link>
                </li>
                <li className='list-group-item'>
                    <Link className='nav-link' to='profile/update'>Update Profile</Link>
                </li>
            </ul>
        </div>
    )

    const userInfo = () => (
        <div className='card mb-5'>
            <h3 className='card-header'>User Information</h3>
            <ul className='list-group'>
                <li className='list-group-item'>Name : {name}</li>
                <li className='list-group-item'>Email : {email}</li>
                <li className='list-group-item'>Type : {role === 1 ? 'admin' : 'Registered User'}</li>
            </ul>
        </div>
    )

    const purchaseHistory = () => (
        <div className='card mb-5'>
            <h3 className='card-header'>Purchase History</h3>
            <ul className='list-group'>
                <li className='list-group-item'>All Products</li>
            </ul>
        </div>
    )

    return (
    <Layout title='DashBoard' description={`Hello ${name}`} className='container'>
        <h1 className='mb-5'>Welcome to User Dashboard</h1>

        <div className='row'>
            <div className='col-3'>
                {userLinks()}
            </div>
            <div className='col-9'>
                {userInfo()}
                {purchaseHistory()}
            </div>
        </div>

    </Layout>
)}

export default Dashboard;