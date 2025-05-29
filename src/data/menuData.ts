import { Category, MenuItem, LeisureActivity } from '../types/types';

export const categories: Category[] = [
  { id: 'burgers', name: 'Hambúrgueres', icon: 'burger' },
  { id: 'pizzas', name: 'Pizzas', icon: 'pizza' },
  { id: 'drinks', name: 'Bebidas', icon: 'cup' },
  { id: 'desserts', name: 'Sobremesas', icon: 'cake' },
  { id: 'snacks', name: 'Petiscos', icon: 'utensils' },
];

export const menuItems: MenuItem[] = [
  {
    id: 'burger-1',
    name: 'Hambúrguer Clássico',
    description: 'Pão, hambúrguer artesanal 150g, queijo, alface, tomate e molho especial',
    price: 28.90,
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'burgers'
  },
  {
    id: 'burger-2',
    name: 'Cheese Bacon',
    description: 'Pão, hambúrguer artesanal 150g, queijo cheddar, bacon crocante e molho barbecue',
    price: 32.90,
    image: 'https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'burgers'
  },
  {
    id: 'burger-3',
    name: 'Veggie Burger',
    description: 'Pão, hambúrguer de grão de bico, queijo, rúcula, tomate seco e maionese vegana',
    price: 30.90,
    image: 'https://images.pexels.com/photos/3616956/pexels-photo-3616956.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'burgers'
  },
  {
    id: 'pizza-1',
    name: 'Pizza Margherita',
    description: 'Molho de tomate, muçarela, tomate e manjericão fresco',
    price: 48.90,
    image: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'pizzas'
  },
  {
    id: 'pizza-2',
    name: 'Pizza Pepperoni',
    description: 'Molho de tomate, muçarela e pepperoni',
    price: 52.90,
    image: 'https://images.pexels.com/photos/4109111/pexels-photo-4109111.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'pizzas'
  },
  {
    id: 'drink-1',
    name: 'Refrigerante Lata',
    description: 'Coca-Cola, Guaraná Antarctica, Sprite ou Fanta (350ml)',
    price: 6.90,
    image: 'https://images.pexels.com/photos/2983100/pexels-photo-2983100.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'drinks'
  },
  {
    id: 'drink-2',
    name: 'Suco Natural',
    description: 'Laranja, abacaxi, morango ou maracujá (400ml)',
    price: 9.90,
    image: 'https://images.pexels.com/photos/338713/pexels-photo-338713.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'drinks'
  },
  {
    id: 'dessert-1',
    name: 'Brownie com Sorvete',
    description: 'Brownie de chocolate com sorvete de creme e calda de chocolate',
    price: 18.90,
    image: 'https://images.pexels.com/photos/2373520/pexels-photo-2373520.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'desserts'
  },
  {
    id: 'snack-1',
    name: 'Batata Frita',
    description: 'Porção de batatas fritas crocantes com molho especial',
    price: 22.90,
    image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'snacks'
  },
  {
    id: 'snack-2',
    name: 'Onion Rings',
    description: 'Anéis de cebola empanados e fritos, acompanha molho barbecue',
    price: 24.90,
    image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'snacks'
  }
];

export const leisureActivities: LeisureActivity[] = [
  {
    id: 'game-1',
    name: 'Fliperama',
    description: 'Máquinas de fliperama clássicas com os melhores jogos dos anos 80 e 90',
    image: 'https://images.pexels.com/photos/2928281/pexels-photo-2928281.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 'game-2',
    name: 'Mesa de Sinuca',
    description: 'Mesas de sinuca profissionais para momentos de diversão entre amigos',
    image: 'https://images.pexels.com/photos/10286879/pexels-photo-10286879.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 'game-3',
    name: 'Consoles de Videogame',
    description: 'Consoles modernos com os jogos mais populares da atualidade',
    image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 'game-4',
    name: 'Jogos de Tabuleiro',
    description: 'Ampla coleção de jogos de tabuleiro para todos os gostos e idades',
    image: 'https://images.pexels.com/photos/776654/pexels-photo-776654.jpeg?auto=compress&cs=tinysrgb&w=600'
  }
];