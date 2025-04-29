
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import PortfolioSection from '@/components/PortfolioSection';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import ClientLogosMarquee from '@/components/ClientLogosMarquee';
import FAQAccordion from '@/components/FAQAccordion';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  useEffect(() => {
    // Initialize smooth scrolling
    const sections = document.querySelectorAll('section[id]');
    
    // Initialize GSAP animations
    gsap.utils.toArray('.reveal-item').forEach((element: any) => {
      gsap.fromTo(
        element,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    // Cleanup on component unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <PortfolioSection />
      <ClientLogosMarquee />
      <TestimonialCarousel />
      <div id="faq">
        <FAQAccordion />
      </div>
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
