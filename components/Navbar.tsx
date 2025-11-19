import React from 'react';
import { ShoppingCart, Brain } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart }) => {
  return (
    <nav className="sticky top-0 z-50 border-b-4 border-neo-black bg-white px-4 py-3 md:px-8">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="bg-neo-pink border-2 border-neo-black p-1">
              <Brain className="h-8 w-8 text-neo-black" strokeWidth={2.5} />
          </div>
          <span className="hidden font-sans text-3xl font-black tracking-tighter md:block">
            RUNOOTROP
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button 
              onClick={onOpenCart}
              className="relative flex items-center gap-2 border-2 border-neo-black bg-neo-yellow px-4 py-2 font-bold shadow-neo transition-transform hover:-translate-y-1 hover:shadow-neo-lg active:translate-y-0 active:shadow-none"
          >
            <ShoppingCart size={20} />
            <span className="hidden md:inline">КОРЗИНА</span>
            {cartCount > 0 && (
              <span className="absolute -right-3 -top-3 flex h-6 w-6 items-center justify-center rounded-none border-2 border-neo-black bg-neo-green text-xs font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;