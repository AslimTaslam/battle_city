import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 14px;
`;

export const PausedLayout = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
`;

export const ButtonWrapper = styled.div`
  position: absolute;
  left: 15px;
  top: 15px;
  display: flex;
  gap: 10px;
`;

export const ReturnLink = styled(Link)`
  font-family: Roboto;
  color: #fff;
  background: #000;
  border: solid 3px #000;
  border-radius: 4px;
  padding: 6px;
`;

export const Button = styled.button`
  font-family: Roboto;
  color: #fff;
  background: #000;
  border: solid 3px #000;
  border-radius: 4px;
  padding: 6px;
`;
