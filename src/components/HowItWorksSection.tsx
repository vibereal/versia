import { MessageCircle, Scissors, Clock, CheckCircle } from "lucide-react";

export const HowItWorksSection = () => {
  const steps = [
    {
      icon: MessageCircle,
      number: "01",
      title: "Konsultasi & Pengukuran",
      desc: "Datang ke lokasi, panggil ke rumah, atau kirim ukuran online via WhatsApp"
    },
    {
      icon: Scissors,
      number: "02",
      title: "Pilih Bahan & Desain",
      desc: "Bawa kain sendiri atau pilih dari katalog kami. Diskusikan model yang Anda inginkan"
    },
    {
      icon: Clock,
      number: "03",
      title: "Proses Produksi",
      desc: "Pengerjaan oleh tailor berpengalaman dengan estimasi 7-14 hari kerja"
    },
    {
      icon: CheckCircle,
      number: "04",
      title: "Fitting & Penyerahan",
      desc: "Coba hasil jahitan, revisi jika kurang pas, lalu bawa pulang dengan puas"
    }
  ];

  return (
    <section className="py-20 px-4 from-background to-card/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Cara <span className="text-primary">Pemesanan</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Proses yang mudah dan transparan dari awal hingga selesai
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div key={i} className="relative">
              <div className="flex flex-col items-center text-center p-6 rounded-xl border border-primary/20 bg-card/50 backdrop-blur-sm hover:border-primary/40 transition-all duration-300 h-full">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <span className="text-4xl font-bold text-primary/30 mb-2">{step.number}</span>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-primary/30" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
