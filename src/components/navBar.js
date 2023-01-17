import React, {Component} from "react";


export class NavBarComponente extends Component{
    render(){
        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Evaluación Final</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">Inicio</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/grabar-libro">Agregar Libro</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/busqueda-personalizada">Búsqueda Personalizada</a>
                            </li>


                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}