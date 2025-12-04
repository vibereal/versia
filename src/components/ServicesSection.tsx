import { useState } from "react";
import { Shirt, Briefcase, Scissors, Users, ZoomIn } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import jasBatik from "@/assets/jas-batik.png";
import kemejaBatik from "@/assets/kemeja-batik.png";
import celana from "@/assets/celana.png";
import seragam from "@/assets/seragam-kejaksaan.png";

export const ServicesSection = () => {
  const services = [
    {
      icon: Briefcase,
      title: "Jas & Suit Formal",
      desc: "Jas pengantin, jas kerja, dan suit formal dengan jahitan presisi tinggi",
      image: jasBatik,
      features: ["Custom fit sempurna", "Pilihan bahan premium", "Detail eksklusif"]
    },
    {
      icon: Shirt,
      title: "Kemeja Batik & Casual",
      desc: "Kemeja batik tulis, kemeja formal, hingga kemeja casual dan linen",
      image: kemejaBatik,
      features: ["Model custom", "Berbagai pilihan kain", "Jahitan rapi"]
    },
    {
      icon: Scissors,
      title: "Celana Custom",
      desc: "Celana chino, celana formal, hingga celana jeans custom sesuai ukuran",
      image: celana,
      features: ["Pas di pinggang & paha", "Panjang disesuaikan", "Cutting presisi"]
    },
    {
      icon: Users,
      title: "Seragam Kantor",
      desc: "Seragam PDH, PDU Pramuka, seragam komunitas, dan seragam kantor",
      image: seragam,
      features: ["Order grup/massal", "Harga kompetitif", "Pengerjaan cepat"]
    }
  ];

  return (
    <section id="layanan" className="relative py-20 px-4 overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03]"
      />

      <div className="relative z-10 container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Layanan <span className="text-primary">& Keahlian</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Kami menerima berbagai jenis jahitan custom untuk pria dengan standar kualitas terbaik
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {services.map((service, i) => (
            <Dialog key={i}>
              <DialogTrigger asChild>
                <Card className="group cursor-pointer overflow-hidden border-primary/20 bg-card/80 backdrop-blur-sm hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500">
                  <div className="relative h-64 overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500 z-10" />
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 p-2 rounded-full text-white">
                      <ZoomIn className="w-5 h-5" />
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                        <service.icon className="w-6 h-6" />
                      </div>
                      <CardTitle className="text-2xl">{service.title}</CardTitle>
                    </div>
                    <CardDescription className="text-base">
                      {service.desc}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="grid grid-cols-1 gap-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent className="max-w-4xl w-full p-0 overflow-hidden bg-transparent border-none shadow-none">
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-auto max-h-[85vh] object-contain rounded-lg shadow-2xl"
                  />
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>

        <div className="text-center p-6 rounded-xl bg-primary/10 border border-primary/30 backdrop-blur-sm">
          <p className="text-lg font-semibold text-primary">
            ✨ Bisa Custom Model Sesuai Foto/Request Anda
          </p>
        </div>
      </div>
    </section>
  );
};
