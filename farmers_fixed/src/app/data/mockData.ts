export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  unit: string;
  description: string;
  image: string;
  sellerId: string;
  sellerName: string;
  location: string;
  rating: number;
  reviews: number;
  available: boolean;
}

export interface Order {
  id: string;
  productId: string;
  productName: string;
  buyerId: string;
  buyerName: string;
  sellerId: string;
  sellerName: string;
  quantity: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string;
  deliveryDate?: string;
  trackingNumber?: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  receiverName: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Review {
  id: string;
  productId: string;
  sellerId: string;
  buyerId: string;
  buyerName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'farmowner' | 'marketplace';
  location: string;
  phone: string;
  verified: boolean;
  joinDate: string;
  avatar: string;
}

// Farm Management Data
export interface Worker {
  id: string;
  name: string;
  position: string;
  phoneNumber: string;
  dateHired: string;
  status: 'active' | 'inactive' | 'on-leave';
  dailyRate: number;
  tasksCompleted: number;
}

export interface Crop {
  id: string;
  name: string;
  variety: string;
  plantingDate: string;
  expectedHarvest: string;
  area: number;
  status: 'planted' | 'growing' | 'ready' | 'harvested';
  healthStatus: 'excellent' | 'good' | 'needs-attention';
  location: string;
}

export interface Machine {
  id: string;
  name: string;
  type: string;
  status: 'available' | 'in-use' | 'maintenance';
  lastMaintenance: string;
  nextMaintenance: string;
  condition: 'excellent' | 'good' | 'fair' | 'poor';
}

export interface Fertilizer {
  id: string;
  name: string;
  type: string;
  quantity: number;
  unit: string;
  cost: number;
  supplier: string;
  lastPurchase: string;
  minimumStock: number;
}

export interface Task {
  id: string;
  title: string;
  assignedTo: string;
  assignedWorker: string;
  crop: string;
  dueDate: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
}

// Philippine-specific products
export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Rice (Sinandomeng)',
    category: 'Rice & Grains',
    price: 50,
    quantity: 5000,
    unit: 'kg',
    description: 'High-quality Sinandomeng rice from Nueva Ecija. Freshly harvested, clean and aromatic.',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400',
    sellerId: 's1',
    sellerName: 'Gonzales Farm',
    location: 'Nueva Ecija',
    rating: 4.8,
    reviews: 234,
    available: true,
  },
  {
    id: '2',
    name: 'Fresh Carabao Mango',
    category: 'Fruits',
    price: 120,
    quantity: 800,
    unit: 'kg',
    description: 'Sweet and juicy Carabao mangoes from Guimaras. Export quality, perfect for eating fresh.',
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400',
    sellerId: 's2',
    sellerName: 'Santos Mango Plantation',
    location: 'Guimaras',
    rating: 4.9,
    reviews: 312,
    available: true,
  },
  {
    id: '3',
    name: 'Organic Tomatoes',
    category: 'Vegetables',
    price: 40,
    quantity: 1500,
    unit: 'kg',
    description: 'Fresh organic tomatoes from Benguet highlands. Perfect for cooking and salads.',
    image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400',
    sellerId: 's3',
    sellerName: 'Benguet Veggie Hub',
    location: 'Benguet',
    rating: 4.7,
    reviews: 189,
    available: true,
  },
  {
    id: '4',
    name: 'Coconut (Buko)',
    category: 'Fruits',
    price: 30,
    quantity: 2000,
    unit: 'pcs',
    description: 'Fresh young coconuts from Laguna. Sweet water and soft meat, harvested daily.',
    image: 'https://images.unsplash.com/photo-1604368099874-4b1e71d0cd5e?w=400',
    sellerId: 's1',
    sellerName: 'Gonzales Farm',
    location: 'Laguna',
    rating: 4.6,
    reviews: 156,
    available: true,
  },
  {
    id: '5',
    name: 'Pechay (Bok Choy)',
    category: 'Vegetables',
    price: 35,
    quantity: 800,
    unit: 'kg',
    description: 'Fresh pechay from Baguio. Crisp and green, perfect for Filipino dishes.',
    image: 'https://images.unsplash.com/photo-1580471846556-48ee5e97bc82?w=400',
    sellerId: 's3',
    sellerName: 'Benguet Veggie Hub',
    location: 'Baguio',
    rating: 4.5,
    reviews: 98,
    available: true,
  },
  {
    id: '6',
    name: 'Free Range Eggs (Itlog)',
    category: 'Poultry & Eggs',
    price: 180,
    quantity: 500,
    unit: 'tray',
    description: 'Farm-fresh free-range eggs. Rich orange yolks, from happy chickens in Batangas.',
    image: 'https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?w=400',
    sellerId: 's4',
    sellerName: 'Reyes Poultry Farm',
    location: 'Batangas',
    rating: 4.9,
    reviews: 267,
    available: true,
  },
  {
    id: '7',
    name: 'Saba Banana',
    category: 'Fruits',
    price: 45,
    quantity: 1200,
    unit: 'kg',
    description: 'Fresh saba bananas from Mindanao. Perfect for banana-cue, turon, or cooking.',
    image: 'https://images.unsplash.com/photo-1603052875655-c582a8dc3b80?w=400',
    sellerId: 's5',
    sellerName: 'Mindanao Harvest',
    location: 'Davao del Sur',
    rating: 4.8,
    reviews: 201,
    available: true,
  },
  {
    id: '8',
    name: 'Native Chicken (Manok)',
    category: 'Poultry & Eggs',
    price: 220,
    quantity: 150,
    unit: 'kg',
    description: 'Free-range native chicken from Bulacan. Perfect for tinola and other Filipino dishes.',
    image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=400',
    sellerId: 's4',
    sellerName: 'Reyes Poultry Farm',
    location: 'Bulacan',
    rating: 5.0,
    reviews: 178,
    available: true,
  },
];

