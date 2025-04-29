
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQAccordion = () => {
  const faqs = [
    {
      question: "What services does Digital Mudrana offer?",
      answer: "We offer a comprehensive range of printing services including business cards, flyers, brochures, banners, posters, custom merchandise, wedding invitations, and large format printing for corporate and personal needs."
    },
    {
      question: "How quickly can you deliver printed materials?",
      answer: "Our turnaround times vary depending on the project complexity and quantity. Standard business cards typically take 2-3 business days, while larger projects may take 5-7 business days. Rush services are available at an additional cost."
    },
    {
      question: "Do you offer design services?",
      answer: "Yes, our team of professional designers can help create stunning designs for your print materials. We offer consultation, custom design, and template customization to suit your needs and brand guidelines."
    },
    {
      question: "What file formats do you accept for printing?",
      answer: "We accept high-resolution PDF files (preferred), Adobe Illustrator (.ai), Photoshop (.psd), InDesign (.indd), and high-quality JPG or PNG files. All files should be in CMYK color mode with at least 300 DPI resolution."
    },
    {
      question: "Do you offer bulk pricing discounts?",
      answer: "Absolutely! We offer tiered pricing with significant discounts for bulk orders. Contact our sales team for a detailed quote based on your specific requirements and quantities."
    }
  ];

  return (
    <section className="py-16 bg-print-background">
      <div className="container-section">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-print-gold">Frequently Asked Questions</h2>
          <p className="text-lg text-print-text/80 max-w-2xl mx-auto">
            Find answers to common questions about our services, process, and delivery.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-print-purple/30">
                <AccordionTrigger className="text-print-gold hover:text-print-orange py-4 text-left font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-print-text/80 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQAccordion;
