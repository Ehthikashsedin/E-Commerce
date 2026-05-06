import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const NavBar = () => {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const cartCount = cartItems.length;

    return (
        <nav className="navbar">
            <Link to="/">Store</Link>
            <Link to="/cart" style={{ position: "relative" }}>
                🛒 Cart
                {cartCount > 0 && (
                    <span style={{
                        position: "absolute",
                        top: "-5px",
                        right: "-10px",
                        background: "red",
                        color: "white",
                        borderRadius: "50%",
                        width: "20px",
                        height: "20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "12px",
                        fontWeight: "bold"
                    }}>
                        {cartCount}
                    </span>
                )}
            </Link>
        </nav>
    );
};

export default NavBar;