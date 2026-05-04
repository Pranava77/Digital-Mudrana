import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Phone, Mail, MapPin } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      sectionRef.current &&
      headingRef.current &&
      mapRef.current &&
      infoRef.current
    ) {
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

      gsap.fromTo(
        mapRef.current,
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
          {/* Map */}
          <div
            ref={mapRef}
            className="rounded-lg overflow-hidden shadow-xl border border-print-gold/20 min-h-[500px]"
          >
              <iframe
              title="Digital Mudrana Location"
              src="https://maps.google.com/maps?q=23,+1+St+cross,+Kaveri+Nagar+Kathriguppe+main+road,+85,+Banashankari+3rd+Stage,+Bengaluru,+Karnataka+560085&output=embed"
              width="100%"
              height="100%"
              style={{ minHeight: "500px", border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Contact Info */}
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
                    <a href="mailto:digitalmudrana@gmail.com" className="text-print-text/90 hover:text-print-gold transition-colors inline-block mt-0.5">
                      digitalmudrana@gmail.com
                    </a>
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
                      23, 1 St cross, Kaveri Nagar Kathriguppe main road,
                      <br />
                      85, Banashankari 3rd Stage,
                      <br />
                      Bengaluru, Karnataka 560085
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-print-gold/10 p-6 rounded-lg backdrop-blur-sm border border-print-gold/30 shadow-lg">
              <h3 className="text-xl font-semibold mb-3 text-print-gold">
                Press Hours
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
