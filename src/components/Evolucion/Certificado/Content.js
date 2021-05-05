import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { eliminarTildes } from '../../utils';
import { ContainerC } from './RecetaStyles';

const Content = ({ texto }) => {
  return (
    <ContainerC
      style={{
        height: '40em',
        margin: '0.5em',
        whiteSpace: 'pre-wrap',
        textAlign: 'justify',
        overflow: 'auto  ',
      }}
    >
      <p>{texto !== undefined ? eliminarTildes(texto) : texto}</p>
    </ContainerC>
  );
};

export default Content;
