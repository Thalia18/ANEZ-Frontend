import React from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

const ModalEliminar = ({ deleteM, open, closeModal, content, headerC }) => {
  return (
    <Modal closeIcon open={open} onClose={closeModal}>
      <Header icon="medkit" content={headerC} />
      <Modal.Content>
        <p>
          <b>
            <Icon name="warning circle" /> {content}
          </b>
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Button color="green" onClick={deleteM}>
          <Icon name="checkmark" /> Si
        </Button>
        <Button color="red" onClick={closeModal}>
          <Icon name="remove" /> No
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ModalEliminar;
