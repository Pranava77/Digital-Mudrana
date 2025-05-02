import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
const ClientLogosMarquee = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const firstMarqueeRef = useRef<HTMLDivElement>(null);
  const secondMarqueeRef = useRef<HTMLDivElement>(null);

  // Client logos with their names - using placeholder images for now
  const clientLogos = [
    {
      name: 'Tata',
      logo: 'https://www.tata.com/content/dam/tata/images/home-page/desktop/logo.png'
    },
    {
      name: 'Infosys',
      logo: 'https://www.infosys.com/content/dam/infosys-web/en/global-resources/media-resources/infosys-logo.svg'
    },
    {
      name: 'Wipro',
      logo: 'https://www.wipro.com/content/dam/nexus/en/brand/images/wipro-logo.svg'
    },
    {
      name: 'Reliance',
      logo: 'https://www.ril.com/getattachment/2c1a1a0c-0a0d-4c0a-8c0a-0a0d0a0d0a0d/Reliance-Industries-Limited-Logo.aspx'
    },
    {
      name: 'Titan',
      logo: 'https://www.titancompany.in/images/logo.png'
    },
    {
      name: 'Myntra',
      logo: 'https://images.indianexpress.com/2021/01/myntra-logo-1200.jpg'
    },
    {
      name: 'Flipkart',
      logo: 'https://static-assets-web.flixcart.com/www/promos/new/20150528-140547-favicon-retina.png'
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
  return <section className="py-12 bg-print-lightBackground overflow-hidden md:py-20">
      <div className="container mx-auto px-4 md:px-6 mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-print-gold reveal-item">Trusted by Leading Brands</h2>
      </div>
      
      <div ref={marqueeRef} className="marquee-container w-full overflow-hidden relative h-[200px] md:h-[200px]">
        <div className="flex absolute" style={{
        minWidth: '100%'
      }}>
          <div ref={firstMarqueeRef} className="flex items-center space-x-16 md:space-x-24 py-4 mx-8">
            {clientLogos.map((client, index) => <div key={`first-${index}`} className="logo-card group shrink-0">
                <div className="w-28 h-28 md:w-36 md:h-36 bg-print-background/30 backdrop-blur-sm rounded-xl flex items-center justify-center p-2 transition-all duration-300 hover:bg-print-gold/20 group-hover:scale-105 border border-print-gold/10">
                  <img src={client.logo} alt={`${client.name} logo`} className="max-h-16 md:max-h-20 max-w-full object-contain filter brightness-90 group-hover:brightness-100 transition-all duration-300" />
                </div>
                <span className="block mt-3 text-center text-sm md:text-base text-print-gold group-hover:text-print-orange transition-colors duration-300">{client.name}</span>
              </div>)}
          </div>
          <div ref={secondMarqueeRef} className="flex items-center space-x-16 md:space-x-24 py-4 mx-8">
            {clientLogos.map((client, index) => <div key={`second-${index}`} className="logo-card group shrink-0">
                <div className="w-28 h-28 md:w-36 md:h-36 bg-print-background/30 backdrop-blur-sm rounded-xl flex items-center justify-center p-6 transition-all duration-300 hover:bg-print-gold/20 group-hover:scale-105 border border-print-gold/10">
                  <img src={client.logo} alt={`${client.name} logo`} className="max-h-16 md:max-h-20 max-w-full object-contain filter brightness-90 group-hover:brightness-100 transition-all duration-300" />
                </div>
                <span className="block mt-3 text-center text-sm md:text-base text-print-gold group-hover:text-print-orange transition-colors duration-300">{client.name}</span>
              </div>)}
          </div>
        </div>
      </div>
    </section>;
};
export default ClientLogosMarquee;