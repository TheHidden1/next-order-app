export interface Order {
    orderId?: string;
    name: string;
    quantity: number;
    price: number;
  }
  
  export interface OrderState {
    loading: boolean;
    success: string | null;
    error: string | null;
  }
  