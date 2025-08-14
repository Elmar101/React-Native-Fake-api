import axios from "axios"

const BASE_URL = "https://fakestoreapi.com";
export interface IProduct {
  id?: number | string
  title: string
  price: number | string
  description: string
  category: string
  image: string
}
export const getAllProducts = async (): Promise<IProduct[]> => {
  try {
    const res = await axios.get<IProduct[]>(`${BASE_URL}/products`);
    return res.data;
  } catch (error) {
    throw new Error("Error fetching products");
  }
}

export const getProductById = async (id: string): Promise<IProduct> => {
  try {
    const res = await axios.get<IProduct>(`${BASE_URL}/products/${id}`);
    return res.data;
  } catch (error) {
    throw new Error("Error fetching product");
  }
}

export const addProduct = async (product: IProduct): Promise<IProduct> => {
  try {
    const res = await axios.post<IProduct>(`${BASE_URL}/products`, JSON.stringify(product));
    return res.data;
  } catch (error) {
    throw new Error("Error adding product");
  }
}
