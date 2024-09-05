import { useState } from "react"
import { Button } from "react-bootstrap";
import { ButtonGroup } from "react-bootstrap";

export const ItemCount = ({ onAdd, stock }) => {
    const [count, setCount] = useState(1);
    
    const handeIncrease = () => {
        if(count < stock) setCount((prev) => prev + 1);
    };

    const handeDecrease = () => {
        if (count > 1) setCount((prev) => prev - 1);
    };

    const handleAdd = () => {
        onAdd(count);
        setCount(1);
    };

    return (
    <div className="item-count">
        <ButtonGroup>
    <Button variant="secondary" onClick={handeIncrease}>+</Button>
    <Button variant="outline-info"disable>{count}</Button>
    <Button variant="secondary" onClick={handeDecrease}>-</Button>
    </ButtonGroup>
    <br />
    <Button variant="success" onClick={handleAdd} className="mt-2">Comprar</Button>
    </div>
    );
};