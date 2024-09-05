import { useContext, useState, useEffect } from "react";
import { ItemsContext } from "../contexts/ItemsContext";
import Container from "react-bootstrap/Container";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { Table, Toast, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const initialValues = {
    phone: "",
    email: "",
    name: "",
};

export const Cart = () => {
    const [buyer, setBuyer] = useState(initialValues);
    const [isValid, setIsValid] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [orderId, setOrderId] = useState("");

    const { items, removeItem, reset } = useContext(ItemsContext);
    const navigate = useNavigate();

    const handleChange = (ev) => {
        setBuyer((prev) => ({
            ...prev,
            [ev.target.name]: ev.target.value,
        }));
    };

    const total = items.reduce((acc, act) => acc + act.price * act.quantity, 0);

    const sendOrder = () => {
        if (!isValid) {
            setErrorMessage("Completa tus datos para realizar la compra");
            return;
        }

        const order = {
            buyer,
            items,
            total,
        };

        const db = getFirestore();
        const orderCollection = collection(db, "orders");

        addDoc(orderCollection, order)
            .then(({ id }) => {
                if (id) {
                    setOrderId(id);
                    setShowToast(true);
                    reset();
                    setBuyer(initialValues);
                    setTimeout(() => {
                        navigate("/");
                    }, 4000); 
                }
            })
            .catch(() => {
                setErrorMessage("Hubo un error al procesar su compra. Intente nuevamente.");
            });
    };

    const validateForm = () => {
        const errors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!buyer.name.trim()) {
            errors.name = "El nombre es requerido, vuelve a ingresar";
        }
        if (!buyer.phone.trim()) {
            errors.phone = "El teléfono es requerido, vuelve a ingresar";
        }
        if (!emailRegex.test(buyer.email)) {
            errors.email = "El email no es válido, ingresa nuevamente";
        }

        setFormErrors(errors);
        setIsValid(Object.keys(errors).length === 0);
    };

    useEffect(() => {
        validateForm();
    }, [buyer]);

    useEffect(() => {
        if (items.length === 0 && showToast) {
            const timer = setTimeout(() => {
                navigate("/");
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [items, showToast, navigate]);

    return (
        <Container>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item.id}>
                            <td>{item.title}</td>
                            <td>{item.quantity}</td>
                            <td>${item.price}</td>
                            <td>
                                <Button variant="danger" onClick={() => removeItem(item.id)}>
                                    Eliminar
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <h3>Total: ${total}</h3>

            <form className="cart-form">
                <div className="form-group">
                    <label>Nombre</label>
                    <input
                        className="form-control"
                        value={buyer.name}
                        name="name"
                        onChange={handleChange}
                    />
                    {formErrors.name && <small className="text-danger">{formErrors.name}</small>}
                </div>
                <div className="form-group">
                    <label>Teléfono</label>
                    <input
                        className="form-control"
                        value={buyer.phone}
                        name="phone"
                        onChange={handleChange}
                    />
                    {formErrors.phone && <small className="text-danger">{formErrors.phone}</small>}
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        className="form-control"
                        value={buyer.email}
                        name="email"
                        onChange={handleChange}
                    />
                    {formErrors.email && <small className="text-danger">{formErrors.email}</small>}
                </div>
                {errorMessage && <p className="text-danger">{errorMessage}</p>}
                <Button
                    variant="success"
                    onClick={sendOrder}
                    disabled={!isValid}
                >
                    Comprar
                </Button>
                <Button variant="danger" onClick={reset}>
                    Vaciar Carrito
                </Button>
            </form>

            <Toast
                style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1050 }}
                show={showToast}
                onClose={() => setShowToast(false)}
                delay={3000}
                autohide
            >
                <Toast.Body>¡Gracias por su compra! Su orden es: {orderId}</Toast.Body>
            </Toast>
        </Container>
    );
};
