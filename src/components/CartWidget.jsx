import cart from "../assets/cart.png";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ItemsContext } from "../contexts/ItemsContext";
import { Badge } from "react-bootstrap";

export const CartWidget = () => {
    const { items } = useContext(ItemsContext);

    const quantity = items.reduce((acc, act) => acc + act.quantity, 0);

    return (
    <Link to="/cart" className="cart-widget">
            <img src={cart} height={30} alt="Cart" className="cart-icon" />
            <span className="cart-text">Tu carrito</span>
            {quantity > 0 && <Badge bg="primary" className="cart-badge">{quantity}</Badge>}
        </Link>
    );
};