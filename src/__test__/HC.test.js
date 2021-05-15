import { cleanup, render, screen } from '@testing-library/react';
import { mount, shallow } from 'enzyme';
import { createMemoryHistory } from 'history';
import React from 'react';
import ModalEliminar from '../components/Modales/ModalEliminar';
import Agregar from '../components/Paciente/Agregar/Agregar';
import Detalle from '../components/Paciente/Detalle/Detalle';
import HistoriasC from '../components/Pacientes/Listado';
import { PacientesMock, PaginasMock } from '../__mocks__/PacienteMock';
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

  test('Render del componente Detalle de paciente por id', () => {
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

  // test('Comprobar el botón de crear nuevo paciente', () => {
  //   const onClickButtonSavePaciente = jest.fn();
  //   const wrapper = mount(
  //     <ProviderMock>
  //       <Agregar
  //         formPaciente={PacienteMocks}
  //         onClickButtonSavePaciente={onClickButtonSavePaciente}
  //         etnias={etniasMock}
  //         generos={generosMock}
  //         nivelDeInstruccion={nivelesDeInstruccionMock}
  //         estadoCivil={estadosCivilesMock}
  //         tipoDeSangre={tiposDeSangreMock}
  //       />
  //     </ProviderMock>
  //   );
  //   wrapper.find('Form').simulate('submit');
  //   expect(onClickButtonSavePaciente).toHaveBeenCalledTimes(1);
  // });

  // test('Comprobar el botón de editar paciente', () => {
  //   const onClickButtonSavePaciente = jest.fn();
  //   const wrapper = mount(
  //     <ProviderMock>
  //       <Agregar
  //         formPaciente={PacienteMocks}
  //         onClickButtonSavePaciente={onClickButtonSavePaciente}
  //         etnias={etniasMock}
  //         generos={generosMock}
  //         nivelDeInstruccion={nivelesDeInstruccionMock}
  //         estadoCivil={estadosCivilesMock}
  //         tipoDeSangre={tiposDeSangreMock}
  //       />
  //     </ProviderMock>
  //   );
  //   wrapper.find('Form').simulate('submit');
  //   expect(onClickButtonSavePaciente).toHaveBeenCalledTimes(1);
  // });

  test('Comprobar el botón de eliminar paciente', () => {
    const deleteM = jest.fn();
    const wrapper = mount(
      <ProviderMock>
        <ModalEliminar deleteM={deleteM} open={true} />
      </ProviderMock>
    );
    wrapper.find('Modal').find('Button').at(0).simulate('click');
    expect(deleteM).toHaveBeenCalledTimes(1);
  });

  test('Comprobar el botón de buscar paciente', () => {
    const history = createMemoryHistory();
    history.push('/paciente_buscar/a');
    render(
      <ProviderMock>
        <Pacientes
          history={history}
          pacientes={PacientesMock}
          paginas={PaginasMock}
        />
      </ProviderMock>
    );

    expect(screen.getByText(/Nombres/i)).toBeInTheDocument();
  });
});
