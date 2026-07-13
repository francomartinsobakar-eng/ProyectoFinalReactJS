import React from "react";

function TarjetaPersona({id, nombre, email, puesto, foto}){
    return(
        <div className="tarjetaUsuario">
            <h2>{nombre}</h2>
            <h3>{puesto}</h3>
            <h4>{email}</h4>
            
        </div>
    );
}

export default TarjetaPersona;