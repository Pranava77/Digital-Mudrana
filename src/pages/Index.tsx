
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
import { Toaster } from '@/components/ui/toaster';
import ImageCarousel from '@/components/ImageCarousel';
import GlobalSparkEffect from '@/components/GlobalSparkEffect';

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
    
    // Apply magnetic effect to appropriate cards
    const applyMagneticEffect = () => {
      const cards = document.querySelectorAll('.magnetic-card');
      cards.forEach(card => {
        card.classList.add('transition-active');
      });
    };
    
    // Delay to ensure DOM is fully loaded
    setTimeout(applyMagneticEffect, 500);

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
      <ImageCarousel />
      <ClientLogosMarquee />
      <TestimonialCarousel />
      <div id="faq">
        <FAQAccordion />
      </div>
      <ContactSection />
      <Footer />
      <Toaster />
      <GlobalSparkEffect />
    </div>
  );
};

export default Index;
