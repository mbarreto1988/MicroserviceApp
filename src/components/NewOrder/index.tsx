import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Customer } from "../../interfaces/Customer";
import { Product } from "../../interfaces/Products";
import {
  getCustomersOrder,
  getProductsorder,
  createOrder
} from "../../services/OrderService";

function NewOrder() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [orderQuantity, setOrderQuantity] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [stock, setStock] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    getCustomersOrder()
      .then(setCustomers)
      .catch((err) => console.error(err));

    getProductsorder()
      .then(setProducts)
      .catch((err) => console.error(err));
  }, []);

  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const productId = parseInt(e.target.value);
    setSelectedProduct(productId);

    const product = products.find((p) => p.ProductId === productId);
    if (product) {
      setStock(product.ProductStock);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCustomer || !selectedProduct || orderQuantity <= 0) {
      setError("Todos los campos son requeridos.");
      return;
    }
    if (orderQuantity > stock) {
      setError(`Solo puede pedir hasta ${stock} unidades.`);
      return;
    }

    try {
      await createOrder({
        customerId: selectedCustomer,
        productId: selectedProduct,
        orderQuantity
      });
      navigate("/order-details");
    } catch {
      setError("Hubo un error al crear la orden.");
    }
  };

  return (
    <div className="new-order">
      <h1 className="new-order__title">Agregar Nueva Orden</h1>
      {error && <p className="new-order__error">{error}</p>}
      <form onSubmit={handleSubmit} className="new-order__form">
        <div className="new-order__field">
          <label htmlFor="customer" className="new-order__label">
            Cliente
          </label>
          <select
            id="customer"
            className="new-order__select"
            onChange={(e) => setSelectedCustomer(parseInt(e.target.value))}
            value={selectedCustomer || ""}
            required
          >
            <option value="">Seleccione un cliente</option>
            {customers.map((customer) => (
              <option
                key={`customer-${customer.CustomerId}`}
                value={customer.CustomerId}
              >
                {customer.CustomerName}
              </option>
            ))}
          </select>
        </div>

        <div className="new-order__field">
          <label htmlFor="product" className="new-order__label">
            Producto
          </label>
          <select
            id="product"
            className="new-order__select"
            onChange={handleProductChange}
            value={selectedProduct || ""}
            required
          >
            <option value="">Seleccione un producto</option>
            {products.map((product) => (
              <option
                key={`product-${product.ProductId}`}
                value={product.ProductId}
              >
                {product.ProductName}
              </option>
            ))}
          </select>
        </div>

        {selectedProduct && stock === 0 ? (
          <p className="new-order__warning">Producto sin stock.</p>
        ) : (
          selectedProduct && (
            <p style={{ color: "blue", marginTop: "5px" }}>
              {stock} unidades disponibles
            </p>
          )
        )}

        <div className="new-order__field">
          <label htmlFor="quantity" className="new-order__label">
            Cantidad
          </label>
          <input
            type="number"
            id="quantity"
            className="new-order__input"
            value={orderQuantity}
            onChange={(e) => setOrderQuantity(parseInt(e.target.value))}
            required
          />
        </div>

        <button type="submit" className="new-order__submit">
          Crear Orden
        </button>
      </form>
    </div>
  );
}

export default NewOrder;
