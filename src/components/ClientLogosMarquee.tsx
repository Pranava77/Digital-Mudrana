
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
      name: 'BMS College of Engineering',
      logo: '/client_logos/bms_college.png'
    },
    {
      name: 'Exergy Heating',
      logo: '/client_logos/exergy_heating.png'
    },
    {
      name: 'Gaiagen',
      logo: '/client_logos/gaiagen.png'
    },
    {
      name: 'Geological Society',
      logo: '/client_logos/geological_society.png'
    },
    {
      name: 'Statistical Institute',
      logo: '/client_logos/statistical_institute.png'
    },
    {
      name: 'Karnataka Jain Association',
      logo: '/client_logos/karnataka_jain_association.png'
    },
    {
      name: 'Koku Kitchen',
      logo: '/client_logos/koku_kitchen.png'
    },
    {
      name: 'LendLease',
      logo: '/client_logos/lendlease.png'
    },
    {
      name: 'Murr Elektronik',
      logo: '/client_logos/murr_elektronik.png'
    },
    {
      name: 'QuickBill',
      logo: '/client_logos/quickbill.png'
    },
    {
      name: 'Techno Dental Lab',
      logo: '/client_logos/techno_dental_lab.png'
    },
    {
      name: 'Techno Dental Arts',
      logo: '/client_logos/techno_dental_arts.png'
    },
    {
      name: 'Vayu Engineering',
      logo: '/client_logos/vayu_engineering.png'
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
          <div ref={firstMarqueeRef} className="flex items-center py-4 mx-8">
            {clientLogos.map((client, index) => (
              <div key={`first-${index}`} className="logo-card group mx-8 md:mx-12 flex flex-col items-center justify-center w-[120px] md:w-[150px] flex-shrink-0">
                <div className="h-[80px] md:h-[100px] w-full flex items-center justify-center">
                  <img 
                    src={client.logo} 
                    alt={`${client.name} logo`} 
                    className="max-h-[70px] md:max-h-[90px] max-w-[100px] md:max-w-[130px] object-contain filter brightness-90 group-hover:brightness-100 transition-all duration-300" 
                  />
                </div>
                <span className="block mt-3 text-center text-sm md:text-base text-print-gold group-hover:text-print-orange transition-colors duration-300 w-full">
                  {client.name}
                </span>
              </div>
            ))}
          </div>
          <div ref={secondMarqueeRef} className="flex items-center py-4 mx-8">
            {clientLogos.map((client, index) => (
              <div key={`second-${index}`} className="logo-card group mx-8 md:mx-12 flex flex-col items-center justify-center w-[120px] md:w-[150px] flex-shrink-0">
              
              
                <div className="h-[80px] md:h-[100px] w-full flex items-center justify-center">
                  <img 
                    src={client.logo} 
                    alt={`logo`} 
                    className="max-h-[70px] md:max-h-[90px] max-w-[100px] md:max-w-[130px] object-contain filter brightness-90 group-hover:brightness-100 transition-all duration-300" 
                  />
                </div>
                <span className="block mt-3 text-center text-sm md:text-base text-print-gold group-hover:text-print-orange transition-colors duration-300 w-full">
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
