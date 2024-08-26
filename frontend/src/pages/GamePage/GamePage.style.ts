import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

export const ReturnLink = styled(Link)`
  font-family: Roboto;
  color: #fff;
  background: #000;
  border: solid 3px #000;
  border-radius: 4px;
  padding: 6px;
  position: absolute;
  left: 5px;
  top: 5px;
`;
