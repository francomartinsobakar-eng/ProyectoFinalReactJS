import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Form, Alert, Spinner, Button } from 'react-bootstrap';
import { FaSignInAlt } from 'react-icons/fa';
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

const BotonLogin = styled(Button)`
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

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        setCargando(true);
        const auth = getAuth();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/');
        } catch (error) {
            console.error("Error en el login:", error.code, error.message);
            setError("Correo o contraseña incorrectos. Verificá los datos e intentá de nuevo.");
        } finally {
            setCargando(false);
        }
    };

    return (
        <Container className="my-5">
            <Helmet>
                <title>Iniciar sesión | MilHerramientas</title>
                <meta name="description" content="Iniciá sesión en MilHerramientas para acceder a tu cuenta." />
            </Helmet>
            <Row className="justify-content-center">
                <Col xs={12} sm={10} md={6} lg={4}>
                    <Tarjeta>
                        <h2>Iniciar Sesión</h2>
                        <Form onSubmit={handleLogin}>
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
                                />
                            </Form.Group>

                            {error && <Alert variant="danger">{error}</Alert>}

                            <BotonLogin type="submit" disabled={cargando}>
                                {cargando ? (
                                    <Spinner as="span" animation="border" size="sm" />
                                ) : (
                                    <><FaSignInAlt className="me-2" />Ingresar</>
                                )}
                            </BotonLogin>

                            <p className="text-center mt-3">
                                ¿No tenés una cuenta? <Link to="/registro">Registrate aquí</Link>
                            </p>
                        </Form>
                    </Tarjeta>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;