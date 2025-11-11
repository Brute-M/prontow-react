import adminInstance from "./adminInstance";


export const getAllProducts = () => adminInstance.get('/products');
export const getProductById = ({id}) => adminInstance.get(`/products/${id}`);
export const addProduct = ({data}) => adminInstance.post('/products', data);
export const updateProduct = ({id, data}) => adminInstance.put(`/products/${id}`, data);
export const deleteProduct = ({id}) => adminInstance.delete(`/products/${id}`);
