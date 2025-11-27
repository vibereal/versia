import { MessageCircle, Instagram, Facebook } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold text-primary mb-4">VERSIA</h3>
            <p className="text-muted-foreground mb-4">
              Tailor profesional untuk pria di Tuban. Jahitan presisi, pas di badan, dan sesuai karakter Anda.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/30 transition-colors">
                <Instagram className="w-5 h-5 text-primary" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/30 transition-colors">
                <Facebook className="w-5 h-5 text-primary" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/30 transition-colors">
                <MessageCircle className="w-5 h-5 text-primary" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Layanan</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#layanan" className="hover:text-primary transition-colors">Jas & Suit</a></li>
              <li><a href="#layanan" className="hover:text-primary transition-colors">Kemeja Batik</a></li>
              <li><a href="#layanan" className="hover:text-primary transition-colors">Celana Custom</a></li>
              <li><a href="#layanan" className="hover:text-primary transition-colors">Seragam</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">Kontak</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>+62 812-3456-7890</li>
              <li>Jl. Contoh No. 123</li>
              <li>Tuban, Jawa Timur</li>
              <li>62381</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center text-muted-foreground">
          <p>&copy; 2025 Versia Tailor. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
