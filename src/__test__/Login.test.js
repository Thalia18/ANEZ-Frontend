import { cleanup } from '@testing-library/react';
import { mount, shallow } from 'enzyme';
import React from 'react';
import Login from '../components/Login/Login';
import RecuperarPass from '../components/RecuperarPass/RecuperarPass';
import ProviderMock from '../__mocks__/ProviderMock';
import { UsuarioConfirmMock, UsuarioMock } from '../__mocks__/UsuarioMock';

describe('Login', () => {
  afterEach(cleanup);

  test('Render del componente Login', () => {
    const product = shallow(
      <ProviderMock>
        <Login />
      </ProviderMock>
    );
    expect(product.length).toEqual(1);
  });

  test('Render del componente Recuperar contraseña', () => {
    const product = shallow(
      <ProviderMock>
        <RecuperarPass />
      </ProviderMock>
    );
    expect(product.length).toEqual(1);
  });

  test('Comprobar el botón de Login', () => {
    const validateUser = jest.fn();
    const wrapper = mount(
      <ProviderMock>
        <Login formUser={UsuarioConfirmMock} validateUser={validateUser} />
      </ProviderMock>
    );
    wrapper.find('Form').simulate('submit');
    expect(validateUser).toHaveBeenCalledTimes(1);
  });

  test('Comprobar el botón de recuperar contraseña', () => {
    const onClickValidateUser = jest.fn();
    const wrapper = mount(
      <ProviderMock>
        <RecuperarPass
          formUser={UsuarioMock}
          onClickValidateUser={onClickValidateUser}
        />
      </ProviderMock>
    );
    wrapper.find('Form').simulate('submit');
    expect(onClickValidateUser).toHaveBeenCalledTimes(1);
  });
});
