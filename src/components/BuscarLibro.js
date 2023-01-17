import React, {Component, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import SimpleReactValidator from "simple-react-validator";

export class BusquedaPersonalizadaComponente extends Component {
    nombreLibroRef = React.createRef();
    autorRef = React.createRef();
    editorialRef = React.createRef();

    constructor() {
        super();
        this.state = {
            libros: [],
            nombreLibro: "",
            autor: "",
            editorial: ""
        }

        this.validator = new SimpleReactValidator({autoForceUpdate: this, locale: 'es'});
    }

    componentDidMount() {
        axios.get("http://localhost:3001/libro/libros")
            .then((res) => {
                console.log(res.data.estado);
                console.log(res.data.resultado);
                this.setState({libros: res.data.resultado});
            }).catch((err) => {
            console.log(err)
        });
    }

    buscarLibro = (e) => {
        e.preventDefault();
        this.changeState();
        if (this.validator.allValid()) {
            axios.get("http://localhost:3001/libro/busqueda-personalizada/" + this.state.nombreLibro + "/" + this.state.autor + "/" + this.state.editorial)
                .then((res) => {
                    console.log(res)
                    this.setState({libros: res.data.resultado})
                })
                .catch((err) => {
                    console.log(err)
                });
        } else {
            this.validator.showMessages();

        }
    }

    limpiar = (e) => {
        e.preventDefault();
        window.location.reload();
    }

    changeState = () => {
        this.setState({nombreLibro: this.nombreLibroRef.current.value})
        this.setState({autor: this.autorRef.current.value})
        this.setState({editorial: this.editorialRef.current.value})
    }


    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h2>Búsqueda Personalizada</h2>
                    </div>
                </div>
                <hr/>

                <form onSubmit={this.buscarLibro}>
                    <div className="row">
                        <div className="col-md-3">
                            <label htmlFor="">Nombre del libro</label>
                            <input className="form-control" name="nombreLibro" ref={this.nombreLibroRef}/>
                            {this.validator.message('nombreLibro', this.state.nombreLibro, 'required|alpha_num')}
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="">Autor</label>
                            <input className="form-control" name="autor" ref={this.autorRef}/>
                            {this.validator.message('autor', this.state.autor, 'required|alpha')}
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="">Editorial</label>
                            <input className="form-control" name="editorial" ref={this.editorialRef}/>
                            {this.validator.message('editorial', this.state.editorial, 'required|alpha_num')}
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="" style={{"display": "block"}}>&nbsp;</label>
                            <button className="btn btn-success">Buscar</button>
                            &nbsp;
                            <a className="btn btn-primary" onClick={this.limpiar}>Limpiar</a>
                        </div>
                    </div>
                </form>
                <br/>
                <div className="row">
                    <div className="col-md-12">
                        <table className="table table-bordered table-hover">
                            <thead>
                            <tr>
                                {/*<th>ISBN</th>*/}
                                <th>Nombre Libro</th>
                                <th>Autor</th>
                                <th>Editorial</th>
                                <th>Portada</th>
                                {/*<th>Cantidad de Páginas</th>*/}
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.libros.map(item => (
                                    <tr key={item._id}>
                                        {/*<td>{item.ISBN}</td>*/}
                                        <td>{item.nombreLibro}</td>
                                        <td>{item.autor}</td>
                                        <td>{item.editorial}</td>
                                        <td> <img className="img img-thumbnail img-fluid"  src={"http://localhost:3001/getFotoPersonal/" + item._id}/></td>
                                        {/*<td>{item.paginas}</td>*/}
                                        <td>
                                            <Link to={"/detalle-libro/" + item._id}
                                                  className="btn btn-sm btn-info">Información Detallada</Link>

                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}