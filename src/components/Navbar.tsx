import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }

      // Determine active section for nav highlighting
      const sections = ['hero', 'services', 'portfolio', 'testimonials', 'contact'];
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
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };
  return <header className={cn("fixed top-0 w-full z-50 transition-all duration-300", scrolled ? "bg-print-background shadow-md py-3" : "bg-transparent py-5")}>
      <div className="container-section py-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img alt="Digital Mudrana Logo" src="/lovable-uploads/7265d075-b961-42c2-80dc-b6a5bd7b5627.png" className="h-12 object-cover" />
            <span className="text-print-gold font-bold text-2xl">Digital <span className="text-print-orange">Mudrana</span></span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-1">
            {['hero', 'services', 'portfolio', 'testimonials', 'contact'].map(section => <button key={section} onClick={() => scrollToSection(section)} className={cn("px-4 py-2 rounded-md text-sm font-medium transition-colors", activeSection === section ? "text-print-gold" : "text-print-text hover:text-print-orange")}>
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>)}
            <Button className="ml-4 bg-print-gold hover:bg-print-gold/90 text-print-purple" onClick={() => scrollToSection('contact')}>
              Get a Quote
            </Button>
          </nav>
          
          <div className="md:hidden">
            <Button variant="ghost" size="sm" className="text-print-gold" onClick={() => scrollToSection('contact')}>
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </header>;
};
export default Navbar;