import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { Container, Row, Col, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { FaUserPlus } from 'react-icons/fa';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

const Tarjeta = styled.div`
  background-color: #111111;
  border: 1px solid #ff8c00;
  border-radius: 10px;
  padding: 2rem;
  color: #ffffff;

  h2 {
    color: #ff8c00;
    text-align: center;
    margin-bottom: 1.5rem;
  }

  label {
    color: #ffb347;
  }
`;

const BotonRegistro = styled(Button)`
  background-color: #ff8c00;
  border: none;
  width: 100%;
  margin-top: 0.5rem;

  &:hover {
    background-color: #e07b00;
  }

  &:disabled {
    background-color: #a35c00;
  }
`;

const Registro = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(false);
    const navigate = useNavigate();
    const auth = getAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setCargando(true);
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate('/');
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                const quiereLoguearse = window.confirm(
                    'Este correo electrónico ya está registrado. ¿Desea intentar iniciar sesión?');
                navigate(quiereLoguearse ? '/login' : '/');
            } else {
                setError('Ocurrió un error al registrar el usuario. Verifique los datos e intente nuevamente.');
                console.error("Error en el registro:", error.message);
            }
        } finally {
            setCargando(false);
        }
    };

    return (
        <Container className="my-5">
            <Helmet>
                <title>Crear cuenta | MilHerramientas</title>
                <meta name="description" content="Registrate en MilHerramientas para comprar y gestionar tus herramientas." />
            </Helmet>
            <Row className="justify-content-center">
                <Col xs={12} sm={10} md={6} lg={4}>
                    <Tarjeta>
                        <h2>Crear una nueva cuenta</h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Correo Electrónico</Form.Label>
                                <Form.Control
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="Mínimo 6 caracteres"
                                />
                            </Form.Group>

                            {error && <Alert variant="danger">{error}</Alert>}

                            <BotonRegistro type="submit" disabled={cargando}>
                                {cargando ? (
                                    <Spinner as="span" animation="border" size="sm" />
                                ) : (
                                    <><FaUserPlus className="me-2" />Registrarse</>
                                )}
                            </BotonRegistro>

                            <p className="text-center mt-3">
                                ¿Ya tenés una cuenta? <Link to="/login">Iniciá sesión</Link>
                            </p>
                        </Form>
                    </Tarjeta>
                </Col>
            </Row>
        </Container>
    );
};

export default Registro;