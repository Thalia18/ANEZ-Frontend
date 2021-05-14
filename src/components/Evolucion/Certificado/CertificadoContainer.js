import React from 'react';
import Media from 'react-media';
import { Segment, Tab } from 'semantic-ui-react';
import { DivScroll } from '../../../global';
import {
  GLOBAL_MEDIA_QUERIES,
  mediumHeight,
  mediumHeightScroll,
} from '../../utils';
import Navbar from '../Receta/NavbarReceta';
import CertificadoPDF from './Certificado';
import Datos from './Datos';

export default ({
  datos,
  handleOnChangeDias,
  handleChange,
  user,

  consultorio,
  evolucion,
  nombreMedico,
  apellidoMedico,
  nombreArchivo,
  paciente,
  cedula,
}) => {
  const panes = [
    {
      menuItem: 'Días de reposo y fechas',
      render: () => (
        <Tab.Pane attached={false} basic>
          <Navbar cert={true} />
          <DivScroll style={mediumHeightScroll}>
            <Datos
              datos={datos}
              handleOnChangeDias={handleOnChangeDias}
              handleChange={handleChange}
            />
          </DivScroll>
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Previsualizar certificado',
      render: () => (
        <Tab.Pane attached={false} basic>
          <DivScroll style={mediumHeightScroll}>
            <CertificadoPDF
              user={user}
              datos={datos}
              consultorio={consultorio}
              evolucion={evolucion}
              nombreMedico={nombreMedico}
              apellidoMedico={apellidoMedico}
              nombreArchivo={nombreArchivo}
              paciente={paciente}
              cedula={cedula}
            />
          </DivScroll>
        </Tab.Pane>
      ),
    },
  ];
  return (
    <Media queries={GLOBAL_MEDIA_QUERIES}>
      {(matches) => (
        <React.Fragment>
          <Segment basic style={mediumHeight}>
            <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
            <br />
          </Segment>
        </React.Fragment>
      )}
    </Media>
  );
};
