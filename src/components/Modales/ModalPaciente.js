import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

const ModalHC = ({ complete, close, id }) => {
  let history = useHistory();
  return (
    <Modal closeIcon open={complete} onClose={close} size="tiny">
      <Header icon="user" content={'Datos del paciente'} />
      <Modal.Content>
        <p>Se requiere completar los datos del paciente</p>
      </Modal.Content>
      <Modal.Actions>
        <Button
          color="green"
          onClick={() => {
            history.push(`/paciente_editar/${id}`);
          }}
        >
          <Icon name="table" /> Completar datos
        </Button>
        <Button color="red" onClick={() => history.goBack()}>
          <Icon name="close" /> Cerrar
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ModalHC;
