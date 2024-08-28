import { FC, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import GameService from 'src/services/Game';
import { GameDifficulty } from 'src/services/Game/data';
import * as Style from './HomePage.style';

interface ActionParams {
  gameService?: GameService | null;
  navigate?: (path: string) => void;
  difficulty?: GameDifficulty;
}

const menuItems = [
  {
    label: '1 PLAYER',
    action({ gameService, navigate }: ActionParams) {
      if (gameService && navigate) {
        gameService.gameStore.setGameMode('SINGLEPLAYER');
        navigate(`/${this.uri}`);
      }
    },
    uri: 'game',
  },
  {
    label: '2 PLAYERS',
    action({ gameService, navigate }: ActionParams) {
      if (gameService && navigate) {
        gameService.gameStore.setGameMode('MULTIPLAYER');
        navigate(`/${this.uri}`);
      }
    },
    uri: 'game',
  },
  {
    label: '2 PLAYERS ONLINE',
    action: () => console.log('MultiPlayerOnline selected'),
  },
  {
    label: 'STATISTICS',
    action({ navigate }: ActionParams) {
      if (navigate) {
        navigate(`/${this.uri}`);
      }
    },
    uri: 'stat',
  },
  {
    label: 'DIFFICULT',
    action({ gameService, difficulty }: ActionParams) {
      if (gameService && difficulty) {
        gameService.gameStore.setDifficulty(difficulty);
      }
    },
  },
];

interface HomePageProps {
  gameService: GameService | null;
}

export const HomePage: FC<HomePageProps> = ({ gameService }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isDifficult, setIsDifficult] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowUp') {
      setSelectedIndex(
        (prevIndex) => (prevIndex - 1 + menuItems.length) % menuItems.length,
      );
    } else if (event.key === 'ArrowDown') {
      setSelectedIndex((prevIndex) => (prevIndex + 1) % menuItems.length);
    } else if (event.key === 'Enter' || event.key === ' ') {
      const selectedItem = menuItems[selectedIndex];
      if (selectedItem.label === 'DIFFICULT') {
        setIsDifficult((prev) => !prev);
        selectedItem.action({
          gameService,
          difficulty: isDifficult ? GameDifficulty.Hard : GameDifficulty.Easy,
        });
      } else if (selectedItem.label === 'STATISTICS') {
        selectedItem.action({ navigate });
      } else {
        selectedItem.action({ gameService, navigate });
      }
    }
  };

  const handleMouseEnter = (index: number) => {
    setSelectedIndex(index);
  };

  const handleMouseClick = (index: number) => {
    const selectedItem = menuItems[index];
    if (selectedItem.label === 'DIFFICULT') {
      setIsDifficult((prev) => !prev);
      selectedItem.action({
        gameService,
        difficulty: isDifficult ? GameDifficulty.Hard : GameDifficulty.Easy,
      });
    } else {
      selectedItem.action({ gameService, navigate });
    }
  };

  useEffect(() => {
    if (wrapperRef.current) {
      const updateSize = () => {
        const size = Math.min(window.innerWidth, window.innerHeight);
        wrapperRef.current!.style.width = `${size}px`;
        wrapperRef.current!.style.height = `${size}px`;
      };

      updateSize();
      window.addEventListener('resize', updateSize);
      return () => window.removeEventListener('resize', updateSize);
    }
  }, []);

  return (
    <Style.Wrapper ref={wrapperRef} tabIndex={0} onKeyDown={handleKeyDown}>
      <Style.Header>Battle city</Style.Header>
      <Style.UnorderList>
        {menuItems.map((item, index) => (
          <Style.ListItem
            key={index}
            onMouseEnter={() => handleMouseEnter(index)}
            onClick={() => handleMouseClick(index)}
          >
            {selectedIndex === index ? (
              <Style.LinkTankImg src="link_tank.png" alt="tank" />
            ) : null}
            <Style.LinkLabel>
              {item.label === 'DIFFICULT'
                ? `${item.label}: ${isDifficult ? 'HARD' : 'EASY'}`
                : item.label}
            </Style.LinkLabel>
          </Style.ListItem>
        ))}
      </Style.UnorderList>
      <Style.CreatorLabel>
        Created by Khansuverov Eldar / @aslimtaslam51
      </Style.CreatorLabel>
    </Style.Wrapper>
  );
};
