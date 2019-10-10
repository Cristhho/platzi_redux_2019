import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as usersActions from '../../actions/usersActions';
import Spinner from '../general/Spinner';
import Fatal from '../general/Fatal';
import Table from './Table';

class Users extends Component {

  componentDidMount() {
    this.props.fetchAll();
  }

  ponerContenido = () => {
    if(this.props.loading) {
      return(<Spinner />)
    }
    if(this.props.error) {
      return <Fatal message={this.props.error} />;
    }
    return (<Table />);
  }

  render() {
    //console.log("[Users]", this.props);
    return(
      <div>
      <h1>Usuarios</h1>
        {this.ponerContenido()}
      </div>
    )
  }
}

const mapStateToProps = (reducers) => {
  return reducers.usersReducer
}

export default connect(mapStateToProps, usersActions)(Users)
