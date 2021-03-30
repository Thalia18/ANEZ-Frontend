import moment from 'moment';
import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import Media from 'react-media';
import { useHistory } from 'react-router-dom';
import { Header, Icon, Segment } from 'semantic-ui-react';

import { Global } from '../../global';
import { GLOBAL_MEDIA_QUERIES, masMediumHeight, mediumHeight } from '../utils';
import Navbar from './NavbarCitas';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'semantic-ui-css/semantic.min.css';

moment.locale('es', {
  months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split(
    '_'
  ),
  weekdaysShort: 'Dom._Lun._Mar._Mier._Jue._Vier._Sab.'.split('_'),
});
// moment.locale('es_ES');

const localizer = momentLocalizer(moment);
const messages = {
  allDay: 'Todo el día',
  previous: '❮',
  next: '❯',
  today: 'Hoy',
  month: 'Mes',
  week: 'Semana',
  day: 'Día',
  agenda: 'Agenda',
  date: 'Fecha',
  time: 'Hora',
  event: 'Evento',
  showMore: (total) => `+ ${total} evento(s) adicional(s)`,
};

const Listado = ({ citas, changeMonth, fechaUltima, ...props }) => {
  const history = useHistory();
  return (
    <Media queries={GLOBAL_MEDIA_QUERIES}>
      {(matches) => (
        <React.Fragment>
          <Segment>
            <Global style={matches.medium ? mediumHeight : masMediumHeight}>
              <Navbar verNav={false} citaId={0} />
              <Header as='h1' textAlign='center'>
                <Header.Content>
                  <Icon name='calendar' />
                  Citas médicas
                </Header.Content>
              </Header>
              <hr />
              <br />
              <Calendar
                selectable
                localizer={localizer}
                events={citas}
                startAccessor='start'
                endAccessor='end'
                messages={messages}
                step={15}
                timeslots={8}
                style={{ height: 500 }}
                onSelectEvent={(event) =>
                  history.push(`/cita_detalle/${event.cita_id}`)
                }
                date={fechaUltima}
                defaultDate={fechaUltima}
                onNavigate={(date) => {
                  changeMonth(date);
                  console.log(date, 'date listado');
                }}
              />
            </Global>
          </Segment>
        </React.Fragment>
      )}
    </Media>
  );
};

export default Listado;
