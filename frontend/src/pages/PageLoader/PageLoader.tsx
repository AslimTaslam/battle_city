import { FC, useEffect, useState } from 'react';

import TankIcon from 'src/assets/tank.svg';
import * as Style from './PageLoader.style';

export const PageLoader: FC = () => {
  const [dotCounter, setDotCounter] = useState(1);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDotCounter((prev) => (prev < 3 ? prev + 1 : 1));
    }, 700);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Style.Wrapper>
      <TankIcon width={66} height={46} />
      <div>
        Loading<Style.Dot>{'.'.repeat(dotCounter)}</Style.Dot>
      </div>
    </Style.Wrapper>
  );
};
