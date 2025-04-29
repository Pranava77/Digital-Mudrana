
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const heroElement = heroRef.current;
    const headingElement = headingRef.current;
    const taglineElement = taglineRef.current;
    const ctaElement = ctaRef.current;
    
    if (heroElement && headingElement && taglineElement && ctaElement) {
      const tl = gsap.timeline();
      
      tl.fromTo(heroElement, 
        { opacity: 0 }, 
        { opacity: 1, duration: 0.8, ease: "power2.inOut" }
      )
      .fromTo(headingElement, 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.4"
      )
      .fromTo(taglineElement, 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.6"
      )
      .fromTo(ctaElement, 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.6"
      );
    }
  }, []);

  const scrollToServices = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      window.scrollTo({
        top: servicesSection.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="min-h-screen flex items-center relative overflow-hidden bg-gradient-to-br from-print-blue/5 to-print-blue/10"
    >
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1574002332972-fd2e0f7f1ea9?auto=format&fit=crop&q=80&w=2069')] bg-cover bg-center opacity-10"></div>
      
      <div className="container-section relative z-10">
        <div className="max-w-3xl">
          <h1 
            ref={headingRef}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-print-blue mb-4"
          >
            High-Quality Digital Printing for Every Need
          </h1>
          <p 
            ref={taglineRef}
            className="text-xl md:text-2xl text-print-blue/80 mb-8 leading-relaxed"
          >
            Bringing your ideas to life with stunning prints that make a lasting impression.
          </p>
          <div ref={ctaRef} className="flex flex-wrap gap-4">
            <button 
              onClick={scrollToServices}
              className="button-primary"
            >
              Get a Quote <ArrowRight className="h-5 w-5" />
            </button>
            <button 
              onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              className="button-secondary"
            >
              View Our Work
            </button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div 
          className="w-8 h-8 border-2 border-print-blue/40 rounded-full flex items-center justify-center cursor-pointer"
          onClick={scrollToServices}
        >
          <ArrowRight className="h-4 w-4 text-print-blue/70 rotate-90" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
