
import { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';

interface SparkButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  disabled?: boolean;
  size?: "default" | "sm" | "lg" | "icon";
}

const SparkButton = ({ 
  children, 
  onClick, 
  className = "",
  variant = "default",
  disabled = false,
  size = "default"
}: SparkButtonProps) => {
  const [sparks, setSparks] = useState<{ id: number; style: React.CSSProperties }[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const sparkCount = 30; // Increased number of sparks
  
  // Create unique spark effect with GSAP
  const createSparks = useCallback((e: React.MouseEvent) => {
    // Only trigger if we have the button ref and button is not disabled
    if (!buttonRef.current || disabled) return;
    
    // Get click position relative to button
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Create new sparks with enhanced properties
    const newSparks = Array.from({ length: sparkCount }).map((_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const id = Date.now() + i;
      
      return {
        id,
        style: {
          left: `${x}px`,
          top: `${y}px`,
          position: 'absolute',
          backgroundColor: `hsl(${Math.random() * 60 + 30}, 100%, 65%)`,
          width: `${Math.random() * 7 + 3}px`, // Larger particles
          height: `${Math.random() * 7 + 3}px`, // Larger particles
          borderRadius: '50%',
          pointerEvents: 'none',
          opacity: 1,
          transform: 'translate(-50%, -50%) scale(0)',
        } as React.CSSProperties,
      };
    });
    
    setSparks(prev => [...prev, ...newSparks]);
    
    // Animate the sparks with GSAP for smoother animations
    requestAnimationFrame(() => {
      newSparks.forEach(spark => {
        const element = document.getElementById(`spark-${spark.id}`);
        if (element) {
          const angle = Math.random() * Math.PI * 2;
          const distance = Math.random() * 100 + 50; // Increased distance
          const duration = Math.random() * 1.0 + 0.6; // Longer duration
          
          gsap.to(element, {
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance,
            opacity: 0,
            scale: Math.random() * 2 + 1, // More varied scaling for intensity
            duration: duration,
            ease: "power2.out",
            onComplete: () => {
              setSparks(prev => prev.filter(s => s.id !== spark.id));
            }
          });
        }
      });
    });
    
    // Create sand time animation effect on button
    if (timelineRef.current) {
      timelineRef.current.kill();
    }
    
    const tl = gsap.timeline();
    timelineRef.current = tl;
    
    // Enhanced sand time effect
    tl.to(buttonRef.current, {
      scale: 0.95,
      duration: 0.15,
    }).to(buttonRef.current, {
      scale: 1.05,
      duration: 0.15,
    }).to(buttonRef.current, {
      scale: 1,
      duration: 0.3,
      ease: "elastic.out(1.2, 0.4)"
    });
    
    // Call the original onClick handler
    if (onClick) onClick();
  }, [disabled, onClick, sparkCount]);
  
  return (
    <div className="relative overflow-visible">
      <Button
        ref={buttonRef}
        className={`${className} relative overflow-hidden transition-transform`}
        variant={variant}
        onClick={createSparks}
        disabled={disabled}
        size={size}
      >
        {children}
      </Button>
      
      {sparks.map(spark => (
        <div
          id={`spark-${spark.id}`}
          key={spark.id}
          style={spark.style}
        />
      ))}
    </div>
  );
};

export default SparkButton;