export const mockOrders: Order[] = [
  {
    id: 'o1',
    productId: '1',
    productName: 'Premium Rice (Sinandomeng)',
    buyerId: 'b1',
    buyerName: 'Maria Santos',
    sellerId: 's1',
    sellerName: 'Gonzales Farm',
    quantity: 100,
    totalPrice: 5000,
    status: 'shipped',
    orderDate: '2026-02-20',
    deliveryDate: '2026-02-27',
    trackingNumber: 'PH-TRK-123456',
  },
  {
    id: 'o2',
    productId: '2',
    productName: 'Fresh Carabao Mango',
    buyerId: 'b2',
    buyerName: 'Juan dela Cruz',
    sellerId: 's2',
    sellerName: 'Santos Mango Plantation',
    quantity: 50,
    totalPrice: 6000,
    status: 'confirmed',
    orderDate: '2026-02-22',
  },
  {
    id: 'o3',
    productId: '6',
    productName: 'Free Range Eggs (Itlog)',
    buyerId: 'b1',
    buyerName: 'Maria Santos',
    sellerId: 's4',
    sellerName: 'Reyes Poultry Farm',
    quantity: 20,
    totalPrice: 3600,
    status: 'delivered',
    orderDate: '2026-02-15',
    deliveryDate: '2026-02-18',
  },
];

export const mockMessages: Message[] = [
  {
    id: 'm1',
    senderId: 'b1',
    senderName: 'Maria Santos',
    receiverId: 's1',
    receiverName: 'Gonzales Farm',
    content: 'Good day! Available pa po ba yung rice? Need ko ng 100kg.',
    timestamp: '2026-02-24T10:30:00',
    read: true,
  },
  {
    id: 'm2',
    senderId: 's1',
    senderName: 'Gonzales Farm',
    receiverId: 'b1',
    receiverName: 'Maria Santos',
    content: 'Yes po, meron pa kami! Fresh harvest. Kailan po ninyo kailangan?',
    timestamp: '2026-02-24T11:00:00',
    read: true,
  },
  {
    id: 'm3',
    senderId: 'b1',
    senderName: 'Maria Santos',
    receiverId: 's1',
    receiverName: 'Gonzales Farm',
    content: 'This week po sana. May delivery ba kayo to Metro Manila?',
    timestamp: '2026-02-24T11:15:00',
    read: false,
  },
];

