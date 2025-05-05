/* eslint-disable @typescript-eslint/no-explicit-any */
import { Product } from "../../interfaces/Products";
import { BASE_URL, AUTH_TOKEN } from "../../config";


const URL = `${BASE_URL}/Products`;
const HEADERS = {
  Authorization: AUTH_TOKEN,
  "Content-Type": "application/json"
};


export const getAllProducts = async (): Promise<Product[]> => {
  const res = await fetch(URL, { method: "GET", headers: HEADERS });
  if (!res.ok) throw new Error("Error al traer los productos");

  const data = await res.json();
  return data.map((p: any) => ({
    ProductId: p.productId,
    ProductName: p.productName,
    ProductDescription: p.productDescription,
    ProductPrice: p.productPrice,
    ProductStock: p.productStock
  }));
};


export const getProductById = async (id: string | undefined): Promise<Product> => {
  const res = await fetch(`${URL}/${id}`, {
    method: "GET",
    headers: HEADERS
  });
  if (!res.ok) throw new Error("Error al traer producto");

  const data = await res.json();

  return{
    ProductId: data.productId,
    ProductName: data.productName,
    ProductDescription: data.productDescription,
    ProductPrice: data.productPrice,
    ProductStock: data.productStock
  };
};


export const addProduct = async (body: Product): Promise<void> => {
  const res = await fetch(`${URL}`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify(body)
  });

  if (!res.ok) throw new Error("Error al agregar producto");
};


export const deleteProduct = async (id: number) => {
  const res = await fetch(`${URL}/${id}`, {
    method: "DELETE",
    headers: HEADERS
  });
  if (!res.ok) throw new Error("Error al eliminar el producto");
};
