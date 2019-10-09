import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

class Users extends Component {

  // async componentDidMount() {
  //   const users = await axios.get("https://jsonplaceholder.typicode.com/users");
  //   console.log("[Users]", users);
  //   this.setState({
  //     usuarios: users.data
  //   })
  // }

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
    console.log("[Users]", this.props);
    return (
      <div>
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
      </div>
    );
  }
}

const mapStateToProps = (reducers) => {
  return reducers.usersReducer
}

export default connect(mapStateToProps, {/*Actions*/})(Users)
