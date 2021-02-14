import styled from 'styled-components';

export const Logo = styled.img`
  width: 80%;
  height: 70%;
`;

export const Item = styled.div`
  ${'' /* border: solid red; */}
  &:active {
    border: solid red;
    background: blue;
  }
`;
