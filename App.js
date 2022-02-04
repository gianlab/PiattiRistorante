import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dishes from './Componenti/Dishes';

//'http://localhost:3000/'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       baseUrl : 'https://serene-woodland-07377.herokuapp.com/',
    };

    
  }
  
  

  render() {
    return (
      <div className="container-fluid">
        <title>Gestione Piatti </title>

        <h1 className="text-center text-primary">Gestione Piatti </h1>
        <h2 className="text-center text-secondary">con React, Bootstrap, MongoDB, Express</h2>

        <Dishes baseUrl={this.state.baseUrl} />


      </div>

    );
  }
}
export default App;
