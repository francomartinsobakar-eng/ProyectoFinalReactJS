import React, { useState } from 'react';
import { FormularioProducto } from './Formulario';
import { db } from '../../firebase/config';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';

function FormularioContainer({ datosForm, setDatosForm, productoAEditar }) {
    const [imagenFile, setImagenFile] = useState(null);

    const manejarCambio = (evento) => {
        const { name, value, files } = evento.target;
        if (name === 'foto' && files) {
            setImagenFile(files[0]);
            return;
        }
        setDatosForm({ ...datosForm, [name]: value });
    };

    const manejarEnvio = async (evento) => {
        evento.preventDefault();
        let foto = datosForm.foto;
        if (datosForm.nombre.trim() === "" || datosForm.precio <= 0) {
            alert("Por favor, complete todos los campos y asegúrese de que elprecio sea mayor a cero.");
            return;
        }

        if (imagenFile) {
            const formData = new FormData();
            formData.append('image', imagenFile);
            const apiKey = '3ba7519cf1e4cbc815c859cf0835ab6d';

            try {
                const response = await
                    fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                        method: 'POST',
                        body: formData,
                    });
                const data = await response.json();
                if (data.success) {
                    foto = data.data.url;
                } else {
                    throw new Error('La subida de la imagen falló.');
                }
            } catch (error) {
                console.error("Error al subir la imagen:", error);
                alert("Hubo un error al subir la imagen. Por favor, intentá denuevo.");
                return;
            }
        }
        const productoFinal = { ...datosForm, foto: foto };
        try {
            if (productoAEditar) {
                const docRef = doc(db, "Herramientas", productoAEditar.id);
                await updateDoc(docRef, productoFinal);
                alert("Producto actualizado con éxito.");
            } else {
                await addDoc(collection(db, "Herramientas"), productoFinal);
                alert("Producto guardado con éxito.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Hubo un error al guardar el producto.");
        }
    };

    return (
        <FormularioProducto
            datosForm={datosForm}
            manejarCambio={manejarCambio}
            manejarEnvio={manejarEnvio}
            modoEdicion={!!productoAEditar}
        />
    );
}

export default FormularioContainer;