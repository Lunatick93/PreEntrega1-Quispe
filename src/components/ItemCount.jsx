import { useState } from "react"

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
    <>
    <button onClick={handeIncrease}>+</button>
    <span>{count}</span>
    <button onClick={handeDecrease}>-</button>
    <br />
    <button onClick={handleAdd}>Comprar</button>
    </>
    );
};