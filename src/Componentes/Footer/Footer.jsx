import React from "react";
import styles from "../Footer/Footer.module.css";
import TarjetaPersona from "../TrajetaPersona/TrajetaPersona";
import { useState, useEffect } from "react";

function Footer(){
    const [contactos, setContactos] = useState([]);

    useEffect(() => {
        fetch('/ProyectoFinalReactJS/data/personas.json')
            .then(respuesta => {
                console.log('Respuesta cruda del servidor:', respuesta);
                return respuesta.json();
            })
            .then(datos => {
                console.log('¡Personas cargadas!', datos);
                setContactos(datos);
            })
            .catch(error => {
                console.error('¡Ups! Hubo un error:', error);
            })
            .finally(() => {console.log('Personas cargadas!', contactos)});
    }, []);
    
    return(
        <footer className={styles.footer}>
            <h1>Quienes somos</h1>
            <p>Somos una empresa dedicada a ofrecer herramientas de calidad para ralizar cualquier trabajo, ya ea en casa o en otros lugares</p>
            <h3>Miembros de la empresa</h3>
            <ul>
                {contactos.map((contacto) => <TarjetaPersona key={contacto.id} {...contacto} />)}
            </ul>
        </footer>
    );
}

export default Footer;