
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ClientLogosMarquee = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const firstMarqueeRef = useRef<HTMLDivElement>(null);
  const secondMarqueeRef = useRef<HTMLDivElement>(null);
  
  // Client logos with their names
  const clientLogos = [
    { name: 'Tata', logo: '/lovable-uploads/7265d075-b961-42c2-80dc-b6a5bd7b5627.png' },
    { name: 'Infosys', logo: '/lovable-uploads/c921d2a3-0a60-4add-9c3d-0fb93802531b.png' },
    { name: 'Wipro', logo: '/lovable-uploads/7265d075-b961-42c2-80dc-b6a5bd7b5627.png' },
    { name: 'Reliance', logo: '/broken-image.jpg' }, // Broken image for demonstration
    { name: 'Titan', logo: '/lovable-uploads/7265d075-b961-42c2-80dc-b6a5bd7b5627.png' },
    { name: 'Myntra', logo: '/another-broken-image.png' }, // Another broken image
    { name: 'Flipkart', logo: '/lovable-uploads/7265d075-b961-42c2-80dc-b6a5bd7b5627.png' },
  ];

  useEffect(() => {
    const firstMarquee = firstMarqueeRef.current;
    const secondMarquee = secondMarqueeRef.current;
    
    if (firstMarquee && secondMarquee) {
      // Set up GSAP animations for smooth, modern marquee
      const marqueeAnimation = gsap.to([firstMarquee, secondMarquee], {
        xPercent: -100,
        repeat: -1,
        duration: 25,
        ease: "linear",
        paused: true
      });
      
      // Start the animation
      marqueeAnimation.play();
      
      // Pause on hover for better user experience
      marqueeRef.current?.addEventListener('mouseenter', () => marqueeAnimation.pause());
      marqueeRef.current?.addEventListener('mouseleave', () => marqueeAnimation.play());
      
      // Clean up on component unmount
      return () => {
        marqueeRef.current?.removeEventListener('mouseenter', () => marqueeAnimation.pause());
        marqueeRef.current?.removeEventListener('mouseleave', () => marqueeAnimation.play());
        marqueeAnimation.kill();
      };
    }
  }, []);
  
  return (
    <section className="py-12 md:py-16 bg-print-lightBackground overflow-hidden">
      <div className="container-section py-6 md:py-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center text-print-gold reveal-item">Trusted by Leading Brands</h2>
      </div>
      
      <div 
        ref={marqueeRef} 
        className="marquee-container w-full overflow-hidden relative"
      >
        <div className="flex absolute" style={{ minWidth: '100%' }}>
          <div ref={firstMarqueeRef} className="flex items-center gap-8 md:gap-16 py-4">
            {clientLogos.map((client, index) => (
              <div 
                key={`first-${index}`} 
                className="logo-card group"
              >
                <div className="w-24 h-24 md:w-32 md:h-32 bg-print-background/30 backdrop-blur-sm rounded-lg flex items-center justify-center p-4 transition-all duration-300 hover:bg-print-gold/20 group-hover:scale-105">
                  <img 
                    src={client.logo} 
                    alt={`${client.name} logo`} 
                    className="max-h-16 md:max-h-20 max-w-full object-contain"
                    onError={(e) => {
                      e.currentTarget.src = '/lovable-uploads/c921d2a3-0a60-4add-9c3d-0fb93802531b.png';
                      e.currentTarget.classList.add('error-image');
                    }}
                  />
                </div>
                <span className="block mt-2 text-center text-print-gold group-hover:text-print-orange transition-colors duration-300">{client.name}</span>
              </div>
            ))}
          </div>
          <div ref={secondMarqueeRef} className="flex items-center gap-8 md:gap-16 py-4">
            {clientLogos.map((client, index) => (
              <div 
                key={`second-${index}`} 
                className="logo-card group"
              >
                <div className="w-24 h-24 md:w-32 md:h-32 bg-print-background/30 backdrop-blur-sm rounded-lg flex items-center justify-center p-4 transition-all duration-300 hover:bg-print-gold/20 group-hover:scale-105">
                  <img 
                    src={client.logo} 
                    alt={`${client.name} logo`} 
                    className="max-h-16 md:max-h-20 max-w-full object-contain"
                    onError={(e) => {
                      e.currentTarget.src = '/lovable-uploads/c921d2a3-0a60-4add-9c3d-0fb93802531b.png';
                      e.currentTarget.classList.add('error-image');
                    }}
                  />
                </div>
                <span className="block mt-2 text-center text-print-gold group-hover:text-print-orange transition-colors duration-300">{client.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientLogosMarquee;