export const mockReviews: Review[] = [
  {
    id: 'r1',
    productId: '1',
    sellerId: 's1',
    buyerId: 'b1',
    buyerName: 'Maria Santos',
    rating: 5,
    comment: 'Excellent quality rice! Very fresh and aromatic. Highly recommended!',
    date: '2026-02-18',
  },
  {
    id: 'r2',
    productId: '2',
    sellerId: 's2',
    buyerId: 'b2',
    buyerName: 'Juan dela Cruz',
    rating: 5,
    comment: 'Best mangoes! Super sweet and juicy. Will order again!',
    date: '2026-02-20',
  },
];

export const mockUser: User = {
  id: 'u1',
  name: 'Demo User',
  email: 'demo@farmph.com',
  role: 'farmowner',
  location: 'Pampanga, Philippines',
  phone: '+63 917 123 4567',
  verified: true,
  joinDate: '2025-01-15',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
};

// Farm Management Mock Data
export const mockWorkers: Worker[] = [
  {
    id: 'w1',
    name: 'Pedro Martinez',
    position: 'Farm Supervisor',
    phoneNumber: '+63 918 234 5678',
    dateHired: '2023-05-15',
    status: 'active',
    dailyRate: 650,
    tasksCompleted: 245,
  },
  {
    id: 'w2',
    name: 'Rosa Garcia',
    position: 'Harvester',
    phoneNumber: '+63 919 345 6789',
    dateHired: '2024-01-10',
    status: 'active',
    dailyRate: 500,
    tasksCompleted: 189,
  },
  {
    id: 'w3',
    name: 'Jose Reyes',
    position: 'Tractor Operator',
    phoneNumber: '+63 920 456 7890',
    dateHired: '2023-08-20',
    status: 'active',
    dailyRate: 600,
    tasksCompleted: 312,
  },
  {
    id: 'w4',
    name: 'Linda Cruz',
    position: 'Planting Specialist',
    phoneNumber: '+63 921 567 8901',
    dateHired: '2024-03-01',
    status: 'on-leave',
    dailyRate: 550,
    tasksCompleted: 156,
  },
];

export const mockCrops: Crop[] = [
  {
    id: 'c1',
    name: 'Rice',
    variety: 'Sinandomeng',
    plantingDate: '2025-12-01',
    expectedHarvest: '2026-03-15',
    area: 5.5,
    status: 'growing',
    healthStatus: 'excellent',
    location: 'Field A',
  },
  {
    id: 'c2',
    name: 'Corn',
    variety: 'Yellow Sweet Corn',
    plantingDate: '2026-01-15',
    expectedHarvest: '2026-04-20',
    area: 3.2,
    status: 'growing',
    healthStatus: 'good',
    location: 'Field B',
  },
  {
    id: 'c3',
    name: 'Tomatoes',
    variety: 'Roma Tomato',
    plantingDate: '2025-11-10',
    expectedHarvest: '2026-02-28',
    area: 1.8,
    status: 'ready',
    healthStatus: 'excellent',
    location: 'Greenhouse 1',
  },
  {
    id: 'c4',
    name: 'Eggplant (Talong)',
    variety: 'Black Beauty',
    plantingDate: '2025-10-05',
    expectedHarvest: '2026-02-15',
    area: 2.0,
    status: 'harvested',
    healthStatus: 'excellent',
    location: 'Field C',
  },
];

