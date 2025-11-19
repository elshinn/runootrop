import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CreditCard, Truck, ShieldCheck, CheckCircle } from 'lucide-react';
import { CartItem } from '../types';
import Button from './Button';

interface CheckoutProps {
  cartItems: CartItem[];
  onBack: () => void;
  onClearCart: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ cartItems, onBack, onClearCart }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [loading, setLoading] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    comment: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 350;
  const total = subtotal + shipping;

  const validate = () => {
      const newErrors: Record<string, string> = {};
      
      if (!formData.name.trim()) newErrors.name = 'ИМЯ — ОБЯЗАТЕЛЬНОЕ ПОЛЕ';
      
      // Phone validation: strict length check (+7 + 10 digits = 12 chars)
      if (!formData.phone) {
          newErrors.phone = 'НУЖЕН ТЕЛЕФОН ДЛЯ СВЯЗИ';
      } else if (formData.phone.length !== 12) {
           newErrors.phone = 'ВВЕДИТЕ НОМЕР ПОЛНОСТЬЮ (+7...)';
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email.trim()) {
          newErrors.email = 'EMAIL НЕОБХОДИМ ДЛЯ ЧЕКА';
      } else if (!emailRegex.test(formData.email)) {
          newErrors.email = 'ЭТО НЕ ПОХОЖЕ НА EMAIL';
      }

      if (!formData.address.trim()) newErrors.address = 'КУДА ВЕЗТИ БАФФЫ?';

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;

      if (name === 'phone') {
          // If user clears the input or deletes everything back to empty string
          if (!value) {
              setFormData(prev => ({ ...prev, phone: '' }));
          } else {
              // Remove all non-digit characters
              let digits = value.replace(/\D/g, '');
              
              // Handle cases where user types 8 or just digits
              if (digits.length > 0) {
                  // If starting with 8, replace with 7 (common in RU)
                  if (digits[0] === '8') {
                      digits = '7' + digits.slice(1);
                  }
                  // If not starting with 7, prepend 7
                  if (digits[0] !== '7') {
                      digits = '7' + digits;
                  }
                  
                  // Limit to 11 digits (Country code 7 + 10 digits)
                  digits = digits.slice(0, 11);
                  
                  // Format as +7...
                  setFormData(prev => ({ ...prev, phone: '+' + digits }));
              } else {
                  // If only + was left and deleted, or similar edge case
                   setFormData(prev => ({ ...prev, phone: '' }));
              }
          }
      } else {
          setFormData(prev => ({ ...prev, [name]: value }));
      }

      // Clear error when user starts typing
      if (errors[name]) {
          setErrors(prev => {
              const newErrors = { ...prev };
              delete newErrors[name];
              return newErrors;
          });
      }
  };

  const handlePhoneFocus = () => {
      // Auto-insert +7 if empty on focus
      if (!formData.phone) {
          setFormData(prev => ({ ...prev, phone: '+7' }));
      }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
        // Scroll to top to see errors
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setStep('success');
      onClearCart();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2000);
  };

  if (step === 'success') {
    return (
      <div className="container mx-auto px-4 py-20 min-h-[60vh] flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-neo-green p-8 border-4 border-neo-black shadow-neo-xl rounded-full mb-8"
        >
          <CheckCircle size={80} className="text-neo-black" />
        </motion.div>
        <h2 className="text-6xl md:text-8xl font-black uppercase mb-6">УСПЕХ!</h2>
        <p className="font-mono text-xl font-bold max-w-2xl mb-8">
          Твой заказ принят. Наши кибер-курьеры уже смазывают подшипники. 
          Готовься к апгрейду.
        </p>
        <Button onClick={onBack} size="lg">ВЕРНУТЬСЯ НА БАЗУ</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <button 
        onClick={onBack}
        className="mb-8 flex items-center gap-2 font-mono font-bold hover:text-neo-purple transition-colors"
      >
        <ArrowLeft size={24} />
        НАЗАД В КАТАЛОГ
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Form Section */}
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex flex-col gap-8"
        >
          <div className="bg-white border-4 border-neo-black p-6 md:p-8 shadow-neo relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-neo-yellow px-4 py-1 border-l-4 border-b-4 border-neo-black font-mono font-bold">
              ШИФРОВАНИЕ: ВКЛ
            </div>
            <h2 className="text-4xl font-black uppercase mb-8">ДАННЫЕ ПОЛУЧАТЕЛЯ</h2>
            
            <form id="checkout-form" onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-mono font-bold text-sm flex justify-between">
                      ИМЯ (АГЕНТА)
                      {errors.name && <span className="text-red-500 text-xs">{errors.name}</span>}
                  </label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full border-4 p-3 font-bold focus:bg-neo-blue/20 focus:outline-none transition-colors ${errors.name ? 'border-red-500 bg-red-50' : 'border-neo-black'}`} 
                    placeholder="Иван Иванов" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-mono font-bold text-sm flex justify-between">
                      ТЕЛЕФОН
                      {errors.phone && <span className="text-red-500 text-xs">{errors.phone}</span>}
                  </label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onFocus={handlePhoneFocus}
                    maxLength={12}
                    className={`w-full border-4 p-3 font-bold focus:bg-neo-blue/20 focus:outline-none transition-colors ${errors.phone ? 'border-red-500 bg-red-50' : 'border-neo-black'}`}
                    placeholder="+79990000000" 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="font-mono font-bold text-sm flex justify-between">
                    EMAIL
                    {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
                </label>
                <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full border-4 p-3 font-bold focus:bg-neo-blue/20 focus:outline-none transition-colors ${errors.email ? 'border-red-500 bg-red-50' : 'border-neo-black'}`}
                    placeholder="neo@matrix.com" 
                />
              </div>

              <div className="space-y-2">
                <label className="font-mono font-bold text-sm flex justify-between">
                    АДРЕС ДОСТАВКИ
                    {errors.address && <span className="text-red-500 text-xs">{errors.address}</span>}
                </label>
                <input 
                    type="text" 
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`w-full border-4 p-3 font-bold focus:bg-neo-blue/20 focus:outline-none transition-colors ${errors.address ? 'border-red-500 bg-red-50' : 'border-neo-black'}`}
                    placeholder="г. Москва, ул. Пушкина, д. Колотушкина" 
                />
              </div>

              <div className="space-y-2">
                <label className="font-mono font-bold text-sm">КОММЕНТАРИЙ К ЗАКАЗУ</label>
                <textarea 
                    name="comment"
                    value={formData.comment}
                    onChange={handleChange}
                    className="w-full border-4 border-neo-black p-3 font-bold focus:bg-neo-blue/20 focus:outline-none transition-colors h-32 resize-none" 
                    placeholder="Постучать 3 раза..." 
                />
              </div>
            </form>
          </div>

          <div className="flex gap-4 text-sm font-mono text-gray-500">
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} />
              <span>SSL ЗАЩИТА</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck size={16} />
              <span>БЫСТРАЯ ОТПРАВКА</span>
            </div>
          </div>
        </motion.div>

        {/* Order Summary */}
        <motion.div 
           initial={{ x: 50, opacity: 0 }}
           animate={{ x: 0, opacity: 1 }}
           className="flex flex-col gap-8"
        >
          <div className="bg-neo-pink border-4 border-neo-black p-6 md:p-8 shadow-neo-lg text-white relative">
            {/* Receipt Pattern Top */}
            <div className="absolute -top-2 left-0 w-full h-4 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIxMCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+PHBhdGggZD0iTTAgMTBMMTAgMEwyMCAxMFoiIGZpbGw9IiNmZmY1MDAiIC8+PC9zdmc+')] bg-repeat-x transform rotate-180"></div>
            
            <h2 className="text-4xl font-black uppercase mb-6 border-b-4 border-neo-black pb-4 text-neo-black">ЧЕК</h2>
            
            <div className="flex flex-col gap-4 mb-8 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-start gap-4 bg-white/10 p-2 border-2 border-transparent hover:border-neo-black transition-colors">
                  <div className="w-16 h-16 bg-white border-2 border-neo-black shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold uppercase text-neo-black leading-tight">{item.name}</h4>
                      <span className="font-mono text-neo-black whitespace-nowrap ml-2">{item.price * item.quantity} ₽</span>
                    </div>
                    <p className="text-xs font-mono text-neo-black/70 mt-1">КОЛ-ВО: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2 border-t-4 border-neo-black pt-4 font-mono text-neo-black">
              <div className="flex justify-between">
                <span>ПОДИТОГ:</span>
                <span className="font-bold">{subtotal} ₽</span>
              </div>
              <div className="flex justify-between">
                <span>ДОСТАВКА:</span>
                <span className="font-bold">{shipping} ₽</span>
              </div>
              <div className="flex justify-between text-2xl font-black mt-4 pt-4 border-t-4 border-dotted border-neo-black">
                <span>ИТОГО:</span>
                <span>{total} ₽</span>
              </div>
            </div>
            
             {/* Receipt Pattern Bottom */}
             <div className="absolute -bottom-2 left-0 w-full h-4 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIxMCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+PHBhdGggZD0iTTAgMTBMMTAgMEwyMCAxMFoiIGZpbGw9IiNmZjAwZjUiIC8+PC9zdmc+')] bg-repeat-x"></div>
          </div>

          <Button 
            size="lg" 
            className="w-full text-2xl py-6" 
            onClick={() => document.getElementById('checkout-form')?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))}
            isLoading={loading}
          >
            <div className="flex items-center justify-center gap-3">
              <CreditCard />
              ОПЛАТИТЬ КАРТОЙ
            </div>
          </Button>
          
          <p className="text-center font-mono text-xs text-gray-500">
            НАЖИМАЯ КНОПКУ, ТЫ СОГЛАШАЕШЬСЯ ОТДАТЬ НАМ СВОЮ ДУШУ (И ДЕНЬГИ).
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Checkout;