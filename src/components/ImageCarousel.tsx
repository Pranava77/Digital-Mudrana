
import React, { useState } from 'react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselPrevious, 
  CarouselNext 
} from '@/components/ui/carousel';
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogClose
} from "@/components/ui/dialog";
import { X } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';

const ImageCarousel = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true });
  const [openImageIndex, setOpenImageIndex] = useState<number | null>(null);
  
  const printingCenterImages = [
    {
      src: 'public/offset.jpeg',
      alt: 'Digital printing press in operation',
      title: 'High-Volume Production'
    },
    {
      src: '/public/konica.jpg',
      alt: 'Design station with large format printer',
      title: 'Design & Large Format'
    },
    {
      src: '/public/cutter.jpeg',
      alt: 'Finishing and binding equipment',
      title: 'Finishing Department'
    },
    // {
    //   src: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7',
    //   alt: 'Staff consulting with customers',
    //   title: 'Customer Consultation'
    // },
    {
      src: '/public/paper.jpg',
      alt: 'Material sample display',
      title: 'Material Showcase'
    }
  ];

  const handleOpenImage = (index: number) => {
    setOpenImageIndex(index);
  };

  const handleCloseImage = () => {
    setOpenImageIndex(null);
  };

  return (
    <section id="printing-center" className="py-16 bg-print-background">
      <div className="container-section">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-print-gold reveal-item">
          Our Printing Center
        </h2>
        <p className="text-lg text-center text-print-text mb-12 max-w-3xl mx-auto reveal-item">
          Take a virtual tour of our state-of-the-art printing facility in Bangalore. We combine cutting-edge technology with traditional craftsmanship to deliver exceptional print products.
        </p>

        <Carousel
          ref={emblaRef}
          className="w-full"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {printingCenterImages.map((image, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="overflow-hidden  border-print-gold/20">
                    <CardContent className="p-0">
                      <div 
                        className="group relative cursor-pointer h-64 overflow-hidden"
                        onClick={() => handleOpenImage(index)}
                      >
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          onError={(e) => {
                            e.currentTarget.src = '/lovable-uploads/7265d075-b961-42c2-80dc-b6a5bd7b5627.png';
                            e.currentTarget.classList.add('error-image');
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-print-purple/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                          <div className="p-4 text-white">
                            <h3 className="font-bold text-lg">{image.title}</h3>
                            <p className="text-sm opacity-80">{image.alt}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2 md:left-4 bg-print-gold text-print-purple hover:bg-print-gold/90" />
          <CarouselNext className="right-2 md:right-4 bg-print-gold text-print-purple hover:bg-print-gold/90" />
        </Carousel>
      </div>

      {/* Image Modal */}
      <Dialog open={openImageIndex !== null} onOpenChange={handleCloseImage}>
        <DialogContent className="max-w-4xl p-0 bg-print-background border-print-gold/20 overflow-hidden">
          {openImageIndex !== null && (
            <div className="relative">
              <img
                src={printingCenterImages[openImageIndex].src}
                alt={printingCenterImages[openImageIndex].alt}
                className="w-full object-contain max-h-[80vh]"
                onError={(e) => {
                  e.currentTarget.src = '/lovable-uploads/7265d075-b961-42c2-80dc-b6a5bd7b5627.png';
                  e.currentTarget.classList.add('error-image');
                }}
              />
              <DialogClose className="absolute top-4 right-4 bg-print-gold/20 hover:bg-print-gold/40 text-print-text rounded-full p-2">
                <X className="h-6 w-6" />
              </DialogClose>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ImageCarousel;
