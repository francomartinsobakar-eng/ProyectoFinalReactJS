import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../Item/Item.module.css";
import { useCart } from "../../context/CartContext";


function Item({ id, nombre, precio, descripcion, foto }) {

    const { addToCart, getCantidadActual } = useCart();
    const [cantidad, setCantidad] = useState(0);
    const cantidadActual = getCantidadActual(id);

    const handleAddToCart = () => {
        addToCart({ id, nombre, precio }, cantidad + 1);
    };


    return (
        <div className={styles.item}>
            <img src={foto} alt={nombre} />
            <h3>{nombre}</h3>
            <h4>Precio: ${precio}</h4>
            <p>Cantidad en el carrito: {cantidadActual}</p>
            <Link to={`/productos/${id}`}>Ver detalle</Link>
            <button onClick={handleAddToCart}>Agregar al carrito</button>
        </div>
    );
}

export default Item;