
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';

interface SparkButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

const SparkButton = ({ 
  children, 
  onClick, 
  className = "",
  variant = "default"
}: SparkButtonProps) => {
  const [sparks, setSparks] = useState<{ id: number; style: React.CSSProperties }[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const sparkCount = 20; // Number of sparks per click
  
  const createSparks = (e: React.MouseEvent) => {
    // Only trigger if we have the button ref
    if (!buttonRef.current) return;
    
    // Get click position relative to button
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Create new sparks with random properties
    const newSparks = Array.from({ length: sparkCount }).map((_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 50 + 30;
      const duration = Math.random() * 0.6 + 0.4;
      const size = Math.random() * 5 + 3;
      const hue = Math.random() * 60 + 30; // Gold/orange colors
      
      return {
        id: Date.now() + i,
        style: {
          left: `${x}px`,
          top: `${y}px`,
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: `hsl(${hue}, 100%, 65%)`,
          position: 'absolute',
          borderRadius: '50%',
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%)',
          animation: `spark-fly-${angle < Math.PI ? 'up' : 'down'} ${duration}s forwards`,
          opacity: 1,
        } as React.CSSProperties,
      };
    });
    
    setSparks(prev => [...prev, ...newSparks]);
    
    // Clean up old sparks after animation
    setTimeout(() => {
      setSparks(prev => prev.filter(spark => !newSparks.find(ns => ns.id === spark.id)));
    }, 1000);
    
    // Call the original onClick handler
    if (onClick) onClick();
  };
  
  return (
    <div className="relative overflow-hidden">
      <style jsx>{`
        @keyframes spark-fly-up {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
          }
          100% {
            transform: translate(calc(-50% + ${Math.random() * 100 - 50}px), calc(-50% - ${Math.random() * 60 + 40}px)) scale(1);
            opacity: 0;
          }
        }
        @keyframes spark-fly-down {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
          }
          100% {
            transform: translate(calc(-50% + ${Math.random() * 100 - 50}px), calc(-50% + ${Math.random() * 60 + 40}px)) scale(1);
            opacity: 0;
          }
        }
      `}</style>
      
      <Button
        ref={buttonRef}
        className={className}
        variant={variant}
        onClick={createSparks}
      >
        {children}
      </Button>
      
      {sparks.map(spark => (
        <div
          key={spark.id}
          style={spark.style}
        />
      ))}
    </div>
  );
};

export default SparkButton;
