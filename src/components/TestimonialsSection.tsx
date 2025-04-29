
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    quote: "VividPrint delivered outstanding quality for our annual reports. The colors were vibrant, the paper was premium, and they met our tight deadline without a hitch.",
    name: "Sarah Johnson",
    title: "Marketing Director, TechSolve Inc.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=2487"
  },
  {
    id: 2,
    quote: "The business cards they created for our team have received countless compliments. The attention to detail and print quality is unmatched in the industry.",
    name: "Michael Chen",
    title: "CEO, Horizon Ventures",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=2487"
  },
  {
    id: 3,
    quote: "From concept to completion, VividPrint handled our event materials with professionalism and precision. We'll definitely be using their services for all future events.",
    name: "Emily Rodriguez",
    title: "Event Coordinator, Stellar Productions",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=2487"
  },
  {
    id: 4,
    quote: "The banners and promotional materials arrived ahead of schedule and exceeded our expectations in terms of quality. Their customer service was also exceptional.",
    name: "David Thompson",
    title: "Operations Manager, Global Retail",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=2487"
  }
];

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (sectionRef.current && headingRef.current && testimonialsRef.current) {
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
      
      // Animate testimonials container
      const testimonialItems = testimonialsRef.current.children;
      gsap.fromTo(
        testimonialItems,
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: testimonialsRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    }
  }, []);

  return (
    <section id="testimonials" ref={sectionRef} className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container-section">
        <div ref={headingRef} className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <Users className="h-10 w-10 text-print-accent" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-print-blue mb-4">What Our Clients Say</h2>
          <p className="text-lg text-print-blue/70 max-w-2xl mx-auto">
            We take pride in delivering exceptional quality and service. Here's what some of our satisfied clients have to say.
          </p>
        </div>
        
        <div ref={testimonialsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <p className="mb-6 text-print-blue/80 italic">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-print-blue">{testimonial.name}</h4>
                  <p className="text-sm text-print-blue/70">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
