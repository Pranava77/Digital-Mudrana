import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Phone, Mail, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import SparkButton from "./SparkButton";

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const { toast } = useToast();
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (
      sectionRef.current &&
      headingRef.current &&
      formRef.current &&
      infoRef.current
    ) {
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
            toggleActions: "play none none none",
          },
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
            toggleActions: "play none none none",
          },
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
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Quote request received!",
        description: "We'll get back to you within 24 hours.",
        variant: "default",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });

      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 bg-gradient-to-b from-print-darkPurple to-print-purple text-print-text overflow-hidden"
    >
      {/* Decorative elements for luxury feel */}
      <div className="absolute top-0 left-0 w-full h-2 bg-print-gold"></div>
      <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-print-gold/5 blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-60 h-60 rounded-full bg-print-orange/5 blur-3xl"></div>

      <div className="container-section relative z-10">
        <div ref={headingRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-print-gold">
            Elevate Your Brand
          </h2>
          <p className="text-xl text-print-text/90 max-w-2xl mx-auto">
            Experience premium print solutions tailored to your unique vision.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <form
       
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-6 bg-print-lightBackground/20 backdrop-blur-sm p-8 rounded-lg shadow-xl border border-print-gold/20"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-print-text/90"
                >
                  Your Name
                </label>
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
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-print-text/90"
                >
                  Email Address
                </label>
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
              <label
                htmlFor="phone"
                className="text-sm font-medium text-print-text/90"
              >
                Phone Number
              </label>
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
              <label
                htmlFor="message"
                className="text-sm font-medium text-print-text/90"
              >
                Project Details
              </label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your Project Requirments..."
                required
                className="resize-none
min-h-80
 bg-print-lightBackground/30 border-print-gold/30 text-print-text placeholder:text-print-text/50 focus:border-print-gold focus:ring-print-gold/30"
              />
            </div>
            <div>
              <SparkButton
                className="w-full bg-print-gold hover:bg-print-gold/90 text-print-purple font-medium text-lg py-6"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Request a Premium Quote"}
              </SparkButton>
            </div>
            <div className="flex justify-center gap-6 py-4">
              <a
                href="https://facebook.com"
                target="_blank"
                className="text-gray-600 hover:text-blue-600"
              >
                <svg className="w-6 h-6" fill="#FF8042" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                className="text-gray-600 hover:text-blue-400"
              >
                <svg className="w-6 h-6" fill="#FF8042" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                className="text-gray-600 hover:text-pink-600"
              >
                <svg className="w-6 h-6" fill="#FF8042"viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.948-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                className="text-gray-600 hover:text-blue-700"
              >
                <svg className="w-6 h-6" fill="#FF8042" viewBox="0 0 24 24">
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                </svg>
              </a>
            </div>
          </form>

          <div ref={infoRef} className="flex flex-col justify-between h-full">
            <div className="mb-8 bg-print-darkPurple/60 p-8 rounded-lg backdrop-blur-sm border border-print-gold/10 shadow-xl">
              <h3 className="text-3xl font-semibold mb-4 text-print-gold">
                Exclusive Service
              </h3>
              <p className="mb-8 text-print-text/90 text-lg">
                Our experts are ready to assist with your premium printing
                requirements. Reach out for personalized service and
                consultation.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-print-gold/20 flex items-center justify-center mr-4">
                    <Phone className="h-5 w-5 text-print-gold" />
                  </div>
                  <div>
                    <h4 className="font-medium text-print-gold text-lg">
                      Phone
                    </h4>
                    <p className="text-print-text/90">
                      +91 8073005780 <br />
                      +080 42036196
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-print-gold/20 flex items-center justify-center mr-4">
                    <Mail className="h-5 w-5 text-print-gold" />
                  </div>
                  <div>
                    <h4 className="font-medium text-print-gold text-lg">
                      Email
                    </h4>
                    <p className="text-print-text/90">
                      digitalmudrana@gmail.com
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-print-gold/20 flex items-center justify-center mr-4">
                    <MapPin className="h-5 w-5 text-print-gold" />
                  </div>
                  <div>
                    <h4 className="font-medium text-print-gold text-lg">
                      Address
                    </h4>
                    <p className="text-print-text/90">
                      #23 1st cross Cauvery Nagara,
                      <br />
                      Kathriguppe BSK 3rd Stage
                      <br />
                      Bengaluru 560085.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-print-gold/10 p-6 rounded-lg backdrop-blur-sm border border-print-gold/30 shadow-lg">
              <h3 className="text-xl font-semibold mb-3 text-print-gold">
                Studio Hours
              </h3>
              <div className="space-y-3 text-print-text/90">
                <div className="flex justify-between border-b border-print-gold/20 pb-2">
                  <span>Monday - Saturday</span>
                  <span className="font-medium">10:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between border-b border-print-gold/20 pb-2">
                  <span>Lunch Break</span>
                  <span className="font-medium">2:00 PM - 3:00 PM</span>
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
