export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface LeisureActivity {
  id: string;
  name: string;
  description: string;
  image: string;
}