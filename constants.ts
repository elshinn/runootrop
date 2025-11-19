import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'NEURO-BLAST 9000',
    tagline: 'ТУРБОНАДДУВ ДЛЯ НЕЙРОНОВ',
    description: 'Твой мозг работает как старый модем? Залей в него NEURO-BLAST. Чистый фокус, ноль тормозов. Идеально для кодинга в 4 утра.',
    price: 2500,
    color: 'bg-neo-green',
    image: 'https://picsum.photos/400/400?random=1',
    features: ['L-Тирозин', 'Кофеин', 'Магия'],
    tags: ['FOCUS', 'ENERGY', 'SPEED']
  },
  {
    id: '2',
    name: 'ZEN-MASTER X',
    tagline: 'СПОКОЙСТВИЕ УДАВА',
    description: 'Стресс сжирает твои митохондрии? Выключи панику. ZEN-MASTER X делает тебя пуленепробиваемым для дедлайнов.',
    price: 3200,
    color: 'bg-neo-purple',
    image: 'https://picsum.photos/400/400?random=2',
    features: ['Ашваганда', 'Габа', 'Нирвана'],
    tags: ['CHILL', 'SLEEP', 'MOOD']
  },
  {
    id: '3',
    name: 'MEMORY CORE',
    tagline: 'ВНЕШНИЙ SSD ДЛЯ ГОЛОВЫ',
    description: 'Забываешь имена коллег и синтаксис JS? Расширь оперативку. Запоминай всё с первого раза, как нейросеть.',
    price: 4100,
    color: 'bg-neo-blue',
    image: 'https://picsum.photos/400/400?random=3',
    features: ['Ежовик', 'Гинкго', 'RAM'],
    tags: ['MEMORY', 'LEARN', 'IQ']
  },
  {
    id: '4',
    name: 'CREATIVE JUICE',
    tagline: 'ЖИДКИЙ КРЕАТИВ',
    description: 'Муза ушла в запой? Верни её силой. Генерация идей на скорости света. Осторожно: вызывает желание рисовать квадраты.',
    price: 2900,
    color: 'bg-neo-pink',
    image: 'https://picsum.photos/400/400?random=4',
    features: ['Родиола', 'Витамин B', 'Арт'],
    tags: ['ART', 'IDEA', 'FLOW']
  }
];

export const MARQUEE_TEXT = "RUNOOTROP /// РАЗГОНИ МОЗГ /// НЕ БУДЬ ОВОЩЕМ /// СИНАПСЫ ГОРЯТ /// MAX PERFOMANCE /// RUNOOTROP /// ";
