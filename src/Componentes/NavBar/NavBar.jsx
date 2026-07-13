import React from "react";
import styles from "../NavBar/NavBar.module.css";
import {Link} from "react-router-dom";
import { useCart } from '../../context/CartContext';

function NavBar(){
    const { getCartQuantity } = useCart();
    const totalItems = getCartQuantity();
    console.log('totalItems en NavBar:', totalItems);

    const { getCantidadActual } = useCart();

    return(
        <nav className={styles.navBar}>
            <ul>
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/productos">productos</Link></li>
                <li><Link to="/carrito">Carrito {totalItems > 0 &&<span>{totalItems}</span>} </Link></li>
            </ul>
        </nav>
    );
}

export default NavBar;