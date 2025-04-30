
import { useState, useCallback, useEffect } from 'react';
import gsap from 'gsap';

const GlobalSparkEffect = () => {
  const [sparks, setSparks] = useState<{ id: number; style: React.CSSProperties }[]>([]);
  const sparkCount = 20; // Reduced from 60 for less intensity
  
  const createSparks = useCallback((e: MouseEvent) => {
    const x = e.clientX;
    const y = e.clientY;
    
    // Create new sparks with subtle properties
    const newSparks = Array.from({ length: sparkCount }).map((_, i) => {
      const id = Date.now() + i;
      
      // Create sparks with more subtle colors and sizes
      const hue = Math.random() * 60 + 30; // Gold/yellow range
      const size = Math.random() * 6 + 2; // Smaller size range
      
      return {
        id,
        style: {
          left: `${x}px`,
          top: `${y}px`,
          position: 'absolute',
          backgroundColor: `hsl(${hue}, 100%, ${Math.random() * 15 + 60}%)`,
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: '50%',
          pointerEvents: 'none',
          opacity: 1,
          transform: 'translate(-50%, -50%) scale(0)',
          zIndex: 9999,
        } as React.CSSProperties,
      };
    });
    
    setSparks(prev => [...prev, ...newSparks]);
    
    // Animate the sparks with GSAP for smoother animations
    requestAnimationFrame(() => {
      newSparks.forEach(spark => {
        const element = document.getElementById(`global-spark-${spark.id}`);
        if (element) {
          const angle = Math.random() * Math.PI * 2;
          const distance = Math.random() * 80 + 40; // Reduced distance
          const duration = Math.random() * 1.0 + 0.5; // Shorter duration
          
          gsap.to(element, {
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance,
            opacity: 0,
            scale: Math.random() * 1 + 0.5, // Reduced scaling
            duration: duration,
            ease: "power2.out",
            onComplete: () => {
              setSparks(prev => prev.filter(s => s.id !== spark.id));
            }
          });
        }
      });
    });
    
    // Create subtle ripple effect
    const ripple = document.createElement('div');
    ripple.style.position = 'absolute';
    ripple.style.width = '5px';
    ripple.style.height = '5px';
    ripple.style.borderRadius = '50%';
    ripple.style.backgroundColor = 'rgba(255, 217, 52, 0.1)'; // Gold color with low opacity
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.transform = 'translate(-50%, -50%)';
    ripple.style.pointerEvents = 'none';
    ripple.style.zIndex = '9998';
    document.body.appendChild(ripple);
    
    // Animate ripple
    gsap.to(ripple, {
      scale: 8, // Smaller scale
      opacity: 0,
      duration: 1, // Shorter duration
      ease: "power2.out",
      onComplete: () => {
        if (document.body.contains(ripple)) {
          document.body.removeChild(ripple);
        }
      }
    });
  }, [sparkCount]);
  
  useEffect(() => {
    // Add global click listener for all pages
    window.addEventListener('click', createSparks);
    
    return () => {
      window.removeEventListener('click', createSparks);
    };
  }, [createSparks]);
  
  return (
    <>
      {sparks.map(spark => (
        <div
          id={`global-spark-${spark.id}`}
          key={spark.id}
          style={spark.style}
        />
      ))}
    </>
  );
};

export default GlobalSparkEffect;
