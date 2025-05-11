import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const portfolioItems = [
  {
    id: 1,
    title: "Corporate Branding Package",
    category: "Branding",
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Complete corporate identity package including business cards, letterheads, and branded materials."
  },
  {
    id: 2,
    title: "Event Promotion Materials",
    category: "Marketing",
    imageUrl: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Set of promotional materials designed for a major music festival, including posters, flyers, and tickets."
  },
  {
    id: 3,
    title: "Product Catalog Design",
    category: "Print",
    imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Premium catalog featuring high-quality product photography and detailed specifications."
  },
  {
    id: 4,
    title: "Restaurant Menu Collection",
    category: "Design",
    imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Set of elegantly designed menus for a fine dining restaurant, including food and wine listings."
  },
  {
    id: 5,
    title: "Conference Badge System",
    category: "Events",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Custom designed badge system for an international technology conference."
  },
  {
    id: 6,
    title: "Real Estate Marketing Package",
    category: "Marketing",
    imageUrl: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Complete marketing package for luxury real estate properties, including brochures and property cards."
  }
];

const PortfolioSection = () => {
  const [selectedItem, setSelectedItem] = useState<typeof portfolioItems[0] | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  useEffect(() => {
    if (sectionRef.current && headingRef.current) {
      // Animate the heading
      gsap.fromTo(
        headingRef.current,
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
      
      // Animate each portfolio item with stagger
      gsap.fromTo(
        itemRefs.current,
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none"
          }
        }
      );
    }
  }, []);

  return (
    <section id="portfolio" ref={sectionRef} className="py-20 bg-print-background">
      <div className="container-section">
        <div ref={headingRef} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-print-gold mb-4">Our Portfolio</h2>
          <p className="text-lg text-print-text/70 max-w-2xl mx-auto">
            Take a look at some of our recent Prints showcasing the quality and versatility of our printing services.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item, index) => (
            <div 
              key={item.id}
              ref={el => itemRefs.current[index] = el}
              className="portfolio-item group"
              onClick={() => setSelectedItem(item)}
            >
              <div className="aspect-[4/3] overflow-hidden rounded-lg">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-print-purple/0 group-hover:bg-print-purple/70 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="p-4 text-print-text text-center transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  <h3 className="text-xl font-bold text-print-gold">{item.title}</h3>
                  <p className="text-sm text-print-peach">{item.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
        <DialogContent className="max-w-4xl w-[90%] p-0 overflow-hidden bg-print-lightBackground">
          {selectedItem && (
            <div className="flex flex-col md:flex-row">
              <div className="md:w-2/3">
                <img 
                  src={selectedItem.imageUrl} 
                  alt={selectedItem.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 md:w-1/3 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-print-gold mb-2">{selectedItem.title}</h3>
                  <p className="text-sm text-print-orange mb-4">{selectedItem.category}</p>
                  <p className="text-print-text/90">{selectedItem.description}</p>
                </div>
                <button 
                  className="button-primary mt-4 justify-center"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Request Similar Prints
                </button>
              </div>
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 text-print-text/50 hover:text-print-gold"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default PortfolioSection;
