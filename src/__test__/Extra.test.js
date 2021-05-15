import { cleanup } from '@testing-library/react';
import { shallow } from 'enzyme';
import React from 'react';
import Error from '../components/Error/Error';
import Error404 from '../components/Error/Error404';
import Auth from '../components/Error/ErrorAutorizacion';
import Loader from '../components/Loader/Loader';
import About from '../components/Sidenav/About';
import Home from '../components/Slider/Slider';
import ProviderMock from '../__mocks__/ProviderMock';

describe('Páginas adicionales', () => {
  afterEach(cleanup);

  test('Render del componente About', () => {
    const product = shallow(
      <ProviderMock>
        <About />
      </ProviderMock>
    );
    expect(product.length).toEqual(1);
  });

  test('Render del componente Home', () => {
    const product = shallow(
      <ProviderMock>
        <Home />
      </ProviderMock>
    );
    expect(product.length).toEqual(1);
  });

  test('Render del componente Loader', () => {
    const product = shallow(
      <ProviderMock>
        <Loader />
      </ProviderMock>
    );
    expect(product.length).toEqual(1);
  });

  test('Render del componente Error 500', () => {
    const product = shallow(
      <ProviderMock>
        <Error />
      </ProviderMock>
    );
    expect(product.length).toEqual(1);
  });

  test('Render del componente Error 404', () => {
    const product = shallow(
      <ProviderMock>
        <Error404 />
      </ProviderMock>
    );
    expect(product.length).toEqual(1);
  });

  test('Render del componente Error de Autorización', () => {
    const product = shallow(
      <ProviderMock>
        <Auth />
      </ProviderMock>
    );
    expect(product.length).toEqual(1);
  });
});
