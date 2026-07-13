import React from 'react';

export function FormularioProducto({datosForm, manejarCambio, manejarEnvio, modoEdicion}) {
    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '24rem',
        margin: '3rem auto',
        padding: '1.5rem',
        border: '1px solid #ddd',
        borderRadius: '8px',
        gap: '16px'
    };

    return (
        <form style={formStyle} onSubmit={manejarEnvio}>
            <h3>{modoEdicion ? 'Editar producto' : 'Agregar nuevo producto'}</h3>

            <div>
                <label>Nombre del Producto:</label>
                <input
                    type="text"
                    placeholder="Ej: Teclado Mecánico"
                    name="nombre"
                    value={datosForm.nombre}
                    onChange={manejarCambio}
                />
            </div>

            <div>
                <label>Precio: $</label>
                <input
                    type="number"
                    placeholder="Ej: 95"
                    name="precio"
                    value={datosForm.precio}
                    onChange={manejarCambio}
                />
            </div>
            <div>
                <label>Descripcion</label>
                <input
                    type="text"
                    placeholder="Ej: Teclado Mecánico"
                    name="descripcion"
                    value={datosForm.descripcion}
                    onChange={manejarCambio}
                />
            </div>
            <div>
                <label>Imagen</label>
                <input
                    type="file"
                    name="foto"
                    onChange={manejarCambio}
                />
            </div>

            <button type="submit">{modoEdicion ? 'Actualizar producto' : 'Guardarproducto'}</button>
        </form>
    );
}