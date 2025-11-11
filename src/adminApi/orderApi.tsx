import adminInstance from "./adminInstance";

// Get all orders
export const getOrders = () => adminInstance.get('/orders/admin');