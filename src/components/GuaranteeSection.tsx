import { Shield, Clock, Award, Repeat } from "lucide-react";

export const GuaranteeSection = () => {
  const guarantees = [
    {
      icon: Shield,
      title: "Garansi Revisi Sampai Pas",
      desc: "Kami jamin hasil jahitan pas di badan atau gratis revisi sampai Anda puas"
    },
    {
      icon: Clock,
      title: "Tepat Waktu",
      desc: "Komitmen kami menyelesaikan pesanan sesuai jadwal yang telah disepakati"
    },
    {
      icon: Award,
      title: "Kualitas Terjamin",
      desc: "Jahitan presisi dengan standar kualitas tinggi dari tailor berpengalaman"
    },
    {
      icon: Repeat,
      title: "After Sales Service",
      desc: "Layanan perbaikan dan penyesuaian setelah pembelian dengan harga khusus"
    }
  ];

  return (
    <section className="py-20 px-4 bg-card/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Jaminan <span className="text-primary">Kepuasan</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Komitmen kami untuk memberikan hasil terbaik dengan garansi yang kuat
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {guarantees.map((item, i) => (
            <div key={i} className="text-center p-6 rounded-xl border border-primary/20 bg-card/50 backdrop-blur-sm hover:border-primary/40 hover:shadow-gold transition-all duration-300">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                <item.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center p-8 rounded-xl bg-gradient-gold border border-primary/30">
          <p className="text-2xl font-bold text-background mb-2">
            Garansi Revisi Sampai Pas
          </p>
          <p className="text-background/80">
            Ini adalah komitmen kami untuk memberikan hasil terbaik untuk Anda
          </p>
        </div>
      </div>
    </section>
  );
};
