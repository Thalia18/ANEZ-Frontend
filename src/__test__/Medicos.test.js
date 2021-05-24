import { cleanup, render, screen } from '@testing-library/react';
import { mount, shallow } from 'enzyme';
import { createMemoryHistory } from 'history';
import React from 'react';
import { fromEventPattern } from 'rxjs';
import Agregar from '../components/Admin/Medicos/Agregar';
import Detalle from '../components/Admin/Medicos/Detalle';
import Medicos from '../components/Admin/Medicos/Listado';
import ModalEliminar from '../components/Modales/ModalEliminar';
import { PaginasMock } from '../__mocks__/PacienteMock';
import ProviderMock from '../__mocks__/ProviderMock';
import { UsuarioMock, UsuariosMock } from '../__mocks__/UsuarioMock';
import { consultorios } from '../__mocks__/DatosMock';

describe('Médicos', () => {
  afterEach(cleanup);

  test('Render del componente Listado de médicos - Buscar', () => {
    const product = shallow(
      <ProviderMock>
        <Medicos />
      </ProviderMock>
    );
    expect(product.length).toEqual(1);
  });

  test('Render del componente Detalle de médico por id', () => {
    const product = shallow(
      <ProviderMock>
        <Detalle />
      </ProviderMock>
    );
    expect(product.length).toEqual(1);
  });

  test('Render del componente Agregar - Editar', () => {
    const product = shallow(
      <ProviderMock>
        <Agregar />
      </ProviderMock>
    );
    expect(product.length).toEqual(1);
  });

  test('Comprobar el botón de crear nuevo médico', () => {
    const onClickButtonSaveMedico = jest.fn();
    const wrapper = mount(
      <ProviderMock>
        <Agregar
          formUsuario={UsuarioMock}
          onClickButtonSaveMedico={onClickButtonSaveMedico}
          consultorios={consultorios}
        />
      </ProviderMock>
    );
    wrapper.find('Form').simulate('submit');
    expect(onClickButtonSaveMedico).toHaveBeenCalledTimes(1);
  });

  test('Comprobar el botón de editar médico', () => {
    const onClickButtonSaveMedico = jest.fn();
    const wrapper = mount(
      <ProviderMock>
        <Agregar
          formUsuario={UsuarioMock}
          onClickButtonSaveMedico={onClickButtonSaveMedico}
          consultorios={consultorios}
        />
      </ProviderMock>
    );
    wrapper.find('Form').simulate('submit');
    expect(onClickButtonSaveMedico).toHaveBeenCalledTimes(1);
  });

  test('Comprobar el botón de eliminar médico', () => {
    const deleteM = jest.fn();
    const wrapper = mount(
      <ProviderMock>
        <ModalEliminar deleteM={deleteM} open={true} />
      </ProviderMock>
    );
    wrapper.find('Modal').find('Button').at(0).simulate('click');
    expect(deleteM).toHaveBeenCalledTimes(1);
  });

  test('Comprobar el botón de buscar médico', () => {
    const history = createMemoryHistory();
    history.push('/usuario_buscar/a');
    render(
      <ProviderMock>
        <Medicos
          history={history}
          medicos={UsuariosMock}
          paginas={PaginasMock}
        />
      </ProviderMock>
    );

    expect(screen.getByText(/Teléfono/i)).toBeInTheDocument();
  });
});
