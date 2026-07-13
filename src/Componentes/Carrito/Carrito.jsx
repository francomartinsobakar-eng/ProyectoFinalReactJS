import React from 'react';
import { useCart } from '../../context/CartContext'; 
import styles from "../Carrito/Carrito.module.css";
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cart, clearCart, getCartTotal, removeItem, cartDicrease } = useCart();
    
    if (cart.length === 0) {
        return (
            <div className={styles.carritoVacio}>
                <h1>Carrito de Compras</h1>
                <h2>El carrito está vacío</h2>
                <p>Agrega productos para continuar la compra.</p>
            </div>
        );
    }
    return (
        <div className={styles.carrito}>
            <h1>Carrito de Compras</h1>
            {cart.map(item => (
                <div key={item.id} className={styles.cartItem}>
                    <h4>{item.nombre}</h4>
                    <p>Cantidad: {item.quantity}</p>
                    <p>Precio unitario: ${item.precio}</p>
                    <p>Subtotal: ${item.precio * item.quantity}</p>
                    <button onClick={() => removeItem(item.id)}>Eliminar producto</button>
                    <button onClick={() => cartDicrease(item.id)}>Eliminar unidad</button>
                </div>
            ))}
            <hr />
            <h3>Total a pagar: ${getCartTotal()}</h3>
            <button onClick={clearCart}>Vaciar Carrito</button>
            <div className={styles.finalizarCompra}>
                <button><Link to = "/" onClick={() => alert("Gracias por comprar")}>Finalizar Compra</Link></button>
            </div>
            
        </div>
    );
};
export default Cart;