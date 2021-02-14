import React from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

const ModalAgregar = ({ success }) => {
  const [open, setOpen] = React.useState(success);

  return (
    <Modal
      closeIcon
      open={open}
      //   trigger={<Button>Show Modal</Button>}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Header icon='medkit' content='Nuevo Paciente' />
      <Modal.Content>
        <p>Paciente creado exitosamente</p>
      </Modal.Content>
      <Modal.Actions>
        <Button color='green' onClick={() => setOpen(false)}>
          <Icon name='checkmark' /> Ok
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ModalAgregar;
