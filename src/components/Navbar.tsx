import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import SparkButton from './SparkButton';
import gsap from 'gsap';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const digitalRef = useRef<HTMLSpanElement>(null);
  const mudranaRef = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }

      // Determine active section for nav highlighting
      const sections = ['hero', 'services', 'portfolio', 'testimonials', 'faq', 'contact'];
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);
  
  useEffect(() => {
    // Typing animation for the logo text
    const digitalText = "Digital";
    const mudranaText = "Mudrana";
    
    if (digitalRef.current && mudranaRef.current) {
      digitalRef.current.textContent = "";
      mudranaRef.current.textContent = "";
      
      const tl = gsap.timeline();
      
      // Animate "Digital"
      tl.to(digitalRef.current, {
        duration: 1.2,
        onUpdate: function() {
          const progress = Math.floor(this.progress() * digitalText.length);
          digitalRef.current!.textContent = digitalText.slice(0, progress);
        }
      });
      
      // Animate "Mudrana"
      tl.to(mudranaRef.current, {
        duration: 1.7,
        onUpdate: function() {
          const progress = Math.floor(this.progress() * mudranaText.length);
          mudranaRef.current!.textContent = mudranaText.slice(0, progress);
        }
      }, "-=1");
    }
  }, []);
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };
  
  return (
    <header className={cn("fixed top-0 w-full z-50 transition-all duration-300", scrolled ? "bg-print-background shadow-md py-3" : "bg-transparent py-5")}>
      <div className="container-section py-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img alt="Digital Mudrana Logo" src="/digital_print.png" className="h-20 object-cover" />
            <span className="text-print-gold font-bold text-2xl">
              <span ref={digitalRef}>Digital</span>{" "}
              <span ref={mudranaRef} className="text-print-orange">Mudrana</span>
            </span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-1">
            {['hero', 'services', 'portfolio', 'testimonials', 'faq', 'contact'].map(section => (
              <button 
                key={section} 
                onClick={() => scrollToSection(section)} 
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-colors", 
                  activeSection === section ? "text-print-gold" : "text-print-text hover:text-print-orange"
                )}
              >
                {section === "hero" ? "Home" : section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
            <SparkButton 
              className="ml-4 bg-print-gold hover:bg-print-gold/90 text-print-purple" 
              onClick={() => scrollToSection('contact')}
            >
              Get a Quote
            </SparkButton>
          </nav>
          
          <div className="md:hidden">
            <SparkButton 
              variant="ghost" 
              className="text-print-gold" 
              onClick={() => scrollToSection('contact')}
            >
              Contact Us
            </SparkButton>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
