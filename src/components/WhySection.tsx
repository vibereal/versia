import { Check, X } from "lucide-react";

export const WhySection = () => {
  const problems = [
    "Lengan kemeja terlalu panjang atau pendek?",
    "Bahu sempit tapi perut longgar?",
    "Model yang pasaran dan tidak unik?",
    "Ukuran baju tidak pas di badan?"
  ];

  const solutions = [
    "Ukuran disesuaikan dengan tubuh Anda",
    "Proporsi sempurna di setiap bagian",
    "Model custom sesuai keinginan",
    "Hasil jahitan yang presisi dan rapi"
  ];

  return (
    <section className="py-20 px-4 from-background to-card/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Mengapa Harus <span className="text-primary">Jahit Sendiri?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Beli baju jadi di mall sering ga pas? Di Versia, setiap pakaian dibuat khusus untuk tubuh Anda. Sesuai selera Anda.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Problems */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold mb-6 text-destructive">Masalah Baju Jadi</h3>
            {problems.map((problem, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                <X className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <p className="text-foreground">{problem}</p>
              </div>
            ))}
          </div>

          {/* Solutions */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold mb-6 text-primary">Solusi Versia</h3>
            {solutions.map((solution, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-primary/10 border border-primary/20">
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-foreground">{solution}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
