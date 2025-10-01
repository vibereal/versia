import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import batikPattern1 from "@/assets/batik-pattern-1.jpg";
import batikPattern2 from "@/assets/batik-pattern-2.jpg";
import batikPattern3 from "@/assets/batik-pattern-3.jpg";
import batikPattern4 from "@/assets/batik-pattern-4.jpg";

export const premadePatterns = [
  { id: "pattern-1", name: "Classic Brown", image: batikPattern1 },
  { id: "pattern-2", name: "Royal Blue", image: batikPattern2 },
  { id: "pattern-3", name: "Golden Parang", image: batikPattern3 },
  { id: "pattern-4", name: "Burgundy Kawung", image: batikPattern4 },
];

interface BatikPatternSelectorProps {
  selectedPattern: string | null;
  onSelect: (patternId: string, patternImage: string) => void;
  customPattern: File | null;
}

export const BatikPatternSelector = ({ 
  selectedPattern, 
  onSelect,
  customPattern 
}: BatikPatternSelectorProps) => {
  return (
    <Card className="p-6 border-primary/20 bg-card/50 backdrop-blur-sm">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-primary mb-2">Premade Batik Patterns</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Choose from our collection or upload your own
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {premadePatterns.map((pattern) => (
            <div
              key={pattern.id}
              onClick={() => onSelect(pattern.id, pattern.image)}
              className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-300 hover:border-primary/60 ${
                selectedPattern === pattern.id && !customPattern
                  ? "border-primary ring-2 ring-primary/50"
                  : "border-primary/20"
              }`}
            >
              <img
                src={pattern.image}
                alt={pattern.name}
                className="w-full h-32 object-cover"
              />
              {selectedPattern === pattern.id && !customPattern && (
                <div className="absolute top-2 right-2 bg-primary rounded-full p-1">
                  <Check className="w-4 h-4 text-primary-foreground" />
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                <p className="text-xs text-white font-medium">{pattern.name}</p>
              </div>
            </div>
          ))}
        </div>

        {customPattern && (
          <div className="pt-4 border-t border-primary/20">
            <p className="text-sm text-primary">
              ✓ Using your custom pattern
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};
