import { cleanup, render, screen } from '@testing-library/react';
import { mount, shallow } from 'enzyme';
import { createMemoryHistory } from 'history';
import React from 'react';
import Agregar from '../components/Evolucion/Agregar/Agregar';
import Certificado from '../components/Evolucion/Certificado/CertificadoContainer';
import Detalle from '../components/Evolucion/Detalle/Detalle';
import Receta from '../components/Evolucion/Receta/PdfContainer';
import Buscar from '../components/Evoluciones/Buscar';
import Evoluciones from '../components/Evoluciones/Listado';
import ModalEliminar from '../components/Modales/ModalEliminar';
import { EvolucionesMock } from '../__mocks__/EvolucionMock';
import { PacienteMocks, PaginasMock } from '../__mocks__/PacienteMock';
import ProviderMock from '../__mocks__/ProviderMock';

describe('Evoluciones', () => {
  afterEach(cleanup);

  test('Render del componente Listado de evoluciones', () => {
    const product = shallow(
      <ProviderMock>
        <Evoluciones />
      </ProviderMock>
    );
    expect(product.length).toEqual(1);
  });

  test('Render del componente Buscar evoluciones', () => {
    const product = shallow(
      <ProviderMock>
        <Buscar />
      </ProviderMock>
    );
    expect(product.length).toEqual(1);
  });

  test('Render del componente Detalle de evolución por id', () => {
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

  test('Render del componente Receta', () => {
    const product = shallow(
      <ProviderMock>
        <Receta />
      </ProviderMock>
    );
    expect(product.length).toEqual(1);
  });

  test('Render del componente Certificado médico', () => {
    const product = shallow(
      <ProviderMock>
        <Certificado />
      </ProviderMock>
    );
    expect(product.length).toEqual(1);
  });

  // test('Comprobar el botón de crear nueva evolución', () => {
  //   const onClickButtonSaveEvolucion = jest.fn();
  //   const wrapper = mount(
  //     <ProviderMock>
  //       <Agregar
  //         paciente={PacienteMocks}
  //         formEvolucion={EvolucionMock}
  //         onClickButtonSaveEvolucion={onClickButtonSaveEvolucion}
  //         fotosList={fotos}
  //         cie10={cie10}
  //       />
  //     </ProviderMock>
  //   );
  //   wrapper.find('Form').simulate('submit');
  //   expect(onClickButtonSaveEvolucion).toHaveBeenCalledTimes(1);
  // });

  // test('Comprobar el botón de editar evolución', () => {
  //   const onClickButtonSaveEvolucion = jest.fn();
  //   const wrapper = mount(
  //     <ProviderMock>
  //       <Agregar
  //         paciente={PacienteMocks}
  //         formEvolucion={EvolucionMock}
  //         onClickButtonSaveEvolucion={onClickButtonSaveEvolucion}
  //         fotosList={fotos}
  //         cie10={cie10}
  //       />
  //     </ProviderMock>
  //   );
  //   wrapper.find('Form').simulate('submit');
  //   expect(onClickButtonSaveEvolucion).toHaveBeenCalledTimes(1);
  // });

  test('Comprobar el botón de eliminar evolución', () => {
    const deleteM = jest.fn();
    const wrapper = mount(
      <ProviderMock>
        <ModalEliminar deleteM={deleteM} open={true} />
      </ProviderMock>
    );
    wrapper.find('Modal').find('Button').at(0).simulate('click');
    expect(deleteM).toHaveBeenCalledTimes(1);
  });

  test('Comprobar el botón de buscar evolución', () => {
    const history = createMemoryHistory();
    history.push('/evolución_buscar/1/2020-01-01/2020-01-02');
    render(
      <ProviderMock>
        <Buscar
          history={history}
          evoluciones={EvolucionesMock}
          paginas={PaginasMock}
          paciente={PacienteMocks}
        />
      </ProviderMock>
    );

    expect(screen.getByText(/Paciente/i)).toBeInTheDocument();
  });
});
