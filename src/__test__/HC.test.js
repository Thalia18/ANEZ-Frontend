import { cleanup, render, screen } from '@testing-library/react';
import { mount, shallow } from 'enzyme';
import { createMemoryHistory } from 'history';
import React from 'react';
import Detalle from '../components/HistoriaClinica//Detalle/Detalle';
import Agregar from '../components/HistoriaClinica/Agregar/Agregar';
import HistoriasC from '../components/HistoriasClinicas/Listado';
import ModalEliminar from '../components/Modales/ModalEliminar';
import { HistoriaMock, HistoriasMock } from '../__mocks__/HCMock';
import { PacienteMocks, PaginasMock } from '../__mocks__/PacienteMock';
import ProviderMock from '../__mocks__/ProviderMock';

describe('Historias clínicas', () => {
  afterEach(cleanup);

  test('Render del componente Listado de historias clínicas - Buscar', () => {
    const product = shallow(
      <ProviderMock>
        <HistoriasC />
      </ProviderMock>
    );
    expect(product.length).toEqual(1);
  });

  test('Render del componente Detalle de historia clínica por id', () => {
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

  test('Comprobar el botón de crear nueva historia clínica', () => {
    const onClickButtonSaveHC = jest.fn();
    const wrapper = mount(
      <ProviderMock>
        <Agregar
          paciente={PacienteMocks}
          formHC={HistoriaMock}
          onClickButtonSaveHC={onClickButtonSaveHC}
        />
      </ProviderMock>
    );
    wrapper.find('Form').simulate('submit');
    expect(onClickButtonSaveHC).toHaveBeenCalledTimes(1);
  });

  test('Comprobar el botón de editar historia clínica', () => {
    const onClickButtonSaveHC = jest.fn();
    const wrapper = mount(
      <ProviderMock>
        <Agregar
          paciente={PacienteMocks}
          formHC={HistoriaMock}
          onClickButtonSaveHC={onClickButtonSaveHC}
        />
      </ProviderMock>
    );
    wrapper.find('Form').simulate('submit');
    expect(onClickButtonSaveHC).toHaveBeenCalledTimes(1);
  });

  test('Comprobar el botón de eliminar historia clínica', () => {
    const deleteM = jest.fn();
    const wrapper = mount(
      <ProviderMock>
        <ModalEliminar deleteM={deleteM} open={true} />
      </ProviderMock>
    );
    wrapper.find('Modal').find('Button').at(0).simulate('click');
    expect(deleteM).toHaveBeenCalledTimes(1);
  });

  test('Comprobar el botón de buscar historia clínica', () => {
    const history = createMemoryHistory();
    history.push('/historia_clinica_buscar/a');
    render(
      <ProviderMock>
        <HistoriasC
          history={history}
          HC={HistoriasMock}
          paginas={PaginasMock}
        />
      </ProviderMock>
    );

    expect(screen.getByText(/Paciente/i)).toBeInTheDocument();
  });
});
