import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Tabella from './Tabella';
import ModalView from './ModalView';

class Movimenti extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      items: this.props.articoli.map((articolo) =>
        <option key={articolo.id}>
          {articolo.nome}-{articolo.giacenza} {articolo.misura}
        </option>
      ),
      value: 'Pomodori-10 Kg',
      movimenti: [{
        id: 1,
        today: "23/1/2022",
        nome: "Patate",
        giacenza: 10,
        misura: "Kg",
        quantita: "5"
      }],
      inputQuantita: '',
      counter: 1,
      show: false,
      message: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClickSelect = this.handleClickSelect.bind(this);
    this.handleClickIncrementa = this.handleClickIncrementa.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }



  handleChange(event)
  {
    this.setState({
      inputQuantita: event.target.value,
    });
  }

  handleClickSelect(event)
  {
    this.setState({
      items: this.props.articoli.map((articolo) =>
        <option key={articolo.id}>
          {articolo.nome}-{articolo.giacenza} {articolo.misura}
        </option>),
      value: event.target.value,
    });

  }

  handleClickIncrementa = param => event =>
  {

    const array = this.state.value.split('-');
    const array2 = array[1].split(' ');
    this.state.counter = this.state.counter + 1;
    const nuova_giacenza = (param ?
      parseInt(array2[0]) + parseInt(this.state.inputQuantita) :
      parseInt(array2[0]) - parseInt(this.state.inputQuantita));

    if (this.state.inputQuantita == "" || isNaN(parseInt(this.state.inputQuantita)))
    {
      this.setState({
        show: true,
        message: 'Inserisci come quantità un numero intero!'
      });
    } else
    {


      this.state.movimenti.push({
        id: this.state.counter,
        today: (new Date()).toLocaleDateString("it-IT"),
        nome: array[0],
        giacenza: nuova_giacenza,
        misura: array2[1],
        quantita: this.state.inputQuantita
      });

      const pos = this.props.articoli.map(
        function (e) { return e.nome; }).indexOf(array[0]);

      this.props.articoli[pos] = { id: pos, nome: array[0], giacenza: nuova_giacenza, misura: array2[1] };
    }

  }

  handleClose(event)
  {

    this.setState({
      show: false,
    });
  }

  render()
  {

    const items = this.props.articoli.map((articolo) =>
      <option key={articolo.id}>
        {articolo.nome}-{articolo.giacenza} {articolo.misura}
      </option>)

    return (



      <div className="card" >
        <div className="card-body">
          <h5 className="card-title">Movimenti:</h5>
          <div className="input-group mb-3">
            <select value={this.state.value}
              onClick={this.handleClickSelect}
              className="form-select"
            >
              {items}
            </select>
            <span className="input-group-text">Quantità:</span>
            <input
              type="text"
              className="form-control"
              value={this.state.inputQuantita}
              onChange={this.handleChange}

            />
          </div>

          <button onClick={this.handleClickIncrementa(true)} className="btn btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16">
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg> Incrementa
          </button>
          <button onClick={this.handleClickIncrementa(false)} className="btn btn-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-minus" viewBox="0 0 16 16">
              <path d="M5.5 9a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5z" />
              <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z" />
            </svg> Decrementa
          </button>

          <ModalView
            message={this.state.message} show={this.state.show} handleClose={this.handleClose}
          />
        </div>
        <Tabella movimenti={this.state.movimenti} />
      </div>




    );
  }
}
export default Movimenti;