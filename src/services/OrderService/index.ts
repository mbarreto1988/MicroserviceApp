/* eslint-disable @typescript-eslint/no-explicit-any */
import { Customer } from "../../interfaces/Customer";
import { Product } from "../../interfaces/Products";
import { BASE_URL, AUTH_TOKEN } from "../../config";

const URL = `${BASE_URL}`;
const HEADERS = {
  Authorization: AUTH_TOKEN,
  "Content-Type": "application/json"
};

export const getCustomersOrder = async (): Promise<Customer[]> => {
  const res = await fetch(`${URL}/Customers`, { headers: HEADERS });
  const data = await res.json();

  return data.map((c: any) => ({
    CustomerId: c.customerId,
    CustomerName: c.customerName,
    CustomerEmail: c.customerEmail,
    CustomerAddress: c.customerAddress,
    CustomerDni: c.customerDni,
    CustomerRegistrationDate: new Date(c.customerRegistrationDate)
  }));
};

export const getProductsorder = async (): Promise<Product[]> => {
  const res = await fetch(`${URL}/Products`, { headers: HEADERS });
  const data = await res.json();

  return data.map((p: any) => ({
    ProductId: p.productId,
    ProductName: p.productName,
    ProductDescription: p.productDescription,
    ProductPrice: p.productPrice,
    ProductStock: p.productStock
  }));
};

export const createOrder = async (order: {
  customerId: number;
  productId: number;
  orderQuantity: number;
}) => {
  const res = await fetch(`${URL}/Orders`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify(order)
  });

  if (!res.ok) throw new Error("Error al crear la orden");
};
