
import './App.css';
import {NavBarComponente} from "./components/navBar";
import React from "react";
import {BrowserRouter, Routes as Switch, Route} from "react-router-dom";
import {HomeComponente} from "./components/Home";
import {GrabarLibroComponente} from "./components/GrabarLibro";
import {BusquedaPersonalizadaComponente} from "./components/BuscarLibro";
import {ModificarLibroComponente} from "./components/ModificarLibro";
import {DetalleLibroComponente} from "./components/DetalleLibro";

function App() {
    return (
        <div>
        <NavBarComponente />
        <BrowserRouter>
            <Switch>
                <Route exact path="/" element={<HomeComponente/>}/>
                <Route exact path="/inicio" element={<HomeComponente/>}/>
                <Route exact path="/grabar-libro" element={<GrabarLibroComponente/>}/>
                <Route exact path="/busqueda-personalizada" element={<BusquedaPersonalizadaComponente/>}/>
                <Route exact path="/modificar-libro/:id" element={<ModificarLibroComponente/>}/>
                <Route exact path="/detalle-libro/:id" element={<DetalleLibroComponente/>}/>

            </Switch>
        </BrowserRouter>
    </div>
);
}

export default App;
