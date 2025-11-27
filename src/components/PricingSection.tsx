import { Card } from "./ui/card";

export const PricingSection = () => {
  const pricing = [
    { item: "Kemeja (Jasa Jahit)", price: "Mulai Rp 150.000" },
    { item: "Celana (Jasa Jahit)", price: "Mulai Rp 100.000" },
    { item: "Jas/Suit (Jasa Jahit)", price: "Mulai Rp 1.500.000" },
    { item: "Seragam PDH/PDU", price: "Hubungi untuk harga grup" }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-card/30">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Estimasi <span className="text-primary">Harga</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Harga transparan dan kompetitif untuk kualitas terbaik
          </p>
        </div>

        <Card className="p-8 bg-card border-primary/20">
          <div className="space-y-4 mb-6">
            {pricing.map((item, i) => (
              <div key={i} className="flex justify-between items-center pb-4 border-b border-border last:border-0">
                <span className="text-foreground font-medium">{item.item}</span>
                <span className="text-primary font-bold">{item.price}</span>
              </div>
            ))}
          </div>
          
          <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
            <p className="text-sm text-center text-foreground">
              <span className="font-semibold">Catatan:</span> Harga tergantung tingkat kerumitan model dan jenis bahan yang digunakan. 
              Hubungi kami untuk estimasi harga yang lebih akurat.
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
};
