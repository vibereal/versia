import { Card } from "./ui/card";

export const PricingSection = () => {
  const pricingCategories = [
    {
      title: "JAS",
      items: [
        { item: "1 STEL JAS", price: "850.000" },
        { item: "1 JAS ATASAN", price: "750.000" },
        { item: "KANCING HIAS KECIL", price: "25.000" },
        { item: "KANCING HIAS BESAR", price: "50.000" },
        { item: "HANGER JAS", price: "8.000" },
        { item: "BUNGKUS JAS", price: "30.000" },
      ]
    },
    {
      title: "PKJ / JASKET / PSR",
      items: [
        { item: "KOSONGAN", price: "200.000" },
        { item: "R ½ POLOS", price: "420.000" },
        { item: "1 STEL R½", price: "550.000" },
        { item: "R 1 BADAN", price: "500.000" },
        { item: "1 STEL R 1 BADAN", price: "630.000" },
      ]
    },
    {
      title: "PSH",
      items: [
        { item: "R ½ POLOS", price: "275.000" },
        { item: "R 1 BADAN POLOS", price: "300.000" },
      ]
    },
    {
      title: "PDU",
      items: [
        { item: "PDU PRAMUKA R ½ + KANCING", price: "400.000" },
        { item: "PDU PRAMUKA R 1 BADAN", price: "450.000" },
      ]
    }
  ];

  return (
    <section className="py-20 px-4 from-background to-card/30">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Ongkos <span className="text-primary">Jahit</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Versia Tailor Tuban
          </p>
        </div>

        <div className="grid gap-8">
          {pricingCategories.map((category, idx) => (
            <Card key={idx} className="p-6 bg-card border-primary/20 overflow-hidden">
              <div className="mb-4">
                <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-bold text-sm md:text-base">
                  {category.title}
                </span>
              </div>
              <div className="space-y-3">
                {category.items.map((item, i) => (
                  <div key={i} className="flex justify-between items-center pb-2 border-b border-border/50 last:border-0 last:pb-0">
                    <span className="text-foreground font-medium text-sm md:text-base">{item.item}</span>
                    <span className="text-primary font-bold text-sm md:text-base">{item.price}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-8 bg-primary/10 border border-primary/30 rounded-lg p-4">
          <p className="text-sm text-center text-foreground">
            <span className="font-semibold">Catatan:</span> Harga tergantung tingkat kerumitan model dan jenis bahan yang digunakan.
            Hubungi kami untuk estimasi harga yang lebih akurat.
          </p>
        </div>
      </div>
    </section>
  );
};
