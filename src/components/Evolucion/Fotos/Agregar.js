import React from 'react';
import { Button, Form, Icon, Image } from 'semantic-ui-react';

class Fotos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //   fotos: [{ foto_url: '' }],
      fotos: this.props.fotosList,
    };
  }

  addClick(e) {
    e.preventDefault();
    this.setState((prevState) => ({
      fotos: [...prevState.fotos, { foto_url: '' }],
    }));
  }

  createUI() {
    return this.state.fotos.map((el, i) => (
      <div key={i}>
        <Form.Group>
          <Form.TextArea
            placeholder='Foto URL'
            name='foto_url'
            width={13}
            value={el.foto_url || ''}
            onChange={this.handleChange.bind(this, i)}
          />
          <Image src={el.foto_url || ''} size='small' rounded />
          <Button onClick={this.removeClick.bind(this, i)}>
            <Icon name='trash' />
          </Button>
        </Form.Group>
      </div>
    ));
  }

  handleChange(i, e) {
    const { name, value } = e.target;
    let fotos = [...this.state.fotos];
    fotos[i] = { ...fotos[i], [name]: value };
    this.props.fotosList[i] = { ...fotos[i], [name]: value };
    this.setState({ fotos });
    console.log(this.props.fotosList);
  }

  removeClick(i, e) {
    e.preventDefault();
    let fotos = [...this.state.fotos];
    fotos.splice(i, 1);
    this.props.fotosList.splice(i, 1);
    this.setState({ fotos });
  }

  render() {
    return (
      <>
        {this.createUI()}
        <Button onClick={this.addClick.bind(this)}>
          <Icon name='add' />
        </Button>
      </>
    );
  }
}

export default Fotos;
