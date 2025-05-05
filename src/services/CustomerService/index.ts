/* eslint-disable @typescript-eslint/no-explicit-any */
import { Customer } from "../../interfaces/Customer";
import { BASE_URL, AUTH_TOKEN } from "../../config";


const URL = `${BASE_URL}/Customers`;
const HEADERS = {
  Authorization: AUTH_TOKEN,
  "Content-Type": "application/json"
};


export const getAllCustomers = async (): Promise<Customer[]> => {
  const res = await fetch(URL, {
    method: "GET",
    headers: HEADERS
  });

  if (!res.ok) throw new Error("Error al traer los clientes");

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


export const getCustomerById = async (id: string): Promise<Customer> => {
  const res = await fetch(`${URL}/${id}`, {
    method: "GET",
    headers: HEADERS
  });

  if (!res.ok) throw new Error("Error al traer cliente");

  const data = await res.json();

  return {
    CustomerId: data.customerId,
    CustomerName: data.customerName,
    CustomerEmail: data.customerEmail,
    CustomerAddress: data.customerAddress,
    CustomerDni: data.customerDni,
    CustomerRegistrationDate: new Date(data.customerRegistrationDate)
  };
};


export const createCustomer = async (body: Omit<Customer, "CustomerId" | "CustomerRegistrationDate">) => {
  const res = await fetch(URL, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify(body)
  });

  if (!res.ok) throw new Error("Error al crear el cliente");
};


export const updateCustomer = async (id: string, body: Customer) => {
  const res = await fetch(`${URL}/${id}`, {
    method: "PUT",
    headers: HEADERS,
    body: JSON.stringify(body)
  });

  if (!res.ok) throw new Error("Error al editar cliente");
};


export const deleteCustomer = async (id: number): Promise<void> => {
  const res = await fetch(`${URL}/${id}`, {
    method: "DELETE",
    headers: HEADERS
  });

  if (!res.ok) throw new Error("Error al eliminar el cliente");
};