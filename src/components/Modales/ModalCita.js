import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

const ModalCita = ({ existsHC, close }) => {
  let history = useHistory();
  return (
    <Modal closeIcon open={existsHC} onClose={close} size="tiny">
      <Header icon="calendar alternate" content={'Agendar cita'} />
      <Modal.Content>
        <p>Para agendar una cita, se requiere seleccionar un paciente.</p>
      </Modal.Content>
      <Modal.Actions>
        <Button
          color="blue"
          onClick={() => {
            history.push(`/cita_agregar_paciente`);
          }}
        >
          <Icon name="plus" /> Nuevo paciente
        </Button>
        <Button color="green" onClick={() => history.push(`/pacientes`)}>
          <Icon name="search" /> Buscar paciente
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ModalCita;
