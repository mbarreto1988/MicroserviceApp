/* eslint-disable @typescript-eslint/no-explicit-any */
import { Product } from "../interfaces/Products";
import { deleteProduct } from "../services/ProductService";


export const handleDeleteProduct = async (
  product: Product,
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>
) => {
  const confirm = window.confirm(`¿Estás seguro que querés eliminar ${product.ProductName}?`);
  if (!confirm) return;

  try {
    await deleteProduct(product.ProductId);
    setProducts((prev) => prev.filter((p) => p.ProductId !== product.ProductId));
  } catch (err: any) {
    alert(`Error: ${err.message}`);
  }
};
