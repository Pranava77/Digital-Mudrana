
import { useState, useCallback, useEffect } from 'react';
import gsap from 'gsap';

const GlobalSparkEffect = () => {
  const [sparks, setSparks] = useState<{ id: number; style: React.CSSProperties }[]>([]);
  const sparkCount = 40; // Increased for more intensity
  
  const createSparks = useCallback((e: MouseEvent) => {
    const x = e.clientX;
    const y = e.clientY;
    
    // Create new sparks with enhanced properties for more intensity
    const newSparks = Array.from({ length: sparkCount }).map((_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const id = Date.now() + i;
      
      return {
        id,
        style: {
          left: `${x}px`,
          top: `${y}px`,
          position: 'absolute',
          backgroundColor: `hsl(${Math.random() * 60 + 30}, 100%, ${Math.random() * 15 + 60}%)`,
          width: `${Math.random() * 8 + 4}px`, // Larger particles
          height: `${Math.random() * 8 + 4}px`, // Larger particles
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
          const distance = Math.random() * 120 + 60; // Increased distance
          const duration = Math.random() * 1.2 + 0.8; // Longer duration
          
          gsap.to(element, {
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance,
            opacity: 0,
            scale: Math.random() * 1.5 + 0.5, // Varied scaling
            duration: duration,
            ease: "power2.out",
            onComplete: () => {
              setSparks(prev => prev.filter(s => s.id !== spark.id));
            }
          });
        }
      });
    });
    
    // Create ripple effect
    const ripple = document.createElement('div');
    ripple.style.position = 'absolute';
    ripple.style.width = '10px';
    ripple.style.height = '10px';
    ripple.style.borderRadius = '50%';
    ripple.style.backgroundColor = 'rgba(255, 217, 52, 0.2)'; // Gold color with low opacity
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.transform = 'translate(-50%, -50%)';
    ripple.style.pointerEvents = 'none';
    ripple.style.zIndex = '9998';
    document.body.appendChild(ripple);
    
    gsap.to(ripple, {
      scale: 10,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      onComplete: () => {
        if (document.body.contains(ripple)) {
          document.body.removeChild(ripple);
        }
      }
    });
  }, [sparkCount]);
  
  useEffect(() => {
    // Add global click listener
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
