import React, {useState, useEffect} from 'react';
import { isAuthenticate } from '../auth';
import { Link } from 'react-router-dom'

const Checkout = ({ product }) => {

    const getTotal = () => {
        return product.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;
        }, 0)
    }

    const showCheckout = () => {
        return isAuthenticate() ? (
            <button className="btn btn-success">Checkout</button>
        ) : (
            <Link to='/signin'>
              <button className="btn btn-primary">Sign in to Checkout</button>
            </Link>
        )
    }

    return (
        <div>
            <h1>Total Amount : {getTotal()} Tk</h1>

            { showCheckout() }
        </div>
    )
}

export default Checkout;