import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

const ModalSesionExpirada = ({ open }) => {
  let history = useHistory();
  return (
    <Modal open={open} dimmer="blurring" size="tiny">
      <Header icon="hourglass start" content="Su sesión ha expirado" />
      <Modal.Content>
        <p>
          <b>
            <Icon name="warning circle" /> Vuelva a iniciar sesión
          </b>
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Button
          color="green"
          onClick={() => {
            history.push(`/`);
          }}
        >
          <Icon name="arrow alternate circle right" /> &nbsp; Login
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ModalSesionExpirada;
