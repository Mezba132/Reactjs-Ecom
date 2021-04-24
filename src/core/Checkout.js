import React, {useState, useEffect} from 'react';
import { getBrainTreeClientToken, processPaymentMethod } from './CoreApi';
import { isAuthenticate } from '../auth';
import { emptyCart } from './CartHelpers'
import { Link } from 'react-router-dom';
import DropIn from 'braintree-web-drop-in-react';

const Checkout = ({ product }) => {

    const [data, setData] = useState({
        success : false,
        clientToken: null,
        error: '',
        instance: {},
        address: ''
    })

    const { success, clientToken, error, instance, address } = data

    const userId = isAuthenticate() && isAuthenticate().user._id;
    const token = isAuthenticate() && isAuthenticate().token;

    const getToken = (userId, token) => {
        getBrainTreeClientToken(userId, token)
        .then(data => {
            if(data.error) {
                setData({...data, error: data.error})
            }
            else {
                setData({ clientToken: data.clientToken})
                console.log(data)
            }
        })
    }

    useEffect(() => {
        getToken(userId, token)
    }, [])

    const getTotal = () => {
        return product.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;
        }, 0)
    }

    const showCheckout = () => {
        return isAuthenticate() ? (
            <div>
                {showDropIn()}
            </div>
        ) : (
            <Link to='/signin'>
              <button className="btn btn-primary">Sign in to Checkout</button>
            </Link>
        )
    }

    const buy = () => {
        // send the nonce to your server
        // nonce = data.intance.requestPaymentMethod()
        let nonce;
        let getNonce = data.instance.requestPaymentMethod()
            .then(data => {
                // console.log(data);
                nonce = data.nonce;
                // once you have nonce (card type, card number) send nonce as 'paymentMethodNonce'
                // also total to be charged
                // console.log(
                //     "send nonce and total to process : ",
                //     nonce,
                //     getTotal(product)
                // )
                let paymentData = {
                    paymentMethodNonce: nonce,
                    amount: getTotal(product)
                }

                console.log(paymentData);

                processPaymentMethod(userId, token, paymentData)
                .then(result => {
                    if(result.error) {
                        setData({...data, error: result.error})
                    }
                    else {
                        setData({...data, success: result.success})
                        emptyCart(() => {
                            console.log('Thanks dude');
                        })
                    }
                })
                .catch(err => console.log(err))
            })
            .catch(err => {
                // console.log("dropin err : ", err);
                setData({...data, error : err.message})
            })
    }

    const showError = () => (
        <div className="alert alert-danger" style={{display : error ? '' : 'none'}}>
            {error}
        </div>
    )

    const showSuccess = () => (
        <div className="alert alert-info" style={{display : success ? '' : 'none'}}>
            Thank You! Your Payment was successful.
        </div>
    )

    const showDropIn = () => (
        // onBlur triggered when mouse cliked on page
        <div onBlur={() => setData({...data, error : ''})}>
            {data.clientToken !== null && product.length > 0 ? (
                <div>
                    <DropIn options={{
                        authorization: data.clientToken
                    }} onInstance={instance => (data.instance = instance)} />
                    <button onClick={buy} className="btn btn-success btn-block">Pay</button>
                </div> 
            ) : null }
        </div>
    )

    return (
        <div>
            <h1>Total Amount : {getTotal()} Tk</h1>
            <hr/>
            {showSuccess()}
            {showError()}
            { showCheckout() }
        </div>
    )
}

export default Checkout;