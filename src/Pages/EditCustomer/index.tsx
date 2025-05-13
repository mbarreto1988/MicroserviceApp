import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getCustomerById,
  updateCustomer
} from "../../services/CustomerService";
import Button from "../../components/Button";

function EditCustomer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    customerId: 0,
    customerName: "",
    customerEmail: "",
    customerAddress: "",
    customerDni: ""
  });

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const data = await getCustomerById(id!);
        setForm({
          customerId: data.CustomerId,
          customerName: data.CustomerName,
          customerEmail: data.CustomerEmail,
          customerAddress: data.CustomerAddress,
          customerDni: data.CustomerDni
        });
      } catch {
        alert("No se pudo cargar el cliente");
      }
    };

    fetchCustomer();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateCustomer(id!, {
        CustomerId: form.customerId,
        CustomerName: form.customerName,
        CustomerEmail: form.customerEmail,
        CustomerAddress: form.customerAddress,
        CustomerDni: form.customerDni,
        CustomerRegistrationDate: new Date()
      });

      navigate("/customers");
    } catch {
      alert("No se pudo editar el cliente");
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-container__title">Editar Customer</h2>
      <form className="form-container__form" onSubmit={handleSubmit}>
        <input
          className="form-container__form-input"
          name="customerName"
          placeholder="Nombre"
          value={form.customerName}
          onChange={handleChange}
          required
        />
        <input
          className="form-container__form-input"
          name="customerEmail"
          placeholder="Email"
          value={form.customerEmail}
          onChange={handleChange}
          required
        />
        <input
          className="form-container__form-input"
          name="customerAddress"
          placeholder="Dirección"
          value={form.customerAddress}
          onChange={handleChange}
          required
        />
        <input
          className="form-container__form-input"
          name="customerDni"
          placeholder="DNI"
          value={form.customerDni}
          onChange={handleChange}
          required
        />
        <Button
          ButtonType="submit"
          ButtonClassName="form-container__form-button"
          ButtonText="Save Changes"
        />
      </form>
    </div>
  );
}

export default EditCustomer;
