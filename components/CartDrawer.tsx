import React from 'react';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CartItem } from '../types';
import Button from './Button';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onCheckout }) => {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 z-[70] h-full w-full max-w-md border-l-4 border-neo-black bg-white shadow-2xl"
          >
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between border-b-4 border-neo-black bg-neo-pink p-6">
                <h2 className="font-sans text-2xl font-black uppercase text-white">Твоя Корзина</h2>
                <button onClick={onClose} className="bg-white p-1 border-2 border-neo-black hover:bg-neo-black hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {cartItems.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center gap-4 text-center opacity-50">
                    <span className="text-6xl">☹️</span>
                    <p className="font-mono text-xl font-bold">ТУТ ПУСТО</p>
                    <p className="font-sans">Твои нейроны голодают.</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-6">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex gap-4 border-b-2 border-dashed border-gray-300 pb-4">
                        <div className={`h-20 w-20 shrink-0 border-2 border-neo-black ${item.color}`}>
                            <img src={item.image} alt={item.name} className="h-full w-full object-cover mix-blend-multiply" />
                        </div>
                        <div className="flex flex-1 flex-col justify-between">
                          <div>
                            <h4 className="font-sans font-bold uppercase leading-none">{item.name}</h4>
                            <p className="font-mono text-sm text-gray-500">{item.price} ₽</p>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 border-2 border-neo-black bg-gray-100 px-2">
                              <button onClick={() => onUpdateQuantity(item.id, -1)} className="p-1 hover:text-neo-purple"><Minus size={14} /></button>
                              <span className="font-mono font-bold w-4 text-center">{item.quantity}</span>
                              <button onClick={() => onUpdateQuantity(item.id, 1)} className="p-1 hover:text-neo-purple"><Plus size={14} /></button>
                            </div>
                            <button onClick={() => onRemoveItem(item.id)} className="text-red-500 hover:bg-red-100 p-1 rounded">
                                <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="border-t-4 border-neo-black bg-gray-50 p-6">
                <div className="mb-4 flex justify-between font-mono text-xl font-black">
                    <span>ИТОГО:</span>
                    <span>{total} ₽</span>
                </div>
                <Button 
                  className="w-full" 
                  size="lg" 
                  disabled={cartItems.length === 0}
                  onClick={onCheckout}
                >
                    ОФОРМИТЬ
                </Button>
                <p className="mt-2 text-center font-mono text-[10px] text-gray-400">
                    *ДОСТАВКА НЕЙРОСЕТЯМИ НЕ ОСУЩЕСТВЛЯЕТСЯ
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;