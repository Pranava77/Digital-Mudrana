
import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import type { CarouselApi } from "embla-carousel-react";

interface Testimonial {
  name: string;
  company: string;
  content: string;
  position: string;
  image?: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Arjun Sharma",
    company: "Infosys",
    position: "Marketing Director",
    content: "Digital Mudrana has been our go-to printing partner for the past 3 years. Their attention to detail and quality have helped us create impactful marketing materials that truly represent our brand."
  },
  {
    name: "Priya Patel",
    company: "Bengaluru Retail Association",
    position: "Executive Director",
    content: "The team at Digital Mudrana consistently delivers exceptional work. Their turnaround time is impressive, and the print quality exceeds expectations every time. Highly recommended!"
  },
  {
    name: "Rahul Gupta",
    company: "Tech Innovations Pvt Ltd",
    position: "CEO",
    content: "Working with Digital Mudrana has transformed our brand presence. Their premium print materials have significantly improved how we present ourselves to clients and partners."
  },
  {
    name: "Deepa Menon",
    company: "Bangalore Cultural Festival",
    position: "Event Coordinator",
    content: "Our festival banners and promotional materials looked absolutely stunning. The vibrant colors and durability of the prints helped make our event a huge success."
  }
];

const TestimonialCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [api, setApi] = useState<CarouselApi | null>(null);

  React.useEffect(() => {
    if (!api) return;
    
    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };
    
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <div className="bg-print-purple py-20" id="testimonials">
      <div className="container-section">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-print-gold">What Our Clients Say</h2>
          <p className="text-lg text-print-text/80 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied clients across Bangalore.
          </p>
        </div>
        
        <div className="relative max-w-5xl mx-auto px-8">
          <Carousel 
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full"
            setApi={setApi}
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-2/3">
                  <div className={cn(
                    "bg-print-lightBackground p-8 rounded-lg shadow-lg flex flex-col h-full transition-all duration-300",
                    current === index ? "scale-105 border-2 border-print-gold" : "opacity-70"
                  )}>
                    <blockquote className="text-lg text-print-text/90 mb-6 flex-grow">
                      "{testimonial.content}"
                    </blockquote>
                    
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-print-gold/30 flex items-center justify-center text-print-gold font-bold text-xl">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <h4 className="font-medium text-print-gold">{testimonial.name}</h4>
                        <p className="text-sm text-print-text/70">{testimonial.position}, {testimonial.company}</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex left-0 bg-print-gold/80 text-print-purple hover:bg-print-gold" />
            <CarouselNext className="hidden md:flex right-0 bg-print-gold/80 text-print-purple hover:bg-print-gold" />
          </Carousel>
          
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={cn(
                  "w-3 h-3 rounded-full transition-all",
                  current === index ? "bg-print-gold" : "bg-print-gold/30"
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
