import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Spinner } from 'react-bootstrap';
import {
    getFirestore,
    getDocs,
    where,
    query,
    collection,
} from "firebase/firestore";




export const ItemListContainer = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    


    const { id } = useParams();

    useEffect(() => {
        const db = getFirestore();

        const ref = !id
         ? collection(db, "items")
         : query(collection(db, "items"), where("category", "==", id));

        getDocs(ref)
            .then((snapshot) => {
                setItems(
                    snapshot.docs.map((doc) => {
                        return { id: doc.id, ...doc.data() };
                    })
                );
            })
            .finally(() => setLoading(false));
    }, [id]);



    if (loading) {
  return <div className="text-center"><Spinner animation="border" variant="primary" /></div>;
}

        
    return ( 
        <div>
            
            <section className="banner">
                <div className="container-fluid mx-2 my-4">
                    <img src="img/banner1.jpg" alt="Banner" className="img-fluid" />
                </div>
            </section>

          
            <div className="container my-4">
                <h2 id="productos">Nuestros Productos</h2>
            </div>

           
    <Container className="mt-4 d-flex">
        {items.map((i) => (
        <Card key={i.id} style={{ width: '18rem' }}>
      
      <Card.Body>
        <Card.Title>{i.title}</Card.Title>
        <Card.Img variant="top" src={i.imageid} />
        <Card.Text>Precio: ${i.price}</Card.Text>
        <Card.Text>Categoria: {i.category}</Card.Text>
        <Link to={`/item/${i.id}`}>
        <Button class="btn-add" variant="dark">Agregar al carrito</Button>
        </Link>
         
      </Card.Body>
    </Card>
    ))}
    </Container>;    
    </div>
    );
};





    