export const mockMachines: Machine[] = [
  {
    id: 'm1',
    name: 'Kubota Tractor M7040',
    type: 'Tractor',
    status: 'available',
    lastMaintenance: '2026-01-15',
    nextMaintenance: '2026-04-15',
    condition: 'excellent',
  },
  {
    id: 'm2',
    name: 'Rice Harvester',
    type: 'Harvester',
    status: 'in-use',
    lastMaintenance: '2025-12-20',
    nextMaintenance: '2026-03-20',
    condition: 'good',
  },
  {
    id: 'm3',
    name: 'Water Pump System',
    type: 'Irrigation',
    status: 'available',
    lastMaintenance: '2026-02-01',
    nextMaintenance: '2026-05-01',
    condition: 'excellent',
  },
  {
    id: 'm4',
    name: 'Hand Tractor',
    type: 'Tractor',
    status: 'maintenance',
    lastMaintenance: '2026-02-20',
    nextMaintenance: '2026-03-05',
    condition: 'fair',
  },
];

export const mockFertilizers: Fertilizer[] = [
  {
    id: 'f1',
    name: 'Urea (46-0-0)',
    type: 'Nitrogen Fertilizer',
    quantity: 500,
    unit: 'kg',
    cost: 25,
    supplier: 'Planters Products Inc.',
    lastPurchase: '2026-02-01',
    minimumStock: 200,
  },
  {
    id: 'f2',
    name: 'Complete (14-14-14)',
    type: 'NPK Fertilizer',
    quantity: 350,
    unit: 'kg',
    cost: 30,
    supplier: 'Atlas Fertilizer',
    lastPurchase: '2026-01-20',
    minimumStock: 150,
  },
  {
    id: 'f3',
    name: 'Organic Compost',
    type: 'Organic Fertilizer',
    quantity: 800,
    unit: 'kg',
    cost: 15,
    supplier: 'Local Supplier',
    lastPurchase: '2026-02-10',
    minimumStock: 300,
  },
  {
    id: 'f4',
    name: 'Ammonium Sulfate',
    type: 'Nitrogen Fertilizer',
    quantity: 180,
    unit: 'kg',
    cost: 22,
    supplier: 'Planters Products Inc.',
    lastPurchase: '2026-01-25',
    minimumStock: 200,
  },
];

export const mockTasks: Task[] = [
  {
    id: 't1',
    title: 'Irrigate Rice Field A',
    assignedTo: 'w1',
    assignedWorker: 'Pedro Martinez',
    crop: 'Rice - Sinandomeng',
    dueDate: '2026-02-28',
    status: 'completed',
    priority: 'high',
  },
  {
    id: 't2',
    title: 'Apply Fertilizer to Corn Field',
    assignedTo: 'w2',
    assignedWorker: 'Rosa Garcia',
    crop: 'Corn - Yellow Sweet Corn',
    dueDate: '2026-03-01',
    status: 'in-progress',
    priority: 'high',
  },
  {
    id: 't3',
    title: 'Harvest Tomatoes from Greenhouse',
    assignedTo: 'w2',
    assignedWorker: 'Rosa Garcia',
    crop: 'Tomatoes - Roma',
    dueDate: '2026-02-28',
    status: 'in-progress',
    priority: 'high',
  },
  {
    id: 't4',
    title: 'Plow Field C for Next Planting',
    assignedTo: 'w3',
    assignedWorker: 'Jose Reyes',
    crop: 'Preparation',
    dueDate: '2026-03-05',
    status: 'pending',
    priority: 'medium',
  },
  {
    id: 't5',
    title: 'Check Irrigation System',
    assignedTo: 'w1',
    assignedWorker: 'Pedro Martinez',
    crop: 'General Maintenance',
    dueDate: '2026-03-02',
    status: 'pending',
    priority: 'medium',
  },
];

export const harvestData = [
  { month: 'Sep', harvest: 2500 },
  { month: 'Oct', harvest: 3200 },
  { month: 'Nov', harvest: 2800 },
  { month: 'Dec', harvest: 3500 },
  { month: 'Jan', harvest: 4200 },
  { month: 'Feb', harvest: 3800 },
];

export const expenseData = [
  { category: 'Fertilizers', amount: 45000 },
  { category: 'Labor', amount: 78000 },
  { category: 'Equipment', amount: 32000 },
  { category: 'Seeds', amount: 25000 },
  { category: 'Utilities', amount: 18000 },
];
