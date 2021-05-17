import moment from 'moment';
import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Media from 'react-media';
import { useHistory } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import { Header, Icon, Segment } from 'semantic-ui-react';
import { DivScroll } from '../../global';
import {
  GLOBAL_MEDIA_QUERIES,
  maxMediumScrollRecord,
  mediumHeight,
  mediumScrollExtra,
} from '../utils';
import Navbar from './NavbarCitas';
moment.locale('es', {
  months:
    'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split(
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

const Listado = ({ citas, changeMonth, fechaUltima, view, user, ...props }) => {
  const history = useHistory();
  const [views, setView] = React.useState('month');
  const [newDate, setDate] = React.useState(fechaUltima);

  return (
    <Media queries={GLOBAL_MEDIA_QUERIES}>
      {(matches) => (
        <React.Fragment>
          <Segment style={mediumHeight}>
            <Navbar verNav={false} citaId={0} user={user} />
            <Header as="h1" textAlign="center">
              <Header.Content>
                <Icon name="calendar" />
                Citas médicas
              </Header.Content>
            </Header>
            <hr />
            <br />
            <DivScroll
              style={matches.medium ? mediumScrollExtra : maxMediumScrollRecord}
            >
              <Calendar
                selectable
                localizer={localizer}
                events={citas}
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                step={15}
                min={new Date(0, 0, 0, 8, 0, 0)}
                max={new Date(0, 0, 0, 21, 0, 0)}
                timeslots={2}
                style={{ height: 500 }}
                onSelectEvent={(event) =>
                  history.push(`/cita_detalle/${event.cita_id}`)
                }
                date={moment(newDate).toDate()}
                defaultDate={moment(newDate).toDate()}
                views={['month', 'day']}
                defaultView={view}
                onNavigate={(date, views, action) => {
                  setDate(date);
                  changeMonth(date, views, action);
                }}
                onView={(view) => setView(view)}
              />
            </DivScroll>
          </Segment>
        </React.Fragment>
      )}
    </Media>
  );
};

export default Listado;
