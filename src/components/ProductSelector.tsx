import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import produkBatik1 from "@/assets/produk-batik1.png";
import produkBatik2 from "@/assets/produk-batik2.png";
import produkBatik4 from "@/assets/produk-batik4.png";
import produkJas from "@/assets/produk-jas.png";

export const products = [
    { id: "product-1", name: "Batik Modern 1", image: produkBatik1 },
    { id: "product-2", name: "Batik Modern 2", image: produkBatik2 },
    { id: "product-3", name: "Batik Modern 3", image: produkBatik4 },
    { id: "product-4", name: "Jas Formal", image: produkJas },
];

interface ProductSelectorProps {
    selectedProduct: string | null;
    onSelect: (productId: string, productImage: string) => void;
}

export const ProductSelector = ({
    selectedProduct,
    onSelect,
}: ProductSelectorProps) => {
    return (
        <Card className="p-6 border-primary/20 bg-card/50 backdrop-blur-sm">
            <div className="space-y-4">
                <div>
                    <h3 className="text-lg font-semibold text-primary mb-2">Pilih Pakaian</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                        Pilih pakaian yang ingin Anda coba
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            onClick={() => onSelect(product.id, product.image)}
                            className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-300 hover:border-primary/60 ${selectedProduct === product.id
                                    ? "border-primary ring-2 ring-primary/50"
                                    : "border-primary/20"
                                }`}
                        >
                            <div className="aspect-[3/4] w-full bg-white/5">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-contain p-2"
                                />
                            </div>
                            {selectedProduct === product.id && (
                                <div className="absolute top-2 right-2 bg-primary rounded-full p-1">
                                    <Check className="w-4 h-4 text-primary-foreground" />
                                </div>
                            )}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                                <p className="text-xs text-white font-medium">{product.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    );
};
