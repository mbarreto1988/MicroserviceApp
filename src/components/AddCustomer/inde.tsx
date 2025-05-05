import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleAddCustomerSubmit } from '../../helpers/CustomerHelpers'
import { createCustomer } from "../../services/CustomerService";

function AddCustomer() {
  const [form, setForm] = useState({
    customerName: "",
    customerEmail: "",
    customerAddress: "",
    customerDni: ""
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="form-container">
      <h2 className="form-container__title">Agregar Customer</h2>
      <form className="form-container__form" onSubmit={(e) => handleAddCustomerSubmit(e, form, createCustomer, navigate)}>
        <input
          className="form-container__form-input"
          name="customerName"
          placeholder="Nombre"
          onChange={handleChange}
          required
        />
        <input
          className="form-container__form-input"
          name="customerEmail"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          className="form-container__form-input"
          name="customerAddress"
          placeholder="Dirección"
          onChange={handleChange}
          required
        />
        <input
          className="form-container__form-input"
          name="customerDni"
          placeholder="DNI"
          onChange={handleChange}
          required
        />
        <button className="form-container__form-button" type="submit">
          Add Customer
        </button>
      </form>
    </div>
  );
}

export default AddCustomer;
