import React from 'react';
import { mount, shallow } from 'enzyme';
import ProviderMock from '../../__mocks__/ProviderMock';
import Agregar from '../../components/Cita/Agregar/Agregar.js';
import CitaMock from '../../__mocks__/CitaMock';
import PacienteMock from '../../__mocks__/PacienteMock';
import { horasMinutos } from '../../components/utils/index';

describe('<Agregar/>', () => {
  test('Render del componente Agregar', () => {
    const product = shallow(
      <ProviderMock>
        <Agregar />
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
        />
      </ProviderMock>
    );
    wrapper.find('Form').simulate('submit');
    expect(onClickButtonSaveCita).toHaveBeenCalledTimes(1);
  });
});
