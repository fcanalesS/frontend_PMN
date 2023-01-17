import React, {Component, useState} from "react";
import axios from "axios";
import SimpleReactValidator from "simple-react-validator";
import {Navigate} from "react-router-dom";
export class GrabarLibroComponente extends Component{
    isbnRef = React.createRef();
    nombreLibroRef = React.createRef();
    autorRef = React.createRef();
    editorialRef = React.createRef();
    portadaRef = React.createRef();
    paginasRef = React.createRef();


    constructor() {
        super();
        this.state = {
            libro: {},
            status: false,
            idLibro: ''
        }
        this.validator = new SimpleReactValidator({autoForceUpdate: this});
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
    validar = (e) => {
        e.preventDefault();
        this.changeState();
        console.log("Entra a validar el formulario.");
        if (this.validator.allValid()){
            axios.post("http://localhost:3001/libro/grabar-libro", this.state.libro)
                .then((res) => {
                    console.log("RESPONSE: ", res);
                    this.setState({status: true});
                }).catch((err) => {
                console.log("ERROR: ", err)
            });
        }else {
            this.validator.showMessages();
            this.forceUpdate();
        }

    };
    getBase64 = file => {
        return new Promise(resolve => {
            let fileInfo;
            let baseURL = "";
            // Make new FileReader
            let reader = new FileReader();

            // Convert the file to base64 text
            reader.readAsDataURL(file);

            // on reader load somthing...
            reader.onload = () => {
                // Make a fileInfo Object
                //console.log("Called", reader);
                baseURL = reader.result;
                //console.log(baseURL);
                resolve(baseURL);
            };
            //console.log(fileInfo);
        });
    };
    handleFileInputChange = e => {
        //console.log(e.target.files[0]);
        let { file } = this.state;

        file = e.target.files[0];

        this.getBase64(file)
            .then(result => {
                file["base64"] = result;
                //console.log("File Is", file);
                this.setState({libro: {portadaImg: result}})
                this.setState({
                    base64URL: result,
                    file
                });
            })
            .catch(err => {
                console.log(err);
            });

        this.setState({
            file: e.target.files[0]
        });
    };
    render(){
        return (
            <div className="container">
                <form onSubmit={this.validar}>
                    {
                        <div className="mb-7">
                            <div className="form-group">
                                <div className="mb-3">
                                    <label htmlFor="">ISBN</label>
                                    <input name="isbn" type="text" className="form-control" ref={this.isbnRef} onChange={this.changeState}/>
                                    {this.validator.message('isbn', this.state.libro.ISBN, 'required|alpha_num')}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="">Nombre Libro</label>
                                    <input name="nombreLibro" type="text" className="form-control" ref={this.nombreLibroRef} onChange={this.changeState}/>
                                    {this.validator.message('nombreLibro', this.state.libro.nombreLibro, 'required|alpha_num')}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="">Autor</label>
                                    <input name={"autor"} type="text" className="form-control" ref={this.autorRef} onChange={this.changeState}/>
                                    {this.validator.message('autor', this.state.libro.autor, 'required|alpha')}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="">Editorial</label>
                                    <input name={"editorial"} type="text" className="form-control" ref={this.editorialRef} onChange={this.changeState}/>
                                    {this.validator.message('editorial', this.state.libro.editorial, 'required|alpha')}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="">Portada</label>
                                    <input name={"portada"} type="text" className="form-control" ref={this.portadaRef} onChange={this.changeState}/>
                                    {this.validator.message('portada', this.state.libro.portada, 'required|alpha_num')}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="">Páginas</label>
                                    <input name={"paginas"} type="number" className="form-control" ref={this.paginasRef} onChange={this.changeState}/>
                                    {this.validator.message('paginas', this.state.libro.paginas, 'required|numeric')}
                                </div>

                                <div className="mb-3">
                                    <button className="btn btn-success">Agregar Libro</button>
                                </div>
                            </div>
                        </div>
                    }{
                        this.state.status && <Navigate to={{pathname:'/'}}></Navigate>
                }
                </form>
            </div>
        )
    }


}