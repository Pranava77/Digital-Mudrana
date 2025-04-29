
import { ArrowRight } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-print-blue/90 text-white py-12">
      <div className="container-section">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-white font-bold text-2xl">Vivid<span className="text-print-orange">Print</span></span>
            </div>
            <p className="text-white/70 mb-6 max-w-md">
              Professional printing services for all your business and personal needs. Quality results delivered on time, every time.
            </p>
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center text-white hover:text-print-orange transition-colors"
            >
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['services', 'portfolio', 'testimonials', 'contact'].map((section) => (
                <li key={section}>
                  <button
                    onClick={() => document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {['Business Cards', 'Flyers & Brochures', 'Posters', 'Banners & Signs', 'Custom Printing'].map((service) => (
                <li key={service}>
                  <button
                    onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm">
            &copy; {new Date().getFullYear()} VividPrint. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <button onClick={scrollToTop} className="text-white/60 hover:text-white transition-colors text-sm">
              Back to Top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
