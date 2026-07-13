import React, { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import { Helmet } from 'react-helmet';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { Container, Row, Col, Spinner, Alert, Button } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';
import styled from 'styled-components';

const Imagen = styled.img`
  max-width: 100%;
  border-radius: 10px;
  border: 1px solid #ff8c00;
`;

const Precio = styled.h3`
  color: #ff8c00;
`;

const ProductoDetalle = () => {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const [cargado, setCargado] = useState(false); // ya llegó al menos una respuesta de Firestore
    const [error, setError] = useState(null);

    useEffect(() => {
        setCargado(false);
        setError(null);

        const productosDB = collection(db, "Herramientas");

        const unsubscribe = onSnapshot(
            productosDB,
            (resp) => {
                const productoEncontrado = resp.docs.find(doc => doc.id === id);
                setProducto(productoEncontrado ? { ...productoEncontrado.data(), id: productoEncontrado.id } : null);
                setCargado(true);
            },
            (err) => {
                console.error("Error al obtener el producto:", err);
                setError("No se pudo cargar el producto. Intentá de nuevo más tarde.");
                setCargado(true);
            }
        );

        return () => unsubscribe();
    }, [id]);

    if (!cargado) {
        return (
            <Container className="text-center p-5">
                <Spinner animation="border" />
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="my-4">
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }

    if (!producto) {
        return (
            <Container className="my-4">
                <Alert variant="warning">Producto no encontrado.</Alert>
                <Button as={Link} to="/productos" variant="secondary">
                    <FaArrowLeft className="me-2" />Volver a productos
                </Button>
            </Container>
        );
    }

    return (
        <Container className="my-4">
            <Helmet>
                <title>{producto.nombre} | MilHerramientas</title>
                <meta name="description" content={producto.descripcion?.slice(0, 150)} />
            </Helmet>

            <h2>Detalle del Producto</h2>
            <Row className="align-items-center g-4">
                <Col xs={12} md={6} className="text-center">
                    <Imagen src={producto.foto} alt={producto.nombre} />
                </Col>
                <Col xs={12} md={6}>
                    <h3>{producto.nombre}</h3>
                    <p>{producto.descripcion}</p>
                    <Precio>Precio: ${producto.precio}</Precio>
                    <hr />
                    <Button as={Link} to="/productos" variant="outline-warning">
                        <FaArrowLeft className="me-2" />Volver a productos
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductoDetalle;