import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../../services/ProductService";
import Button from "../../components/Button";

function AddProduct() {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    productName: "",
    productDescription: "",
    productPrice: "",
    productStock: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addProduct({
        ProductId: 0,
        ProductName: product.productName,
        ProductDescription: product.productDescription,
        ProductPrice: parseFloat(product.productPrice),
        ProductStock: parseInt(product.productStock)
      });

      navigate("/products");
    } catch (err) {
      console.error("Error al agregar producto", err);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-container__title">Agregar Producto</h2>
      <form className="form-container__form" onSubmit={handleSubmit}>
        <input
          className="form-container__form-input"
          name="productName"
          placeholder="Nombre"
          onChange={handleChange}
          required
        />
        <input
          className="form-container__form-input"
          name="productDescription"
          placeholder="Descripción"
          onChange={handleChange}
          required
        />
        <input
          className="form-container__form-input"
          name="productPrice"
          placeholder="Precio"
          type="number"
          step="0.01"
          onChange={handleChange}
          required
        />
        <input
          className="form-container__form-input"
          name="productStock"
          placeholder="Stock"
          type="number"
          onChange={handleChange}
          required
        />
        <Button
          ButtonType="submit"
          ButtonClassName="form-container__form-button"
          ButtonText="Add Product"
        />
      </form>
    </div>
  );
}

export default AddProduct;
