import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';

class ModalViewEdit extends React.Component
{
  constructor(props)
  {
    super(props);
    
    this.state = {
      _id:props.editRow._id,
      inputName: props.editRow.name,
      inputImages: props.editRow.image,
      inputCategory: props.editRow.category,
      inputPrice: props.editRow.price,
    }

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeImage = this.handleChangeImage.bind(this);
    this.handleChangeCategory = this.handleChangeCategory.bind(this);
    this.handleChangePrice = this.handleChangePrice.bind(this);
    this.handleEditSave = this.handleEditSave.bind(this);

  }


  handleChangeName(event)
  {
    this.setState({
      inputName: event.target.value,
    });
  }

  handleChangeImage(event)
  {
    this.setState({
      inputImages: event.target.value,
    });
  }

  handleChangeCategory(event)
  {
    this.setState({
      inputCategory: event.target.value,
    });
  }

  handleChangePrice(event)
  {
    this.setState({
      inputPrice: event.target.value,
    });
  }

  handleEditSave(event)
  {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        name: this.state.inputName,
        image: this.state.inputImages,
        category: this.state.inputCategory,
        price: this.state.inputPrice,
        description: "prova"
       })
  };



  fetch(this.props.baseUrl + 'dishes/'+this.state._id, requestOptions)
      .then(() => console.log('Piatto aggiornato'))
      .catch(err => {
        console.error(err);
      });
    
  }


  render()
  {
    return (


      <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modifica piatto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group >
            <Form.Label>Nome piatto: </Form.Label>
            <Form.Control type="text" onChange={this.handleChangeName} value={this.state.inputName}  />
          
            <Form.Label>Immagine: </Form.Label>
            <Form.Control type="text" onChange={this.handleChangeImage} value={this.state.inputImages}  />
          
            <Form.Label>Categoria: </Form.Label>
            <Form.Control type="text" onChange={this.handleChangeCategory} value={this.state.inputCategory}  />
          
            <Form.Label>Prezzo: </Form.Label>
            <Form.Control type="text" onChange={this.handleChangePrice} value={this.state.inputPrice}  />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.handleClose}>
            Chiudi
          </Button>
          <Button variant="primary" onClick={this.handleEditSave}>
            Salva modifiche
          </Button>
        </Modal.Footer>
      </Modal>

    );
  }
}
export default ModalViewEdit;