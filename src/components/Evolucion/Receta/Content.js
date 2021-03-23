import React from 'react';

import { eliminarTildes } from '../../utils';
import { ContainerC } from './RecetaStyles';

import 'semantic-ui-css/semantic.min.css';

const Content = ({ texto }) => {
  return (
    <ContainerC
      style={{
        height: '35em',
        margin: '1em',
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
