import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Marquee from './components/Marquee';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import Button from './components/Button';
import Checkout from './components/Checkout';
import { PRODUCTS, MARQUEE_TEXT } from './constants';
import { Product, CartItem } from './types';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, CheckCircle, Brain, HelpCircle, AlertTriangle } from 'lucide-react';

type NotificationType = {
  show: boolean;
  type: 'success' | 'error';
  title: string;
  message: string;
};

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [view, setView] = useState<'home' | 'checkout'>('home');
  
  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [notification, setNotification] = useState<NotificationType | null>(null);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
        if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goHome = () => {
    setView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearCart = () => {
      setCartItems([]);
  };

  const handleSubscribe = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!newsletterEmail.trim()) {
        setNotification({
            show: true,
            type: 'error',
            title: 'ПУСТОТА',
            message: 'НАПИШИ ХОТЬ ЧТО-ТО.'
        });
        setTimeout(() => setNotification(null), 3000);
        return;
    }

    if (!emailRegex.test(newsletterEmail)) {
        setNotification({
            show: true,
            type: 'error',
            title: 'ОШИБКА',
            message: 'ЭТО НЕ ПОХОЖЕ НА EMAIL. ПОПРОБУЙ ЕЩЕ РАЗ.'
        });
        setTimeout(() => setNotification(null), 3000);
        return;
    }

    setNotification({
        show: true,
        type: 'success',
        title: 'УСПЕХ',
        message: 'ТЫ В БАЗЕ. ЖДИ СИГНАЛА.'
    });
    setNewsletterEmail('');
    setTimeout(() => setNotification(null), 3000);
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white text-neo-black font-sans selection:bg-neo-pink selection:text-white">
      <Navbar cartCount={totalItems} onOpenCart={() => setIsCartOpen(true)} />
      
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={handleCheckout}
      />

      {/* Notification Toast */}
      <AnimatePresence>
        {notification && notification.show && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-8 right-4 z-[100] max-w-[90vw] md:right-8"
          >
            <div className={`flex items-center gap-4 border-4 border-neo-black px-6 py-4 shadow-neo-lg ${
                notification.type === 'success' ? 'bg-neo-green' : 'bg-red-500 text-white'
            }`}>
              <div className="bg-neo-black p-2">
                {notification.type === 'success' ? (
                    <CheckCircle size={24} className="text-neo-green" />
                ) : (
                    <AlertTriangle size={24} className="text-red-500" />
                )}
              </div>
              <div>
                  <h4 className="font-sans text-xl font-black uppercase leading-none">{notification.title}</h4>
                  <p className="font-mono text-xs font-bold">{notification.message}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {view === 'checkout' ? (
        <Checkout 
            cartItems={cartItems} 
            onBack={goHome} 
            onClearCart={clearCart}
        />
      ) : (
        <>
          {/* HERO SECTION */}
          <header className="relative flex min-h-[90vh] flex-col justify-between overflow-hidden border-b-4 border-neo-black bg-neo-white">
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]"></div>
            
            {/* Chaos Elements */}
            <motion.div 
                animate={{ rotate: 360 }} 
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -right-20 top-20 h-64 w-64 rounded-full border-4 border-neo-black bg-neo-green opacity-50 blur-3xl md:h-96 md:w-96" 
            />
            <motion.div 
                animate={{ y: [0, -20, 0] }} 
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-20 bottom-40 h-64 w-64 rounded-full border-4 border-neo-black bg-neo-purple opacity-50 blur-3xl md:h-80 md:w-80" 
            />

            <div className="container relative mx-auto flex flex-1 flex-col items-center justify-center px-4 text-center md:px-8">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
              >
                <div className="mb-4 inline-block border-4 border-neo-black bg-neo-yellow px-4 py-2 font-mono text-sm font-bold shadow-neo rotate-[-2deg]">
                    НОВАЯ ВЕРСИЯ
                </div>
                <h1 className="mb-6 font-sans text-7xl font-black uppercase leading-[0.85] tracking-tighter md:text-[10rem] text-stroke-black">
                  РАЗГОНИ<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-neo-purple to-neo-pink" style={{ WebkitTextStroke: '4px black' }}>СВОЙ МОЗГ</span>
                </h1>
                <p className="mx-auto mb-10 max-w-2xl font-mono text-lg font-bold leading-relaxed md:text-xl">
                  Хватит быть NPC. Активируй скрытые ресурсы. Наши ноотропы — это чит-код для твоей продуктивности.
                </p>
                <div className="flex flex-col items-center gap-4 md:flex-row justify-center">
                  <Button size="lg" onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}>
                    КАТАЛОГ БАФФОВ
                  </Button>
                  <button 
                    onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                    className="font-mono font-bold underline decoration-4 underline-offset-4 hover:bg-neo-green hover:no-underline px-2 py-2 transition-colors cursor-pointer"
                  >
                    КАК ЭТО РАБОТАЕТ?
                  </button>
                </div>
              </motion.div>
            </div>

            <div className="w-full border-t-4 border-neo-black">
                <Marquee text={MARQUEE_TEXT} />
            </div>
          </header>

          {/* FEATURES / ABOUT */}
          <section id="about" className="border-b-4 border-neo-black bg-neo-black py-20 text-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {[
                        { title: "ЛЕГАЛЬНО", desc: "Никаких запрещенок. Только чистая наука.", color: "text-neo-green", icon: <CheckCircle size={48} /> },
                        { title: "ЭФФЕКТ СРАЗУ", desc: "Чувствуешь прилив через 20 минут.", color: "text-neo-yellow", icon: <Star size={48} /> },
                        { title: "ЛАБОРАТОРНО", desc: "Проверено на крысах (они теперь пишут код).", color: "text-neo-pink", icon: <Brain size={48} /> }
                    ].map((item, idx) => (
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.2 }}
                            className="flex flex-col items-center text-center border-4 border-white p-8 bg-neo-black shadow-[8px_8px_0px_0px_#fff] hover:-translate-y-2 transition-transform"
                        >
                            <div className={`mb-4 ${item.color}`}>
                                {item.icon}
                            </div>
                            <h3 className="mb-2 font-sans text-3xl font-black uppercase">{item.title}</h3>
                            <p className="font-mono text-sm text-gray-300">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
          </section>

          {/* PRODUCTS GRID */}
          <section id="products" className="relative bg-neo-white py-24">
            {/* Grid Background */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            
            <div className="container relative mx-auto px-4">
              <div className="mb-16 text-center">
                <h2 className="inline-block border-b-8 border-neo-green pb-2 font-sans text-5xl font-black uppercase md:text-7xl">
                  ВЫБЕРИ СВОЙ ЯД
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
                {PRODUCTS.map((product) => (
                  <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
                ))}
              </div>
            </div>
          </section>

          {/* TESTIMONIAL / DIVIDER */}
          <section className="py-12 bg-neo-blue border-y-4 border-neo-black overflow-hidden">
            <div className="container mx-auto px-4 text-center">
                <motion.h2 
                    whileInView={{ x: [0, -10, 0, 10, 0] }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl md:text-6xl font-black uppercase italic transform -rotate-1"
                >
                    «Я НАЧАЛ ВИДЕТЬ ЗВУКИ ПОСЛЕ КУРСА» — ИВАН, 24 ГОДА
                </motion.h2>
            </div>
          </section>

          {/* FAQ SECTION */}
          <section id="faq" className="py-20 bg-neo-yellow border-b-4 border-neo-black overflow-hidden relative">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-neo-pink rounded-full blur-3xl opacity-30"></div>
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-neo-green rounded-full blur-3xl opacity-30"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="mb-12 text-center">
                    <h2 className="text-5xl md:text-7xl font-black uppercase text-neo-black inline-block border-4 border-neo-black bg-white px-6 py-2 shadow-neo rotate-1">
                        FAQ /// ВОПРОСЫ
                    </h2>
                </div>
                
                <div className="max-w-3xl mx-auto space-y-6">
                    {[
                        { q: "ЭТО ЛЕГАЛЬНО?", a: "Абсолютно. Мы используем только разрешенные ноотропы и растительные экстракты. Никаких серых зон, только чистый биохакинг." },
                        { q: "КАК БЫСТРО ДЕЙСТВУЕТ?", a: "Эффект наступает через 20-40 минут после приема. Как удар молнии, только без боли." },
                        { q: "ЕСТЬ ЛИ ПОБОЧКИ?", a: "Если считать побочкой желание переделать всю работу за неделю в один день — то да. В остальном — безопасно при соблюдении дозировок." },
                        { q: "ДОСТАВКА ПО РФ?", a: "Отправляем СДЭКом и Почтой. Обычно 2-5 дней, и заветная баночка у тебя." },
                        { q: "МОЖНО ЛИ СМЕШИВАТЬ?", a: "Наши стеки уже сбалансированы. Но если ты хочешь стать сверхчеловеком, проконсультируйся со специалистом." }
                    ].map((faq, i) => (
                        <details key={i} className="group open:bg-neo-black open:text-neo-white bg-white border-4 border-neo-black shadow-[8px_8px_0px_0px_#121212] transition-all hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_#121212] active:translate-y-0 active:shadow-none">
                            <summary className="flex justify-between items-center p-6 cursor-pointer list-none select-none">
                                <div className="flex items-center gap-4">
                                    <HelpCircle className="w-8 h-8 text-neo-pink group-open:text-neo-green" />
                                    <span className="font-sans text-xl md:text-2xl font-black uppercase">{faq.q}</span>
                                </div>
                                <span className="font-mono text-4xl font-bold transition-transform group-open:rotate-45 group-open:text-neo-yellow">+</span>
                            </summary>
                            <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="px-6 pb-6 pl-[4.5rem] font-mono font-bold text-lg leading-relaxed border-t-4 border-transparent group-open:border-neo-white pt-4"
                            >
                                {faq.a}
                            </motion.div>
                        </details>
                    ))}
                </div>
            </div>
          </section>

          {/* NEWSLETTER */}
          <section className="container mx-auto px-4 py-20">
            <div className="mx-auto max-w-3xl border-4 border-neo-black bg-neo-pink p-8 shadow-neo-xl text-center md:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-20 rotate-45 transform translate-x-16 -translate-y-16"></div>
                <div className="relative z-10">
                    <h2 className="mb-4 font-sans text-4xl font-black uppercase text-white">НЕ ПРОПУСТИ ДРОП</h2>
                    <p className="mb-8 font-mono font-bold text-neo-black">Подпишись, и мы пришлем тебе промокод на -10% и секретные мемчики.</p>
                    <div className="flex flex-col gap-4 md:flex-row">
                        <input 
                            type="email" 
                            placeholder="ТВОЙ EMAIL..." 
                            value={newsletterEmail}
                            onChange={(e) => setNewsletterEmail(e.target.value)}
                            className="flex-1 border-4 border-neo-black p-4 font-mono font-bold text-neo-black outline-none focus:bg-neo-yellow placeholder:text-gray-500"
                        />
                        <Button onClick={handleSubscribe}>ПОДПИСАТЬСЯ</Button>
                    </div>
                </div>
            </div>
          </section>
        </>
      )}

      {/* FOOTER */}
      <footer className="border-t-4 border-neo-black bg-neo-black py-12 text-white">
        <div className="container mx-auto flex flex-col items-center justify-between gap-8 px-4 md:flex-row">
          <div className="flex flex-col items-center md:items-start">
             <span className="font-sans text-3xl font-black">RUNOOTROP</span>
             <span className="font-mono text-sm text-gray-400">MOSCOW /// EST. 2024</span>
          </div>
          
          <div className="flex gap-8 font-mono font-bold">
            <a href="#" className="hover:text-neo-green">INSTAGRAM</a>
            <a href="#" className="hover:text-neo-green">TELEGRAM</a>
            <a href="#" className="hover:text-neo-green">TIKTOK</a>
          </div>
        </div>
        <div className="mt-12 text-center font-mono text-xs text-gray-600">
             ДИЗАЙН ВО ИМЯ ХАОСА. НЕ ЯВЛЯЕТСЯ ЛЕКАРСТВЕННЫМ СРЕДСТВОМ. ИЛИ ЯВЛЯЕТСЯ? КТО ЗНАЕТ.
        </div>
      </footer>
    </div>
  );
};

export default App;