import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

const ModalExists = ({ existsHC, header, content, pacienteId }) => {
  let history = useHistory();
  return (
    <Modal closeIcon open={existsHC} onClose={() => history.goBack()}>
      <Header icon='medkit' content={header} />
      <Modal.Content>
        <p>
          El paciente <b>{content}</b> ya cuenta con una Historia Clínica
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Button
          color='blue'
          onClick={() => {
            history.push(`/historia_clinica/${pacienteId}`);
          }}
        >
          <Icon name='checkmark' /> Ver
        </Button>
        <Button color='green' onClick={() => history.goBack()}>
          <Icon name='checkmark' /> Ok
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ModalExists;
