import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, limit, startAfter } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { useCart } from '../../context/CartContext';
import styled from 'styled-components';
import { FaShoppingCart } from 'react-icons/fa'

const itemListContainer = () => {
  const [productos, setProductos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [cargando, setCargando] = useState(true);
  const [cargandoMas, setCargandoMas] = useState(false);
  const [ultimoVisible, setUltimoVisible] = useState(null);
  const [hayMas, setHayMas] = useState(true);
  const { addToCart, getCantidadActual } = useCart();

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

  const BotonDetalle = styled(BotonAccion)`
background-color: black;
color: orange;
text-aling: center;
text-decoration: none;
&:hover {
background-color: orange;
color: black;
}
`;

  const BotonAgregar = styled(BotonAccion)`
background-color: orange;
color: black;
text-aling: center;
text-decoration: none;
&:hover {
background-color: black;
color: orange;
}
`;


  const PRODUCTOS_POR_PAGINA = 3;

  const obtenerProductosIniciales = () => {
    setCargando(true);
    const productosDB = collection(db, "Herramientas");
    const q = query(productosDB, limit(PRODUCTOS_POR_PAGINA));

    getDocs(q).then((resp) => {
      const productosData = resp.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setProductos(productosData);

      const ultimoDoc = resp.docs[resp.docs.length - 1];
      setUltimoVisible(ultimoDoc);

      setHayMas(resp.docs.length === PRODUCTOS_POR_PAGINA);
    }).catch(error => console.error("Error al obtener productos: ", error))
      .finally(() => setCargando(false));
  };


  useEffect(() => {
    obtenerProductosIniciales();
  }, []);

  const obtenerMasProductos = () => {
    if (!hayMas || cargandoMas) return;

    setCargandoMas(true);
    const productosDB = collection(db, "Herramientas");
    const q = query(productosDB, startAfter(ultimoVisible), limit(PRODUCTOS_POR_PAGINA));

    getDocs(q).then((resp) => {
      const productosData = resp.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setProductos(productosAnteriores => [...productosAnteriores, ...productosData]);

      const ultimoDoc = resp.docs[resp.docs.length - 1];
      setUltimoVisible(ultimoDoc);

      setHayMas(resp.docs.length === PRODUCTOS_POR_PAGINA);
    }).catch(error => console.error("Error al cargar mas productos: ", error))
      .finally(() => setCargandoMas(false));
  };

  const verMenos = () => {
    obtenerProductosIniciales();
    window.scrollTo(0, 0);
  }

  const productosFiltrados = productos.filter(prod =>
    prod.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );


  if (cargando) {
    return (
      <Container className="text-center p-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Row className="mb-4">
        <Col>
          <input
            type="text"
            className="form-control"
            placeholder="Buscar en los productos cargados..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
      </Row>

      <Row>
        {productosFiltrados.map(prod => {
          const cantidadActual = getCantidadActual(prod.id);

          return (
            <Col key={prod.id} xs={12} md={6} lg={3} className="mb-4">
              <Card className="h-100">
                <Card.Img variant="top" src={prod.foto} />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{prod.nombre}</Card.Title>
                  <Card.Text>${prod.precio}</Card.Text>
                  <BotonDetalle as={Link} to={`/productos/${prod.id}`} variant="primary" className="mt-auto">
                    Ver detalle
                  </BotonDetalle>
                  <BotonAgregar 
                    variant="success"
                    className="mt-2"
                    onClick={() => addToCart(prod, 1)}
                  >
                    Agregar al carrito {cantidadActual > 0 && `(${cantidadActual})`}
                    <FaShoppingCart style={{ marginRight: '5px' }} />
                  </BotonAgregar>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>

      <Row className="mt-4">
        <Col className="text-center d-flex justify-content-center gap-2">

          {productos.length > PRODUCTOS_POR_PAGINA && (
            <Button variant="secondary" onClick={verMenos}>
              Ver menos
            </Button>
          )}

          {hayMas ? (
            <Button onClick={obtenerMasProductos} disabled={cargandoMas}>
              {cargandoMas ? <Spinner as="span" animation="border" size="sm" /> : 'Cargar mas'}
            </Button>
          ) : (

            productos.length > PRODUCTOS_POR_PAGINA && <Alert variant="light" className="m-0">No hay mas productos para mostrar.</Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default itemListContainer;