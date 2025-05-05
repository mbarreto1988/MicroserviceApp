import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "../../interfaces/Products";
import { getAllProducts } from "../../services/ProductService";
import { handleDeleteProduct } from "../../helpers/ProductHelpers";

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getAllProducts()
      .then(setProducts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (product: Product) => {
    handleDeleteProduct(product, setProducts);
  };

  return (
    <div className="product-list">
      <h1 className="product-list__title">Product List</h1>

      <button
        className="product-list__button product-list__button--add"
        onClick={() => navigate("/products/add")}
      >
        Add Product
      </button>

      {loading && <p className="product-list__message">Cargando...</p>}
      {error && (
        <p className="product-list__message product-list__message--error">
          Error: {error}
        </p>
      )}

      <table className="product-list__table">
        <thead className="product-list__table-head">
          <tr className="product-list__table-row">
            <th className="product-list__table-header">Name</th>
            <th className="product-list__table-header">Price</th>
            <th className="product-list__table-header">Description</th>
            <th className="product-list__table-header">Stock</th>
            <th className="product-list__table-header">Actions</th>
          </tr>
        </thead>
        <tbody className="product-list__table-body">
          {products.map((p) => (
            <tr className="product-list__table-row" key={p.ProductId}>
              <td className="product-list__table-cell">{p.ProductName}</td>
              <td className="product-list__table-cell">${p.ProductPrice}</td>
              <td className="product-list__table-cell">
                {p.ProductDescription}
              </td>
              <td className="product-list__table-cell">{p.ProductStock}</td>
              <td className="product-list__table-cell">
                <i
                  className="fa-solid fa-pen-to-square product-list__icon product-list__icon--edit"
                  onClick={() => navigate(`/products/edit/${p.ProductId}`)}
                ></i>
                <i
                  className="fa-solid fa-trash product-list__icon product-list__icon--delete"
                  onClick={() => handleDelete(p)}
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Products;
