/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { OrderDetail } from "../../interfaces/OrderDetail";
import {
  getAllOrderDetails,
  getOrderDetailById
} from "../../services/OrderDetailService";
import Button from "../../components/Button";

function OrderDetails() {
  const [orders, setOrders] = useState<OrderDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<OrderDetail | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const navigate = useNavigate();

  const handleView = async (id: number) => {
    try {
      const detail = await getOrderDetailById(id);
      setSelectedOrder(detail);
      dialogRef.current?.showModal();
    } catch (err: any) {
      alert(err.message);
    }
  };

  useEffect(() => {
    getAllOrderDetails()
      .then(setOrders)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="order-list">
      <h1 className="order-list__title">Historical Order List</h1>
      <Button
        ButtonClassName="order-list__add-btn"
        ButtonText="Add New Order"
        ButonOnClick={() => navigate("/order/new")}
      />
      {loading && <p className="order-list__loading">Cargando...</p>}
      {error && <p className="order-list__error">Error: {error}</p>}

      <table className="order-list__table">
        <thead className="order-list__table-head">
          <tr>
            <th colSpan={5} className="order-list__section-title">
              🧍 Customer
            </th>
            <th colSpan={5} className="order-list__section-title">
              📦 Product
            </th>
            <th className="order-list__section-title">Acciones</th>
          </tr>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>DNI Number</th>
            <th>Address</th>
            <th>Register Date</th>
            <th>Product Name</th>
            <th>Product Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>View Order</th>
          </tr>
        </thead>
        <tbody className="order-list__table-body">
          {orders.map((o) => (
            <tr key={o.OrderDetailId} className="order-list__row">
              <td>{o.CustomerName}</td>
              <td>{o.CustomerEmail}</td>
              <td>{o.CustomerDni}</td>
              <td>{o.CustomerAddress}</td>
              <td>
                {new Date(o.CustomerRegistrationDate).toLocaleDateString()}
              </td>
              <td>{o.ProductName}</td>
              <td>{o.ProductDescription}</td>
              <td>${o.ProductPrice}</td>
              <td>{o.ProductQuantity}</td>
              <td>${o.TotalPrice}</td>
              <td className="order-list__actions">
                <i
                  className="fa-solid fa-eye order-list__icon"
                  onClick={() => handleView(o.OrderDetailId)}
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <dialog ref={dialogRef} className="order-list__dialog">
        {selectedOrder && (
          <div className="order-list__dialog-content">
            <h2 className="order-list__dialog-title">Detalle de la Orden</h2>
            <div className="order-list__dialog-section">
              <h3 className="order-list__dialog-subtitle">🧍 Cliente</h3>
              <p className="order-list__dialog-text">
                <strong>Nombre:</strong> {selectedOrder.CustomerName}
              </p>
              <p className="order-list__dialog-text">
                <strong>Email:</strong> {selectedOrder.CustomerEmail}
              </p>
              <p className="order-list__dialog-text">
                <strong>DNI:</strong> {selectedOrder.CustomerDni}
              </p>
              <p className="order-list__dialog-text">
                <strong>Dirección:</strong> {selectedOrder.CustomerAddress}
              </p>
              <p className="order-list__dialog-text">
                <strong>Registrado:</strong>{" "}
                {selectedOrder.CustomerRegistrationDate.toLocaleDateString()}
              </p>
            </div>
            <hr className="order-list__dialog-divider" />
            <div className="order-list__dialog-section">
              <h3 className="order-list__dialog-subtitle">
                📦 Producto Comprado
              </h3>
              <p className="order-list__dialog-text">
                <strong>Nombre:</strong> {selectedOrder.ProductName}
              </p>
              <p className="order-list__dialog-text">
                <strong>Descripción:</strong> {selectedOrder.ProductDescription}
              </p>
              <p className="order-list__dialog-text">
                <strong>Precio:</strong> ${selectedOrder.ProductPrice}
              </p>
              <p className="order-list__dialog-text">
                <strong>Cantidad:</strong> {selectedOrder.ProductQuantity}
              </p>
              <p className="order-list__dialog-text">
                <strong>Total:</strong> ${selectedOrder.TotalPrice}
              </p>
            </div>
            <Button
              ButtonClassName="order-list__dialog-close-btn"
              ButtonText="Close"
              ButonOnClick={() => dialogRef.current?.close()}
            />
          </div>
        )}
      </dialog>
    </div>
  );
}

export default OrderDetails;
