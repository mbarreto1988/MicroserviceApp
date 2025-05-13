import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Customer } from "../../interfaces/Customer";
import { getAllCustomers } from "../../services/CustomerService";
import { handleDeleteCustomer } from "../../helpers/CustomerHelpers";
import Button from "../../components/Button";

function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getAllCustomers()
      .then(setCustomers)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="customer-list">
      <h1 className="customer-list__title">Customer List</h1>
      
      <Button
        ButtonClassName="customer-list__button customer-list__button--add"
        ButtonText="Add Customer"
        ButonOnClick={() => navigate("/customers/add")}
      />

      {loading && <p className="customer-list__message">Cargando...</p>}
      {error && (
        <p className="customer-list__message customer-list__message--error">
          Error: {error}
        </p>
      )}

      <table className="customer-list__table">
        <thead className="customer-list__table-head">
          <tr className="customer-list__table-row">
            <th className="customer-list__table-header">Nmae</th>
            <th className="customer-list__table-header">Email</th>
            <th className="customer-list__table-header">DNI Number</th>
            <th className="customer-list__table-header">Address</th>
            <th className="customer-list__table-header">Created Date</th>
            <th className="customer-list__table-header">Actions</th>
          </tr>
        </thead>
        <tbody className="customer-list__table-body">
          {customers.map((c) => (
            <tr className="customer-list__table-row" key={c.CustomerId}>
              <td className="customer-list__table-cell">{c.CustomerName}</td>
              <td className="customer-list__table-cell">{c.CustomerEmail}</td>
              <td className="customer-list__table-cell">{c.CustomerDni}</td>
              <td className="customer-list__table-cell">{c.CustomerAddress}</td>
              <td className="customer-list__table-cell">
                {new Date(c.CustomerRegistrationDate).toLocaleDateString()}
              </td>
              <td className="customer-list__table-cell">
                <i
                  className="fa-solid fa-pen-to-square customer-list__icon customer-list__icon--edit"
                  onClick={() => navigate(`/customers/edit/${c.CustomerId}`)}
                ></i>
                <i
                  className="fa-solid fa-trash customer-list__icon customer-list__icon--delete"
                  onClick={() => handleDeleteCustomer(c, setCustomers)}
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Customers;
