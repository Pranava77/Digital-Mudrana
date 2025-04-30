
import React, { useState, useEffect } from 'react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselPrevious, 
  CarouselNext 
} from '@/components/ui/carousel';
import useEmblaCarousel from 'embla-carousel-react';

const TestimonialCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [currentSlide, setCurrentSlide] = useState(0);

  // Track the current slide
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setCurrentSlide(emblaApi.selectedScrollSnap());
    };

    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  // Testimonial data
  const testimonials = [
    {
      quote: "Digital Mudrana transformed our business with their exceptional prints. The quality and attention to detail is remarkable.",
      author: "Anil Kumar",
      position: "CEO, Tech Solutions Bangalore"
    },
    {
      quote: "We've been working with Digital Mudrana for over 2 years and they never disappoint. Their turnaround time and print quality are unmatched.",
      author: "Priya Sharma",
      position: "Marketing Director, Creative Minds"
    },
    {
      quote: "The team at Digital Mudrana understands our brand and delivers exactly what we need. Their customer service is as excellent as their printing.",
      author: "Rajesh Verma",
      position: "Brand Manager, Retail Giants"
    }
  ];

  return (
    <section id="testimonials" className="py-16 bg-print-background">
      <div className="container-section">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-print-gold reveal-item">What Our Clients Say</h2>
        
        <Carousel
          opts={{ loop: true }}
          className="w-full max-w-4xl mx-auto"
          setApi={undefined}
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index}>
                <div className={`testimonial-card p-8 mb-6 ${currentSlide === index ? 'scale-100 opacity-100' : 'scale-95 opacity-80'} transition-all duration-500`}>
                  <p className="text-lg mb-4 text-print-text italic">{testimonial.quote}</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-print-gold rounded-full flex items-center justify-center text-print-purple font-bold text-xl">
                      {testimonial.author.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <h4 className="font-bold text-print-gold">{testimonial.author}</h4>
                      <p className="text-print-text text-sm">{testimonial.position}</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 bg-print-gold text-print-purple hover:bg-print-gold/90" />
          <CarouselNext className="right-0 bg-print-gold text-print-purple hover:bg-print-gold/90" />
        </Carousel>
        
        <div className="flex justify-center mt-6 gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentSlide === index ? 'bg-print-gold w-6' : 'bg-print-gold/30'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
