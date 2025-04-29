
import { ArrowRight } from 'lucide-react';
const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  return <footer className="bg-print-darkPurple text-print-text py-12">
      <div className="container-section">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img alt="Digital Mudrana Logo" src="/lovable-uploads/c921d2a3-0a60-4add-9c3d-0fb93802531b.png" className="h-20" />
              <span className="text-print-gold font-bold text-2xl">Digital <span className="text-print-orange">Mudrana</span></span>
            </div>
            <p className="text-print-text/70 mb-6 max-w-md">
              Premium printing services for all your business and personal needs in Bangalore and across Karnataka. Quality results delivered with precision and care.
            </p>
            <button onClick={() => document.getElementById('contact')?.scrollIntoView({
            behavior: 'smooth'
          })} className="inline-flex items-center text-print-gold hover:text-print-orange transition-colors">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-print-gold">Quick Links</h3>
            <ul className="space-y-2">
              {['services', 'portfolio', 'testimonials', 'contact'].map(section => <li key={section}>
                  <button onClick={() => document.getElementById(section)?.scrollIntoView({
                behavior: 'smooth'
              })} className="text-print-text/70 hover:text-print-orange transition-colors">
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </button>
                </li>)}
              <li>
                <button onClick={() => document.getElementById('faq')?.scrollIntoView({
                  behavior: 'smooth'
                })} className="text-print-text/70 hover:text-print-orange transition-colors">
                  FAQs
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-print-gold">Services</h3>
            <ul className="space-y-2">
              {['Business Cards', 'Flyers & Brochures', 'Posters', 'Banners & Signs', 'Custom Printing'].map(service => <li key={service}>
                  <button onClick={() => document.getElementById('services')?.scrollIntoView({
                behavior: 'smooth'
              })} className="text-print-text/70 hover:text-print-orange transition-colors">
                    {service}
                  </button>
                </li>)}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-print-purple/20 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-print-text/60 text-sm">
            &copy; {new Date().getFullYear()} Digital Mudrana. All rights reserved. | Bangalore, Karnataka
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <button onClick={scrollToTop} className="text-print-text/60 hover:text-print-gold transition-colors text-sm">
              Back to Top
            </button>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;
