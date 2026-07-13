import React from "react";
import Header from "../Header/Header";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { Outlet } from 'react-router-dom';

function Layout(){
    return(
        <div>
            <Header />
            <NavBar />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default Layout;