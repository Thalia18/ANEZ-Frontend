import React from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

const ModalSuccess = ({ success, header, content, closeModal }) => {
  return (
    <Modal closeIcon open={success} onClose={closeModal}>
      <Header icon="medkit" content={header} />
      <Modal.Content>
        <p>{content}</p>
      </Modal.Content>
      <Modal.Actions>
        <Button color="green" onClick={closeModal}>
          <Icon name="checkmark" /> Ok
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ModalSuccess;
