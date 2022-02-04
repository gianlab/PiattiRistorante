import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ModalViewEdit from './ModalViewEdit';

class Tabella extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      rows: [],
      show: false,
      editRow:{}
    }

    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleClickEvent = this.handleClickEvent.bind(this);
    this.handleClick = this.handleClick.bind(this);


  }

  componentDidMount()
  {
    this.handleClick();
    document.addEventListener('click', this.handleClickEvent)
  }

  componentWillUnmount()
  {
    document.removeEventListener('click', this.handleClickEvent)
  }

  handleClickEvent(event)
  {
    this.handleClick();
  }



  handleClick()
  {
    fetch(this.props.baseUrl + 'dishes').then(function (data)
    {
      return data.json();
    }).then(json =>
    {
      this.setState({
        rows: json.map((row) =>
          <tr  >
            <th scope="row"  >{row._id}</th>
            <td>{row.name}</td>
            <td>{row.image}</td>
            <td>{row.category}</td>
            <td>{row.price/100}</td>
            <td ><button id={row._id} onClick={this.handleEdit} className="btn btn-info">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-vector-pen" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M10.646.646a.5.5 0 0 1 .708 0l4 4a.5.5 0 0 1 0 .708l-1.902 1.902-.829 3.313a1.5 1.5 0 0 1-1.024 1.073L1.254 14.746 4.358 4.4A1.5 1.5 0 0 1 5.43 3.377l3.313-.828L10.646.646zm-1.8 2.908-3.173.793a.5.5 0 0 0-.358.342l-2.57 8.565 8.567-2.57a.5.5 0 0 0 .34-.357l.794-3.174-3.6-3.6z" />
                <path fill-rule="evenodd" d="M2.832 13.228 8 9a1 1 0 1 0-1-1l-4.228 5.168-.026.086.086-.026z" />
              </svg> Modifica
            </button></td>
            <td ><button id={row._id} onClick={this.handleDelete} className="btn btn-danger">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-save2" viewBox="0 0 16 16">
                <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v4.5h2a.5.5 0 0 1 .354.854l-2.5 2.5a.5.5 0 0 1-.708 0l-2.5-2.5A.5.5 0 0 1 5.5 6.5h2V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z" />
              </svg> Cancella
            </button></td>

          </tr>),

      });

    });

  }



  handleDelete = (e) =>
  {

    const key = e.currentTarget.getAttribute("id");

    fetch(this.props.baseUrl + 'dishes/' + key,
      {
        method: 'DELETE',

      })
      .then(() => console.log('Piatto cancellato: ' + key))
      .catch(err =>
      {
        console.error(err);
      });



    this.handleClick();

  }

  handleEdit = (e) =>
  {
    const key = e.currentTarget.getAttribute("id");

    fetch(this.props.baseUrl + 'dishes/' +key).then(function (data)
    {
      return data.json();
    }).then(json =>
    {
      

      this.setState({
        editRow: json,
        show:true,
      });

    });

    /* this.setState({
      show: true,

    }) */
  }


  handleClose(event)
  {

    this.setState({
      show: false,
      editRow:{}
    });
  }

  render()
  {

    return (


      <>
        <table className="table table-striped" >
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Nome</th>
              <th scope="col">Image</th>
              <th scope="col">Category</th>
              <th scope="col">Price</th>

            </tr>
          </thead>
          <tbody>
            {this.state.rows}
          </tbody>
        </table>
        
        {this.state.show && <ModalViewEdit
          baseUrl={this.props.baseUrl} editRow={this.state.editRow} show={this.state.show} handleClose={this.handleClose}
        />}
      </>
    );
  }
}
export default Tabella;
