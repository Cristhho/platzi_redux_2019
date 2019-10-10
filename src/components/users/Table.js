import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

const Table = (props) => {
	const ponerFilas = () => props.usuarios.map((usuario) => (
    <tr key={usuario.id}>
      <td>{usuario.name}</td>
      <td>{usuario.email}</td>
      <td>{usuario.website}</td>
      <td><Link to={`/posts/${usuario.id}`}><div className="eye-solid icon"></div></Link></td>
    </tr>
  ));

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
        { ponerFilas() }
      </tbody>
    </table>
  );
};

const mapStateToProps = (reducers) => {
  return reducers.usersReducer
}

export default connect(mapStateToProps)(Table);