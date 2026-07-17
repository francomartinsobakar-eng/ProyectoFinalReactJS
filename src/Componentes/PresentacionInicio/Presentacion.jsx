import React from "react";
import styles from "../PresentacionInicio/Presentacion.module.css";
 
function Presentacion(){
    return(
        <div className={styles.presentacion}>
            <h1>Bienvenido a MilHerramientas</h1>
            <p>Descubre nuestra amplia seleccion de herramientas para todos tus proyectos.</p>
            <section className={styles.imagenes}>
                <img src="/images/ProyectoFinalReactJS/pico.png" alt="Pico" />
                <img src="/images/ProyectoFinalReactJS/cuchara.png" alt="Cuchara"/>
                <img src="/images/ProyectoFinalReactJS/carretilla.png" alt="Carretilla"/>
                <img src="/images/ProyectoFinalReactJS/llanadentada.png" alt="Llanadentada"/>
            </section>

        </div>
    );
}

export default Presentacion;