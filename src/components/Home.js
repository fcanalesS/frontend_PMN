import React, {Component} from "react";
import axios from "axios";
import {ModificarLibroComponente} from "./ModificarLibro";
import * as events from "events";
import {Link, Navigate} from "react-router-dom";



export class HomeComponente extends Component{

    constructor() {
        super();
        this.state = {
            libro: [],
            status: false,
            showComponent: false,
            libroSelected: {}
        }
    }


    componentDidMount() {
        axios.get("http://localhost:3001/libro/libros")
            .then((res) => {
                console.log(res.data.estado);
                console.log(res.data.resultado);
                this.setState({libro: res.data.resultado});
            }).catch((err) => {console.log(err)});

        console.log(this.state)
    }



    render(){
        return(
           <div className="container" style={{"marginTop": "1em"}}>
               <div className="row">
                   <div className="col-md-12 col-sm-12">
                       <table className="table table-bordered table-hover">
                           <thead>
                           <tr>
                               {/*<th>ISBN</th>*/}
                               <th>Nombre Libro</th>
                               <th>Autor</th>
                               <th>Editorial</th>
                               <th>Portada</th>
                               {/*<th>Cantidad de Páginas</th>*/}
                               <th>Acciones</th>
                           </tr>
                           </thead>
                           <tbody>
                           {
                               this.state.libro.map(item => (
                                   <tr key={item._id}>
                                       {/*<td>{item.ISBN}</td>*/}
                                       <td>{item.nombreLibro}</td>
                                       <td>{item.autor}</td>
                                       <td>{item.editorial}</td>
                                       {/*<td>{item.portada}</td>*/}
                                       <td> <img className="img img-thumbnail img-fluid"  src={"http://localhost:3001/getFotoPersonal/" + item._id}/></td>
                                       <td>
                                           <Link to={"/modificar-libro/" + item._id} className="btn btn-sm btn-info">Modificar</Link>

                                       </td>
                                   </tr>
                               ))
                           }
                           </tbody>
                       </table>
                   </div>
               </div>
           </div>
        );
    }


}