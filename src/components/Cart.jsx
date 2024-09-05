import { useContext, useState } from "react";
import { ItemsContext } from "../contexts/ItemsContext";
import  Container from "react-bootstrap/Container";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { Table } from "react-bootstrap";

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
    <button onClick={reset} className="btn btn-danger">Vaciar Carrito</button>
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
            <button onClick={() => removeItem(item.id)} className="btn btn-danger">Eliminar</button>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
  <h3>Total: ${total}</h3>
        <form>
  <div className="form-group">
    <label>Nombre</label>
    <input className="form-control" value={buyer.name} name="name" onChange={handleChange} />
  </div>
  <div className="form-group">
    <label>Teléfono</label>
    <input className="form-control" value={buyer.phone} name="phone" onChange={handleChange} />
  </div>
  <div className="form-group">
    <label>Email</label>
    <input className="form-control" value={buyer.email} name="email" onChange={handleChange} />
  </div>
  <button type="button" className="btn btn-success" onClick={sendOrder}>Comprar</button>
</form>

        </Container> 
 );
};