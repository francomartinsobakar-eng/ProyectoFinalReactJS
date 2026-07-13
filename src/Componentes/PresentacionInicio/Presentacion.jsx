import React from "react";
import styles from "../PresentacionInicio/Presentacion.module.css";
 
function Presentacion(){
    return(
        <div className={styles.presentacion}>
            <h1>Bienvenido a MilHerramientas</h1>
            <p>Descubre nuestra amplia seleccion de herramientas para todos tus proyectos.</p>
            <section className={styles.imagenes}>
                <img src="/images/pico.png" alt="Pico" />
                <img src="/images/cuchara.png" alt="Cuchara"/>
                <img src="/images/carretilla.png" alt="Carretilla"/>
                <img src="/images/llanadentada.png" alt="Llanadentada"/>
            </section>

        </div>
    );
}

export default Presentacion;