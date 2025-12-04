import { MapPin, Phone, Clock, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";

export const ContactSection = () => {
  const handleWhatsApp = () => {
    window.open("https://wa.me/message/CSDILBKEKRUNI1", "_blank");
  };

  return (
    <section id="kontak" className="py-20 px-4 from-background to-card/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Lokasi <span className="text-primary">& Kontak</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Kunjungi toko kami atau hubungi untuk konsultasi dan pengukuran
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="flex items-start gap-4 p-6 rounded-xl border border-primary/20 bg-card/50">
              <MapPin className="w-6 h-6 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-bold mb-2">Alamat Workshop</h3>
                <p className="text-muted-foreground">
                  Jl. AKBP Suroko No.21, Kebonsari, Kec. Tuban, Kabupaten Tuban, Jawa Timur 62317
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 rounded-xl border border-primary/20 bg-card/50">
              <Phone className="w-6 h-6 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-bold mb-2">Telepon & WhatsApp</h3>
                <p className="text-muted-foreground">
                  +62 812-3074-4680
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 rounded-xl border border-primary/20 bg-card/50">
              <Clock className="w-6 h-6 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-bold mb-2">Jam Operasional</h3>
                <p className="text-muted-foreground">
                  Senin - Sabtu: 08.00 - 16.00 WIB<br />
                  Minggu: Tutup
                </p>
              </div>
            </div>

            <Button
              size="lg"
              className="w-full gold-glow-lg"
              onClick={handleWhatsApp}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Chat via WhatsApp
            </Button>
          </div>

          {/* Map */}
          <div className="rounded-xl overflow-hidden border border-primary/20 h-[400px] bg-card/50">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.902230342252!2d112.0628239!3d-6.9022947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7797e2516364c1%3A0xd96eb7b6d14ae882!2sVERSIA%20TAILOR%20dan%20BATIK!5e0!3m2!1sen!2sid!4v1764592043197!5m2!1sen!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
