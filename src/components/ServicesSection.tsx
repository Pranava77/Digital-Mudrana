
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileText, Postcard, Image, LayoutGrid, Gallery, Printer, FileHeart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: <Postcard className="h-10 w-10 text-print-accent" />,
    title: "Business Cards",
    description: "Premium business cards printed on high-quality stock with various finishes to make a memorable first impression."
  },
  {
    icon: <FileText className="h-10 w-10 text-print-accent" />,
    title: "Flyers & Brochures",
    description: "Full-color flyers and brochures that effectively communicate your message with stunning clarity."
  },
  {
    icon: <Image className="h-10 w-10 text-print-accent" />,
    title: "Posters",
    description: "Eye-catching posters in various sizes, perfect for promotions, events, or decorative purposes."
  },
  {
    icon: <Gallery className="h-10 w-10 text-print-accent" />,
    title: "Banners & Signs",
    description: "Durable indoor and outdoor banners and signs designed to withstand the elements while looking great."
  },
  {
    icon: <FileHeart className="h-10 w-10 text-print-accent" />,
    title: "Custom Stationery",
    description: "Personalized letterheads, envelopes, and notepads that reflect your brand's professional identity."
  },
  {
    icon: <Printer className="h-10 w-10 text-print-accent" />,
    title: "Custom Printing",
    description: "Specialized printing services tailored to your unique requirements and specifications."
  }
];

const ServicesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const serviceRefs = useRef<(HTMLDivElement | null)[]>([]);
  
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
      
      // Animate each service card with stagger
      gsap.fromTo(
        serviceRefs.current,
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
    <section id="services" ref={sectionRef} className="py-20 bg-gray-50">
      <div className="container-section">
        <div ref={headingRef} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-print-blue mb-4">Our Printing Services</h2>
          <p className="text-lg text-print-blue/70 max-w-2xl mx-auto">
            We offer a comprehensive range of high-quality printing services to meet all your business and personal needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              ref={el => serviceRefs.current[index] = el}
              className="service-card"
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-print-blue mb-2">{service.title}</h3>
              <p className="text-print-blue/70">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
