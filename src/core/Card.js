import React from 'react';
import { Link } from 'react-router-dom';
import ShowImage from '../core/ShowImage'
import moment from 'moment';
import '../css/style.css';
 
const Card = ({product, showProductButton = true}) => {

    const showButton = () => {
        return (
            showProductButton && (
                <Link to={`/product/${product._id}`}>
                    <button className="btn btn-outline-primary mt-2 mb-2 mr-2">
                        View Product
                    </button>
                </Link>
            )
        )
    }

    const showCartButton = () => {
        return (
            <button className="btn btn-outline-warning mt-2 mb-2">
                Add to Cart
            </button>
        )
    }

    const showStock = quantity => {
        return quantity > 0 ? (
            <span className="badge badge-primary badge-pill">In Stock</span>
            ) : (
            <span className="badge badge-warning badge-pill">Out of Stock</span>
        )
    }

    return (
            <div className="card">
                <div className="card-header name">{product.name}</div>
                <div className="card-body">
                    <ShowImage item={product} url="products"/>
                    <p className="lead mt-2 text-truncate">{product.description}</p>
                    <p className="black-10">Price : {product.price}Tk</p>
                    <p className="black-9">
                        Category : {product.category && product.category.name}
                    </p>
                    <p className="black-8">
                        Added on {moment(product.createdAt).fromNow()}
                    </p>
                    {showStock(product.quantity)} <br/>
                    {showButton(showProductButton)}
                    {showCartButton()}
                </div>
            </div>
    )
}

export default Card;