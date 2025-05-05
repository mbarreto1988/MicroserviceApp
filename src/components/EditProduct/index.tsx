/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL, AUTH_TOKEN } from "../../config";
import { getProductById } from "../../services/ProductService";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    productId: 0,
    productName: "",
    productDescription: "",
    productPrice: 0,
    productStock: 0
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getProductById(id);
        setForm({
          productId: data.ProductId,
          productName: data.ProductName,
          productDescription: data.ProductDescription,
          productPrice: data.ProductPrice,
          productStock: data.ProductStock
        });
      } catch {
        alert("The product could not be loaded");
      }
    };

    if (id) loadData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name.includes("Price") || name.includes("Stock") ? parseFloat(value) : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/Products/${id}`, {
        method: "PUT",
        headers: {
          Authorization: AUTH_TOKEN,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      if (!res.ok) throw new Error("Error editing product");

      navigate("/products");
    } catch (err) {
      alert("The product could not be edited.");
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-container__title">Editar Producto</h2>
      <form className="form-container__form" onSubmit={handleSubmit}>
        <input
          name="productName"
          placeholder="Nombre"
          value={form.productName}
          onChange={handleChange}
          required
          className="form-container__form-input"
        />
        <input
          name="productDescription"
          placeholder="Descripción"
          value={form.productDescription}
          onChange={handleChange}
          required
          className="form-container__form-input"
        />
        <input
          name="productPrice"
          type="number"
          step="0.01"
          placeholder="Precio"
          value={form.productPrice}
          onChange={handleChange}
          required
          className="form-container__form-input"
        />
        <input
          name="productStock"
          type="number"
          placeholder="Stock"
          value={form.productStock}
          onChange={handleChange}
          required
          className="form-container__form-input"
        />
        <button className="form-container__form-button" type="submit">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditProduct;
