import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, getDoc, doc } from 'firebase/firestore';
import Container from 'react-bootstrap/Container';
import { ItemCount } from './ItemCount';
import { ItemsContext } from '../contexts/ItemsContext';
import { Spinner, Toast } from 'react-bootstrap';

export const ItemDetailContainer = () => {
    const [item, setItem] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showToast, setShowToast] = useState(false);
    const { addItem } = useContext(ItemsContext);

    const { id } = useParams();

    useEffect(() => {
        const db = getFirestore();

        const refDoc = doc(db, "items", id);

        getDoc(refDoc)
            .then((snapshot) => {
                setItem({ ...snapshot.data(), id: snapshot.id });
            })
            .finally(() => setLoading(false));
    }, [id]);

    const onAdd = (quantity) => {
        addItem({ ...item, quantity });
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    if (loading) {
        return (
            <div className="text-center">
                <Spinner animation="border" variant="primary" />
            </div>
        );
    }

    return (
        <Container className="mt-4 item-detail-container">
            <h2 id="productos">Detalle de tu producto</h2>
            <div className='detail-header'>
                <h1>{item.title}</h1>
                <h2>{item.category}</h2>
            </div>
            <div className='detail-body'>
                <img src={item.imageid} alt={item.title} className='detail-image' />
                <div className='detail-info'>
                    <p><b>Descripción: </b>{item.description}</p>
                    <b>Precio: ${item.price}</b>
                    <p>Stock disponible: {item.stock}</p>
                    <ItemCount stock={item.stock} onAdd={onAdd} />
                </div>
            </div>
            
            
            <Toast
                style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1050 }}
                show={showToast}
                onClose={() => setShowToast(false)}
                delay={3000}
                autohide
            >
                <Toast.Body>Agregado a su carrito</Toast.Body>
            </Toast>
        </Container>
    );
};
