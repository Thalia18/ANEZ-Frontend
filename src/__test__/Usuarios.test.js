import { cleanup, render, screen } from '@testing-library/react';
import { mount, shallow } from 'enzyme';
import { createMemoryHistory } from 'history';
import React from 'react';
import Agregar from '../components/Admin/Usuarios/Agregar';
import Detalle from '../components/Admin/Usuarios/Detalle';
import Usuarios from '../components/Admin/Usuarios/Listado';
import ModalEliminar from '../components/Modales/ModalEliminar';
import { PaginasMock } from '../__mocks__/PacienteMock';
import ProviderMock from '../__mocks__/ProviderMock';
import { UsuariosMock } from '../__mocks__/UsuarioMock';

describe('Usuarios', () => {
  afterEach(cleanup);

  test('Render del componente Listado de usuarios - Buscar', () => {
    const product = shallow(
      <ProviderMock>
        <Usuarios />
      </ProviderMock>
    );
    expect(product.length).toEqual(1);
  });

  test('Render del componente Detalle de usuario por id', () => {
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

  // test('Comprobar el botón de crear nuevo usuario', () => {
  //   const onClickButtonSaveUsuario = jest.fn();
  //   const wrapper = mount(
  //     <ProviderMock>
  //       <Agregar
  //         formUsuario={UsuarioMock}
  //         onClickButtonSaveUsuario={onClickButtonSaveUsuario}
  //         roles={roles}
  //         consultorios={consultorios}
  //       />
  //     </ProviderMock>
  //   );
  //   wrapper.find('Form').simulate('submit');
  //   expect(onClickButtonSaveUsuario).toHaveBeenCalledTimes(1);
  // });

  // test('Comprobar el botón de editar usuario', () => {
  //   const onClickButtonSaveUsuario = jest.fn();
  //   const wrapper = mount(
  //     <ProviderMock>
  //       <Agregar
  //         formUsuario={UsuarioMock}
  //         onClickButtonSaveUsuario={onClickButtonSaveUsuario}
  //         roles={roles}
  //         consultorios={consultorios}
  //       />
  //     </ProviderMock>
  //   );
  //   wrapper.find('Form').simulate('submit');
  //   expect(onClickButtonSaveUsuario).toHaveBeenCalledTimes(1);
  // });

  test('Comprobar el botón de eliminar usuario', () => {
    const deleteM = jest.fn();
    const wrapper = mount(
      <ProviderMock>
        <ModalEliminar deleteM={deleteM} open={true} />
      </ProviderMock>
    );
    wrapper.find('Modal').find('Button').at(0).simulate('click');
    expect(deleteM).toHaveBeenCalledTimes(1);
  });

  test('Comprobar el botón de buscar usuario', () => {
    const history = createMemoryHistory();
    history.push('/usuario_buscar/a');
    render(
      <ProviderMock>
        <Usuarios
          history={history}
          usuarios={UsuariosMock}
          paginas={PaginasMock}
        />
      </ProviderMock>
    );

    expect(screen.getByText(/Apellido/i)).toBeInTheDocument();
  });
});
