/* eslint-disable @typescript-eslint/no-explicit-any */
import { OrderDetail } from "../../interfaces/OrderDetail";
import { BASE_URL, AUTH_TOKEN } from "../../config";


const URL = `${BASE_URL}/OrderDetails`;
const HEADERS = {
  Authorization: AUTH_TOKEN,
  "Content-Type": "application/json"
};


export const getAllOrderDetails = async (): Promise<OrderDetail[]> => {
  const res = await fetch(URL, { method: "GET", headers: HEADERS });
  if (!res.ok) throw new Error("Error al traer los detalles");
  const data = await res.json();

  return data.map((o: any) => ({
    OrderDetailId: o.orderDetailId,
    CustomerName: o.customerName,
    CustomerDni: o.customerDni,
    CustomerEmail: o.customerEmail,
    CustomerAddress: o.customerAddress,
    CustomerRegistrationDate: new Date(o.customerRegistrationDate),
    ProductName: o.productName,
    ProductDescription: o.productDescription,
    ProductPrice: o.productPrice,
    ProductQuantity: o.productQuantity,
    TotalPrice: o.totalPrice
  }));
};


export const getOrderDetailById = async (id: number): Promise<OrderDetail> => {
  const res = await fetch(`${URL}/${id}`, { method: "GET", headers: HEADERS });
  if (!res.ok) throw new Error("Error al obtener el detalle");
  const o = await res.json();

  return {
    OrderDetailId: o.orderDetailId,
    CustomerName: o.customerName,
    CustomerDni: o.customerDni,
    CustomerEmail: o.customerEmail,
    CustomerAddress: o.customerAddress,
    CustomerRegistrationDate: new Date(o.customerRegistrationDate),
    ProductName: o.productName,
    ProductDescription: o.productDescription,
    ProductPrice: o.productPrice,
    ProductQuantity: o.productQuantity,
    TotalPrice: o.totalPrice
  };
};
