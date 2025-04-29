
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ClientLogosMarquee = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const marqueeInnerRef = useRef<HTMLDivElement>(null);
  
  // Client logos with their names
  const clientLogos = [
    { name: 'Tata', logo: '/lovable-uploads/7265d075-b961-42c2-80dc-b6a5bd7b5627.png' },
    { name: 'Infosys', logo: '/lovable-uploads/c921d2a3-0a60-4add-9c3d-0fb93802531b.png' },
    { name: 'Wipro', logo: '/lovable-uploads/7265d075-b961-42c2-80dc-b6a5bd7b5627.png' },
    { name: 'Reliance', logo: '/lovable-uploads/c921d2a3-0a60-4add-9c3d-0fb93802531b.png' },
    { name: 'Titan', logo: '/lovable-uploads/7265d075-b961-42c2-80dc-b6a5bd7b5627.png' },
    { name: 'Myntra', logo: '/lovable-uploads/c921d2a3-0a60-4add-9c3d-0fb93802531b.png' },
    { name: 'Flipkart', logo: '/lovable-uploads/7265d075-b961-42c2-80dc-b6a5bd7b5627.png' },
  ];

  useEffect(() => {
    if (marqueeInnerRef.current) {
      const marqueeInnerEl = marqueeInnerRef.current;
      
      // Clone the marquee inner for infinite scroll effect
      const clone = marqueeInnerEl.cloneNode(true);
      if (marqueeRef.current) {
        marqueeRef.current.appendChild(clone);
      }
      
      // Animate the marquee
      gsap.to([marqueeInnerEl, clone], {
        xPercent: -100,
        repeat: -1,
        duration: 20,
        ease: "linear",
        startAt: { xPercent: 0 }
      });
    }
  }, []);
  
  return (
    <section className="py-16 bg-print-lightBackground overflow-hidden">
      <div className="container-section py-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-print-gold">Trusted by Leading Brands</h2>
      </div>
      
      <div ref={marqueeRef} className="flex overflow-hidden">
        <div ref={marqueeInnerRef} className="flex items-center gap-16 min-w-full">
          {clientLogos.map((client, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-32 h-32 bg-print-background/30 rounded-lg flex items-center justify-center p-4">
                <img 
                  src={client.logo} 
                  alt={`${client.name} logo`} 
                  className="max-h-20 max-w-full object-contain"
                />
              </div>
              <span className="mt-3 text-print-gold">{client.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogosMarquee;
