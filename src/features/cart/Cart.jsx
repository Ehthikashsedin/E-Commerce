import { useSelector, useDispatch } from "react-redux";
import {removeFromCart, increaseQuantity, decreaseQuantity} from "./cartSlice";

const Cart = () => {
    const dispatch = useDispatch();
    const {cartItems}=useSelector((state)=> state.cart);
    const subtotal = cartItems.reduce(
        (acc, item) =>acc + item.price * item.quantity,
        0
      );
    const gst_percentage = 0.1;
    const gst =subtotal* gst_percentage;
    
    const total =subtotal +gst;
    
    return (
        <div className="cart">
          <h2>Cart</h2>
          {cartItems.map((item) =>(
            <div key={item.id} style={{
              display: "flex",
              gap: "1rem",
              padding: "1rem",
              border: "1px solid #ddd",
              borderRadius: "4px",
              marginBottom: "1rem",
              alignItems: "flex-start"
            }}>
              <img src={item.image} alt={item.title} style={{
                width: "80px",
                height: "80px",
                objectFit: "contain",
                flexShrink: 0
              }} />
              <div style={{ flex: 1 }}>
                <h4 style={{ marginBottom: "0.5rem" }}>{item.title}</h4>
                <p style={{ marginBottom: "0.3rem" }}>Price: Rs. {item.price}</p>
                <p style={{ marginBottom: "0.5rem" }}>Qty: {item.quantity}</p>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button
                    onClick={() =>
                      dispatch(increaseQuantity(item.id))
                    }
                    style={{ padding: "0.5rem 0.75rem", background: "#007bff", color: "white", border: "none", borderRadius: "3px", cursor: "pointer" }}
                  >
                    +
                  </button>
        
                  <button
                    onClick={() =>
                      dispatch(decreaseQuantity(item.id))
                    }
                    style={{ padding: "0.5rem 0.75rem", background: "#6c757d", color: "white", border: "none", borderRadius: "3px", cursor: "pointer" }}
                  >
                    -
                  </button>
        
                  <button
                    onClick={() =>dispatch(removeFromCart(item.id))}
                    style={{ padding: "0.5rem 0.75rem", background: "#dc3545", color: "white", border: "none", borderRadius: "3px", cursor: "pointer" }}
                  >
                    Remove
                  </button>
                </div>
              </div>
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
