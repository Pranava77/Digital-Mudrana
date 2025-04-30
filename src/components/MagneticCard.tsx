
import React, { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import gsap from 'gsap';

interface MagneticCardProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  damping?: number;
  radius?: number;
}

const MagneticCard: React.FC<MagneticCardProps> = ({
  children,
  className,
  strength = 40,
  damping = 7,
  radius = 300,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const boundingRect = useRef<DOMRect | null>(null);
  const centerPoint = useRef({ x: 0, y: 0 });
  const mouse = useRef({ x: 0, y: 0 });

  // Store original position to revert to
  useEffect(() => {
    if (cardRef.current) {
      gsap.set(cardRef.current, { 
        x: 0, 
        y: 0, 
        scale: 1,
        rotationX: 0, 
        rotationY: 0 
      });
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !boundingRect.current) return;

    // Calculate normalized mouse position
    mouse.current.x = e.clientX - boundingRect.current.left;
    mouse.current.y = e.clientY - boundingRect.current.top;
    
    const distanceX = mouse.current.x - centerPoint.current.x;
    const distanceY = mouse.current.y - centerPoint.current.y;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    
    // Apply magnetic effect only when within radius
    if (distance < radius) {
      const magneticPull = (radius - distance) / radius;
      
      gsap.to(cardRef.current, {
        x: distanceX * strength * magneticPull / 100,
        y: distanceY * strength * magneticPull / 100,
        rotationY: distanceX * 0.05,
        rotationX: -distanceY * 0.05,
        scale: 1.05,
        ease: `power${damping}`,
        duration: 0.6
      });
    } else {
      // Reset if outside radius
      gsap.to(cardRef.current, {
        x: 0,
        y: 0,
        scale: 1,
        rotationX: 0,
        rotationY: 0,
        ease: `power${damping}`,
        duration: 0.6
      });
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (cardRef.current) {
      boundingRect.current = cardRef.current.getBoundingClientRect();
      centerPoint.current = {
        x: boundingRect.current.width / 2,
        y: boundingRect.current.height / 2
      };
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        x: 0,
        y: 0,
        scale: 1,
        rotationX: 0,
        rotationY: 0,
        ease: `power${damping}`,
        duration: 0.6
      });
    }
  };

  return (
    <div 
      ref={cardRef}
      className={cn("magnetic-card transition-transform will-change-transform", 
                   isHovered ? "z-10" : "z-0", className)}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ 
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      {children}
    </div>
  );
};

export default MagneticCard;
