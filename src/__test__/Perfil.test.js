import { cleanup } from '@testing-library/react';
import { mount, shallow } from 'enzyme';
import React from 'react';
import Actualizar from '../components/Perfil/Actualizar';
import CambiarPass from '../components/Perfil/CambiarPass';
import Perfil from '../components/Perfil/Perfil';
import ProviderMock from '../__mocks__/ProviderMock';
import { UsuarioMock } from '../__mocks__/UsuarioMock';

describe('Perfil', () => {
  afterEach(cleanup);

  test('Render del componente Perfil', () => {
    const product = shallow(
      <ProviderMock>
        <Perfil />
      </ProviderMock>
    );
    expect(product.length).toEqual(1);
  });

  test('Render del componente Actualizar datos', () => {
    const product = shallow(
      <ProviderMock>
        <Actualizar />
      </ProviderMock>
    );
    expect(product.length).toEqual(1);
  });

  test('Render del componente Cambiar contraseña', () => {
    const product = shallow(
      <ProviderMock>
        <CambiarPass />
      </ProviderMock>
    );
    expect(product.length).toEqual(1);
  });

  test('Comprobar el botón de actualizar datos', () => {
    const onClickButtonSaveDatos = jest.fn();
    const wrapper = mount(
      <ProviderMock>
        <Actualizar
          usuario={UsuarioMock}
          onClickButtonSaveDatos={onClickButtonSaveDatos}
        />
      </ProviderMock>
    );
    wrapper.find('Form').simulate('submit');
    expect(onClickButtonSaveDatos).toHaveBeenCalledTimes(1);
  });

  test('Comprobar el botón de cambiar contraseña', () => {
    const onClickButtonSaveDatos = jest.fn();
    const wrapper = mount(
      <ProviderMock>
        <CambiarPass
          usuario={UsuarioMock}
          onClickButtonSaveDatos={onClickButtonSaveDatos}
        />
      </ProviderMock>
    );
    wrapper.find('Form').simulate('submit');
    expect(onClickButtonSaveDatos).toHaveBeenCalledTimes(1);
  });
});
