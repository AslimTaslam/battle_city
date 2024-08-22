import { FC } from 'react';

import { GameCanvas } from 'src/components/GameCanvas';
import * as Style from './GamePage.style';

export const GamePage: FC = () => {
  return (
    <Style.Wrapper>
      <GameCanvas />
    </Style.Wrapper>
  );
};
