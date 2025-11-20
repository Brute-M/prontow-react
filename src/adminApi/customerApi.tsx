import adminInstance from "./adminInstance";

// Get all customers
export const getCustomers = () => adminInstance.get("/customers");

// Delete a customer by ID
export const deleteCustomer = (customerId: string) =>
  adminInstance.delete(`/customers/${customerId}`);

// Update customer status by ID
export const updateCustomerStatus = (customerId: string, isBlocked: boolean) =>
  adminInstance.patch(`/customers/${customerId}/status`, { status: isBlocked });