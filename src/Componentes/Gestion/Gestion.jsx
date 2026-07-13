import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import FormularioContainer from '../Formulario/FormularioContainer';
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import styled from "styled-components";
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import { Helmet } from 'react-helmet';

const BotonAccion = styled.button`
  background-color: transparent;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  margin-left: 8px;
  transition: all 0.2s ease;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }
`;

const BotonEditar = styled(BotonAccion)`
  border-color: #ffc107;
  color: #ffc107;
  &:hover {
    background-color: #ffc107;
    color: white;
  }
`;

const BotonEliminar = styled(BotonAccion)`
  border-color: #dc3545;
  color: #dc3545;
  &:hover {
    background-color: #dc3545;
    color: white;
  }
`;

const Titulo = styled.h2`
  color: #ff8c00;
`;

const Subtitulo = styled.h3`
  color: #ffb347;
`;

const Gestion = () => {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    const estadoInicialForm = {
        nombre: "",
        precio: 0,
        descripcion: "",
        foto: ""
    };

    useEffect(() => {
        const fetchProductos = async () => {
            setCargando(true);
            setError(null);
            try {
                const productosRef = collection(db, "Herramientas");
                const resp = await getDocs(productosRef);
                setProductos(
                    resp.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
                );
            } catch (err) {
                console.error("Error al obtener productos: ", err);
                setError("No se pudieron cargar los productos. Intentá de nuevo más tarde.");
            } finally {
                setCargando(false);
            }
        };
        fetchProductos();
    }, []);

    const handleDelete = async (id) => {
        const confirmacion = window.confirm("¿Está seguro de que desea eliminar este producto?");
        if (!confirmacion) return;
        try {
            const docRef = doc(db, "Herramientas", id);
            await deleteDoc(docRef);
            setProductos(productos.filter(prod => prod.id !== id));
        } catch (err) {
            console.error("Error al eliminar producto:", err);
            setError("No se pudo eliminar el producto. Intentá de nuevo.");
        }
    };

    const [datosForm, setDatosForm] = useState(estadoInicialForm);
    const [productoAEditar, setProductoAEditar] = useState(null);

    useEffect(() => {
        setDatosForm(productoAEditar || estadoInicialForm);
    }, [productoAEditar]);

    const handleEditClick = (producto) => {
        setProductoAEditar(producto);
    };

    const cancelarEdicion = () => {
        setProductoAEditar(null);
    };

    return (
        <Container className="my-4">
            <Helmet>
                <title>Gestión de Productos | MilHerramientas</title>
                <meta name="description" content="Panel de administración para gestionar productos de MilHerramientas." />
            </Helmet>

            <Titulo>Gestión de Productos</Titulo>
            <hr />

            <FormularioContainer
                datosForm={datosForm}
                setDatosForm={setDatosForm}
                productoAEditar={productoAEditar}
            />
            {productoAEditar && (
                <BotonAccion onClick={cancelarEdicion} style={{ marginTop: '10px' }}>
                    Cancelar Edición
                </BotonAccion>
            )}

            <hr />
            <Subtitulo>Lista de Productos</Subtitulo>

            {cargando && (
                <div className="text-center p-4">
                    <Spinner animation="border" />
                </div>
            )}

            {error && <Alert variant="danger">{error}</Alert>}

            {!cargando && !error && (
                <Row>
                    {productos.map((prod) => (
                        <Col key={prod.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                            <Card className="h-100">
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title>{prod.nombre}</Card.Title>
                                    <Card.Text>${prod.precio}</Card.Text>
                                    <div className="mt-auto d-flex justify-content-end">
                                        <BotonEditar onClick={() => handleEditClick(prod)}>
                                            <FaEdit style={{ marginRight: '5px' }} />Editar
                                        </BotonEditar>
                                        <BotonEliminar onClick={() => handleDelete(prod.id)}>
                                            <FaTrash style={{ marginRight: '5px' }} />Eliminar
                                        </BotonEliminar>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};

export default Gestion;