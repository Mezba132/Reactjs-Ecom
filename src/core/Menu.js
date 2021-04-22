import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import {signout, isAuthenticate} from "../auth";
import { totalCartItem } from './CartHelpers';

const isActive = (history, path) => {
    if(history.location.pathname === path) {
        return { color : '#e36f17' }
    }
    else {
        return { color : '#c4e317' }
    }
}

const menu = ({ history }) => (
    <div>
        <ul className='nav nav-tabs'>
            <li className='nav-item'>
                <Link className='nav-link' style={isActive(history, '/')} to='/'>
                    Home
                </Link>
            </li>

            <li className='nav-item'>
                <Link className='nav-link' style={isActive(history, '/shop')} to='/shop'>
                    Shop
                </Link>
            </li>

            <li className='nav-item'>
                <Link className='nav-link' style={isActive(history, '/cart')} to='/cart'>
                    Cart <sup><small className='cart-badge'>{totalCartItem()}</small></sup>
                </Link>
            </li>

            {isAuthenticate() && isAuthenticate().user.role === 0 && (
                <li className='nav-item'>
                    <Link className='nav-link' style={isActive(history, '/user/dashboard')} to='/user/dashboard'>
                        DashBoard
                    </Link>
                </li>
            )}

            {isAuthenticate() && isAuthenticate().user.role === 1 && (
                <li className='nav-item'>
                    <Link className='nav-link' style={isActive(history, '/admin/dashboard')} to='/admin/dashboard'>
                        DashBoard
                    </Link>
                </li>
            )}

            {!isAuthenticate() && (
                <React.Fragment>
                    <li className='nav-item'>
                    <Link className='nav-link' style={isActive(history, '/signup')} to='/signup'>
                        SignUp
                    </Link>
                    </li>
                        <li className='nav-item'>
                        <Link className='nav-link' style={isActive(history, '/signin')} to='/signin'>
                        SignIn
                        </Link>
                    </li>
            </React.Fragment>)}

            {isAuthenticate() && (
                <li className='nav-item'>
                    <span className='nav-link'
                          style={{cursor: 'pointer', color: '#c4e317'}}
                          onClick={() =>
                              signout(() => {
                                  history.push('/');
                              })
                          }>
                        SignOut
                    </span>
                </li>
            )}
        </ul>
    </div>
)

export default withRouter(menu);