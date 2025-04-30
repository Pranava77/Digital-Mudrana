
import { useState, useCallback, useEffect } from 'react';
import gsap from 'gsap';

const GlobalSparkEffect = () => {
  const [sparks, setSparks] = useState<{ id: number; style: React.CSSProperties }[]>([]);
  const sparkCount = 60; // Significantly increased for more intensity
  
  const createSparks = useCallback((e: MouseEvent) => {
    const x = e.clientX;
    const y = e.clientY;
    
    // Create new sparks with enhanced properties for more intensity
    const newSparks = Array.from({ length: sparkCount }).map((_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const id = Date.now() + i;
      
      // Create sparks with more varied colors and sizes for visual impact
      const hue = Math.random() * 60 + 30; // Gold/yellow range
      const size = Math.random() * 12 + 5; // Larger size range
      
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
          boxShadow: `0 0 10px 2px hsl(${hue}, 100%, 70%)`, // Add glow effect
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
          const distance = Math.random() * 180 + 80; // Increased distance
          const duration = Math.random() * 1.5 + 0.8; // Longer duration
          
          gsap.to(element, {
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance,
            opacity: 0,
            scale: Math.random() * 2 + 0.8, // Varied scaling
            duration: duration,
            ease: "power2.out",
            onComplete: () => {
              setSparks(prev => prev.filter(s => s.id !== spark.id));
            }
          });
        }
      });
    });
    
    // Create enhanced ripple effect
    const ripple = document.createElement('div');
    ripple.style.position = 'absolute';
    ripple.style.width = '10px';
    ripple.style.height = '10px';
    ripple.style.borderRadius = '50%';
    ripple.style.backgroundColor = 'rgba(255, 217, 52, 0.15)'; // Gold color with low opacity
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.transform = 'translate(-50%, -50%)';
    ripple.style.pointerEvents = 'none';
    ripple.style.zIndex = '9998';
    ripple.style.boxShadow = '0 0 30px 10px rgba(255, 217, 52, 0.15)'; // Add glow to ripple
    document.body.appendChild(ripple);
    
    // Create a second ripple for layered effect
    const secondRipple = document.createElement('div');
    secondRipple.style.position = 'absolute';
    secondRipple.style.width = '5px';
    secondRipple.style.height = '5px';
    secondRipple.style.borderRadius = '50%';
    secondRipple.style.backgroundColor = 'rgba(255, 128, 66, 0.2)'; // Orange color with low opacity
    secondRipple.style.left = `${x}px`;
    secondRipple.style.top = `${y}px`;
    secondRipple.style.transform = 'translate(-50%, -50%)';
    secondRipple.style.pointerEvents = 'none';
    secondRipple.style.zIndex = '9997';
    document.body.appendChild(secondRipple);
    
    // Animate main ripple
    gsap.to(ripple, {
      scale: 15, // Larger scale
      opacity: 0,
      duration: 1.5, // Longer duration
      ease: "power2.out",
      onComplete: () => {
        if (document.body.contains(ripple)) {
          document.body.removeChild(ripple);
        }
      }
    });
    
    // Animate second ripple with delay
    gsap.to(secondRipple, {
      scale: 20, // Even larger scale
      opacity: 0,
      duration: 2, // Longer duration
      ease: "power1.out",
      onComplete: () => {
        if (document.body.contains(secondRipple)) {
          document.body.removeChild(secondRipple);
        }
      }
    });
  }, [sparkCount]);

  // Add subtle hover effect to enhance interactivity awareness
  const addHoverEffect = useCallback(() => {
    const cursor = document.createElement('div');
    cursor.style.position = 'fixed';
    cursor.style.width = '20px';
    cursor.style.height = '20px';
    cursor.style.borderRadius = '50%';
    cursor.style.backgroundColor = 'rgba(255, 217, 52, 0.05)';
    cursor.style.pointerEvents = 'none';
    cursor.style.zIndex = '9996';
    cursor.style.transform = 'translate(-50%, -50%)';
    cursor.id = 'spark-cursor';
    document.body.appendChild(cursor);

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      if (cursor) {
        cursor.style.left = `${x}px`;
        cursor.style.top = `${y}px`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (document.body.contains(cursor)) {
        document.body.removeChild(cursor);
      }
    };
  }, []);
  
  useEffect(() => {
    // Add global click listener
    window.addEventListener('click', createSparks);
    
    // Add hover effect
    const cleanupHover = addHoverEffect();
    
    return () => {
      window.removeEventListener('click', createSparks);
      cleanupHover();
    };
  }, [createSparks, addHoverEffect]);
  
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
