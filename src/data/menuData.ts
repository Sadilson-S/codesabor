import { Category, MenuItem, LeisureActivity } from '../types/types';

export const categories: Category[] = [
  { id: 'fastfood', name: 'Fast Foods & Pratos Principais', icon: 'burger' },
  { id: 'combos', name: 'Combos', icon: 'utensils' },
  { id: 'adicionais', name: 'Adicionais', icon: 'utensils' },
  { id: 'bebidas', name: 'Bebidas', icon: 'cup' },
  { id: 'doces', name: 'Doces', icon: 'cake' },
  { id: 'quitutes', name: 'Quitutes', icon: 'utensils' },
];

export const menuItems: MenuItem[] = [
  // Fast Foods & Pratos Principais
  {
    id: 'fast-1',
    name: 'Franguité',
    description: 'Delicioso frango frito preparado com temperos especiais',
    price: 2000,
    image: 'https://angola24horas.com/media/k2/items/cache/06ca55231cc39a90922410bb36eedc2f_XL.jpg',
    category: 'fastfood'
  },
  {
    id: 'fast-2',
    name: 'Hambúrguer de carne',
    description: 'Hambúrguer de carne com preço promocional para os primeiros 10 pedidos',
    price: 1800,
    image: 'https://www.estadao.com.br/resizer/v2/4HBOLGM345HTNE6YJQSWJCF5KI.jpg?quality=80&auth=fcf1e46a85e032fa1035b39d3563f1ec2ea5e91828338eafef3c295073df08d5&width=380',
    category: 'fastfood'
  },
  {
    id: 'fast-2b',
    name: 'Hambúrguer de carne (regular)',
    description: 'Hambúrguer de carne após os primeiros 10 pedidos',
    price: 2300,
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'fastfood'
  },
  {
    id: 'fast-3',
    name: 'Tábuas de churrasco',
    description: 'Seleção de carnes grelhadas servidas em tábua de madeira',
    price: 5000,
    image: 'https://www.kingsford.com/wp-content/uploads/2023/05/KFD_ArgentinianChurrasco_3qtr_v2_s04_72-Desktop.jpg?nocache=1',
    category: 'fastfood'
  },
  {
    id: 'fast-4',
    name: 'SQLBURGER (Hambúrguer de frango)',
    description: 'Hambúrguer especial feito com frango grelhado',
    price: 2300,
    image: 'https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'fastfood'
  },
  {
    id: 'fast-5',
    name: 'Tacos',
    description: 'Tacos tradicionais com recheio à sua escolha',
    price: 1500,
    image: 'https://images.pexels.com/photos/2092507/pexels-photo-2092507.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'fastfood'
  },
  {
    id: 'fast-6',
    name: 'Fahita',
    description: 'Fahita tradicional com carne e legumes',
    price: 1800,
    image: 'https://images.pexels.com/photos/2233729/pexels-photo-2233729.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'fastfood'
  },
  {
    id: 'fast-7',
    name: 'Espetos',
    description: 'Espetos de carne grelhados na hora',
    price: 1850,
    image: 'https://media-cdn.tripadvisor.com/media/photo-s/0e/19/9b/46/espetos-da-casa.jpg',
    category: 'fastfood'
  },
  {
    id: 'fast-8',
    name: 'Crepes börek',
    description: 'Crepes tradicionais estilo börek',
    price: 500,
    image: 'https://www.yumlista.com/storage/recipes/uWKNgHtPVxruHWQbgxXvSeqcuLhnAjzmKN5v23D1.jpg',
    category: 'fastfood'
  },
  
  // Combos
  {
    id: 'combo-1',
    name: 'Hamburger + batata recheada + bebida (bega bué de ahhh)',
    description: 'Combo completo com hambúrguer, batata recheada e bebida à sua escolha',
    price: 4000,
    image: 'https://images.pexels.com/photos/3616956/pexels-photo-3616956.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'combos'
  },
  {
    id: 'combo-2',
    name: 'Taco + sumo natural + molho especial (betinhagens e Pam Pam Pam)',
    description: 'Combo com taco, suco natural e molho especial da casa',
    price: 2000,
    image: 'https://images.pexels.com/photos/2092507/pexels-photo-2092507.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'combos'
  },
  {
    id: 'combo-3',
    name: 'Asinhas + batatas recheadas + bebida (As Dobras)',
    description: 'Combo com asinhas de frango, batatas recheadas e bebida',
    price: 2500,
    image: 'https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'combos'
  },
  {
    id: 'combo-4',
    name: 'Fahita + batatas recheadas + bebida (Flexis agoura)',
    description: 'Combo com fahita, batatas recheadas e bebida',
    price: 3000,
    image: 'https://images.pexels.com/photos/2233729/pexels-photo-2233729.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'combos'
  },
  
  // Adicionais
  {
    id: 'adicional-1',
    name: 'Dose de batata',
    description: 'Porção adicional de batatas fritas',
    price: 500,
    image: 'https://m.ftscrt.com/food/7895c38e-7cd1-412b-b575-55215d9935a1_lg_sq.jpg',
    category: 'adicionais'
  },
  {
    id: 'adicional-2',
    name: 'Dose de banana',
    description: 'Porção adicional de banana frita',
    price: 500,
    image: 'https://i.ytimg.com/vi/H_y37yCmBko/maxresdefault.jpg',
    category: 'adicionais'
  },
  
  // Bebidas Gaseificadas
  {
    id: 'bebida-1',
    name: 'SevenUp',
    description: 'Refrigerante SevenUp gelado',
    price: 550,
    image: 'https://newemerald.co.uk/cdn/shop/files/7up_2000x_8c9bcd26-7b70-46af-9453-1f5476ff47df.jpg?v=1703873301',
    category: 'bebidas'
  },
  {
    id: 'bebida-2',
    name: 'Sumol de ananás',
    description: 'Refrigerante Sumol sabor ananás',
    price: 600,
    image: 'https://www.portugalvineyards.com/102919/sumol-pineapple-juice-in-can.jpg',
    category: 'bebidas'
  },
  {
    id: 'bebida-3',
    name: 'Pepsi',
    description: 'Refrigerante Pepsi gelado',
    price: 500,
    image: 'https://italy-h24.it/111-large_default/pepsi-cola-33cl.jpg',
    category: 'bebidas'
  },
  
  // Bebidas Naturais
  {
    id: 'bebida-4',
    name: 'Sumo de ananás com hortelã',
    description: 'Suco natural de abacaxi com hortelã',
    price: 600,
    image: 'https://images.pexels.com/photos/338713/pexels-photo-338713.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'bebidas'
  },
  {
    id: 'bebida-5',
    name: 'Sumo de maracujá',
    description: 'Suco natural de maracujá',
    price: 600,
    image: 'https://viral.sapo.pt/wp-content/uploads/2023/10/shutterstock_501025519-825x500.jpg',
    category: 'bebidas'
  },
  {
    id: 'bebida-6',
    name: 'Sumo de maracujá com Pitaia',
    description: 'Suco natural de maracujá com pitaia',
    price: 600,
    image: 'https://images.pexels.com/photos/338713/pexels-photo-338713.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'bebidas'
  },
  {
    id: 'bebida-7',
    name: 'Sumo de múcua',
    description: 'Suco natural de múcua (baobá)',
    price: 500,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZEbBcPB2NqQrfEx68pxAYyyJcAuIbm1uUhA&s',
    category: 'bebidas'
  },
  
  // Doces
  {
    id: 'doce-1',
    name: 'Bolas de Berlim recheadas',
    description: 'Tradicionais bolas de berlim com recheio',
    price: 400,
    image: 'https://www.pingodoce.pt/wp-content/uploads/2017/09/bola-de-berlim.jpg',
    category: 'doces'
  },
  {
    id: 'doce-2',
    name: 'Bolo no pote',
    description: 'Delicioso bolo servido no pote',
    price: 1200,
    image: 'https://images.pexels.com/photos/2373520/pexels-photo-2373520.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'doces'
  },
  {
    id: 'doce-3',
    name: 'Mini Churros',
    description: 'Mini churros com doce de leite',
    price: 100,
    image: 'https://images.pexels.com/photos/2373520/pexels-photo-2373520.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'doces'
  },
  {
    id: 'doce-4',
    name: 'Gelado (copo)',
    description: 'Sorvete servido em copo',
    price: 500,
    image: 'https://images.pexels.com/photos/2373520/pexels-photo-2373520.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'doces'
  },
  {
    id: 'doce-5',
    name: 'Pipoca de leite',
    description: 'Pipoca doce caramelizada',
    price: 250,
    image: 'https://images.pexels.com/photos/2373520/pexels-photo-2373520.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'doces'
  },
  {
    id: 'doce-6',
    name: 'Algodão doce',
    description: 'Tradicional algodão doce',
    price: 300,
    image: 'https://images.pexels.com/photos/2373520/pexels-photo-2373520.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'doces'
  },
  {
    id: 'doce-7',
    name: 'Crepes (Nutella & banana/ doce de leite)',
    description: 'Crepes doces com recheios à escolha',
    price: 1000,
    image: 'https://images.pexels.com/photos/2373520/pexels-photo-2373520.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'doces'
  },
  
  // Quitutes
  {
    id: 'quitute-1',
    name: 'Paracuca',
    description: 'Tradicional paracuca',
    price: 150,
    image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'quitutes'
  },
  {
    id: 'quitute-2',
    name: 'Banana chips',
    description: 'Chips crocantes de banana',
    price: 250,
    image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'quitutes'
  },
  {
    id: 'quitute-3',
    name: 'Ovo fervido',
    description: 'Ovo cozido temperado',
    price: 250,
    image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'quitutes'
  },
  {
    id: 'quitute-4',
    name: 'Pé de moleque',
    description: 'Tradicional doce de amendoim',
    price: 100,
    image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'quitutes'
  },
  {
    id: 'quitute-5',
    name: 'Gelado de múcua',
    description: 'Sorvete de múcua (baobá)',
    price: 200,
    image: 'https://i.ytimg.com/vi/56x1v8479nQ/maxresdefault.jpg',
    category: 'quitutes'
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