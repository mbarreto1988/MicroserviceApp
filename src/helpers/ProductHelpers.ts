import { Product } from "../interfaces/Products";
import { deleteProduct } from "../services/ProductService";

export const handleDeleteProduct = async (
  productId: number,
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>
) => {
  await deleteProduct(productId);
  setProducts((prev) => prev.filter((p) => p.ProductId !== productId));
};

