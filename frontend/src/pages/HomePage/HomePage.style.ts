import styled from 'styled-components';

export const Wrapper = styled.div`
  margin: 0 auto;
  padding: 20px;
  background-color: #000;
  font-family: Roboto;
  font-size: 22px;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Header = styled.h1`
  font-family: Bionicle;
  font-size: 120px;
  font-weight: bold;
  text-align: center;
  background-image: url('bricks.png');
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
`;

export const UnorderList = styled.ul`
  font-family: Bionicle;
  list-style: none;
  padding: 0;
  margin: 0 auto;
`;

export const ListItem = styled.li`
  position: relative;
  padding: 10px;
  color: #fff;
  cursor: pointer;
`;

export const LinkLabel = styled.span`
  margin-left: 40px;
`;

export const LinkTankImg = styled.img`
  position: absolute;
  height: 30px;
`;

export const CreatorLabel = styled.div`
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  font-family: Roboto;
  text-align: center;
  margin-top: 20px;
`;
