import React, {useState} from 'react';
import Layout from "../core/Layout";
import { Redirect } from "react-router-dom";
import { signin, authenticate, isAuthenticate } from "../auth";

const SignIn = () => {

    const [values, setValues] = useState({
        email : '',
        password : '',
        error : '',
        loading : false,
        redirectToReferrer : false
    })

    const {email, password, error, loading, redirectToReferrer} = values

    const { user } = isAuthenticate()

    const handleChange = value => e => {
        setValues({
            ...values,
            error: '',
            [value] : e.target.value
        })
    }

    const clickSubmit = e => {
        e.preventDefault();
        setValues({ ...values, error: '', loading: true });
        signin({email, password, error, loading, redirectToReferrer})
            .then(data => {
                if(data.error) {
                    setValues({
                        ...values,
                        error: data.error,
                        loading: false
                    })
                }
                else {
                    authenticate(data, () => {
                        setValues({
                            ...values,
                            redirectToReferrer : true
                        })
                    })
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    const showError = () => (
        <div className='alert alert-danger' style={{display : error ? '' : 'none'}}>
            {error}
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className='alert alert-info' style={{display : loading ? '' : 'none'}}>
                <h2>Loading.........</h2>
            </div>
        )

    const redirectTo = () => {
        if(redirectToReferrer) {
            if(user && user.role === 1)
            {
                return <Redirect to="/admin/dashboard" />
            }
           else {
                return <Redirect to="/user/dashboard" />
            }
        }

        if(isAuthenticate()) {
            return <Redirect to='/' />
        }
    }

    const signInForm = () => (
        <form>
            <div className='form-group'>
                <label className='text-muted'>Email</label>
                <input onChange={handleChange('email')} type='email' className='form-control'/>
            </div>
            <div className='form-group'>
                <label className='text-muted'>Password</label>
                <input onChange={handleChange('password')} type='password' className='form-control'/>
            </div>
            <button onClick={clickSubmit} className='btn btn-primary'>LogIn</button>
        </form>
    )

    return (
        <Layout
            title="SignIn"
            description="SignUp to E-Commerce Site for NodeJS, ReactJS"
            className='cotainer col-md-8 offset-md-2'
        >
            {showLoading()}
            {showError()}
            {redirectTo()}
            {signInForm()}
        </Layout>
    )
}

export default SignIn;