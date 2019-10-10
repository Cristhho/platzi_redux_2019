import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as usersActions from '../../actions/usersActions';
import Spinner from '../general/Spinner';

class Users extends Component {

  componentDidMount() {
    this.props.fetchAll();
  }

  ponerContenido = () => {
    if(this.props.loading) {
      return(<Spinner />)
    }
    return (
      <table className="tabla">
        <thead>
          <tr>
            <th>
              Nombre
            </th>
            <th>
              Correo
            </th>
            <th>
              Enlace
            </th>
          </tr>
        </thead>
        <tbody>
          { this.ponerFilas() }
        </tbody>
      </table>
    );
  }

  ponerFilas = () => (
    this.props.usuarios.map((usuario) => (
      <tr key={usuario.id}>
        <td>{usuario.name}</td>
        <td>{usuario.email}</td>
        <td>{usuario.website}</td>
      </tr>
    ))
  )

  render() {
    //console.log("[Users]", this.props);
    return(
      <div>
        {this.ponerContenido()}
      </div>
    )
  }
}

const mapStateToProps = (reducers) => {
  return reducers.usersReducer
}

export default connect(mapStateToProps, usersActions)(Users)
