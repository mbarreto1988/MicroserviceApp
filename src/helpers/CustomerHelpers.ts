/* eslint-disable @typescript-eslint/no-explicit-any */
import { Customer } from "../interfaces/Customer";
import { deleteCustomer } from "../services/CustomerService";


type CreateCustomerFn = (
  body: Omit<Customer, "CustomerId" | "CustomerRegistrationDate">
) => Promise<void>;
type NavigateFn = (path: string) => void;


export const handleAddCustomerSubmit = async (
  e: React.FormEvent,
  form: any,
  createCustomer: CreateCustomerFn,
  navigate: NavigateFn
) => {
  e.preventDefault();

  const body = {
    CustomerId: form.customerId,
    CustomerName: form.customerName,
    CustomerEmail: form.customerEmail,
    CustomerAddress: form.customerAddress,
    CustomerDni: form.customerDni,
    CustomerRegistrationDate: new Date()
  };

  try {
    await createCustomer(body);
    navigate("/customers");
  } catch {
    alert("No se pudo guardar el cliente");
  }
};


export const handleDeleteCustomer = async (
  customer: Customer,
  setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>
) => {
  const confirmDelete = window.confirm(
    `¿Estás seguro que querés eliminar el cliente ${customer.CustomerName}?`
  );
  if (!confirmDelete) return;

  try {
    await deleteCustomer(customer.CustomerId);
    setCustomers((prev) =>
      prev.filter((c) => c.CustomerId !== customer.CustomerId)
    );
  } catch (err: any) {
    alert(`Error: ${err.message}`);
  }
};
