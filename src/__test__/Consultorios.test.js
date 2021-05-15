import { cleanup, render, screen } from '@testing-library/react';
import { mount, shallow } from 'enzyme';
import { createMemoryHistory } from 'history';
import React from 'react';
import Agregar from '../components/Admin/Consultorios/Agregar';
import Detalle from '../components/Admin/Consultorios/Detalle';
import Consultorios from '../components/Admin/Consultorios/Listado';
import ModalEliminar from '../components/Modales/ModalEliminar';
import {
  ConsultorioMock,
  ConsultoriosMock,
} from '../__mocks__/ConsultoriosMock';
import { PaginasMock } from '../__mocks__/PacienteMock';
import ProviderMock from '../__mocks__/ProviderMock';

describe('Consultorios', () => {
  afterEach(cleanup);

  test('Render del componente Listado de consultorios - Buscar', () => {
    const product = shallow(
      <ProviderMock>
        <Consultorios />
      </ProviderMock>
    );
    expect(product.length).toEqual(1);
  });

  test('Render del componente Detalle de consultorio por id', () => {
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

  test('Comprobar el botón de crear nuevo consultorio', () => {
    const onClickButtonSaveConsultorio = jest.fn();
    const wrapper = mount(
      <ProviderMock>
        <Agregar
          formConsultorio={ConsultorioMock}
          onClickButtonSaveConsultorio={onClickButtonSaveConsultorio}
        />
      </ProviderMock>
    );
    wrapper.find('Form').simulate('submit');
    expect(onClickButtonSaveConsultorio).toHaveBeenCalledTimes(1);
  });

  test('Comprobar el botón de editar consultorio', () => {
    const onClickButtonSaveConsultorio = jest.fn();
    const wrapper = mount(
      <ProviderMock>
        <Agregar
          formConsultorio={ConsultorioMock}
          onClickButtonSaveConsultorio={onClickButtonSaveConsultorio}
        />
      </ProviderMock>
    );
    wrapper.find('Form').simulate('submit');
    expect(onClickButtonSaveConsultorio).toHaveBeenCalledTimes(1);
  });

  test('Comprobar el botón de eliminar consultorio', () => {
    const deleteM = jest.fn();
    const wrapper = mount(
      <ProviderMock>
        <ModalEliminar deleteM={deleteM} open={true} />
      </ProviderMock>
    );
    wrapper.find('Modal').find('Button').at(0).simulate('click');
    expect(deleteM).toHaveBeenCalledTimes(1);
  });

  test('Comprobar el botón de buscar consultorio', () => {
    const history = createMemoryHistory();
    history.push('/consultorio_buscar/a');
    render(
      <ProviderMock>
        <Consultorios
          history={history}
          consultorios={ConsultoriosMock}
          paginas={PaginasMock}
        />
      </ProviderMock>
    );

    expect(screen.getByText(/Dirección/i)).toBeInTheDocument();
  });
});
