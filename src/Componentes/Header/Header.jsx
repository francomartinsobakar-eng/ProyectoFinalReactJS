import React from "react";
import styles from "../Header/Header.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import styled from "styled-components";

const HeaderContainer = styled.header`
  background-color: #111111;
  color: #ff8c00;
  padding: 1.5rem 2rem;
  border-bottom: 3px solid #ff8c00;
`;

const Titulo = styled.h1`
  margin: 0;
  letter-spacing: 1px;
  color: #ff8c00;
  font-size: 80px;
  text-aling: right;
`;

const Subtitulo = styled.h2`
  margin: 0.25rem 0 1rem;
  font-size: 40px;
  font-weight: 400;
  background-color: #ff8c00;
  color: black;
  text-aling: right;


`;

const NavList = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  list-style: none;
  margin: 0;
  padding: 0;
  flex-wrap: wrap;
`;

const Saludo = styled.span`
  color: #ffffff;
`;

const BotonNav = styled.button`
  background-color: transparent;
  border: 1px solid #ff8c00;
  color: #ff8c00;
  border-radius: 6px;
  padding: 6px 14px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #ff8c00;
    color: #111111;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;

function Header() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    return (
        <HeaderContainer>
            <Titulo>MilHerramientas</Titulo>
            <Subtitulo>Las mejores ofertas</Subtitulo>
            <NavList>
                {user ? (
                    <>
                        {user.rol === 'admin' && (
                            <li>
                                <BotonNav>
                                    <Link to="/Gestion">Gestion</Link>
                                </BotonNav>
                            </li>
                        )}
                        <li><Saludo>¡Hola, {user.email}!</Saludo></li>
                        <li><BotonNav onClick={handleLogout}>Cerrar Sesión</BotonNav></li>
                    </>
                ) : (
                    <li><BotonNav><Link to="/login">Login</Link></BotonNav></li>
                )}
            </NavList>
        </HeaderContainer>
    );
}

export default Header;