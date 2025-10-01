import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export type ClothingType = "formal-tshirt" | "suit" | "psh" | "pdu-pramuka" | "jaket-jas";
export type SleeveType = "short" | "long";
export type CollarType = "ordinary" | "shanghai";

export interface ClothingConfig {
  type: ClothingType;
  sleeveType?: SleeveType;
  collarType?: CollarType;
}

interface ClothingSelectorProps {
  config: ClothingConfig;
  onChange: (config: ClothingConfig) => void;
}

export const ClothingSelector = ({ config, onChange }: ClothingSelectorProps) => {
  return (
    <Card className="p-6 border-primary/20 bg-card/50 backdrop-blur-sm">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-primary mb-4">Clothing Type</h3>
          
          <RadioGroup
            value={config.type}
            onValueChange={(value) => onChange({ ...config, type: value as ClothingType })}
            className="space-y-3"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="formal-tshirt" id="formal-tshirt" />
              <Label htmlFor="formal-tshirt" className="cursor-pointer">Formal T-Shirt</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="suit" id="suit" />
              <Label htmlFor="suit" className="cursor-pointer">Suit</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="psh" id="psh" />
              <Label htmlFor="psh" className="cursor-pointer">PSH (Pakaian Seragam Harian)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="pdu-pramuka" id="pdu-pramuka" />
              <Label htmlFor="pdu-pramuka" className="cursor-pointer">PDU Pramuka</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="jaket-jas" id="jaket-jas" />
              <Label htmlFor="jaket-jas" className="cursor-pointer">Jaket Jas (Blazer)</Label>
            </div>
          </RadioGroup>
        </div>

        {config.type === "formal-tshirt" && (
          <div className="space-y-4 pt-4 border-t border-primary/20">
            <div className="space-y-2">
              <Label>Sleeve Length</Label>
              <Select
                value={config.sleeveType || "short"}
                onValueChange={(value) => onChange({ ...config, sleeveType: value as SleeveType })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select sleeve type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="short">Short Sleeve</SelectItem>
                  <SelectItem value="long">Long Sleeve</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Collar Type</Label>
              <Select
                value={config.collarType || "ordinary"}
                onValueChange={(value) => onChange({ ...config, collarType: value as CollarType })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select collar type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ordinary">Ordinary Collar</SelectItem>
                  <SelectItem value="shanghai">Shanghai Collar</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
