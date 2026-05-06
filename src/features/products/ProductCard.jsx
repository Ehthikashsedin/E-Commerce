
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addToCart} from "../cart/cartSlice";
import {getStockMessage} from "../../utils/stockUtils";

const ProductCard=({product,view}) =>{
    const dispatch=useDispatch();
    return (
        <div className={`product-card ${view}`}>
            <img src={product.image} alt={product.title} className="product-image" />
            <div className="product-description">
                <h3 className="product-title">{product.title}</h3>
                <p className="product-price">Rs.{product.price}</p>
                <p className="product-stock">{getStockMessage(product.stock)}</p>
            
            <button 
                onClick={() => dispatch(addToCart(product))} 
                className="add-to-cart-button"
                disabled={product.stock === 0}
                style={{
                  opacity: product.stock === 0 ? 0.5 : 1,
                  cursor: product.stock === 0 ? "not-allowed" : "pointer"
                }}
            >
                {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </button>
            <Link to={`/product/${product.id}`} className="view-details-link">
                View Details
            </Link>
            </div> 
        </div>
    );
};
export default ProductCard;