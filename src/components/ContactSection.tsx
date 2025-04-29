
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import SparkButton from './SparkButton';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const { toast } = useToast();
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    if (sectionRef.current && headingRef.current && formRef.current && infoRef.current) {
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
      
      // Animate form and info sections
      gsap.fromTo(
        formRef.current,
        { x: -50, opacity: 0 },
        { 
          x: 0, 
          opacity: 1, 
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none"
          }
        }
      );
      
      gsap.fromTo(
        infoRef.current,
        { x: 50, opacity: 0 },
        { 
          x: 0, 
          opacity: 1, 
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none"
          }
        }
      );
    }
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Quote request received!",
        description: "We'll get back to you within 24 hours.",
        variant: "default"
      });
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
      
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section id="contact" ref={sectionRef} className="relative py-24 bg-gradient-to-b from-print-darkPurple to-print-purple text-print-text overflow-hidden">
      {/* Decorative elements for luxury feel */}
      <div className="absolute top-0 left-0 w-full h-2 bg-print-gold"></div>
      <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-print-gold/5 blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-60 h-60 rounded-full bg-print-orange/5 blur-3xl"></div>

      <div className="container-section relative z-10">
        <div ref={headingRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-print-gold">Elevate Your Brand</h2>
          <p className="text-xl text-print-text/90 max-w-2xl mx-auto">
            Experience premium print solutions tailored to your unique vision.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 bg-print-lightBackground/20 backdrop-blur-sm p-8 rounded-lg shadow-xl border border-print-gold/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-print-text/90">Your Name</label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="bg-print-lightBackground/30 border-print-gold/30 text-print-text placeholder:text-print-text/50 focus:border-print-gold focus:ring-print-gold/30"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-print-text/90">Email Address</label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                  className="bg-print-lightBackground/30 border-print-gold/30 text-print-text placeholder:text-print-text/50 focus:border-print-gold focus:ring-print-gold/30"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium text-print-text/90">Phone Number</label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(+91) 98765-43210"
                className="bg-print-lightBackground/30 border-print-gold/30 text-print-text placeholder:text-print-text/50 focus:border-print-gold focus:ring-print-gold/30"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-print-text/90">Project Details</label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your project..."
                required
                className="min-h-32 bg-print-lightBackground/30 border-print-gold/30 text-print-text placeholder:text-print-text/50 focus:border-print-gold focus:ring-print-gold/30"
              />
            </div>
            <SparkButton 
              className="w-full bg-print-gold hover:bg-print-gold/90 text-print-purple font-medium text-lg py-6"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Request a Premium Quote"}
            </SparkButton>
          </form>
          
          <div ref={infoRef} className="flex flex-col justify-between">
            <div className="mb-8 bg-print-darkPurple/60 p-8 rounded-lg backdrop-blur-sm border border-print-gold/10 shadow-xl">
              <h3 className="text-3xl font-semibold mb-4 text-print-gold">Exclusive Service</h3>
              <p className="mb-8 text-print-text/90 text-lg">
                Our experts are ready to assist with your premium printing requirements. Reach out for personalized service and consultation.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-print-gold/20 flex items-center justify-center mr-4">
                    <Phone className="h-5 w-5 text-print-gold" />
                  </div>
                  <div>
                    <h4 className="font-medium text-print-gold text-lg">Phone</h4>
                    <p className="text-print-text/90">+91 80-4123-5678</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-print-gold/20 flex items-center justify-center mr-4">
                    <Mail className="h-5 w-5 text-print-gold" />
                  </div>
                  <div>
                    <h4 className="font-medium text-print-gold text-lg">Email</h4>
                    <p className="text-print-text/90">info@digitalmudrana.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-print-gold/20 flex items-center justify-center mr-4">
                    <MapPin className="h-5 w-5 text-print-gold" />
                  </div>
                  <div>
                    <h4 className="font-medium text-print-gold text-lg">Address</h4>
                    <p className="text-print-text/90">123 Creative Avenue, Indiranagar<br />Bangalore, Karnataka 560038</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-print-gold/10 p-6 rounded-lg backdrop-blur-sm border border-print-gold/30 shadow-lg">
              <h3 className="text-xl font-semibold mb-3 text-print-gold">Studio Hours</h3>
              <div className="space-y-3 text-print-text/90">
                <div className="flex justify-between border-b border-print-gold/20 pb-2">
                  <span>Monday - Friday</span>
                  <span className="font-medium">10:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between border-b border-print-gold/20 pb-2">
                  <span>Saturday</span>
                  <span className="font-medium">11:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="font-medium">By Appointment Only</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
