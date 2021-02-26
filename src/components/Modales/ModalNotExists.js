import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

const ModalNotExists = ({
  notExistsHC,
  header,
  content,
  closeModal,
  pacienteId,
}) => {
  let history = useHistory();
  return (
    <Modal closeIcon open={notExistsHC} onClose={closeModal}>
      <Header icon='medkit' content={header} />
      <Modal.Content>
        <p>
          El paciente <b>{content}</b> no cuenta con una Historia Clínica
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Button
          color='blue'
          onClick={() => {
            history.push(`/historia_clinica_agregar/${pacienteId}`);
          }}
        >
          <Icon name='plus' /> Crear
        </Button>
        <Button color='green' onClick={closeModal}>
          <Icon name='checkmark' /> Ok
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ModalNotExists;
