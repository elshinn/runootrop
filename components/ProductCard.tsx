import React from 'react';
import { Product } from '../types';
import { ShoppingCart, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`group relative flex flex-col border-4 border-neo-black bg-white shadow-neo transition-all hover:shadow-neo-lg`}
    >
      {/* Header Badge */}
      <div className="absolute -top-6 -left-4 rotate-[-5deg] z-10">
        <div className={`${product.color} border-4 border-neo-black px-4 py-1 font-black uppercase shadow-sm`}>
            {product.tags[0]}
        </div>
      </div>

      {/* Image Section */}
      <div className={`relative h-64 overflow-hidden border-b-4 border-neo-black ${product.color}`}>
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')]"></div>
        <img 
            src={product.image} 
            alt={product.name} 
            className="h-full w-full object-cover mix-blend-multiply grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-110"
        />
        <div className="absolute bottom-0 right-0 bg-neo-black p-2">
            <Zap className="text-neo-yellow h-6 w-6" />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-2 font-sans text-2xl font-black uppercase leading-none tracking-tight">{product.name}</h3>
        <p className="mb-4 font-mono text-xs font-bold text-neo-purple">{product.tagline}</p>
        <p className="mb-6 flex-1 font-sans text-sm leading-tight text-gray-700">{product.description}</p>
        
        {/* Features */}
        <div className="mb-6 flex flex-wrap gap-2">
            {product.features.map((feat, i) => (
                <span key={i} className="border-2 border-neo-black bg-gray-100 px-2 py-1 font-mono text-[10px] font-bold uppercase">
                    {feat}
                </span>
            ))}
        </div>

        {/* Footer / Action */}
        <div className="flex items-center justify-between border-t-4 border-neo-black pt-4">
          <span className="font-mono text-xl font-black">{product.price} ₽</span>
          <button 
            onClick={() => onAddToCart(product)}
            className="flex items-center gap-2 bg-neo-black px-4 py-2 font-bold text-white transition-transform active:scale-95 hover:bg-neo-blue hover:text-neo-black"
          >
            <ShoppingCart size={18} />
            КУПИТЬ
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;