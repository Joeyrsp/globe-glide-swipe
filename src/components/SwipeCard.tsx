import React from 'react';
import { useSpring, animated } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import { Card } from '@/components/ui/card';

interface SwipeCardProps {
  children: React.ReactNode;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  style?: React.CSSProperties;
}

const SwipeCard: React.FC<SwipeCardProps> = ({ children, onSwipeLeft, onSwipeRight, style }) => {
  const [{ x, y, rot, scale }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    rot: 0,
    scale: 1,
    config: { friction: 50, tension: 500 }
  }));

  const bind = useDrag(({ active, movement: [mx], direction: [xDir], velocity }) => {
    const trigger = velocity > 0.2;
    const isGone = !active && trigger;
    
    if (isGone) {
      if (xDir < 0) {
        onSwipeLeft();
      } else {
        onSwipeRight();
      }
    }
    
    api.start({
      x: isGone ? (200 + window.innerWidth) * xDir : active ? mx : 0,
      rot: active ? mx / 100 + (isGone ? xDir * 10 * velocity : 0) : 0,
      scale: active ? 1.1 : 1,
      config: { friction: 50, tension: active ? 800 : isGone ? 200 : 500 }
    });
  });

  return (
    <animated.div
      {...bind()}
      style={{
        transform: x.to(x => `translate3d(${x}px,0,0)`),
        ...style
      }}
      className="touch-none"
    >
      <animated.div
        style={{
          transform: rot.to(r => `rotate(${r}deg)`),
          scale: scale,
        }}
      >
        <Card className="w-80 h-96 cursor-grab active:cursor-grabbing">
          {children}
        </Card>
      </animated.div>
    </animated.div>
  );
};

export default SwipeCard;