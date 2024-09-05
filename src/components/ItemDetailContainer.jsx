import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, getDoc, doc } from 'firebase/firestore';
import Container from 'react-bootstrap/Container';
import { ItemCount } from './ItemCount';
import { ItemsContext } from '../contexts/ItemsContext';




export const ItemDetailContainer = () => {
    const [item, setItem] = useState([]);
    const [loading, setLoading] = useState(true);

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
    };

    if (loading) return "wait";

    return (
    <Container className="mt-4">
        <h1>{item.title}</h1>
        <h2>{item.category}</h2>
        <h3>{item.description}</h3>
        <img src={item.imageid}/>
        <br/>
        <b>${item.price}</b>
        <br/>
        <b>{item.stock}</b>
        <ItemCount stock={item.stock} onAdd={onAdd} />
        </Container> 
    );  
};  
