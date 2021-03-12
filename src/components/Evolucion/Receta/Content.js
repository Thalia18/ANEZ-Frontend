import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import Media from 'react-media';
import { eliminarTildes } from '../../utils';

import { DivScroll, Global } from '../../../global';
import {
  GLOBAL_MEDIA_QUERIES,
  masMediumHeight,
  maxMediumScroll,
  mediumHeight,
  mediumScroll,
} from '../../utils';
import { ContainerC } from './RecetaStyles';

import 'semantic-ui-css/semantic.min.css';
import { fromEventPattern } from 'rxjs';

const Content = ({ texto }) => {
  return (
    // <Media queries={GLOBAL_MEDIA_QUERIES}>
    //   {(matches) => (
    //     <DivScroll style={matches.medium ? mediumScroll : maxMediumScroll}>
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
    //     </DivScroll>
    //   )}
    // </Media>
  );
};

export default Content;
