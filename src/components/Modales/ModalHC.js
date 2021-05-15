import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

const ModalHC = ({ existsHC, close }) => {
  let history = useHistory();
  return (
    <Modal closeIcon open={existsHC} onClose={close} size="tiny">
      <Header icon="heartbeat" content={'Crear Historia clínica'} />
      <Modal.Content>
        <p>
          Para crear una historia clínica, se requiere seleccionar un paciente.
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Button
          color="blue"
          onClick={() => {
            history.push(`/paciente_agregar`);
          }}
        >
          <Icon name="plus" /> Crear paciente
        </Button>
        <Button color="green" onClick={() => history.push(`/pacientes`)}>
          <Icon name="search" /> Buscar paciente
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ModalHC;
