import React, {Component, useState} from "react";
import axios from "axios";
import {Link, Navigate} from "react-router-dom";
import SimpleReactValidator from "simple-react-validator";
import {compareArraysAsSet} from "@testing-library/jest-dom/dist/utils";

export class DetalleLibroComponente extends Component {
    isbnRef = React.createRef();
    nombreLibroRef = React.createRef();
    autorRef = React.createRef();
    editorialRef = React.createRef();
    portadaRef = React.createRef();
    paginasRef = React.createRef();
    handleSelectedFile = (event) => {
        this.setState({selectedFile: event.target.files[0]});
        console.log(event.target.files[0])

        const data = new FormData()
        data.append('file0', event.target.files[0])

        let url = "http://localhost:3001/fileUpload/" + this.state.id + '/' + this.state.libro.portada;
        axios.post(url, data, { // receive two parameter endpoint url ,form data
        })
            .then(res => { // then print response status
                console.warn(res);
                this.forceUpdate();
                window.location.reload();
            })
    };

    constructor(props) {
        super(props);

        this.state = {
            libro: {},
            idLibro: "",
            id: ''
        };
    }

    componentDidMount() {
        this.getLibroModificar(this.getQueryId(window.location.href));
        const id = this.getQueryId(window.location.href)
        this.setState({id: id});
    }

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

    getQueryId = (url) => {
        this.setState({idLibro: url.split("/")[4]})
        return url.split("/")[4]
    }
    eliminar = () => {
        console.log(this.state.idLibro);
        axios.delete("http://localhost:3001/libro/eliminar-libro/" + this.state.idLibro)
            .then((res) => {
                console.log(res);
                window.history.back();
            })
            .catch((err) => {
                console.log(err)
            });
    }
    
    volver = () => {
        return window.history.back();
    }
    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-7">
                            <div className="mb-7">
                                <div className="form-group">
                                    <div className="mb-3">
                                        <label htmlFor="">ISBN</label>
                                        <input name="isbn" type="text" className="form-control" ref={this.isbnRef}
                                               readOnly="readonly"
                                               onChange={this.changeState} value={this.state.libro.ISBN}/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="">Nombre Libro</label>
                                        <input name="nombreLibro" type="text" className="form-control"
                                               readOnly="readonly"
                                               ref={this.nombreLibroRef} onChange={this.changeState}
                                               value={this.state.libro.nombreLibro}/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="">Autor</label>
                                        <input name="autor" type="text" className="form-control" ref={this.autorRef}
                                               readOnly="readonly"
                                               onChange={this.changeState} value={this.state.libro.autor}/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="">Editorial</label>
                                        <input name="editorial" type="text" className="form-control"
                                               ref={this.editorialRef} readOnly="readonly"
                                               onChange={this.changeState} value={this.state.libro.editorial}/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="">Portada</label>
                                        <input name="portada" type="text" className="form-control" ref={this.portadaRef}
                                               readOnly="readonly"
                                               onChange={this.changeState} value={this.state.libro.portada}/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="">Páginas</label>
                                        <input name="paginas" type="number" className="form-control"
                                               ref={this.paginasRef} readOnly="readonly"
                                               onChange={this.changeState} value={this.state.libro.paginas}/>
                                    </div>
                                    <div className="mb-3">
                                        <Link to={"/modificar-libro/" + this.state.idLibro} className="btn btn-success">Modificar Libro</Link>
                                        &nbsp;
                                        <button className="btn btn-danger" onClick={this.eliminar}>Eliminar</button>
                                        &nbsp;
                                        <button className="btn btn-info" onClick={this.volver}>Volver</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-5">
                            <br/><br/>
                            <img className="img img-thumbnail" src={"http://localhost:3001/getFotoPersonal/" + this.state.id}/>
                            <hr/>
                            <input type="file" className="form-control" name="file0"  onChange={this.handleSelectedFile} ref={this.fileRef}/>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}