import { FC, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import * as Style from './HomePage.style';

const menuItems = [
  {
    label: '1 PLAYER',
    action: () => console.log('SinglePlayer selected'),
    uri: 'game',
  },
  { label: '2 PLAYERS', action: () => console.log('MultiPlayer selected') },
  {
    label: '2 PLAYERS ONLINE',
    action: () => console.log('MultiPlayerOnline selected'),
  },
  { label: 'STATISTICS', action: () => console.log('Statistics selected') },
  { label: 'DIFFICULT', action: () => console.log('Difficulty toggled') },
];

export const HomePage: FC = () => {
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
      } else if (selectedItem?.uri) {
        navigate(`/${selectedItem.uri}`);
      } else {
        selectedItem.action();
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
    } else if (selectedItem?.uri) {
      navigate(`/${selectedItem.uri}`);
    } else {
      selectedItem.action();
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
