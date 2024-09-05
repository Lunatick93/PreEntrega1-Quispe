import { useContext, useState } from "react";
import { ItemsContext } from "../contexts/ItemsContext";
import  Container from "react-bootstrap/Container";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const initialValues = {
    phone: "",
    email: "",
    name: "",
};



export const Cart = () => {
const [buyer, setBuyer] = useState(initialValues);

const { items, removeItem, reset} = useContext(ItemsContext);

const handleChange = (ev) => {
    setBuyer((prev) => {
        return {
            ...prev,
            [ev.target.name]: ev.target.value,
        };
    });
};

const total = items.reduce((acc, act) => acc + act.price * act.quantity, 0);

const sendOrder = () => {
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
            alert("Su orden: " + id + " ha sido completada!");
        }
    })
    .finally(() => {
        reset();
        setBuyer(initialValues);
    });

};

if (items.length === 0) return "IR A LA HOME";

 return (
  <Container>
    <button onClick={reset}>Vaciar</button>
    {items.map((item) => {
            return (
                <div key={item.id}>
                    <h1>{item.title}</h1>
                    <img src={item.imageid} height={200} />
                    <p>{item.quantity}</p>
                    <p onClick={() => removeItem(item.id)}>X</p>
                </div>
            );
        })}
        <br />
        <div>Total $ {total}</div>
        <br />
        <form>
            <div>
                <label>Nombre</label>
                <input value={buyer.name} name="name" onChange={handleChange} />
            </div>
            <div>
                <label>Teléfono</label>
                <input value={buyer.phone} name="phone" onChange={handleChange} />
            </div>
            <div>
                <label>Email</label>
                <input value={buyer.email} name="email" onChange={handleChange} />
            </div>
        <button type="button" onClick={sendOrder}>
                Comprar
            </button>
        </form>
        </Container> 
 );
};