import React, {Component, useState} from "react";
import axios from "axios";
import SimpleReactValidator from 'simple-react-validator';
import {Form} from "react-router-dom";

export class ModificarLibroComponente extends Component {
    isbnRef = React.createRef();
    nombreLibroRef = React.createRef();
    autorRef = React.createRef();
    editorialRef = React.createRef();
    portadaRef = React.createRef();
    paginasRef = React.createRef();

    constructor() {
        super();
        this.validator = new SimpleReactValidator({autoForceUpdate: this});

        this.state = {
            libro: {},
            idLibro: ""
        };
    }

    componentDidMount() {
        console.log("hola desde modificar")

        this.getLibroModificar(this.getQueryId(window.location.href));
    }

    validar = (e) => {
        e.preventDefault();
        console.log(this.validator)
        console.log("Entra a validar el formulario.");

        if (this.validator.allValid()) {
            this.changeState();

            axios.put("http://localhost:3001/libro/modificar-libro/" + this.state.idLibro, this.state.libro, {})
                .then((res) => {
                    console.log("RES PUT", res)
                })
                .catch((err) => {
                    console.log("ERROR", err)
                });
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    };

    getLibroModificar = (id) => {
        console.log("id", id)
        axios.get("http://localhost:3001/libro/busqueda-id/" + id)
            .then((res) => {
                console.log("RES", res.data);
                this.setState({
                    libro: {
                        ISBN: res.data.resultado.ISBN,
                        nombreLibro: res.data.resultado.nombreLibro,
                        autor: res.data.resultado.autor,
                        editorial: res.data.resultado.editorial,
                        portada: res.data.resultado.portada,
                        paginas: res.data.resultado.paginas,
                    }
                });
            }).catch((err) => {
            console.log("ERROR", err);
        });
    }

    changeState = (e) => {
        this.setState({
            libro: {
                ISBN: this.isbnRef.current.value,
                nombreLibro: this.nombreLibroRef.current.value,
                autor: this.autorRef.current.value,
                editorial: this.editorialRef.current.value,
                portada: this.portadaRef.current.value,
                paginas: this.paginasRef.current.value
            }
        });
        console.log(this.state.libro);
    }

    getQueryId = (url) => {
        this.setState({idLibro: url.split("/")[4]})
        return url.split("/")[4]
    }

    render() {
        return (
            <div className="container">
                <h1>Modificar Libro</h1>
                <hr/>
                <form onSubmit={this.validar}>
                    {
                        <div className="mb-7">
                            <div className="form-group">
                                <div className="mb-3">
                                    <label htmlFor="">ISBN</label>
                                    <input name="isbn" type="text" className="form-control" ref={this.isbnRef}
                                           onChange={this.changeState} value={this.state.libro.ISBN}/>
                                    {this.validator.message('isbn', this.state.libro.ISBN, 'required|alpha_num')}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="">Nombre Libro</label>
                                    <input name="nombreLibro" type="text" className="form-control"
                                           ref={this.nombreLibroRef} onChange={this.changeState}
                                           value={this.state.libro.nombreLibro}/>
                                    {this.validator.message('nombreLibro', this.state.libro.nombreLibro, 'required|alpha_num')}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="">Autor</label>
                                    <input name="autor" type="text" className="form-control" ref={this.autorRef}
                                           onChange={this.changeState} value={this.state.libro.autor}/>
                                    {this.validator.message('autor', this.state.libro.autor, 'required|alpha')}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="">Editorial</label>
                                    <input name="editorial" type="text" className="form-control" ref={this.editorialRef}
                                           onChange={this.changeState} value={this.state.libro.editorial}/>
                                    {this.validator.message('autor', this.state.libro.editorial, 'required|alpha')}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="">Portada</label>
                                    <input name="portada" type="text" className="form-control" ref={this.portadaRef}
                                           onChange={this.changeState} value={this.state.libro.portada}/>
                                    {this.validator.message('portada', this.state.libro.portada, 'required|alpha_num')}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="">Páginas</label>
                                    <input name="paginas" type="number" className="form-control" ref={this.paginasRef}
                                           onChange={this.changeState} value={this.state.libro.paginas}/>
                                    {this.validator.message('portada', this.state.libro.paginas, 'numeric|min:0,num')}
                                </div>
                                <div className="mb-3">
                                    <button className="btn btn-success">Modificar Libro</button>
                                    &nbsp;
                                    <button className="btn btn-info">Volver</button>
                                </div>
                            </div>
                        </div>
                    }
                </form>
            </div>
        )
    }
}