import axios from "axios"

export interface IProduct {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
}
export const getAllProducts = async (): Promise<IProduct[]> => {
  try {
    const res = await axios.get<IProduct[]>("https://fakestoreapi.com/products");
    return res.data;
  } catch (error) {
    throw new Error("Error fetching products");
  }
}
