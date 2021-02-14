import React from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

const ModalEliminar = ({ deleteM, open, closeModal }) => {
  return (
    <Modal closeIcon open={open} onClose={closeModal}>
      <Header icon='medkit' content='Nuevo Paciente' />
      <Modal.Content>
        <b>¿Realmente desea eliminar este paciente?</b>
      </Modal.Content>
      <Modal.Actions>
        <Button color='red' onClick={closeModal}>
          <Icon name='remove' /> No
        </Button>
        <Button color='green' onClick={deleteM}>
          <Icon name='checkmark' /> Yes
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ModalEliminar;
