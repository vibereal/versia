import { Card } from "./ui/card";
import { Star } from "lucide-react";

export const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Budi Santoso",
      role: "Pengusaha",
      rating: 5,
      text: "Hasil jahitan sangat rapi dan pas di badan. Saya pesan 3 stel jas dan semuanya sempurna. Highly recommended!"
    },
    {
      name: "Ahmad Rizki",
      role: "Karyawan Swasta",
      rating: 5,
      text: "Kemeja batiknya premium banget, kualitas jahitan oke dan pelayanannya ramah. Pasti order lagi!"
    },
    {
      name: "Denny Prasetyo",
      role: "PNS",
      rating: 5,
      text: "Sudah 2 tahun langganan di sini untuk seragam PDH. Selalu tepat waktu dan hasilnya konsisten bagus."
    }
  ];

  return (
    <section className="py-20 px-4 bg-card/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Apa Kata <span className="text-primary">Pelanggan Kami</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Testimoni nyata dari pelanggan yang puas dengan layanan kami
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <Card key={i} className="p-6 bg-card border-primary/20 hover:shadow-gold transition-all duration-300">
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, idx) => (
                  <Star key={idx} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-foreground mb-4 italic">"{testimonial.text}"</p>
              <div className="border-t border-border pt-4">
                <p className="font-semibold text-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
