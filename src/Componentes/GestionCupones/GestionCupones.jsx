import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { collection, getDocs, deleteDoc, doc, addDoc, updateDoc } from "firebase/firestore";
import styled from "styled-components";
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Container, Row, Col, Card, Spinner, Alert, Form, Button } from 'react-bootstrap';
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

const estadoInicialForm = {
    codigo: "",
    descuento: 0
};

const GestionCupones = () => {
    const [cupones, setCupones] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    const [datosForm, setDatosForm] = useState(estadoInicialForm);
    const [cuponAEditar, setCuponAEditar] = useState(null);
    const [guardando, setGuardando] = useState(false);

    const fetchCupones = async () => {
        setCargando(true);
        setError(null);
        try {
            const cuponesRef = collection(db, "cupones");
            const resp = await getDocs(cuponesRef);
            setCupones(
                resp.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            );
        } catch (err) {
            console.error("Error al obtener cupones: ", err);
            setError("No se pudieron cargar los cupones. Intentá de nuevo más tarde.");
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        fetchCupones();
    }, []);

    useEffect(() => {
        setDatosForm(cuponAEditar || estadoInicialForm);
    }, [cuponAEditar]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDatosForm((prev) => ({
            ...prev,
            [name]: name === "descuento" ? Number(value) : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!datosForm.codigo.trim()) {
            setError("El código es obligatorio.");
            return;
        }
        if (datosForm.descuento <= 0 || datosForm.descuento >= 100) {
            setError("El descuento debe ser mayor que 0% y menor a 100%.");
            return;
        }

        setGuardando(true);
        setError(null);
        try {
            if (cuponAEditar) {
                const docRef = doc(db, "cupones", cuponAEditar.id);
                await updateDoc(docRef, {
                    codigo: datosForm.codigo,
                    descuento: datosForm.descuento
                });
            } else {
                const cuponesRef = collection(db, "cupones");
                await addDoc(cuponesRef, {
                    codigo: datosForm.codigo,
                    descuento: datosForm.descuento
                });
            }
            setCuponAEditar(null);
            setDatosForm(estadoInicialForm);
            await fetchCupones();
        } catch (err) {
            setError("No se pudo guardar el cupón. Intentá de nuevo.");
        } finally {
            setGuardando(false);
        }
    };

    const handleDelete = async (id) => {
        const confirmacion = window.confirm("¿Está seguro de que desea eliminar este cupón?");
        if (!confirmacion) return;
        try {
            const docRef = doc(db, "cupones", id);
            await deleteDoc(docRef);
            setCupones(cupones.filter(cup => cup.id !== id));
        } catch (err) {
            setError("No se pudo eliminar el cupón. Intentá de nuevo.");
        }
    };

    const handleEditClick = (cupon) => {
        setCuponAEditar(cupon);
    };

    const cancelarEdicion = () => {
        setCuponAEditar(null);
    };

    return (
        <Container className="my-4">
            <Helmet>
                <title>Gestión de Cupones | MilHerramientas</title>
                <meta name="description" content="Panel de administración para gestionar cupones de descuento de MilHerramientas." />
            </Helmet>

            <Titulo>Gestión de Cupones</Titulo>
            <hr />

            <Form onSubmit={handleSubmit} className="mb-3">
                <Row className="align-items-end">
                    <Col xs={12} sm={5}>
                        <Form.Group controlId="codigo">
                            <Form.Label>Código</Form.Label>
                            <Form.Control
                                type="text"
                                name="codigo"
                                value={datosForm.codigo}
                                onChange={handleChange}
                                placeholder="Ej: DESCUENTO10"
                            />
                        </Form.Group>
                    </Col>
                    <Col xs={12} sm={4}>
                        <Form.Group controlId="descuento">
                            <Form.Label>Descuento (%)</Form.Label>
                            <Form.Control
                                type="number"
                                name="descuento"
                                value={datosForm.descuento}
                                onChange={handleChange}
                                min={1}
                                step={1}
                            />
                        </Form.Group>
                    </Col>
                    <Col xs={12} sm={3} className="mt-2 mt-sm-0">
                        <Button type="submit" disabled={guardando} style={{ backgroundColor: '#ff8c00', border: 'none' }}>
                            {guardando ? "Guardando..." : (cuponAEditar ? "Guardar cambios" : "Agregar cupón")}
                        </Button>
                    </Col>
                </Row>
            </Form>

            {cuponAEditar && (
                <BotonAccion onClick={cancelarEdicion} style={{ marginBottom: '10px' }}>
                    Cancelar Edición
                </BotonAccion>
            )}

            <hr />
            <Subtitulo>Lista de Cupones</Subtitulo>

            {cargando && (
                <div className="text-center p-4">
                    <Spinner animation="border" />
                </div>
            )}

            {error && <Alert variant="danger">{error}</Alert>}

            {!cargando && !error && (
                <Row>
                    {cupones.map((cup) => (
                        <Col key={cup.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                            <Card className="h-100">
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title>{cup.codigo}</Card.Title>
                                    <Card.Text>{cup.descuento}% de descuento</Card.Text>
                                    <div className="mt-auto d-flex justify-content-end">
                                        <BotonEditar onClick={() => handleEditClick(cup)}>
                                            <FaEdit style={{ marginRight: '5px' }} />Editar
                                        </BotonEditar>
                                        <BotonEliminar onClick={() => handleDelete(cup.id)}>
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

export default GestionCupones;