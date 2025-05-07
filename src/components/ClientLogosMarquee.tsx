
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const ClientLogosMarquee = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const firstMarqueeRef = useRef<HTMLDivElement>(null);
  const secondMarqueeRef = useRef<HTMLDivElement>(null);

  // Client logos with their names - using the uploaded images
  const clientLogos = [
    {
      name: 'Engineers Council',
      logo: '/lovable-uploads/d0e71cd0-7ff2-46b5-a164-66ca96481a4b.png'
    },
    {
      name: 'Exergy Heating',
      logo: '/lovable-uploads/c98efd69-2b9d-452a-8e29-538be6517081.png'
    },
    {
      name: 'Gaiagen',
      logo: '/lovable-uploads/778d0d17-9a2f-4268-a923-e3a963818766.png'
    },
    {
      name: 'Geological Society',
      logo: '/lovable-uploads/52b4b566-f0b3-40bf-9b46-1ed498c84a27.png'
    },
    {
      name: 'Statistical Institute',
      logo: '/lovable-uploads/6b578cd2-499d-4f30-854d-148c1bd4d5a2.png'
    },
    {
      name: 'Karnataka Jain Association',
      logo: '/lovable-uploads/772a39c7-7ba1-47e1-b687-59381bfb5c28.png'
    },
    {
      name: 'Koku Kitchen',
      logo: '/lovable-uploads/5a0d2cf9-4cd3-4adf-8343-385075710666.png'
    },
    {
      name: 'LendLease',
      logo: '/lovable-uploads/4b1bb9d5-2492-4b37-a2b4-9e2d7fc9dfd6.png'
    },
    {
      name: 'Murr Elektronik',
      logo: '/lovable-uploads/a2bebb87-2f0a-44c9-911f-7922404efde0.png'
    },
    {
      name: 'QuickBill',
      logo: '/lovable-uploads/e6b27757-7b93-4792-aaa3-95fe5dc66a22.png'
    },
    {
      name: 'Techno Dental Lab',
      logo: '/lovable-uploads/aefef5d2-3096-4ccd-a149-dfb15406f23f.png'
    },
    {
      name: 'Techno Dental Arts',
      logo: '/lovable-uploads/0a8eca8e-f97c-461d-b5f7-8c94a28bf017.png'
    },
    {
      name: 'Vayu Engineering',
      logo: '/lovable-uploads/d26fc40f-6eb8-4eae-9e63-2fdb205a15d0.png'
    }
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
      const pauseAnimation = () => marqueeAnimation.pause();
      const resumeAnimation = () => marqueeAnimation.play();

      marqueeRef.current?.addEventListener('mouseenter', pauseAnimation);
      marqueeRef.current?.addEventListener('mouseleave', resumeAnimation);

      // Clean up on component unmount
      return () => {
        marqueeRef.current?.removeEventListener('mouseenter', pauseAnimation);
        marqueeRef.current?.removeEventListener('mouseleave', resumeAnimation);
        marqueeAnimation.kill();
      };
    }
  }, []);

  return (
    <section className="py-12 bg-print-lightBackground overflow-hidden md:py-20">
      <div className="container mx-auto px-4 md:px-6 mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-print-gold reveal-item">Trusted by Leading Brands</h2>
      </div>
      
      <div ref={marqueeRef} className="marquee-container w-full overflow-hidden relative h-[200px] md:h-[200px]">
        <div className="flex absolute" style={{minWidth: '100%'}}>
          <div ref={firstMarqueeRef} className="flex items-center space-x-16 md:space-x-24 py-4 mx-8">
            {clientLogos.map((client, index) => (
              <div key={`first-${index}`} className="logo-card group shrink-0">
                <img 
                  src={client.logo} 
                  alt={`${client.name} logo`} 
                  className="max-h-20 md:max-h-24 max-w-full object-contain filter brightness-90 group-hover:brightness-100 transition-all duration-300" 
                />
                <span className="block mt-3 text-center text-sm md:text-base text-print-gold group-hover:text-print-orange transition-colors duration-300">
                  {client.name}
                </span>
              </div>
            ))}
          </div>
          <div ref={secondMarqueeRef} className="flex items-center space-x-16 md:space-x-24 py-4 mx-8">
            {clientLogos.map((client, index) => (
              <div key={`second-${index}`} className="logo-card group shrink-0">
                <img 
                  src={client.logo} 
                  alt={`${client.name} logo`} 
                  className="max-h-20 md:max-h-24 max-w-full object-contain filter brightness-90 group-hover:brightness-100 transition-all duration-300" 
                />
                <span className="block mt-3 text-center text-sm md:text-base text-print-gold group-hover:text-print-orange transition-colors duration-300">
                  {client.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientLogosMarquee;
