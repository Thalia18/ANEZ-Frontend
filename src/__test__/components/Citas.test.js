import { mount, shallow } from 'enzyme';
import React from 'react';
import Agregar from '../../components/Cita/Agregar/Agregar';
import Detalle from '../../components/Cita/Detalle/Detalle';
import Editar from '../../components/Cita/Editar/Editar';
import Buscar from '../../components/Citas/Buscar';
import Citas from '../../components/Citas/Listado';
import NavbarNotificacion from '../../components/Citas/NavbarCitasNot';
import Notificaciones from '../../components/Citas/Notificaciones';
import ModalEliminar from '../../components/Modales/ModalEliminar';
import { horasMinutos } from '../../components/utils/index';
import CitaMock from '../../__mocks__/CitaMock';
import EspecialidadesMock from '../../__mocks__/EspecialidadesMock';
import { medico, MedicosMock } from '../../__mocks__/MedicosMock';
import PacienteMock from '../../__mocks__/PacienteMock';
import ProviderMock from '../../__mocks__/ProviderMock';

describe('Citas', () => {
  test('Render del componente Calendario de citas', () => {
    const product = shallow(
      <ProviderMock>
        <Citas />
      </ProviderMock>
    );
    expect(product.length).toEqual(1);
  });

  test('Render del componente Detalle de cita por id', () => {
    const product = shallow(
      <ProviderMock>
        <Detalle />
      </ProviderMock>
    );
    expect(product.length).toEqual(1);
  });

  test('Render del componente Agregar', () => {
    const product = shallow(
      <ProviderMock>
        <Agregar />
      </ProviderMock>
    );
    expect(product.length).toEqual(1);
  });

  test('Render del componente Editar', () => {
    const product = shallow(
      <ProviderMock>
        <Editar />
      </ProviderMock>
    );
    expect(product.length).toEqual(1);
  });

  test('Render del componente Buscar', () => {
    const product = shallow(
      <ProviderMock>
        <Buscar />
      </ProviderMock>
    );
    expect(product.length).toEqual(1);
  });

  test('Render del componente Recordatorio de citas', () => {
    const product = shallow(
      <ProviderMock>
        <Notificaciones />
      </ProviderMock>
    );
    expect(product.length).toEqual(1);
  });

  test('Comprobar el botón de agendar cita', () => {
    const onClickButtonSaveCita = jest.fn();
    const wrapper = mount(
      <ProviderMock>
        <Agregar
          formCita={CitaMock}
          onClickButtonSaveCita={onClickButtonSaveCita}
          paciente={PacienteMock}
          horas={horasMinutos(8, 20)}
          especialidades={EspecialidadesMock}
          medicos={MedicosMock}
        />
      </ProviderMock>
    );
    wrapper.find('Form').simulate('submit');
    expect(onClickButtonSaveCita).toHaveBeenCalledTimes(1);
  });

  test('Comprobar el botón de editar cita', () => {
    const onClickButtonSaveCita = jest.fn();
    const wrapper = mount(
      <ProviderMock>
        <Editar
          formCita={CitaMock}
          onClickButtonSaveCita={onClickButtonSaveCita}
          paciente={PacienteMock}
          horas={horasMinutos(8, 20)}
          especialidades={EspecialidadesMock}
          medicos={MedicosMock}
          medico={medico}
        />
      </ProviderMock>
    );
    wrapper.find('Form').simulate('submit');
    expect(onClickButtonSaveCita).toHaveBeenCalledTimes(1);
  });

  test('Comprobar el botón de eliminar cita', () => {
    const deleteM = jest.fn();
    const wrapper = mount(
      <ProviderMock>
        <ModalEliminar deleteM={deleteM} open={true} />
      </ProviderMock>
    );
    wrapper.find('Modal').find('Button').at(0).simulate('click');
    expect(deleteM).toHaveBeenCalledTimes(1);
  });

  test('Comprobar el botón de enviar recordatorios', () => {
    const onClickSend = jest.fn();
    const wrapper = mount(
      <ProviderMock>
        <NavbarNotificacion onClickSend={onClickSend} />
      </ProviderMock>
    );
    wrapper.find('Nav').at(0).find('Button').simulate('click');
    expect(onClickSend).toHaveBeenCalledTimes(1);
  });
});
