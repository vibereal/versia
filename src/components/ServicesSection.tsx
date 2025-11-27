import { Shirt, Briefcase, Scissors, Users } from "lucide-react";
import { Card } from "./ui/card";

export const ServicesSection = () => {
  const services = [
    {
      icon: Briefcase,
      title: "Jas & Suit Formal",
      desc: "Jas pengantin, jas kerja, dan suit formal dengan jahitan presisi tinggi",
      features: ["Custom fit sempurna", "Pilihan bahan premium", "Detail eksklusif"]
    },
    {
      icon: Shirt,
      title: "Kemeja Batik & Casual",
      desc: "Kemeja batik tulis, kemeja formal, hingga kemeja casual dan linen",
      features: ["Model custom", "Berbagai pilihan kain", "Jahitan rapi"]
    },
    {
      icon: Scissors,
      title: "Celana Custom",
      desc: "Celana chino, celana formal, hingga celana jeans custom sesuai ukuran",
      features: ["Pas di pinggang & paha", "Panjang disesuaikan", "Cutting presisi"]
    },
    {
      icon: Users,
      title: "Seragam Kantor",
      desc: "Seragam PDH, PDU Pramuka, seragam komunitas, dan seragam kantor",
      features: ["Order grup/massal", "Harga kompetitif", "Pengerjaan cepat"]
    }
  ];

  return (
    <section id="layanan" className="py-20 px-4 bg-card/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Layanan <span className="text-primary">& Keahlian</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Kami menerima berbagai jenis jahitan custom untuk pria dengan standar kualitas terbaik
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {services.map((service, i) => (
            <Card key={i} className="p-6 hover:shadow-gold transition-all duration-300 bg-card border-primary/20">
              <service.icon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
              <p className="text-muted-foreground mb-4">{service.desc}</p>
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        <div className="text-center p-6 rounded-xl bg-primary/10 border border-primary/30">
          <p className="text-lg font-semibold text-primary">
            ✨ Bisa Custom Model Sesuai Foto/Request Anda
          </p>
        </div>
      </div>
    </section>
  );
};
