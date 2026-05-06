import { useSelector, useDispatch } from "react-redux";
import {removeFromCart, increaseQuantity, decreaseQuantity} from "./cartSlice";

const Cart = () => {
    const dispatch = useDispatch();
    const {cartItems}=useSelector((state)=> state.cart);
    const subtotal = cartItems.reduce(
        (acc, item) =>acc + item.price * item.quantity,
        0
      );
    
    const gst =subtotal* 0.1;
    
    const total =subtotal +gst;
    
    return (
        <div className="cart">
          <h2>Cart</h2>
          {cartItems.map((item) =>(
            <div key={item.id}>
              <h4>{item.title}</h4>
              <p>Qty: {item.quantity}</p>
              <button
                onClick={() =>
                  dispatch(increaseQuantity(item.id))
                }
              >
                +
              </button>
    
              <button
                onClick={() =>
                  dispatch(decreaseQuantity(item.id))
                }
              >
                -
              </button>
    
              <button
                onClick={() =>dispatch(removeFromCart(item.id))}
              >
                Remove
              </button>
            </div>
          ))}
    
          <hr />
    
          <h3>Subtotal:Rs.{subtotal.toFixed(2)}</h3>
          <h3>GST(10%):Rs.{gst.toFixed(2)}</h3>
          <h2>Total: Rs.{total.toFixed(2)}</h2>
        </div>
    );
};
    
export default Cart;
